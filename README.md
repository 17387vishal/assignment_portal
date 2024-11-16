# Assignment Submission Portal API Documentation
## Node.js Setup and Run Instructions

## 1. Clone the Repository

If you have the repository URL for your project, clone it by running the following command in your terminal:

```bash
git clone <your-repository-url>
cd <project-directory>
```
## 2. Install Dependencies

Once inside the project directory, run the following command to install all necessary dependencies specified in the `package.json` file:

```bash
npm install
```
This will install all the required packages like express, mongoose, jsonwebtoken, etc.
## 3. Create a .env File

Create a `.env` file in the root of your project to store environment variables (e.g., database URI, JWT secret, etc.).

### `.env` Example:

```env
# Database URI
MONGODB_URI=mongodb://localhost:27017/your-database-name

# JWT Secret for signing tokens
JWT_SECRET=your-jwt-secret-key

# Port the app will run on
PORT=5000
```
### Environment Variables Description

- **MONGODB_URI**: Your MongoDB connection string (local or cloud like MongoDB Atlas).
- **JWT_SECRET**: Secret key used to sign your JWT tokens.
- **PORT**: Port on which your Node.js server will run (default is 5000).
- **NODE_ENV**: The environment for running the server (e.g., development, production).

## 4. Setup Database

Make sure your MongoDB database is up and running.

- **For local MongoDB**: Ensure you have MongoDB installed and the MongoDB service is running on your machine.
  
- **For cloud MongoDB (e.g., MongoDB Atlas)**: 
  - Create a cluster in MongoDB Atlas.
  - Use the provided connection string from Atlas to replace the `MONGODB_URI` in your `.env` file.

## 5. Run the Application

After all the setup is complete, you can start the Node.js application by running:

```bash
npm start
```

## 6. Test the Application

After starting the server, the application should be up and running. You can test it using tools like:

- **Postman**: For making API requests and testing endpoints.
- **curl**: A command-line tool for making HTTP requests.
## Admin Registration

### Endpoint: `POST /register/admin`

This endpoint is used to register a new admin.

### Request Body:

The request body should contain the following fields:

```json
{
  "name": "Alok",
  "email": "alok@gmail.com",
  "password": "Password@123!",
  "role": "admin"
}
```
## Admin Login

### Endpoint: `POST /login/admin`

This endpoint is used for admin login, allowing admins to authenticate and gain access to the portal.

### Request Body:

The request body should contain the following fields:

```json
{
  "email": "alok@gmail.com",
  "password": "Password@123!"
}
```

---

## Get All Assignments for Admin

- **GET** `/assignments`

This endpoint retrieves all assignments for the logged-in admin.

#### Authentication:

The request must include a valid JWT token in the `Authorization` header:

## Action on Assignment (Accept / Reject)

### **PATCH** `/assignments/:id/action`

This endpoint allows the admin to perform an action (accept or reject) on a specific assignment.

#### **URL Parameter**:

- `id`: The unique identifier for the assignment.

#### **Request Body**:

```json
{
  "action": "accepted"  // or "rejected"
}
```

## User Registration

### Endpoint: `POST /register/user`

This endpoint is used for user registration, allowing users to create an account in the portal.

### Request Body:

The request body should contain the following fields:

```json
{
  "username": "johnsmith",
  "email": "johnsmith@gmail.com",
  "password": "Password@123!"
}
```
## User Login

### Endpoint: `POST /login/user`

This endpoint is used for user login, allowing registered users to authenticate themselves and access the portal.

### Request Body:

The request body should contain the following fields:

```json
{
  "email": "johnsmith@gmail.com",
  "password": "Password@123!"
}
```
## Assignment Upload

### Endpoint: `POST /upload/assignment`

This endpoint allows authenticated users to upload assignments, specifying the task and the admin to whom it is assigned.

### Request Body:

The request body should contain the following fields:

```json
{
  "username": "johnsmith",
  "task": "Hello World",
  "admin": "Alok"
}
```
## Authentication

The user must be authenticated using a valid JWT token. The token should be included in the `Authorization` header of the request as follows:


Where:
- **`<jwt-token>`** is the token returned after successful login or registration. This token is used to authenticate and authorize the user to access the requested endpoints.
- Ensure that the token is kept secure and not exposed publicly.

### Example:


POST /upload/assignment :
- Content-Type: application/json
 - Authorization: Bearer <your-jwt-token-here>
```bash
{
  "username": "johnsmith",
  "task": "Hello World",
  "admin": "Alok"
}
```
## 7. API Endpoints Overview

### User Endpoints:

- **POST /register**: Register a new user.
  - **Request Body**:
    ```json
    {
      "username": "johnsmith",
      "email": "johnsmith@gmail.com",
      "password": "Password@123!"
    }
    ```
  - **Response**: User registration successful.

- **POST /login**: Login a user and receive a JWT token.
  - **Request Body**:
    ```json
    {
      "email": "johnsmith@gmail.com",
      "password": "Password@123!"
    }
    ```
  - **Response**: Returns JWT token for authentication.

- **POST /upload**: Upload an assignment (requires user authentication).
  - **Headers**:
    - Authorization: `Bearer <jwt-token>`
  - **Request Body**:
    ```json
    {
      "username": "johnsmith",
      "task": "Hello World",
      "admin": "Alok"
    }
    ```
  - **Response**: Assignment uploaded successfully.

- **GET /admins**: Fetch all admins (for assignment submission).
  - **Headers**:
    - Authorization: `Bearer <jwt-token>`
  - **Response**: Returns a list of admins.

### Admin Endpoints:

- **POST /register**: Register a new admin.
  - **Request Body**:
    ```json
    {
      "name": "Alok",
      "email": "alok@gmail.com",
      "password": "Password@123!",
      "role": "admin"
    }
    ```
  - **Response**: Admin registration successful.

- **POST /login**: Login an admin and receive a JWT token.
  - **Request Body**:
    ```json
    {
      "email": "alok@gmail.com",
      "password": "Password@123!"
    }
    ```
  - **Response**: Returns JWT token for admin authentication.

- **GET /assignments**: View assignments tagged to the admin.
  - **Headers**:
    - Authorization: `Bearer <jwt-token>`
  - **Response**: Returns a list of assignments for the admin.

- **PATCH /assignments/:id/action**: Accept or reject an assignment.
  - **URL Parameter**:
    - `id`: The unique identifier for the assignment.
  - **Request Body**:
    ```json
    {
      "status": "accepted"  // or "rejected"
    }
    ```
  - **Response**: Returns the updated assignment status.

