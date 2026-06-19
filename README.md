# 🎓 VidyaMitra – Career Guidance Platform

VidyaMitra is a MERN Stack based Career Guidance Platform designed to help students make informed academic and career decisions. The platform provides career guidance, learning roadmaps, college information, quizzes, and personalized recommendations through a modern and user-friendly interface.

## 🚀 Features

### 👤 User Authentication
- Student Registration
- Student Login
- Secure Authentication
- User Profile Management

### 🎯 Career Guidance
- Explore various career options
- Career descriptions and opportunities
- Skill requirements for different careers

### 🗺️ Roadmaps
- Structured learning paths
- Step-by-step career roadmaps
- Technology and skill progression guides

### 🏫 College Module
- Search colleges by district
- Search colleges by college name
- View college details
- College contact information and websites

### 📝 Career Quiz
- Interactive aptitude and interest quizzes
- Career assessment
- Personalized suggestions

### 🤖 Recommendations
- Career recommendations based on quiz performance
- Personalized guidance for students

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Bootstrap / Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Tools
- Git
- GitHub
- VS Code

---

## 📂 Project Structure

```text
VidyaMitra
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── data
│   ├── middleware
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/VidyaMitra.git
cd VidyaMitra
```

### Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run Backend

```bash
npm start
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🗄️ Database Collections

### Users

```json
{
  "name": "",
  "email": "",
  "password": ""
}
```

### Colleges

```json
{
  "collegeName": "",
  "address": "",
  "district": "",
  "type": "",
  "office": "",
  "phoneNumber": "",
  "website": ""
}
```

### Careers

```json
{
  "title": "",
  "description": "",
  "skillsRequired": []
}
```

### Roadmaps

```json
{
  "career": "",
  "steps": []
}
```

---

## 🎯 Problem Statement

Many students face difficulties in choosing the right career path due to a lack of proper guidance, awareness about opportunities, and information about colleges. VidyaMitra aims to bridge this gap by providing career guidance, educational roadmaps, college information, quizzes, and personalized recommendations on a single platform.

---

## 🌟 Future Enhancements

- AI-Based Career Recommendation System
- Chatbot Assistance
- Scholarship Information
- Placement Insights
- College Comparison Feature
- Resume Builder

---

## 👥 Team Members

- B.Lohith 
- M.Sravanthi 
- Y.Sindhu 
- V.Purna Chary 

---

## 📜 License

This project is developed for academic and educational purposes.
