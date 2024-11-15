# Face Recognition Mind API 🤖

Face Recognition Mind API is a backend Node.js application built with Express. It serves as the server for a React-based [frontend application face-recognition-mind](https://github.com/fran14cruz/face-recognition-mind), providing routes for user authentication, registration, and face recognition on images. The application utilizes [Clarifai's API](https://www.clarifai.com/) to perform face detection on user-provided images, drawing bounding boxes around detected faces.

---

## Features
- **User Authentication**: Sign in and register new users with hashed passwords for secure storage.
- **Face Recognition**: Detects faces in an image by submitting a URL, leveraging the Clarifai API.
- **Profile Management**: Retrieve user profiles by ID.
- **Database Integration**: Built to work with a PostgreSQL database for user and image data storage.

---

## Installation

### Prerequisites
- Node.js (v14+ recommended)
- PostgreSQL database
- Clarifai API key
- npm or yarn package manager

### Steps

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/face-recognition-mind-api.git
    cd face-recognition-mind-api
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Setup environment variables:**
    Create a `.env` file in the root directory with the following:
    ```
    DATABASE_URL=your_postgresql_connection_string
    CLARIFAI_API_KEY=your_clarifai_api_key
    ```

4. **Run the application:**
    ```bash
    npm start
    ```

5. **Test the API:**
    The server runs by default on [http://localhost:3000](http://localhost:3000).

---

## API Endpoints

### Base URL: `/`

- **GET `/`**
  - Returns a basic message to confirm the server is working.
  - Example response:
    ```json
    { "message": "this works" }
    ```

### Authentication

- **POST `/signin`**
  - Validates user credentials and returns user data upon success.
  - **Request body**:
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
  - **Response**:
    ```json
    {
      "id": "1",
      "name": "John",
      "email": "user@example.com",
      "entries": 0,
      "joined": "2024-01-01T00:00:00.000Z"
    }
    ```

- **POST `/register`**
  - Registers a new user with hashed password storage.
  - **Request body**:
    ```json
    {
      "name": "Jane",
      "email": "jane@example.com",
      "password": "password123"
    }
    ```

### Profile Management

- **GET `/profile/:id`**
  - Retrieves user profile by ID.
  - **Response**:
    ```json
    {
      "id": "1",
      "name": "Jane",
      "email": "jane@example.com",
      "entries": 3,
      "joined": "2024-01-01T00:00:00.000Z"
    }
    ```

### Face Recognition

- **POST `/imageurl`**
  - Handles requests to the Clarifai API for face detection.
  - **Request body**:
    ```json
    {
      "input": "https://example.com/image.jpg"
    }
    ```
  - **Response**:
    ```json
    {
      "regions": [ ... ]  // Clarifai's face bounding box data
    }
    ```

- **PUT `/image`**
  - Updates the user’s entry count upon successful face detection.
  - **Request body**:
    ```json
    {
      "id": "1"
    }
    ```
  - **Response**:
    ```json
    {
      "entries": 4
    }
    ```

---

## Technologies Used
- **Node.js**: Backend JavaScript runtime
- **Express.js**: Web framework for routing and middleware
- **PostgreSQL**: Relational database for data storage
- **Clarifai API**: For face recognition and bounding box data
- **bcrypt.js**: Secure password hashing
- **Knex.js**: SQL query builder
- **Cors & Body-Parser**: Middleware for cross-origin requests and JSON parsing

---

## Future Enhancements
- Add email verification for new users.
- Improve error handling and validation for API routes.
- Implement role-based authentication (e.g., admin, user).
- Optimize database queries and introduce caching.

---

## Contributing
Contributions are welcome! Feel free to fork the repo and submit pull requests for any improvements or new features.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---