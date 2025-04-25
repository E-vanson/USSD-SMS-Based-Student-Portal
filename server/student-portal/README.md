# USSD/SMS Student Portal

A NestJS-based student portal leveraging USSD and SMS technologies for accessible academic services in low-connectivity environments.

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB v6+
- Africa's Talking API Account (for SMS/USSD)
- Postman (API testing)
- Git

### Installation
1. **Clone Repository**
   
   git clone https://github.com/E-vanson/USSD-SMS-Based-Student-Portal.git
   cd server/student-portal

2.  **Install Dependencies**    

   npm install

3.   **Enviroment Setup**    
    
    Create .env file:

    env
    PORT=3000
    MONGODB_URI=your mongodb uri
    AT_API_KEY=your_africastalking_api_key
    AT_USERNAME=your_africastalking_username
    JWT_SECRET=your_jwt_secret_key

4.   **Core Technologies**

    Framework: NestJS 11

    Database: MongoDB (Mongoose)

    SMS Gateway: Africa's Talking API

    USSD: ussd-menu-builder

    Auth: JWT, bcrypt

    API Docs: Swagger

    Security: Helmet 


5.   **🛠️ Project Structure**

    src/
    ├── modules/
    │   ├── auth/          # Authentication logic
    │   ├── sms/          # SMS service integration
    │   ├── ussd/         # USSD menu flows
    │   └── students/     # Student data management
    ├── config/           # Environment configuration
    ├── common/           # Shared utilities
    └── main.ts           # Application entry


6.   **🏃 Running the Server**

    # Development Mode
    npm run start:dev

    # Production Mode
    npm run build
    npm run start:prod

    # 🧪 Testing
    # Unit tests
    npm run test

    # E2E tests
    npm run test:e2e

    # Coverage report
    npm run test:cov


 7.   ** 🚨 Troubleshooting**

      Common Issues

      Missing Environment Variables

      Verify .env file exists with required keys

      Africa's Talking API Errors

      Ensure valid API credentials

      Check account balance for SMS services

      MongoDB Connection Issues

      Verify MongoDB service is running

      Check connection string in .env

      📄 License
      This project is proprietary software. All rights reserved.

      🤝 Contributing
      Fork the repository

      Create feature branch (git checkout -b feature/foo)

      Commit changes (git commit -am 'Add foo')

      Push to branch (git push origin feature/foo)

      Create new Pull Request

