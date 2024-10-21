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
   git clone https://github.com/yourusername/notemaster.git
   cd notemaster
   ```

2. **Frontend Installation**:
   Navigate to the frontend folder and install dependencies:
   ```bash
   npm install
   ```

3. **Backend Installation**:
   Navigate to the backend folder and install dependencies:
   ```bash
   cd /backend
   npm install
   ```

4. **MySQL Setup**:
   Set up a MySQL database using the provided SQL schema or manually create one with the following structure:
   ```sql
   CREATE DATABASE notesapp;
   USE notesapp;
   ```

### Environment Variables

In the `backend` folder, create a `.env` file with the following variables:

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
   cd backend
   npm start
   ```

2. **Start the Frontend**:
   Open another terminal and navigate to the `frontend` folder:
   ```bash
   npm run dev
   ```

3. **Access the Application**:
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

| Route                | Method | Description              |
|----------------------|--------|--------------------------|
| `/api/auth/register` | POST   | Registers a new user      |
| `/api/auth/login`    | POST   | Authenticates a user      |
| `/api/auth/logout`   | POST   | Logs out a user           |

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
CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(255),
  content TEXT,
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);
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
│   └── /utils        # Utility functions like JWT and password hashing
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

![Dashboard Screenshot](https://via.placeholder.com/1024x768?text=Dashboard)
*Main dashboard of the NoteMaster application.*

![Editor Screenshot](https://via.placeholder.com/1024x768?text=Editor)
*Rich Text Editor with formatting options.*

![Mobile View](https://via.placeholder.com/500x800?text=Mobile+View)
*Mobile-friendly design.*