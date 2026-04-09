# Base image: Python 3.8 slim version
FROM python:3.10-slim

# This is needed to prevent Python from writing pyc files to disc (which are not used in containers)
ENV PYTHONDONTWRITEBYTECODE=1

# This is needed to prevent Python from buffering stdout and stderr (which are not used in containers)
ENV PYTHONUNBUFFERED=1


# Set the working directory inside the container
WORKDIR /app

# Copy the application files from the current directory to the working directory in the container
COPY . /app

# Install the dependencies listed in the requirements.txt file
RUN pip install -r requirements.txt

# Command to start the FastAPI application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]