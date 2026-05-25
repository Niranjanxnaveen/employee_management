Employee Management System

A full-stack Employee Login Management System built using React, Spring Boot, and MySQL.

This project allows employees to:

Register new accounts
Login securely
Access a personalized home dashboard
Store employee details in a MySQL database
Tech Stack
Frontend
React.js
React Router DOM
CSS3
Vite
Backend
Spring Boot
Java
Spring Data JPA
REST APIs
Database
MySQL
Project Structure
Employee-Management-System
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── ...
│
└── backend
    ├── src/main/java
    ├── src/main/resources
    ├── pom.xml
    └── ...
Features
Employee Registration
Employee Login Authentication
Backend API Integration
MySQL Database Storage
Responsive UI
Dynamic User Greeting
Logout Functionality
API Endpoints
Register Employee
POST /api/auth/register
Request Body
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
Login Employee
POST /api/auth/login
Request Body
{
  "email": "john@example.com",
  "password": "123456"
}
Database Configuration

Update:

src/main/resources/application.properties

with your MySQL credentials:

spring.datasource.url=jdbc:mysql://localhost:3306/employee_db
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
Installation & Setup
1. Clone Repository
git clone https://github.com/your-username/Employee-Management-System.git
2. Backend Setup

Open backend folder in Spring Tool Suite / Eclipse.

Run:

DemoApplication.java

Backend runs on:

http://localhost:8080
3. Frontend Setup

Open frontend folder in terminal.

Install dependencies:

npm install

Run frontend:

npm run dev

Frontend runs on:

http://localhost:5173
MySQL Setup

Create database:

CREATE DATABASE employee_db;
Screenshots

Add your project screenshots here.

Example:

screenshots/login-page.png
screenshots/home-page.png
Future Improvements
JWT Authentication
Spring Security
Password Encryption
Employee Dashboard
Admin Panel
Session Management
