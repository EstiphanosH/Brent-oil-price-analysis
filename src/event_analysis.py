# =========================================================================

# src/event_analysis.py

"""
This script associates the detected change points with the researched key events.
It quantifies the impact of these events on price behavior.
"""

import pandas as pd

def load_data():
    """
    Loads processed data and the change point results (conceptual).
    """
    # For this example, we assume change points are already identified and saved.
    # In a real scenario, you'd load the PyMC3 trace and get the tau posterior.
    processed_prices = pd.read_parquet('data/processed/brent_prices.parquet')
    key_events = pd.read_parquet('data/processed/key_events.parquet')
    return processed_prices, key_events

def correlate_and_quantify_impact(prices_df, events_df):
    """
    Compares change points with key events to quantify impact.
    """
    # Conceptual example: a change point is detected on '2022-03-01'
    # We will look for an event around this date.
    change_point_date = pd.to_datetime('2022-03-01')
    
    # Find events that are close to the detected change point
    events_around_change = events_df[
        (events_df['date'] >= change_point_date - pd.Timedelta(days=7)) &
        (events_df['date'] <= change_point_date + pd.Timedelta(days=7))
    ]
    
    if not events_around_change.empty:
        print(f"Found events around the change point date {change_point_date.strftime('%Y-%m-%d')}:")
        for index, row in events_around_change.iterrows():
            print(f"- Event: {row['event']} on {row['date'].strftime('%Y-%m-%d')}")
            # Quantify the impact (e.g., calculate price change before and after)
            price_before = prices_df[prices_df['date'] < change_point_date]['price'].iloc[-1]
            price_after = prices_df[prices_df['date'] >= change_point_date]['price'].iloc[0]
            
            percent_change = ((price_after - price_before) / price_before) * 100
            print(f"  -> Price changed from ${price_before:.2f} to ${price_after:.2f}, a {percent_change:.2f}% shift.")
            
    # Save the results (e.g., into a report JSON file)
    # The actual implementation would be more robust.
    
    # Create a list of dictionaries with the analysis results
    analysis_results = events_around_change.copy()
    analysis_results['price_change_percent'] = [3.4, 7.7, 19.3] # Mocking a change here
    
    # save as JSON
    # analysis_results.to_json('reports/analysis_report.json', orient='records', date_format='iso')

def main():
    """
    Main function for the event analysis script.
    """
    prices, events = load_data()
    if prices is not None and events is not None:
        correlate_and_quantify_impact(prices, events)

if __name__ == '__main__':
    main()