# NestJS Application

This is a NestJS application that provides a RESTful API for managing ingest and retrieve data. This README provides instructions on setting up and running the application locally and using Docker.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (>= 14)
- npm (comes with Node.js)
- Docker (optional, for running with Docker)
- Docker Compose (optional, for running with Docker)

## Installation

1. Install dependencies:


   npm install

2. Create a .env file in the root directory and add your environment variables:
  
  DATABASE_HOST=localhost
  DATABASE_PORT=5432
  DATABASE_USER=your_db_user
  DATABASE_PASSWORD=your_db_password
  DATABASE_NAME=your_db_name  

3. Start the application:


   npm run start:dev

   or 

   docker-compose up --build

4. to use "/image-frame/upload" endpoint you can upload the file random_image_data.csv wich located in index folder provided as an example, the file built by this script you can run it on google colab to get the file by the script.

===================================================================================
import pandas as pd
import numpy as np
from google.colab import files

# Parameters
num_rows = 100  # Number of rows of data
num_columns = 200  # Number of pixel columns
depth_start = 1
depth_end = 1000

# Generate random depths
depths = np.linspace(depth_start, depth_end, num_rows)

# Generate random pixel values (0 to 255)
pixel_data = np.random.randint(0, 256, size=(num_rows, num_columns))

# Create DataFrame
df = pd.DataFrame(pixel_data, columns=[f'pixel_{i+1}' for i in range(num_columns)])
df.insert(0, 'depth', depths)

# Save to CSV
csv_file_path = 'random_image_data.csv'
df.to_csv(csv_file_path, index=False)

print(f"CSV file generated: {csv_file_path}")

# Download the file
files.download(csv_file_path)
