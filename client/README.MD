# Student Portal Frontend

React-based administrative dashboard for managing student interactions with USSD/SMS services. Built with Ant Design for enterprise-grade UI components.

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- npm v9+
- Backend API Server (NestJS student-portal)
- Recommended IDE: VS Code

### Installation
1. **Clone Repository**
   ```bash
   git clone https://github.com/E-vanson/USSD-SMS-Based-Student-Portal.git
   cd client

# Install Dependencies

npm install

# Environment Setup
Create .env file:
env
REACT_APP_API_URL=http://localhost:3000
REACT_APP_ENV=development

# 🛠️ Tech Stack
Framework: React 18

UI Library: Ant Design 5

State Management: React Context API

Routing: React Router 6

Date Handling: Luxon

Animations: React CountUp

Build Tool: Create React App

# 📁 Project Structure
src/
├── components/       # Reusable UI components
├── pages/            # Route-based pages
├── contexts/         # Global state management
├── utils/            # Helper functions
├── assets/           # Images/styles
├── App.jsx           # Root component
└── index.jsx         # Entry point

# 💻 Development
Start Development Server
npm run dev
Runs app in development mode on http://localhost:3001

Build for Production
npm run build

# 🔌 Key Features
Dashboard Analytics

Real-time USSD session statistics

SMS delivery success rates

Student engagement metrics

Student Management

CRUD operations for student profiles

Academic record visualization

SMS notification history

System Configuration

USSD menu designer

SMS template editor

# 🚨 Troubleshooting
Common Issues

Ant Design Styles Missing
Ensure CSS imports are present in App.jsx:

jsx
import 'antd/dist/reset.css';
CORS Errors
Configure proxy in package.json or setup CORS in backend

Environment Variables Not Loading
Restart dev server after modifying .env

Routing Issues
Verify React Router configuration in App.jsx

# 📄 License
Proprietary software - unauthorized distribution prohibited

# 🤝 Contribution Guide
Create feature branch from develop

Follow Ant Design coding conventions

Write component storybooks for new UI elements

Update snapshot tests before PR submission