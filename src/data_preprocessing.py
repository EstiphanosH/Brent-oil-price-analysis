#!/usr/bin/env python3
"""
Comprehensive and reproducible data preprocessing pipeline for Brent Oil Price analysis.
Designed for modularity and integration with Jupyter notebook analysis.
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import logging
from pathlib import Path
from typing import Optional, Tuple, Dict
import yaml

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler("data_preprocessing.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class OilDataPreprocessor:
    """Modular pipeline for oil price data preprocessing and analysis."""
    
    def __init__(self, config_path: str = "config.yml"):
        """
        Initialize preprocessor with configuration.
        
        Args:
            config_path: Path to YAML configuration file
        """
        self.config = self._load_config(config_path)
        self.df = None
        self.events_df = None
        self.processed_df = None
        self._validate_config()
        
    def _load_config(self, config_path: str) -> Dict:
        """Load configuration from YAML file."""
        with open(config_path) as f:
            config = yaml.safe_load(f)
        logger.info(f"Loaded configuration from {config_path}")
        return config
    
    def _validate_config(self) -> None:
        """Validate configuration parameters."""
        required_keys = {
            'data_paths': ['raw_data', 'processed_data'],
            'eda': ['output_dir'],
            'features': ['rolling_windows']
        }
        
        for section, keys in required_keys.items():
            if section not in self.config:
                raise ValueError(f"Missing section '{section}' in config")
            for key in keys:
                if key not in self.config[section]:
                    raise ValueError(f"Missing key '{key}' in section '{section}'")
                    
        logger.info("Configuration validated successfully")
    
    def load_data(self) -> Tuple[pd.DataFrame, Optional[pd.DataFrame]]:
        """
        Load and validate raw datasets.
        
        Returns:
            Tuple of (oil_prices_df, events_df)
        """
        logger.info("Loading raw data...")
        
        # Load oil price data
        self.df = pd.read_csv(
            self.config['data_paths']['raw_data'],
            parse_dates=['Date'],
            dayfirst=True
        )
        
        # Validate required columns
        if not {'Date', 'Price'}.issubset(self.df.columns):
            raise ValueError("Required columns 'Date' or 'Price' missing")
            
        # Load events data if specified
        self.events_df = None
        if 'events_data' in self.config['data_paths']:
            try:
                self.events_df = pd.read_csv(
                    self.config['data_paths']['events_data'],
                    parse_dates=['Date']
                )
                logger.info(f"Loaded {len(self.events_df)} events")
            except Exception as e:
                logger.warning(f"Could not load events data: {str(e)}")
        
        logger.info(f"Loaded {len(self.df)} price records")
        return self.df, self.events_df
    
    def clean_data(self) -> pd.DataFrame:
        """Perform data cleaning operations."""
        if self.df is None:
            raise ValueError("No data loaded. Call load_data() first")
            
        logger.info("Cleaning data...")
        
        # 1. Handle missing values
        initial_count = len(self.df)
        self.df = self.df.dropna(subset=['Price'])
        logger.info(f"Removed {initial_count - len(self.df)} null records")
        
        # 2. Ensure chronological order
        self.df = self.df.sort_values('Date')
        self.df = self.df.reset_index(drop=True)
        
        # 3. Remove duplicates
        self.df = self.df.drop_duplicates(subset=['Date'], keep='first')
        
        # 4. Handle outliers using rolling IQR
        window = self.config.get('outlier_detection', {}).get('window_size', 90)
        self.df['Rolling_Q1'] = self.df['Price'].rolling(window).quantile(0.25)
        self.df['Rolling_Q3'] = self.df['Price'].rolling(window).quantile(0.75)
        self.df['IQR'] = self.df['Rolling_Q3'] - self.df['Rolling_Q1']
        
        lower_bound = self.df['Rolling_Q1'] - 1.5 * self.df['IQR']
        upper_bound = self.df['Rolling_Q3'] + 1.5 * self.df['IQR']
        
        self.df['Price'] = np.where(
            self.df['Price'] > upper_bound,
            upper_bound,
            np.where(
                self.df['Price'] < lower_bound,
                lower_bound,
                self.df['Price']
            )
        )
        
        # Clean up temporary columns
        self.df = self.df.drop(columns=['Rolling_Q1', 'Rolling_Q3', 'IQR'])
        
        logger.info("Data cleaning completed")
        return self.df
    
    def engineer_features(self) -> pd.DataFrame:
        """Create derived features for time series analysis."""
        if self.df is None:
            raise ValueError("No data available. Run load_data() and clean_data() first")
            
        logger.info("Engineering features...")
        
        # 1. Time-based features
        self.df['Year'] = self.df['Date'].dt.year
        self.df['Month'] = self.df['Date'].dt.month
        self.df['DayOfWeek'] = self.df['Date'].dt.dayofweek
        
        # 2. Price transformations
        self.df['Log_Price'] = np.log(self.df['Price'])
        self.df['Log_Return'] = self.df['Log_Price'].diff()
        
        # 3. Rolling features
        for window in self.config['features']['rolling_windows']:
            self.df[f'MA_{window}'] = self.df['Price'].rolling(window).mean()
            self.df[f'Volatility_{window}'] = (
                self.df['Log_Return'].rolling(window).std() * np.sqrt(window)
            )
        # 4. Event features if available
        if self.events_df is not None:
            self._add_event_features()
        
        logger.info(f"Added {len(self.df.columns) - 2} new features")  # Original cols: Date, Price
        return self.df
    
    def _add_event_features(self) -> None:
        """Add event-related features to dataframe."""
        self.df['Event'] = ''
        self.df['Days_Since_Event'] = np.nan
        
        last_event_date = None
        for _, row in self.df.iterrows():
            # Check for events on this date
            event = self.events_df[self.events_df['Date'] == row['Date']]
            if not event.empty:
                self.df.at[_, 'Event'] = event.iloc[0]['Event_Name']
                last_event_date = row['Date']
            
            # Track days since last event
            if last_event_date:
                self.df.at[_, 'Days_Since_Event'] = (row['Date'] - last_event_date).days
    
    def run_eda(self) -> Dict:
        """
        Perform exploratory data analysis.
        
        Returns:
            Dictionary containing summary statistics and plots
        """
        if self.df is None:
            raise ValueError("No data available. Run load_data() first")
            
        logger.info("Performing EDA...")
        
        eda_results = {
            'summary_stats': self._get_summary_stats(),
            'plots': self._generate_plots()
        }
        
        logger.info("EDA completed")
        return eda_results
    
    def _get_summary_stats(self) -> Dict:
        """Generate summary statistics."""
        stats = {
            'price_stats': self.df['Price'].describe().to_dict(),
            'date_range': {
                'start': self.df['Date'].min().strftime('%Y-%m-%d'),
                'end': self.df['Date'].max().strftime('%Y-%m-%d'),
                'days': (self.df['Date'].max() - self.df['Date'].min()).days
            },
            'missing_values': self.df.isnull().sum().to_dict(),
            'correlation': self.df.select_dtypes(include=np.number).corr().to_dict()
        }
        return stats
    
    def _generate_plots(self) -> Dict:
        """Generate and save EDA visualizations."""
        plot_paths = {}
        output_dir = Path(self.config['eda']['output_dir'])
        output_dir.mkdir(parents=True, exist_ok=True)
        
        # 1. Price trend
        plt.figure(figsize=(15, 6))
        plt.plot(self.df['Date'], self.df['Price'])
        plt.title('Brent Oil Price Trend')
        plt.xlabel('Date')
        plt.ylabel('Price (USD)')
        plot_path = output_dir / 'price_trend.png'
        plt.savefig(plot_path, bbox_inches='tight')
        plt.close()
        plot_paths['price_trend'] = str(plot_path)
        
        # 2. Distribution plots
        fig, axes = plt.subplots(1, 2, figsize=(12, 5))
        
        sns.histplot(self.df['Price'], kde=True, ax=axes[0])
        axes[0].set_title('Price Distribution')
        
        sns.histplot(self.df['Log_Return'].dropna(), kde=True, ax=axes[1])
        axes[1].set_title('Log Returns Distribution')
        
        plot_path = output_dir / 'distributions.png'
        plt.savefig(plot_path, bbox_inches='tight')
        plt.close()
        plot_paths['distributions'] = str(plot_path)
        
        # 3. Seasonal decomposition (example)
        if 'Month' in self.df.columns:
            monthly_avg = self.df.groupby('Month')['Price'].mean()
            
            plt.figure(figsize=(10, 5))
            monthly_avg.plot(kind='bar')
            plt.title('Average Price by Month')
            plt.xlabel('Month')
            plt.ylabel('Average Price')
            
            plot_path = output_dir / 'seasonality.png'
            plt.savefig(plot_path, bbox_inches='tight')
            plt.close()
            plot_paths['seasonality'] = str(plot_path)
        
        return plot_paths
    
    def run_pipeline(self) -> pd.DataFrame:
        """
        Execute complete preprocessing pipeline.
        
        Returns:
            Processed DataFrame
        """
        try:
            self.load_data()
            self.clean_data()
            self.engineer_features()
            self.run_eda()
            
            # Save processed data
            self.processed_df = self.df.copy()
            self.save_processed_data()
            
            return self.processed_df
            
        except Exception as e:
            logger.error(f"Pipeline failed: {str(e)}")
            raise
    
    def save_processed_data(self) -> None:
        """Save processed data to configured path."""
        if self.processed_df is not None:
            output_path = Path(self.config['data_paths']['processed_data'])
            output_path.parent.mkdir(parents=True, exist_ok=True)
            self.processed_df.to_csv(output_path, index=False)
            logger.info(f"Saved processed data to {output_path}")
        else:
            logger.warning("No processed data to save")


def main():
    """Command-line entry point."""
    try:
        preprocessor = OilDataPreprocessor()
        processed_data = preprocessor.run_pipeline()
        logger.info("Pipeline executed successfully")
        return processed_data
    except Exception as e:
        logger.error(f"Script failed: {str(e)}")
        raise

if __name__ == "__main__":
    main()