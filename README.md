# Book test task

This is a React test task project for a book management application. The application allows two types of users: end-users and admin-users.

## Features

### Admin-User

- Create, edit, and delete books.

### End-User

- View books.

## Potential Enhancements

- **Category Management:** Add functionality for managing categories of books.
- **Book Filtering:** Implement options for users to filter books based on various criteria such as genre, author, etc.
- **User Authentication:** Introduce user authentication to secure admin-user functionalities.
- **Rating and Reviews:** Enable users to rate and review books.

## Usage

Users can switch between different user views using a switch located in the top-right corner of the application. The application remembers the mode using local storage.

## Tech Stack

- React
- TypeScript
- Axios
- Ant Design
- Zustand (Alternative: Redux, useContext)

## Backend

The application has both front-end and back-end components. For storing data, [crudcrud.com](https://crudcrud.com) was utilized. However, Firestore might be a preferable choice for future projects due to this initial experience.

## Responsiveness

The application is fully responsive mainly due to the utilization of Ant Design components.

## Installation

1. Clone the repository.
2. Navigate to the `book-test-task-project/book-test-task` and run `npm i`.
3. Navigate to the `book-test-task-project/server` and run `npm i`.

## Start

1. Navigate to the `book-test-task-project/book-test-task` and run `npm run dev`.
2. Navigate to the `book-test-task-project/server` and run `node index.js`.
