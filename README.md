#  Django, React and PostgreSQL Single Page Application
# Overview
This repository contains a full-stack web application with the frontend built using React and TypeScript, the backend developed in Python with Django, and PostgreSQL as the database. The entire project has been dockerized for easy deployment and management.

# Prerequisites
Before running the application, ensure the following dependencies are installed on your machine:

Python

Node.js (version >16)

PostgreSQL database

# Design Patterns
The project incorporates the following design patterns:

## Model-View-Controller (MVC):

The Django backend follows the MVC architecture, separating the application into models, views, and controllers for better organization and maintainability.
## Token-Based Authentication:

Django Rest Framework is used for implementing token-based authentication, ensuring secure API access.
## Containerization with Docker:

The project is dockerized to simplify deployment and ensure consistency across different environments.
## Separation of Concerns:

The frontend and backend are separated, promoting modularity and making it easier to scale or modify each part independently.
# Installation
Clone the repository to your local machine:

## Build and start the application using Docker Compose:
sudo docker-compose build

sudo docker-compose up

## Frontend
The frontend is built with React and TypeScript. The source code is located in the frontend directory.

## Frontend Dependencies
Ensure that Node.js (version >16) is installed on your machine.
To install frontend dependencies, navigate to the frontend directory and run:

  cd frontend

  npm install

## Running the Frontend
To start the frontend development server, run:

  npm start

The application will be accessible at http://localhost:3000.

## Backend
The backend is developed using Python with the Django framework. 

The source code is located in the backend directory.

## Backend Dependencies
No additional dependencies need to be installed manually, as the required packages are included in the Docker setup.

## Database Configuration
Ensure you have a PostgreSQL database available. 

Update the database configuration in the backend/settings.py file as needed.

## Running the Backend
  cd backend
  
  python manage.py runserver 

  The application will be accessible at http://localhost:8000.

# APIs
The backend provides the following APIs with Django authentication (using restframework token):
## Login API
Endpoint: /login/

Method: POST

## User Registration API
Endpoint: /registeruser/

Method: POST

## Logout API
Endpoint: /logout/

Method: POST

## Save Customer API
Endpoint: /save-customer/

Method: POST
Save customer data in the database.

# Assumptions
## Node.js Version: 
The project assumes that Node.js version 16 or higher is installed on the system for running the React frontend.

## PostgreSQL Database: 
It is assumed that a PostgreSQL database is available, and the necessary configurations are provided in the database folder.

## Docker Environment: 
The installation instructions assume that Docker and Docker Compose are installed on the system. The project is designed to be run in a Dockerized environment.

## Django Rest Framework: 
The project relies on Django Rest Framework for handling API requests and token-based authentication.

# Decisions
## Dockerization:
The decision was made to containerize the entire application using Docker. This simplifies deployment and ensures that the application runs consistently across different environments.

## Token-Based Authentication:
Django Rest Framework's token-based authentication is chosen for securing the API endpoints.

## Separation of Frontend and Backend: 
The frontend and backend are kept separate to promote modularity and ease of maintenance. The React frontend communicates with the Django backend through API calls.

## Project Structure: 
The project follows a modular structure with separate folders for frontend, backend, Docker configurations, database. This organization enhances readability and maintainability.

## Use of TypeScript:
TypeScript is chosen for the frontend to provide static typing and improve code quality.



# Conclusion
After following the installation steps, you should have the full-stack web application up and running. Feel free to explore and use the provided APIs for authentication and customer data management.
