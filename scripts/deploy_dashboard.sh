#!/bin/bash

# =========================================================
# Shell Script to Deploy the Flask and React Dashboard
# =========================================================
# This script automates the build and deployment process
# using Docker. It will:
# 1. Build the Docker image for the Flask backend.
# 2. Run the Docker container, exposing the necessary port.
# 3. Inform the user on how to run the React frontend.
# =========================================================

echo "Starting deployment of the dashboard application..."

# Stop and remove any previous containers named 'brent-oil-backend'
echo "Cleaning up previous containers..."
docker stop brent-oil-backend > /dev/null 2>&1
docker rm brent-oil-backend > /dev/null 2>&1

# Step 1: Build the Docker image for the backend
echo "Building the Docker image for the Flask backend..."
docker build -t brent-oil-backend-image ./backend

# Check if the build was successful
if [ $? -ne 0 ]; then
  echo "Error: Docker image build failed. Exiting."
  exit 1
fi

# Step 2: Run the Docker container
echo "Running the Flask backend in a Docker container on port 5000..."
docker run -d --name brent-oil-backend -p 5000:5000 brent-oil-backend-image

# Check if the container started successfully
if [ $? -ne 0 ]; then
  echo "Error: Docker container failed to start. Exiting."
  exit 1
fi

echo "Flask backend is now running at http://localhost:5000"
echo "To run the React frontend, navigate to the 'frontend' directory and run 'npm start'."

