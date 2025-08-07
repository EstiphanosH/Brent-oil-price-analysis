# src/data_preprocessing.py

"""
This script handles the preprocessing of raw data.
It loads the BrentOilPrices.csv and key_events.csv, cleans them,
and saves them in a processed format (e.g., parquet or clean CSV).
"""

import pandas as pd

def load_and_clean_data(file_path):
    """
    Loads a CSV file and performs basic data cleaning.

    Args:
        file_path (str): The path to the CSV file.

    Returns:
        pd.DataFrame: A cleaned DataFrame.
    """
    try:
        df = pd.read_csv(file_path)
        print(f"Successfully loaded {file_path}")

        # Convert 'Date' column to datetime objects
        if 'date' in df.columns:
            df['date'] = pd.to_datetime(df['date'])
        
        # Handle missing values (e.g., fill or drop)
        df.dropna(inplace=True)
        
        return df

    except FileNotFoundError:
        print(f"Error: The file {file_path} was not found.")
        return None

def main():
    """
    Main function to orchestrate the data preprocessing workflow.
    """
    # Load and clean Brent oil price data
    brent_prices_df = load_and_clean_data('data/raw/BrentOilPrices.csv')
    if brent_prices_df is not None:
        # Perform further preprocessing steps (e.g., calculate log returns)
        brent_prices_df['log_return'] = brent_prices_df['price'].pct_change().apply(lambda x: pd.np.log(1+x))
        
        # Save the processed data
        brent_prices_df.to_parquet('data/processed/brent_prices.parquet')
        print("Brent oil price data preprocessed and saved to data/processed/brent_prices.parquet")

    # Load and clean key events data
    key_events_df = load_and_clean_data('data/events/key_events.csv')
    if key_events_df is not None:
        # Save the processed data
        key_events_df.to_parquet('data/processed/key_events.parquet')
        print("Key events data preprocessed and saved to data/processed/key_events.parquet")

if __name__ == '__main__':
    main()
