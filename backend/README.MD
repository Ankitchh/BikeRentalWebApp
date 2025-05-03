## Project Structure

Backend/
├── config/ # Database configuration
├── middleware/ # Authentication middleware
├── models/ # Mongoose models
├── routes/ # API routes
├── utils/ # Utility functions (e.g., Nodemailer)
├── index.js # Entry point of the application
├── package.json # Project metadata and dependencies
└── env.example # Example environment variables

## Prerequisites

- Node.js (v16 or higher)
- MongoDB
- A `.env` file with the following variables:

```plaintext
RAZORPAY_KEY_ID=""
RAZORPAY_SECRET_KEY=""
CLIENT_ID=""
MONGODB_URI=""
JWT_SECRET=""
NODE_MAILER_SENDER_PASSWORD=""
NODE_MAILER_SENDER_EMAIL=""
```

## API Endpoints

### User Authentication

- **POST** `/api/v1/user/login`: Login or register a user and send an OTP.
- **POST** `/api/v1/user/verify-otp`: Verify the OTP and generate a JWT token.
- **POST** `/api/v1/user/resend-otp`: Resend the OTP to the user's email.
- **POST** `/api/v1/user/google-login`: Login using Google OAuth.

### Admin Authentication

- **POST** `/api/v1/admin/register`: Register a new admin (requires admin authentication).
- **POST** `/api/v1/admin/login`: Login as an admin.
- **POST** `/api/v1/admin/logout`: Logout an admin.

## How to send Request to the Api

#### Refer to the Frontend folder to see how the requests have been made

`for Login` -> Frontend/src/components/Login.jsx <br/>
`for otp` -> Frontend/src/components/otp.jsx
