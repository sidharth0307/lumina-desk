# Lumina Desk - E-Commerce Platform

A premium, full-stack MERN e-commerce application built for the "Build Your Brand" Assignment.

## Features
- Secure JWT Authentication & Role-based access (Admin/User).
- Database-level filtering, sorting, and pagination for products.
- Debounced search functionality.
- Stripe Test Mode integration with secure Webhooks for inventory deduction.
- Admin dashboard for inventory management and revenue tracking.

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB URI
- Stripe Developer Account (Test Mode)

### Installation
1. Clone the repository.
2. Run `npm install` in both the `/backend` and `/frontend` directories.
3. Create a `.env` file in the `/backend` directory with the following variables:
   \`\`\`env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   CLIENT_URL=http://localhost:5173
   \`\`\`
4. Run `npm run dev` in the `/backend` directory.
5. Run `npm run dev` in the `/frontend` directory.

### Stripe Test Card
To test the checkout flow, use the following Stripe test card details:
- **Card Number:** `4242 4242 4242 4242`
- **MM/YY:** Any future date (e.g., `12/26`)
- **CVC:** Any 3 digits (e.g., `123`)
- **ZIP:** Any 5 digits (e.g., `12345`)