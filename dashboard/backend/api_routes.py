# api_routes.py
from flask import Blueprint, jsonify

# Create a Blueprint for our API routes
api_blueprint = Blueprint('api', __name__)

# Mock data for Brent oil prices and key events.
# In a production environment, this would be fetched from a database.
# I've included it here for a self-contained, runnable example.
brent_oil_prices = [
    {"date": "2021-01-01", "price": 51.22},
    {"date": "2021-02-01", "price": 59.94},
    {"date": "2021-03-01", "price": 64.08},
    {"date": "2021-04-01", "price": 63.54},
    {"date": "2021-05-01", "price": 68.71},
    {"date": "2021-06-01", "price": 75.13},
    {"date": "2021-07-01", "price": 74.40},
    {"date": "2021-08-01", "price": 71.05},
    {"date": "2021-09-01", "price": 78.43},
    {"date": "2021-10-01", "price": 84.38},
    {"date": "2021-11-01", "price": 82.50},
    {"date": "2021-12-01", "price": 79.79},
    {"date": "2022-01-01", "price": 88.42},
    {"date": "2022-02-01", "price": 97.09},
    {"date": "2022-03-01", "price": 117.25}, # Event: Ukraine invasion
    {"date": "2022-04-01", "price": 104.58},
    {"date": "2022-05-01", "price": 113.80},
    {"date": "2022-06-01", "price": 122.71},
    {"date": "2022-07-01", "price": 110.15},
    {"date": "2022-08-01", "price": 99.10},
    {"date": "2022-09-01", "price": 90.93},
    {"date": "2022-10-01", "price": 97.92}, # Event: OPEC+ production cut
    {"date": "2022-11-01", "price": 95.89},
    {"date": "2022-12-01", "price": 85.91},
]

key_events = [
    {"date": "2022-03-01", "event": "Russia-Ukraine conflict begins", "type": "Geopolitical", "source": "News", "price": 117.25, "percent_change": 19.3, "description": "Conflict causes supply fears, driving prices up."},
    {"date": "2022-10-01", "event": "OPEC+ production cut announced", "type": "Economic", "source": "Official Statement", "price": 97.92, "percent_change": 7.7, "description": "OPEC+ decides to cut production, leading to a price increase."},
]

# API endpoint to get Brent oil price data
@api_blueprint.route('/prices', methods=['GET'])
def get_prices():
    """
    Returns the historical Brent oil price data.
    """
    return jsonify(brent_oil_prices)

# API endpoint to get key events data
@api_blueprint.route('/events', methods=['GET'])
def get_events():
    """
    Returns the key events data.
    """
    return jsonify(key_events)
