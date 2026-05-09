# 📊 Data Processing & Analytics Dashboard

![npm](https://img.shields.io/badge/npm-v9+-blue)
![Node](https://img.shields.io/badge/node-v18+-green)
![React](https://img.shields.io/badge/React-Vite-61DAFB)
![Backend](https://img.shields.io/badge/Backend-Node.js-orange)
![ORM](https://img.shields.io/badge/Prisma-ORM-2D3748)
![Database](https://img.shields.io/badge/PostgreSQL-Online-blue)

---

## 🌟 Overview

A full-stack analytics dashboard that processes CSV data and generates business insights.

### Features:
- 🔥 Top Selling Items
- ☠️ Dead Stock Detection
- 💰 Profit Analysis
- 📊 Interactive Charts & Dashboards
- 🔍 Search & Filtering

---

## 🚀 Live Demo

--

---

## 🧠 Project Architecture

1. User uploads CSV file
2. Backend processes file using Multer + CSV Parser
3. Data is stored and analyzed using Prisma ORM
4. API returns analytics
5. Frontend (Vite React) displays charts & tables

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Axios
- Tailwind CSS
- Chart.js / Recharts

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- Multer (file uploads)
- csv-parser

---

## 🗄️ Prisma ORM

Used for database modeling and querying.




### Example Schema:
```prisma
model Sale {
  id        Int      @id @default(autoincrement())
  itemName  String
  quantity  Int
  price     Float
  createdAt DateTime @default(now())
}
```
## 🗄️ Prisma Commands

```bash
npx prisma generate
npx prisma migrate dev
npx prisma migrate deploy
```

It sounds like you're setting up a full-stack application focused on file processing (likely CSVs). Here is that information cleaned up and organized into a professional, scannable Markdown format.

🛠 Project Setup Guide
📋 Prerequisites
Before starting, ensure you have the following installed:

Node.js (LTS version recommended)

PostgreSQL (Local or hosted instance)

Core Tech Stack:

Frontend: React, Vite, Tailwind CSS, Axios

Backend: Node.js, Express, Multer, CSV-Parser

Misc: CORS (Cross-Origin Resource Sharing)

⚙️ Environment Configuration
Create a .env file in your backend root directory and add the following variables:

Code snippet
DATABASE_URL=your_postgres_url
PORT=3000
NODE_ENV=development
🚀 Execution Instructions
1. Backend Setup
Navigate to the backend folder:

Bash
# Install dependencies
npm install

# Run in Development mode (usually with nodemon)
npm run dev

# Run in Production mode
npm run prod
2. Frontend Setup
Navigate to the frontend folder:

Bash
# Install dependencies
npm install

# Start the Vite development server
npm run dev
