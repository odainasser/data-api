import pandas as pd
import numpy as np
from google.colab import files

num_rows = 100  # Number of rows of data
num_columns = 200  # Number of pixel columns
depth_start = 1
depth_end = 1000

depths = np.linspace(depth_start, depth_end, num_rows)

pixel_data = np.random.randint(0, 256, size=(num_rows, num_columns))

df = pd.DataFrame(pixel_data, columns=[f'pixel_{i+1}' for i in range(num_columns)])
df.insert(0, 'depth', depths)

csv_file_path = 'random_image_data.csv'
df.to_csv(csv_file_path, index=False)

print(f"CSV file generated: {csv_file_path}")

files.download(csv_file_path)