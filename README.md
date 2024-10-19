# CRACKER - Finance Tracker App

## Technologies Used
- **Frontend:** React, Redux Toolkit, TailwindCSS, DaisyUI
- **Backend:** Node.js, Express.js, PostgreSQL, Prisma ORM
- **Database:** PostgreSQL

Cracker Finance Tracker is a full-stack financial management application that helps users manage their expenses, income, investments, loans, and savings. It provides an intuitive and responsive dashboard to track finances, ensuring users stay on top of their financial situation.

## Features

- **User Authentication & Authorization:**
  - User registration
  - Secure login and logout
  - Authorized access control
  
- **Finance Management:**
  - Add, update, and delete finances (income, expenses, investments, savings, loans)
  - View detailed finance summary
  - Filter and sort finances by type, category, payment method, or recurring status
 
-**Dashboard Overview:**
  - Visual representation of income, expenses, investments, and savings
  - Percentage breakdown of various financial categories
  - Quick stats for total income, expenses, savings, and investments

- **Financial Insights:**
  - Calculate total income, expenses, savings, and investment percentages
  - Visualize finance categories with charts and statistics
  
- **Recurring Payments:**
  - Automatically add recurring payments on monthly basis

- **Responsive UI:**
  - Fully responsive design that works across all devices

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js**
- **PostgreSQL** (local or cloud-hosted, e.g., Supabase or Heroku PostgreSQL)
- **Git** (for cloning the repository)

### Installation

To get a local copy up and running, follow these simple steps:

1. **Clone the repo:**

   ```bash
   git clone https://github.com/mohdsaadshaikh/cracker-finance-tracker.git

2. **Navigate to the project directories:** make sure open two terminals

   ```bash
   cd client
   cd server
   ```

3. **Install dependencies:** (on both terminal)

   ```bash
   npm install
   ```

4. **Set up environment variables:**

   - Create a `.env` file in both the `/client` and `/server` directories and add these with the variables as shown below.
   - Want env file? contact me on [Muhammad Saad Shaikh](mailto:mohammadsaad925s4s@gmail.com).
     
    **Client**

      ```plaintext
      VITE_BASE_URL=your_server_url
      ```

    **Server**
      ```plaintext
      PORT=your_port_value
      NODE_ENV=production
      DATABASE_URL=your-database-url
      JWT_SECRET=your-jwt-secret
      JWT_EXPIRES_IN=30d
      JWT_COOKIE_EXPIRES_IN=90
      ```

5. **Run the application:** (on both sever and client)

   ```bash
   npm run dev
   ```

 **Usage**
- Register or log in to start using app.

 **Contributing**
 
  Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.
