# API Documentation

## User Management

### Base URL

All endpoints are relative to the base URL: `/api`

### Authentication

Endpoints that require authentication use JWT (JSON Web Token) in the `Authorization` header.

### Error Handling

Error responses follow standard HTTP status codes. Details of error responses are included in each endpoint's description.

### Endpoints

### 1. User Login

- **URL:** `/users/login`
- **Method:** `POST`
- **Description:** Authenticate a user to obtain a JWT token.
- **Request Body:**
    
    ```json
    jsonCopy code
    {
      "email": "user@example.com",
      "password": "password"
    }
    
    ```
    
- **Success Response:**
    - **Code:** 200 OK
    - **Content:**
        
        ```json
        {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        }
        
        ```
        
- **Error Responses:**
    - **Code:** 401 Unauthorized
        - **Content:** `{ "error": "Invalid credentials" }`
    - **Code:** 400 Bad Request
        - **Content:** `{ "error": "Missing email or password" }`

### 2. User Registration

- **URL:** `/users`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Body:**
    
    ```json
    {
      "name": "John Doe",
      "email": "user@example.com",
      "password": "password"
    }
    
    ```
    
- **Success Response:**
    - **Code:** 200 OK
    - **Content:**
        
        ```json
        {
          "message": "User registered successfully"
        }
        
        ```
        
- **Error Responses:**
    - **Code:** 400 Bad Request
        - **Content:** `{ "error": "Email already exists" }`
    - **Code:** 422 Unprocessable Entity
        - **Content:** `{ "error": "Invalid input data" }`

### 3. Get Current User

- **URL:** `/user`
- **Method:** `GET`
- **Description:** Retrieve information about the currently authenticated user.
- **Headers:**
    - `Authorization: Bearer <token>`
- **Success Response:**
    - **Code:** 200 OK
    - **Content:**
        
        ```json
        {
          "user": {
            "id": "1234567890",
            "name": "John Doe",
            "email": "user@example.com"
          }
        }
        
        ```
        
- **Error Responses:**
    - **Code:** 401 Unauthorized
        - **Content:** `{ "error": "Unauthorized: Invalid token" }`

### 4. Update User

- **URL:** `/user`
- **Method:** `PUT`
- **Description:** Update the information of the currently authenticated user.
- **Headers:**
    - `Authorization: Bearer <token>`
- **Request Body:**
    
    ```json
    {
      "name": "Updated Name"
    }
    
    ```
    
- **Success Response:**
    - **Code:** 200 OK
    - **Content:**
        
        ```json
        {
          "message": "User updated successfully"
        }
        
        ```
        
- **Error Responses:**
    - **Code:** 401 Unauthorized
        - **Content:** `{ "error": "Unauthorized: Invalid token" }`
    - **Code:** 400 Bad Request
        - **Content:** `{ "error": "Invalid input data" }`

## Article

### Base URL

All endpoints are relative to the base URL: `/api/articles`

### Authentication

Some endpoints may require authentication using JWT (JSON Web Token) in the `Authorization` header.

### Endpoints

### 1. Create Article

- **URL:** `/`
- **Method:** `POST`
- **Description:** Create a new article.
- **Authentication:** Requires a valid JWT in the `Authorization` header.
- **Request Body:**
    
    ```json
    {
      "article": {
        "title": "Title of the Article",
        "description": "Description of the article",
        "body": "Body content of the article",
        "tagList": ["tag1", "tag2"]
      }
    }
    
    ```
    
- **Success Response:**
    - **Code:** 200 OK
    - **Content:**
        
        ```json
        {
          "article": {
            "title": "Title of the Article",
            "description": "Description of the article",
            "body": "Body content of the article",
            "author": {
              "id": "user_id",
              "username": "username"
            },
            "tagList": ["tag1", "tag2"],
            "createdAt": "2024-07-24T12:00:00Z",
            "updatedAt": "2024-07-24T12:00:00Z"
          }
        }
        
        ```
        
- **Error Responses:**
    - **Code:** 400 Bad Request
        - **Content:** `{ "message": "All fields are required" }`
    - **Code:** 401 Unauthorized
        - **Content:** `{ "error": "Unauthorized: Invalid token" }`

### 2. Feed Articles

- **URL:** `/`
- **Method:** `GET`
- **Description:** Fetch all articles.
- **Success Response:**
    - **Code:** 200 OK
    - **Content:** Array of articles in the following format:
        
        ```json
        [
          {
            "title": "Title of the Article",
            "description": "Description of the article",
            "body": "Body content of the article",
            "author": {
              "id": "user_id",
              "username": "username"
            },
            "tagList": ["tag1", "tag2"],
            "createdAt": "2024-07-24T12:00:00Z",
            "updatedAt": "2024-07-24T12:00:00Z"
          },
          // More articles...
        ]
        
        ```
        
- **Error Responses:**
    - **Code:** 500 Internal Server Error
        - **Content:** `{ "error": "Error fetching articles" }`

### 3. Get Article by Slug

- **URL:** `/:slug`
- **Method:** `GET`
- **Description:** Fetch a single article by its slug.
- **Parameters:**
    - `slug`: Unique slug of the article.
- **Success Response:**
    - **Code:** 200 OK
    - **Content:**
        
        ```json
        {
          "article": {
            "title": "Title of the Article",
            "description": "Description of the article",
            "body": "Body content of the article",
            "author": {
              "id": "user_id",
              "username": "username"
            },
            "tagList": ["tag1", "tag2"],
            "createdAt": "2024-07-24T12:00:00Z",
            "updatedAt": "2024-07-24T12:00:00Z"
          }
        }
        
        ```
        
- **Error Responses:**
    - **Code:** 401 Unauthorized
        - **Content:** `{ "message": "Article Not Found" }`

## JWT Verification Middleware

### 

The `verifyJWT` middleware function is used to authenticate and authorize requests by verifying a JSON Web Token (JWT) provided in the `Authorization` header. It decodes the JWT using a secret key (`ACCESS_TOKEN_SECRET`) and attaches the decoded user information to the request object (`req`) for further processing by subsequent middleware or route handlers.

### Functionality

The middleware performs the following tasks:

1. **Extracts Authorization Header:** Retrieves the JWT from the `Authorization` header of the HTTP request.
2. **Validates JWT Format:** Checks if the JWT starts with the string "Token ".
3. **Verifies JWT:** Uses `jwt.verify` method from the `jsonwebtoken` package to verify the validity and authenticity of the JWT against the `ACCESS_TOKEN_SECRET`.
4. **Handles Authentication Errors:** Returns appropriate HTTP responses (`401 Unauthorized` or `403 Forbidden`) if the JWT is missing, malformed, expired, or invalid.
5. **Attaches User Information:** If the JWT is valid, extracts the user ID, email, and hashed password from the decoded JWT payload and attaches them to the `req` object (`req.userId`, `req.userEmail`, `req.userHashedPass`).
6. **Calls Next Middleware:** Calls the `next()` function to pass control to the next middleware or route handler in the request processing pipeline.

### Usage

To use `verifyJWT` middleware in your Express routes:

1. **Import the Middleware:**
    
    ```jsx
    const verifyJWT = require('../middleware/verifyJWT');
    
    ```
    
2. **Apply the Middleware to Routes:**
Add `verifyJWT` as middleware to any route or group of routes that require authentication and authorization:
    
    ```jsx
    router.get('/protected-route', verifyJWT, (req, res) => {
        // Route handler logic for authenticated requests
    });
    
    ```
    

### Error Handling

- **401 Unauthorized:** Returned if the JWT is missing or does not start with "Token ".
- **403 Forbidden:** Returned if the JWT is invalid or expired.

### Example

```jsx
// Example route using verifyJWT middleware
const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');

// Protected route example
router.get('/protected-route', verifyJWT, (req, res) => {
    // Only reaches here if JWT is valid and user is authenticated
    res.json({ message: 'Authenticated user' });
});

module.exports = router;

```

### Security Considerations

- **Token Security:** Ensure that `ACCESS_TOKEN_SECRET` is securely stored and not exposed in your codebase.
- **JWT Expiry:** Consider implementing token expiration and refresh mechanisms for improved security.

## Dependencies Used

### Production Dependencies

### 1. bcrypt (^5.1.1)

- **Description:** Library for hashing passwords using bcrypt algorithm.
- **Link:** [npm bcrypt](https://www.npmjs.com/package/bcrypt)

### 2. cors (^2.8.5)

- **Description:** Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.js.
- **Link:** [npm cors](https://www.npmjs.com/package/cors)

### 3. dotenv (^16.4.5)

- **Description:** Module for loading environment variables from a `.env` file into `process.env`.
- **Link:** [npm dotenv](https://www.npmjs.com/package/dotenv)

### 4. express (^4.19.2)

- **Description:** Fast, unopinionated, minimalist web framework for Node.js.
- **Link:** [npm express](https://www.npmjs.com/package/express)

### 5. jsonwebtoken (^9.0.2)

- **Description:** JSON Web Token (JWT) implementation for Node.js.
- **Link:** [npm jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

### 6. mongodb (^6.8.0)

- **Description:** Official MongoDB driver for Node.js.
- **Link:** [npm mongodb](https://www.npmjs.com/package/mongodb)

### 7. mongoose (^8.5.0)

- **Description:** Elegant MongoDB object modeling for Node.js.
- **Link:** [npm mongoose](https://www.npmjs.com/package/mongoose)

### 8. mongoose-unique-validator (^5.0.1)

- **Description:** Plugin for Mongoose that adds pre-save validation for unique fields.
- **Link:** [npm mongoose-unique-validator](https://www.npmjs.com/package/mongoose-unique-validator)

### 9. slugify (^1.6.6)

- **Description:** Library to create slugs from strings with options for customization.
- **Link:** [npm slugify](https://www.npmjs.com/package/slugify)

### Development Dependencies

### 1. nodemon (^3.1.4)

- **Description:** Utility that monitors changes in your Node.js application and automatically restarts the server.
- **Link:** [npm nodemon](https://www.npmjs.com/package/nodemon)

## Article Schema

### Overview

The `articleSchema` defines the structure of MongoDB documents for articles using Mongoose, providing a blueprint for storing and querying articles in your application.

### Fields

### 1. `slug`

- **Type:** String
- **Description:** Unique slug generated from the `title` using `slugify`.
- **Attributes:**
    - `unique`: Ensures uniqueness across documents.
    - `lowercase`: Converts the slug to lowercase.
    - `index`: Creates an index for efficient querying.

### 2. `title`

- **Type:** String
- **Description:** Title of the article.
- **Attributes:**
    - `required`: Field must be provided for document creation.

### 3. `description`

- **Type:** String
- **Description:** Short description or summary of the article.
- **Attributes:**
    - `required`: Field must be provided for document creation.

### 4. `body`

- **Type:** String
- **Description:** Main content or body of the article.
- **Attributes:**
    - `required`: Field must be provided for document creation.

### 5. `tagList`

- **Type:** Array of Strings
- **Description:** List of tags associated with the article.

### 6. `author`

- **Type:** ObjectId
- **Description:** Reference to the `User` who authored the article.
- **Attributes:**
    - `ref`: Refers to the `User` model in Mongoose.

### 7. `favoritesCount`

- **Type:** Number
- **Description:** Number of times the article has been favorited.
- **Default:** 0

### 8. `comments`

- **Type:** Array of ObjectIds
- **Description:** References to comments associated with the article.
- **Attributes:**
    - `ref`: Refers to the `Comment` model in Mongoose.

### Plugins

### 1. `mongoose-unique-validator`

- **Description:** Plugin for Mongoose that adds pre-save validation for unique fields, used here for `slug` field.

### Middleware

### `pre('save')`

- **Description:** Middleware that runs before saving an article document.
- **Functionality:** Generates a unique slug based on the `title` using `slugify`.

### Methods

### `toArticleResponse(user)`

- **Description:** Method to format article data into a response object.
- **Parameters:**
    - `user`: Logged-in user object for determining favorite status.
- **Returns:** Formatted article data including author details formatted via `toProfileJSON`.

### `addComment(commentId)`

- **Description:** Method to add a comment reference to the article's `comments` array.
- **Parameters:**
    - `commentId`: ObjectId of the comment to add.
- **Returns:** Promise resolving to the saved article document.

### `removeComment(commentId)`

- **Description:** Method to remove a comment reference from the article's `comments` array.
- **Parameters:**
    - `commentId`: ObjectId of the comment to remove.
- **Returns:** Promise resolving to the saved article document.

### 

## User Schema

### Overview

The `userSchema` defines the structure of MongoDB documents for users using Mongoose, providing a blueprint for storing and querying user information in your application.

### Fields

### 1. `username`

- **Type:** String
- **Description:** User's username.
- **Attributes:**
    - `required`: Field must be provided for document creation.
    - `unique`: Username must be unique across documents.
    - `lowercase`: Converts the username to lowercase.

### 2. `password`

- **Type:** String
- **Description:** User's password.
- **Attributes:**
    - `required`: Field must be provided for document creation.

### 3. `email`

- **Type:** String
- **Description:** User's email address.
- **Attributes:**
    - `required`: Field must be provided for document creation.
    - `unique`: Email must be unique across documents.
    - `lowercase`: Converts the email address to lowercase.
    - `match`: Validates that the email format is correct (`/\S+@\S+\.\S+/`).
    - `index`: Optimizes query performance by creating an index.

### Methods

### `generateAccessToken()`

- **Description:** Method to generate a JWT access token for authentication.
- **Returns:** Access token signed with `ACCESS_TOKEN_SECRET` and containing user ID, email, and password (payload).
- **Expiration:** Token expires in 1 day (`"1d"`).

### `toUserResponse()`

- **Description:** Method to format user data into a response object.
- **Returns:** Object containing username, email, and JWT access token (`token`) generated using `generateAccessToken()`.

### `toProfileJSON(user)`

- **Description:** Method to format user data for a user profile response.
- **Parameters:**
    - `user`: Logged-in user object (not used in the current implementation).
- **Returns:** Object containing username, bio (if available), image (if available), and following count.

## Comment Schema

### Overview

The `commentSchema` defines the structure of MongoDB documents for comments using Mongoose, providing a blueprint for storing and querying comments in relation to articles and users in your application.

### Fields

### 1. `body`

- **Type:** String
- **Description:** Content or text of the comment.
- **Attributes:**
    - `required`: Field must be provided for document creation.

### 2. `author`

- **Type:** ObjectId
- **Description:** Reference to the `User` who authored the comment.
- **Attributes:**
    - `ref`: Refers to the `User` model in Mongoose.

### 3. `article`

- **Type:** ObjectId
- **Description:** Reference to the `Article` to which the comment belongs.
- **Attributes:**
    - `ref`: Refers to the `Article` model in Mongoose.

### Methods

### `toCommentResponse(user)`

- **Description:** Method to format comment data into a response object.
- **Parameters:**
    - `user`: Logged-in user object for determining author details.
- **Returns:** Object containing comment ID, body, timestamps (`createdAt`, `updatedAt`), and formatted author details using `toProfileJSON()` method of the `User` model.

###
