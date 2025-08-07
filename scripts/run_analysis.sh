#!/bin/bash

# =========================================================
# Shell Script to Run Brent Oil Price Data Analysis
# =========================================================
# This script automates the process of running the Python
# data analysis pipeline. It assumes you have a virtual
# environment set up and all dependencies are installed.
#
# Steps:
# 1. Activate the Python virtual environment.
# 2. Run the data preprocessing script.
# 3. Run the change point modeling script.
# 4. Run the event correlation analysis script.
# 5. Generate the final dashboard data.
# 6. Deactivate the virtual environment.
# =========================================================

echo "Starting the Brent Oil Price Analysis pipeline..."

# Activate the virtual environment
# Assumes the virtual environment is named 'venv'
echo "Activating virtual environment..."
source venv/bin/activate

# Step 1: Run data preprocessing
echo "Running data preprocessing script..."
python src/data_preprocessing.py

# Step 2: Implement the Bayesian Change Point Model
echo "Running change point modeling script..."
python src/change_point_model.py

# Step 3: Correlate changes with key events
echo "Running event correlation analysis..."
python src/event_analysis.py

# Step 4: Prepare data for the dashboard
echo "Preparing data for the dashboard..."
python src/dashboard_data.py

echo "Analysis pipeline completed."

# Deactivate the virtual environment
deactivate
echo "Virtual environment deactivated."

