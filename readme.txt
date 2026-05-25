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
Backend API Endpoints
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
MySQL Database Configuration

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
2. Backend Setup (Spring Boot)

Open backend folder in:

Spring Tool Suite
Eclipse

Run:

DemoApplication.java

Backend server runs on:

http://localhost:8080
3. Frontend Setup (React)

Open frontend folder in terminal.

Install dependencies:

npm install

Run frontend:

npm run dev

Frontend runs on:

http://localhost:5173
MySQL Setup

Create database manually:

CREATE DATABASE employee_db;

Spring Boot automatically creates the employees table using JPA.

Testing Backend Using Postman

Backend APIs can be tested independently using Postman before connecting the frontend.

Register API Test
Method
POST
URL
http://localhost:8080/api/auth/register
Body → raw → JSON
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
Expected Response
Employee Registered Successfully!
Login API Test
Method
POST
URL
http://localhost:8080/api/auth/login
Body → raw → JSON
{
  "email": "john@example.com",
  "password": "123456"
}
Expected Response
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
Running Frontend Without Spring Boot

The frontend UI can run independently without starting the Spring Boot backend.

Run Frontend Only
npm run dev

This launches the React application locally.

Important Note

Without Spring Boot running:

Login will NOT authenticate users
Signup data will NOT be stored
Backend APIs will fail
MySQL will not be accessed directly from React

The frontend will only display the UI components.

Why React Cannot Connect Directly to MySQL

React runs in the browser and cannot securely connect directly to MySQL.

Correct architecture:

React Frontend
      ↓
Spring Boot Backend API
      ↓
MySQL Database

Spring Boot acts as the secure middle layer between frontend and database.

Screenshots

Add project screenshots here.

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
