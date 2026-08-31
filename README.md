📚 Library Seat & Resource Reservation System

A web-based Library Seat & Resource Reservation System designed to make library access simple, smart, and student-friendly.
✨ Features
🔐 User registration and login
🏠 Dashboard
📚 Browse library resources
🪑 Seat and resource reservations
⏳ Queue management
🕘 Reservation history with status filtering
🔔 Notifications with unread count
👤 User profile and logout
❓ Help & Support
ℹ️ About Us
📱 Responsive user interface
💾 Browser localStorage for frontend user/session data
🛠️ Technologies Used
Technology
Purpose
HTML5
Website structure
CSS3
Styling and responsive design
JavaScript
Application logic and interactions
LocalStorage
Frontend data/session storage
Visual Studio Code
Development
Live Server
Local testing

📁 Project Structure

Library-Seat-Resource-Reservation/
│
├── frontend/
│   ├── index.htm
│   ├── login.htm
│   ├── register.htm
│   ├── dashboard.htm
│   ├── resources.htm
│   ├── reservations.htm
│   ├── queue.htm
│   ├── history.htm
│   ├── notifications.htm
│   ├── profile.htm
│   ├── about.htm
│   └── help.htm
│
├── css/
│   ├── style.css
│   ├── auth.css
│   ├── history.css
│   └── notifications.css
│
├── js/
│   ├── auth.js
│   ├── history.js
│   └── notifications.js
│
└── README.md
Adjust the structure above if your final GitHub folders or filenames are different.

🚀 How to Run
1. Clone the repository
git clone YOUR_GITHUB_REPOSITORY_URL
2. Open the project
Open the project folder in Visual Studio Code.
3. Run the website
Install/use the Live Server extension in VS Code and open:
index.htm

🔐 Authentication

The current frontend authentication system uses browser localStorage.
Registered users are stored under:
localStorage → users
The currently logged-in user is stored under:
localStorage → currentUser
A student account contains information such as:
{
    id: Date.now(),
    name: "Student Name",
    email: "student@example.com",
    studentId: "Student ID",
    password: "Password",
    role: "student"
}

⚠️ Security Note
This project currently uses frontend localStorage for demonstration purposes. Passwords should not be stored this way in a production application.
A production version should use:
Secure backend authentication
Password hashing
Database storage
Session/token management
Proper authorization
Server-side validation

🎨 User Interface
The project follows a clean and modern library-oriented design with:
Purple primary accent
Light background
Card-based layouts
Sidebar navigation
Notification badges
Responsive layouts
Interactive filters and buttons
User profile sectioN

📱 Responsive Design
The interface is designed to work across:
Desktop
Laptop
Tablet
Mobile
CSS media queries adjust spacing, typography, cards, buttons, and layouts according to screen size.

💾 Current Data Storage
The frontend currently uses localStorage for client-side information such as:
Registered users
Current logged-in user
Session information
Reservation-related data
Clearing browser storage will remove the locally stored data.

🔮 Future Improvements
Backend and REST API integration
MySQL or MongoDB database
Secure authentication and password hashing
Admin dashboard
Real-time seat availability
Real-time notifications
Email notifications
Google OAuth
Reservation cancellation
Advanced resource search and filtering
Admin resource managemen.
Production deployment

🎯 Project Objective
The main objective is to provide a centralized platform where students can easily:
Log in to their account.
Browse available library resources.
Reserve seats or resources.
Join queues when resources are unavailable.
Manage reservations.
View reservation history.
Receive important notifications.

📌 Project Status
Status: In Development
The current version focuses on the frontend interface, authentication flow, navigation, reservation-related pages, queue management, history, notifications, profile, and responsive UI.
📄 License
This project is created for educational/project purposes.

Made with ❤️ for a smarter library experience
