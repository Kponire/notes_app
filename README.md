# NoteMaster - A Full-Stack Notes Management Application

**NoteMaster** is a modern, cloud-based notes management application designed to offer users a structured, feature-rich platform for organizing their notes into categories such as reminders, archive, trash, and pinned notes. The application emphasizes simplicity, ease of use, security, and scalability, making it a robust solution for note-taking needs. 

With **NoteMaster**, users can create, update, delete, categorize, search, and format their notes efficiently, while enjoying an intuitive user interface. The application is fully responsive, secure, and built with modern web technologies.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Architecture](#project-architecture)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Step-by-Step Installation](#step-by-step-installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
  - [Notes Dashboard](#notes-dashboard)
  - [Categories](#categories)
  - [Search and Filter](#search-and-filter)
  - [Rich Text Editor](#rich-text-editor)
- [Frontend Components](#frontend-components)
- [Backend API Documentation](#backend-api-documentation)
  - [Authentication](#authentication)
  - [Notes Management](#notes-management)
  - [Categories](#categories)
- [Security](#security)
  - [JWT Authentication](#jwt-authentication)
  - [Password Hashing](#password-hashing)
- [Database Schema](#database-schema)
- [Folder Structure](#folder-structure)
- [Development Workflow](#development-workflow)
- [Challenges and Solutions](#challenges-and-solutions)
- [Performance Optimizations](#performance-optimizations)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Screenshots and Demos](#screenshots-and-demos)

---

## About the Project

**NoteMaster** is designed as a sophisticated, feature-packed notes application that empowers users to maintain and organize their notes effectively. The app is structured with a focus on security, ease of use, and scalability. 

The project began as a full-stack capstone project but has evolved into a professional-grade solution with both server-side and client-side functionalities integrated in a clean and intuitive manner. Whether users are taking simple notes or creating detailed to-do lists with reminders, **NoteMaster** offers a seamless experience.

It also focuses on a responsive UI that adapts to various device sizes, ensuring a consistent user experience across mobile, tablet, and desktop devices.

---

## Features

### Core Features

1. **User Authentication**:
   - Secure signup, login, and logout functionality using JWT (JSON Web Tokens) to keep sessions secure.
   - Email verification and password recovery options.
   - Protected routes that ensure only authenticated users can access their notes.

2. **CRUD Operations for Notes**:
   - **Create**: Users can add new notes with formatted content.
   - **Read**: View notes with detailed formatting.
   - **Update**: Edit notes and change their content or category.
   - **Delete**: Move notes to the trash or permanently delete them.

3. **Categorization of Notes**:
   - **Reminders**: Set reminders for important notes.
   - **Archived**: Move completed or inactive notes to the archive.
   - **Trash**: Soft delete notes, recoverable until permanently removed.
   - **Pinned Notes**: Pin essential notes at the top for quick access.

4. **Rich Text Editor**:
   - Powered by **Tiptap** with capabilities like bold, italic, underline, lists, and headings.
   - **Markdown Support**: Users can write and format notes using markdown syntax.

5. **Search Functionality**:
   - Quickly search notes based on titles or content.
   - Filter notes by categories (reminder, archived, trash, etc.).

6. **Responsive Design**:
   - Fully responsive across mobile, tablet, and desktop devices.
   - **Mantine UI** components ensure a consistent and professional design across the app.

7. **Security**:
   - Strong password encryption using **bcrypt**.
   - JWT-based session management.
   - Email verification and password recovery options.
   - Built-in XSS and CSRF protection through Express.js middleware.

8. **Performance**:
   - Fast, server-side rendering using **Next.js**.
   - Optimized database queries for efficient CRUD operations.
   - Modular and reusable components for a scalable frontend.

9. **User Profiles**:
   - Display user information (name, email) with options to update profile details.
   - Option to log out directly from the sidebar for security.

---

## Technology Stack

### Frontend
- **[Next.js](https://nextjs.org/)** (v14.2.12): React-based framework for server-side rendering, static generation, and improved SEO.
- **[Mantine UI](https://mantine.dev/)**: Modern and responsive UI components library.
- **CSS Modules**: Scoped and modular CSS for styling components.
- **React Icons**: For elegant and uniform iconography.
- **Tiptap Editor**: Powerful and flexible text editor with rich formatting options.

### Backend
- **[Node.js](https://nodejs.org/)**: JavaScript runtime for backend logic and APIs.
- **[Express.js](https://expressjs.com/)**: Minimalistic web framework for handling API routes and middleware.
- **[MySQL](https://www.mysql.com/)**: Relational database for storing users, notes, and categories.
- **JWT (JSON Web Tokens)**: For secure user authentication and session management.
- **Nodemailer**: To handle email functionality like password recovery.

---

## Project Architecture

The architecture of NoteMaster is based on a **Model-View-Controller (MVC)** pattern. This structure separates the application into three core components:

1. **Model (Data Layer)**: Handles database interactions using MySQL. The models define the structure of users, notes, and categories.
2. **Controller (Business Logic)**: Implements the business logic, interacting between the frontend and the database. The controllers handle authentication, note management, and category organization.
3. **View (Frontend)**: Next.js powers the frontend, rendering the UI components and handling user interactions with the backend API via Axios.

---

## Installation

### Prerequisites

Before setting up **NoteMaster**, ensure you have the following software installed on your system:

- **Node.js** (v18.x or higher)
- **MySQL** (v8.x or higher)
- **Git** (for version control)
- **NPM** (Node Package Manager) or **Yarn**

### Step-by-Step Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Kponire/notes_app.git
   cd notes_app
   ```

2. **Frontend & Backend Installation**:
   Inside the notes_app folder, install dependencies:
   ```bash
   npm install
   ```

3. **MySQL Setup**:
   Set up a MySQL database using the provided SQL schema or manually create one with the following structure:
   ```sql
   CREATE DATABASE notesapp;
   USE notesapp;
   ```

### Environment Variables

In the `notes_app` folder, create a `.env` file with the following variables:

```bash
# Server Configuration
PORT=5000
JWT_SECRET=your_jwt_secret_key

# MySQL Database Configuration
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=notesapp

# Email (Nodemailer) Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_email_password
```

### Running the Application

1. **Start the Backend**:
   ```bash
   npm run backend-dev
   ```

2. **Start the Frontend**:
   Open another terminal and navigate to the `note_app` folder:
   ```bash
   npm run dev
   ```

3. **Start both the Frontend and Backend**:
   Open another terminal and navigate to the `note_app` folder:
   ```bash
   npm run start-all
   ```   

4. **Access the Application**:
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

### Notes Dashboard

Once logged in, users will be directed to the main dashboard, which displays all their notes organized by creation date. Each note can be interacted with using various actions like edit, delete, or categorize.

### Categories

Users can organize their notes into the following categories:
- **Reminders**: Notes with time-sensitive information.
- **Archived**: For completed or inactive notes.
- **Trash**: Temporarily deleted notes that can be recovered or permanently deleted.

### Search and Filter

Users can quickly search notes by title or content using the search bar located at the top of the dashboard. The search function updates in real-time as users type, filtering notes dynamically.

### Rich Text Editor

**NoteMaster** features a rich text editor powered by Tiptap that allows users to:
- Format text (bold, italic, underline, etc.)
- Create bullet and numbered lists
- Add headings and subheadings
- Write in Markdown (which is auto-converted to formatted text)

---

## Frontend Components

Key frontend components include:
- **NotesPage**: The main component that displays the notes dashboard.
- **Sidebar**: Navigation bar for categories and user actions.
- **NoteCard**: Displays individual notes with options for editing, deleting, and pinning.
- **RichTextEditor**: Implements the Tiptap editor for creating and editing notes.
  
---

## Backend API Documentation

### Authentication

| Route                         | Method | Description                                     |
|-------------------------------|--------|-------------------------------------------------|
| `/api/auth/register`          | POST   | Registers a new user                            |
| `/api/auth/login`             | POST   | Authenticates a user                            |
| `/api/auth/forgotPassword`    | POST   | Sends a reset link via registered email         |
| `/api/auth/resetPassword`     | POST   | Resets a user password                          |

### Notes Management

| Route                  | Method | Description                      |
|------------------------|--------|----------------------------------|
| `/api/notes`           | GET    | Fetches all notes                |
| `/api/notes/:id`       | GET    | Fetches a specific note by ID    |
| `/api/notes`           | POST   | Creates a new note               |
| `/api/notes/:id`       | PUT    | Updates a note by ID             |
| `/api/notes/:id`       | DELETE | Moves a note to the trash        |

### Categories

| Route                        | Method | Description                          |
|------------------------------|--------|--------------------------------------|
| `/api/categories`             | GET    | Fetches all available categories    |
| `/api/categories`             | POST   | Creates a new category              |
| `/api/categories/:id`         | PUT    | Updates an existing category by ID  |
| `/api/categories/:id`         | DELETE | Deletes a category                  |

---

## Security

### JWT Authentication

**NoteMaster** uses **JWT** tokens to authenticate users. When a user logs in, a token is generated and sent to the client. This token must be included in the headers of subsequent requests to access protected routes.

### Password Hashing

Passwords are hashed using **bcrypt** before storing them in the database to ensure security in case of a database breach.

---

## Database Schema

The database schema uses MySQL as the relational database. Tables include:

- **Users**: Stores user details, including hashed passwords.
- **Notes**: Stores the content of notes, along with metadata such as category, creation date, and update date.
- **Categories**: Stores user-defined categories like reminders, archive, and trash.

```sql
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expires` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `notes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `background_color` varchar(20) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `pinned` tinyint(1) DEFAULT '0',
  `archived` tinyint(1) DEFAULT '0',
  `reminder` datetime DEFAULT NULL,
  `trash` tinyint(1) DEFAULT '0',
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `notes_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `fk_user_id` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
```

---

## Folder Structure

Here's an overview of the project folder structure:

```
/notemaster
│
├── /backend          # Backend code for Express.js API
│   ├── /controllers  # Contains all controller logic
│   ├── /models       # MySQL tables
│   ├── /routes       # API routes for authentication, notes, and categories
│   └── /middleware   # For authentication and authorization validation
│
├── /frontend         # Frontend Next.js code
│   ├── /components   # Reusable React components
│   ├── /app          # Next.js page components for routing
│   ├── /styles       # CSS Module styles
│   └── /public       # Static files and images
│
└── /database         # SQL schema and seed files
```

---

## Development Workflow

1. **Feature Development**:
   - New features are developed in separate branches.
   - Each branch is thoroughly tested before merging with the `main` branch.

2. **Code Review**:
   - All code is reviewed by at least one other team member to ensure quality and security.
   
3. **Testing**:
   - Unit and integration tests are written for both frontend and backend components.
   
---

## Challenges and Solutions

### Challenge 1: Optimizing Note Search and Filter

Since the application could store thousands of notes, searching and filtering through them efficiently was a challenge. This was solved by implementing indexed MySQL queries and client-side caching using React's useMemo to optimize the search process.

### Challenge 2: Rich Text Formatting

Implementing a user-friendly, feature-rich text editor that supports markdown was difficult. **Tiptap** was integrated to provide an out-of-the-box solution while allowing easy customization.

### Challenge 3: JWT Management

Managing JWT sessions and ensuring that they expire correctly without causing issues for logged-in users was handled by setting HTTP-only cookies and checking the token expiry on every backend request.

---

## Performance Optimizations

1. **Server-Side Rendering (SSR)**: By leveraging Next.js's SSR capabilities, we optimize the initial load time and improve SEO.
2. **MySQL Query Optimization**: Indexed queries and careful query construction ensure that notes are fetched quickly, even as the number of records increases.
3. **Minified and Bundled CSS/JS**: CSS Modules and Webpack are used to minify and bundle frontend assets for faster page loads.

---

## Future Enhancements

1. **Dark Mode**: Integrate a dark mode toggle for improved user experience, especially for users working at night.
2. **Collaborative Notes**: Allow multiple users to collaborate on notes in real-time.
3. **Note Sharing**: Add the ability to share notes via a public URL or invite others to view/edit a note.
4. **Push Notifications**: Implement push notifications for reminders and other time-sensitive notes.

---

## Contributing

We welcome contributions from the community! Please follow the steps below to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

All contributions must adhere to our code of conduct and be thoroughly tested before merging.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Screenshots and Demos

![Dashboard Screenshot](https://drive.google.com/uc?export=view&id=1lDBZhXlf4ujMwSqgeu_WOad90A26f7na)
*Main dashboard of the NoteMaster application.*

![Editor Screenshot](https://drive.google.com/uc?export=view&id=1i_NLxw8EWtF6gXxQrUamj7W4_FlOUy-1)
*Rich Text Editor with formatting options.*