# app.py
from flask import Flask, jsonify
from flask_cors import CORS
from api_routes import api_blueprint

# Initialize the Flask application
app = Flask(__name__)

# Enable CORS for all routes and origins. This is crucial for the React frontend
# to be able to make API calls to the Flask backend without running into security issues.
CORS(app)

# Register the API routes blueprint
app.register_blueprint(api_blueprint, url_prefix='/api')

# Simple root endpoint to confirm the server is running
@app.route('/')
def home():
    return jsonify({
        "message": "Flask backend is running!",
        "version": "1.0.0"
    })

# Run the application
if __name__ == '__main__':
    # Setting debug to True allows for automatic reloading on code changes
    # and provides a debugger in case of errors.
    app.run(debug=True)
