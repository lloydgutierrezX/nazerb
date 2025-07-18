# React ESS System (Employee Self-Service)

A modern Employee Self-Service system built with the **PERN stack** (PostgreSQL, Express, React, Node.js), designed for simplified employee check-ins through a Viber-integrated interface.

## 📌 Features

- ✅ **Viber Bot Integration** for employee login (Pending)
- ⏱️ **Time In / Time Out** tracking (Pending)
- 📸 **Photo Upload** for proof of presence (Pending)
- ⚛️ **React Frontend** with modular components
- 📡 **Node + Express API** backend services
- 🔒 Basic authentication layer for identity protection (Pending)

---

## 🧱 Tech Stack

| Layer       | Tech                     |
|------------|---------------------------|
| Frontend   | React, Tailwind CSS with DaisyUI template |
| Backend    | Node.js, Express.js       |
| Database   | PostgreSQL + Prisma ORM   |
| Messaging  | Viber Bot API             |
| Auth       | Token-based (JWT or session-based depending on setup) |

---

## 📂 Project Structure

client              # React frontend
/components
/pages
/services
/hooks
/utils
App.tsx
index.tsx

/server              # Node + Express backend
/controllers
/routes
/middlewares
/prisma
/utils
app.js
server.js

/prisma              # Prisma schema + migrations
---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL
- Yarn or NPM
- Prisma CLI

---

### 1. Clone & Install
```
git clone https://github.com/your-username/react-ess-system.git
cd react-ess-system
```

2. Setup Client
```
cd client
npm install
npm run dev
```

3. Setup Server
```
cd ../server
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```
