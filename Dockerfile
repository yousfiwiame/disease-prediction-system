FROM python:3.9-slim

# Setting the working directory
WORKDIR /app

# Copying requirements first (for better caching)
COPY requirements.txt .

# Installing dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copying the rest of the application
COPY . .

# Exposing the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["python", "app.py"]