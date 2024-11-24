# Yantraved

Yantraved is a MERN (MongoDB, Express, React, Node.js) stack project designed for e-learning, course management, and user engagement. It includes features like course enrollment, lectures, materials, daily practice problems, payment handling, user management, and more.

# Features

## Frontend

* Home Page: A user-friendly homepage showcasing available courses and features.
* Dashboard: User dashboard for managing personal and academic information.
* Course Management:
  * View, browse, and enroll in courses.
  * Access course details and lectures.
* Examinations: Apply for exams, submit exams, and download certificates.
* Profile Management: Update personal information and manage preferences.
* Gallery: Showcase events and activities.
* Refer and Earn: Reward system for user referrals.

## Backend

* Course Management:
  * Add, update, and delete courses and lectures.
  * Manage course categories and materials.
* Examination System:
  * Exam application, submission, and certificate generation.
  * Download exam PDFs and view statuses.
* Daily Practice Problems (DPP):
  * Add, fetch, and delete DPPs.
* User Management:
  * Role-based access control for admin, instructor, and users.
  * CRUD operations on user profiles.
* E-commerce:
  * Add to cart, checkout, and payment handling with verification.
* Reporting and Analytics:
  * Fetch detailed statistics and user activity reports.

# Technology Stack

## Frontend
* React.js: For building user interfaces and routing.
* React Router: For managing frontend routes.
* CSS/SCSS: For styling components.
## Backend
* Node.js: Server-side runtime.
* Express.js: Framework for handling routes and middleware.
* MongoDB: Database for storing user data, courses, and more.
## Middleware
* Multer: For handling file uploads.
* JWT: For authentication and user session management.
* Custom Middlewares:
  * isAuth.js: Authentication middleware.
  * isAdminOrInstructor.js: Role-based authorization middleware.
  * trycatch.js: Error handling.

# Installation and Setup
## Prerequisites
* Node.js (v16 or higher)
* MongoDB
* npm or yarn package manager

Steps
1. Clone the repository:
` git clone https://github.com/som-2001/engimate.git
cd yantraved `
2. Install dependencies:
Backend:
` cd backend 
npm install `
Frontend:
` cd ../frontend
npm install `
3. Configure environment variables: Create a .env file in the backend directory with the following variables:

` # MongoDB Configuration
    MONGOUSERNAME=yourMongoUsername
    MONOGOPASS=yourMongoPassword
    MONGODBURL=mongodb+srv://<username>:<password>@clustername.mongodb.net/database-name
  
  # Server Configuration
  PORT=8000
  
  # Authentication Secrets
  ACTIVATION_SECRET=yourActivationSecret
  JWT_SECRET=yourJWTSecret
  
  # SMTP Configuration
  SMTP_MAIL=yourEmail@example.com
  SMTP_USERNAME=yourSMTPUsername
  SMTP_PASSWORD=yourSMTPPassword
  SMTP_HOST=smtp.example.com
  SMTP_PORT=2525
  
  # Razorpay API Keys
  RAZORPAY_KEY_ID=yourRazorpayKeyId
  RAZORPAY_KEY_SECRET=yourRazorpayKeySecret
  
  # Twilio API Keys
  TWILIO_ACCOUNT_SID=yourTwilioAccountSID
  TWILIO_AUTH_TOKEN=yourTwilioAuthToken
  TWILIO_PHONE_NUMBER=yourTwilioPhoneNumber 
`

4. Run the project:

Backend:
`cd backend
npm start`
Frontend:
`cd ../frontend
npm start`

5. Open your browser and navigate to `http://localhost:3000`.

