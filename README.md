# TeamSync - Employee & Task Management System

A full-stack application for managing employees and assigning tasks, built for the **Full-Stack Development Track (Track 3)**.

## 🚀 Features
* **Employee Management:** Create and view staff members.
* **Task Management:** Create tasks and assign them to specific employees.
* **Real-time Integration:** The task assignment dropdown dynamically fetches available employees from the database.
* **Dark Mode UI:** A modern, responsive interface with Cyberpunk/Neon aesthetics.
* **RESTful API:** Structured backend with separate routes and controllers.

## 🛠️ Tech Stack
* **Frontend:** React (Vite), Tailwind CSS, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Architecture:** MVC (Model-View-Controller)

## 🔒 Security & Bonus Features
* **Authentication:** Full Login/Register system using JWT (JSON Web Tokens) and Bcrypt.
* **Protected Routes:** The Dashboard is hidden until the user logs in.
* **Data Privacy:** Passwords are hashed before being stored in the database.

## 📝 Assumptions
* **Deployment:** Designed for local execution as per the submission guidelines.

## ⚙️ Setup & Installation

### 1. Backend Setup
```bash
cd server
npm install
# Create a .env file with: MONGO_URI=your_mongodb_connection_string
npm start


### 2. Frontend Setup
cd client
npm install
npm run dev

## 🎥 Demo Video
[Click here to watch the project walkthrough](https://drive.google.com/file/d/1WUNehDz087TkFT4QnGoTQI3hVlWUYPMC/view?usp=sharing)
