# 🎓 Promotional Website for Software Training Center  
### 📘 Final Year Project – Year 3 | Semester 5

A **full-stack MERN application** developed as my **Final Year Project (Semester 5, Year 3 – BSc Information Systems)**.  
The project is designed to promote a software training center and efficiently manage **courses, users, enrollments, and payments**.

The platform delivers a **modern, fully responsive user interface** and a **secure, role-based admin dashboard** for complete system control.

---

## 🌐 Project Overview

This web application enables users to:
- Explore the software training center
- View courses and services
- Enroll in courses
- Make payments (QR / Cash)
- Manage their profile and enrolled courses

Admins can:
- Manage users
- Manage courses
- View enrolled students
- Control the entire system securely

---

## ✨ Key Features

### 👤 User Module
- Home, About, Services, Courses & Contact pages
- Secure Login & Registration using JWT
- Course enrollment workflow
- Payment options:
  - GPay (QR Code)
  - Cash
- User dashboard
- Profile management
- View enrolled courses

### 🛠️ Admin Module
- Dedicated Admin Dashboard
- Manage users
- Add, update, and delete courses
- View enrolled courses
- Secure role-based access control

### 📧 Email Integration
- Automated enrollment confirmation emails using **Nodemailer**

---

## 🖼️ Screenshots

### 🏠 Home Page
![Home](https://github.com/user-attachments/assets/f976674d-6040-421f-8097-e92ebff2e3d7)

### 📚 Courses Page
![Courses](https://github.com/user-attachments/assets/6eebd979-93d5-43a1-9702-cc1786ad9e01)

### 🛍️ Products & Services
![Services](https://github.com/user-attachments/assets/e46e3614-b385-4e27-bcb4-0fe6e5ea7f3f)

### 📞 Contact Page
![Contact](https://github.com/user-attachments/assets/df91aba6-4d48-4098-8205-901e6d6ae6e3)

---

## 🎓 Course Enrollment Flow

### Select Course
![Select Course](https://github.com/user-attachments/assets/048eb9ab-9dc7-4cfc-912f-d375d05fc1cf)

### Checkout
![Checkout](https://github.com/user-attachments/assets/00fbc3f4-c90a-4482-9201-64d4612a0e73)

### Payment – GPay (QR Code)
![GPay](https://github.com/user-attachments/assets/a18a3084-1ea8-418e-803f-8d9338be090f)

### Payment – Cash
![Cash](https://github.com/user-attachments/assets/0d1af985-e7c5-4f32-a1ae-5bbb46c3dbb4)

---

## 🔐 Authentication Module

### Login
![Login](https://github.com/user-attachments/assets/8b6f6b8a-4901-4b8e-bf34-748e47c22ba9)

### Register
![Register](https://github.com/user-attachments/assets/6de6f883-150c-4cbb-9e6a-4a9a797e8b06)

### Manage Account
![Manage Account](https://github.com/user-attachments/assets/bdcddd39-621c-4d22-b020-d5d70afe39f2)

### Edit Profile
![Edit Profile](https://github.com/user-attachments/assets/d162d186-41c7-4e00-b5ee-868c51a26edd)

### Enrolled Courses
![Enrolled Courses](https://github.com/user-attachments/assets/c05e1e63-bf98-4cb5-9789-197e4fbe458a)

---

## 🛠️ Admin Panel

### Admin Dashboard
![Admin Dashboard](https://github.com/user-attachments/assets/b5901d1d-d135-4c5b-8e9f-a36300d615d2)

### Manage Users
![Manage Users](https://github.com/user-attachments/assets/e91576b9-fd4b-411e-a04b-92450306edf5)

### Manage Courses
![Manage Courses](https://github.com/user-attachments/assets/6d58d5cc-290b-40f0-b1ea-acf3e0778587)

### Enrolled Courses (Admin View)
![Admin Enrollments](https://github.com/user-attachments/assets/95641b4d-9aff-43d0-b0e7-484af7c1d9dd)

---

## 🧑‍💻 Tech Stack

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Responsive Web Design

### Backend
- Node.js
- Express.js
- JWT Authentication

### Database
- MongoDB
- MongoDB Atlas (Cloud)

### Cloud & Services
- MongoDB Atlas
- Nodemailer (Email Service)

---

## ⚙️ Environment Configuration

### 📁 Server `.env`

```env
PORT=8080
MONGO_URI=mongodb://localhost:27017/promotional-website
JWT_SECRET=zerotwo
EMAIL=coursebookinmanager@gmail.com
EMAIL_PASSWORD=your_app_password
````

> ⚠️ **Important:** Never commit `.env` files to GitHub.

### 📁 Client

* No `.env` required

---

## 📁 Project Structure

```
Final_year_project_1/
 ├── promotional-website-client/
 ├── promotional-website-server/
 ├── README.md
```

---

## 🎯 Future Enhancements

* Online payment gateway integration
* Course progress tracking
* Certificate generation
* Admin analytics dashboard
* Cloud deployment (AWS / Vercel)

---

## 👤 Author

**Pavish K**
BSc Information Systems
**Final Year Project – Year 3, Semester 5**
GitHub: [https://github.com/PavishK](https://github.com/PavishK)

---

## ⭐ Support

If you found this project useful, please **star ⭐ the repository**!

---

> *Built as a Final Year MERN Stack Project with Cloud Technologies 🚀*
