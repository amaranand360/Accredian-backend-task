# Backend Development

Develop RESTful APIs specifically for user authentication (login and sign-up) and connect them with a MySQL database.

## live demo of the project at :https://loginsystem-bs85.onrender.com/

## Requirements

### 1. REST APIs

a. **User Login and Sign-Up Endpoints:**
   - Create RESTful endpoints for user login and sign-up.

b. **Express.js for Backend Server:**
   - Utilize Express.js for building the backend server.

### 2. Database Connectivity

a. **MySQL Database Integration:**
   - Establish connectivity between the APIs and a MySQL database to store user information.

## Endpoints

### 1. User Login

- **Endpoint:** `/api/login`
- **Method:** POST
- **Request Payload:**
  ```json
  {
    "username": "exampleUser",
    "password": "examplePassword"
  }
