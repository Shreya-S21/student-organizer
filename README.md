# 🎯 AI-Based Student Productivity & Routine Optimizer

An intelligent system that helps students optimize their daily routines, track productivity patterns, and achieve academic success through AI-powered recommendations.


                                                                                                                     
                                                                                                                    view demo video here


https://github.com/Shreya-S21/student-organizer/blob/main/freecompress-student_organizer.mp4


## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This AI-driven system is designed to help students maximize their productivity by:

- Tracking daily routines and activities
- Analyzing productive and non-productive periods
- Suggesting optimal times for studying, exercising, and sleeping
- Providing automated schedule recommendations
- Preventing schedule conflicts
- Monitoring progress through analytics dashboards

## ✨ Features

### 📝 Student Registration & Profile Setup
- Create student profiles with personalized goals
- Add exam dates, semester plans, and study targets
- Activity history linked to profile
- Duplicate entry prevention

### ✅ Task Management System
- Add tasks with name, duration, deadline, priority, and category
- Categories include: Study, Health, Personal, and more
- *Mandatory Rules:*
  - No task without deadline
  - High priority tasks are sorted automatically

### 📊 Routine Logging Module
Students can log:
- Wake-up & sleep timings
- Study hours
- Screen time
- Exercise sessions
- Breaks
- Class timings

### 🤖 AI-Based Time Recommendation Engine
The system analyzes past data to recommend:
- Most productive hours
- Best time to study
- Optimal break times
- Low focus periods to avoid tasks

*Example Recommendations:*
> "Your focus is highest between 7–9 PM. Add math practice here."
> "Avoid study between 3–4 PM due to low productivity."
> "Sleep earlier; performance drops on 6-hr sleep days."

*Prediction Logic Options:*
- Pattern-based scoring
- Rule-based AI
- Time-of-day productivity scoring
- Simple ML model (optional)

### 📅 Smart Scheduling
- Avoid overlapping tasks
- Recommend ideal time slots
- Enforce minimum rest periods between long tasks
- Auto-reschedule delayed tasks

### 📈 Analytics Dashboard
Visual graphs for:
- Daily/Weekly productivity
- High & low focus hours
- Completed vs pending tasks
- Sleep vs performance correlation
- Monthly progress chart

### 🔔 Notifications & Alerts
- "A free 1-hour slot available now — recommended study time."
- "High-priority task deadline in 4 hours."
- "Low sleep detected — avoid heavy tasks today."

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React / Next.js |
| Backend | Node.js / Laravel |
| Database | Firebase |
| Styling | Tailwind CSS |

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm 
- Firebase account

### Setup

1. *Clone the repository*
   bash
   git clone https://github.com/Shreya-S21/student-productivity-optimizer.git
   cd student-productivity-optimizer
   

2. *Install dependencies*
   bash
   # Frontend
   cd client
   npm install

   # Backend
   cd ../server
   npm install
   

3. *Configure environment variables*
   bash
   cp .env.example .env
   # Edit .env with your database credentials and API keys
   

4. *Run database migrations*
   bash
   npm run migrate
   

5. *Start the development server*
   bash
   # Backend
   npm run dev

   # Frontend (in a new terminal)
   cd client
   npm run dev
   

6. *Access the application*
   Open http://localhost:3000 in your browser

## 🚀 Usage

1. *Register/Login* - Create your student profile
2. *Set Goals* - Add your exam dates and study targets
3. *Log Routine* - Record your daily activities
4. *Get Recommendations* - Receive AI-powered suggestions
5. *Track Progress* - Monitor your productivity on the dashboard



## 📁 Project Structure


student-organizer/
├── index.html              # Login page
├── dashboard.html          # Main dashboard
├── profile.html            # User profile management
├── goals.html              # Goals tracking
├── calendar.html           # Advanced calendar
├── history.html            # Activity history
├── analysis.html           # Performance analysis
├── ai-tracking.html        # AI assistant
└── README.md              # This file


## 🏆 Project Milestones

### Milestone 1: Task & Routine Module
- [x] Task creation
- [x] Routine logging
- [x] Priority rules
- [x] Conflict detection

### Milestone 2: AI Recommendation Engine
- [x] Pattern analysis
- [x] Suggestion generation
- [x] Productivity scoring

### Milestone 3: Dashboard + Notifications
- [x] Analytics charts
- [x] Performance summaries
- [x] Smart alerts

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- Dhanalakshmi K -[GitHub](https://github.com/Dhanalakshmik09)
- Sanjana -[GitHub](https://github.com/Sanjanabhovi04)
- Shreya S -[GitHub](https://github.com/Shreya-S210)
- Spandana BS -[GitHub](https://github.com/spandanabs-24)
- Full Stack Developer - [GitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Hackathon organizers for the problem statement
- Open source community for amazing tools and libraries

---


  Made with ❤️ for students everywhere
