import pandas as pd

# Load the CSV file into a DataFrame
df = pd.read_csv('data2024.csv')

# Replace line breaks within cells with a space
df = df.applymap(lambda x: x.replace('\n', ' ') if isinstance(x, str) else x)

# Strip leading and trailing whitespaces
df = df.applymap(lambda x: x.strip() if isinstance(x, str) else x)

# Save the cleaned DataFrame to a new CSV file
df.to_csv('cleaned_data2024.csv', index=False)

print("CSV file has been cleaned and saved as 'cleaned_data2024.csv'")
