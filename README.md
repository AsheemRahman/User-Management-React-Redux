# User Management React Redux

A user management application built using React and Redux to demonstrate the process of handling user data, authentication, and state management in a modern React app. This project covers the use of Redux for managing application state, handling user actions, and integrating with APIs for user management functionalities such as registration, login, and user profile management.

## Features

- User Registration
- User Login
- User Profile Management
- User have upload option for profile image
- State Management with Redux
- JWT Authentication and Authorization
- Responsive Design
- Admin Login
- Admin can view and perform search on user data
- Admin can create, delete and edit user data


## Tech Stack

- **Frontend**: React.js, Redux, React Router, Axios
- **State Management**: Redux (with Redux Toolkit)
- **Styling**: Tailwind
- **Authentication**: JWT (JSON Web Token)

## API Integration
This project uses fetch to make requests to a backend API for handling user data. The API endpoints for user management include:

### User
- POST /api/auth/signup - Register a new User
- POST /api/auth/signin - Log in a User
- POST /api/auth/google - Login using Google auth
- POST /api/user/update/:id - Update User information
- DELETE /api/user/delete/:id - Delete User
- POST /api/auth/signout - Signout from user


### Admin

- POST /api/admin/login - Login in to admin
- GET /api/admin/getuser  - Get User list
- POST /api/admin/adduser  - Add new User
- POST /api/admin/edituser/:id  - Edit User
- POST /api/admin/deleteuser/:id  - Delect User
- POST /api/admin/signout  - SignOut from admin

## Prerequisites

Before running the project, ensure that you have the following installed:

- Node.js (version 14 or later)
- npm (version 6 or later) or Yarn

## Getting Started

### Clone the Repository
    git clone https://github.com/your-username/User-Management-React-Redux.git
    cd User-Management-React-Redux
### Install Dependencies
    npm install
### Run the BackEnd
    npm start
### Run the FrontEnd
    cd client
    npm run dev

### Project will run 
    FrontEnd : http://localhost:5173/
    BackEnd : http://localhost:3000

## Contributing
Contributions to this project are welcome! If you find a bug or have an idea for a new feature, feel free to open an issue or submit a pull request.

### Steps to Contribute:
  1. Fork the repository.
  2. Create a new branch (git checkout -b feature-name).
  3. Make your changes.
  4. Commit your changes (git commit -am 'Add new feature').
  5. Push to your branch (git push origin feature-name).
  6. Create a new pull request.
