# Budget Tracker

A full-stack **MERN (MongoDB, Express, React, Node.js)** application designed to help users efficiently track , manage daily expenses, and gain visual insights into their financial health.

## 🚀 Key Features

* **User Authentication:** Secure signup and login functionality.
* **Transaction Management:** Add, edit, and delete expense items.
* **Dynamic Budgeting:** Set monthly budget caps and receive warnings when thresholds are approached.
* **Visual Analytics:** Interactive charts showcasing spending by category (Food, Rent, Utilities, Entertainment, etc.).
* **Responsive Layout:** Optimized for both desktop and mobile viewing windows.

## 🛠️ Tech Stack

* **Frontend:** React.js, Context API / Redux, Axios, CSS Modules / Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB with Mongoose ODM
* **Security:** JSON Web Tokens (JWT) for session authentication, bcrypt for password hashing

## 📦 Installation & Setup

Follow these steps to run the application locally.

### Prerequisites
* [Node.js](https://nodejs.org/) installed
* [MongoDB](https://www.mongodb.com/try/download/community) instance running locally or a MongoDB Atlas URI

### 1. Clone the Repository
```bash
git clone https://github.com/MuskanSahu8/budget-tracker.git
cd budget-tracker
```

### 2. Configure Environment Variables
Create a `.env` file in the **root of your backend folder** and populate it with your configuration keys:
```env
```

### 3. Install Dependencies & Run
**For the Backend:**
```bash
cd back
npm install
npm start
```

**For the Frontend:**
```bash
cd ../front
npm install
npm start
```

## 🔒 Security Practices Notice
This repository contains a `.gitignore` file to ensure sensitive configurations (`.env`, `node_modules/`) are never tracked or exposed publicly on GitHub.
