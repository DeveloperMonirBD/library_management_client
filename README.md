# 📚 Minimal Library Management System – Client

This is a clean and responsive frontend application built using **React**, **TypeScript**, **RTK Query**, and **Tailwind CSS**. It allows users to manage library books and borrowing operations without
authentication. All features interact with a RESTful backend.

---

## 🚀 Live Demo

🔗 [Visit Live Site](https://library-management-client-psi.vercel.app)

---

## 🛠️ Tech Stack

| Layer       | Technology                                     |
| ----------- | ---------------------------------------------- |
| Frontend    | React + TypeScript                             |
| State Mgmt  | Redux Toolkit + RTK Query                      |
| Styling     | Tailwind CSS / ShadCN UI                       |
| API Backend | Node.js + Express.js (connected via RTK Query) |

---

## ✨ Features

### 📕 Book Management

-   View all books in a responsive table
-   Add new book with form and validation
-   Edit book details with live update
-   Delete book with confirmation dialog
-   Book status dynamically reflects availability based on copies

### 📘 Borrow Management

-   Borrow form accepts quantity and due date
-   Quantity is validated against available copies
-   If copies reach 0, availability updates automatically
-   Instant redirect to borrow summary

### 📊 Borrow Summary Page

-   Aggregated summary of borrowed books
-   Displays total quantity borrowed per book

### 🍞 Toast Notifications

-   Success & Error feedback via Sonner (shadcn compatible)

### ⚡ Optimistic UI Updates

-   Instant frontend changes with backend rollback protection

---

## 📁 Folder Structure
```
client/ ├── src/ │ ├── components/ # Reusable UI components │ ├── pages/ # Page views (Books, Create, Summary) │ ├── routes/ # Route configuration │ ├── redux/ │ │ ├── store.ts # Redux store setup │ │ └── api/ # RTK Query endpoints │ ├── types/ # TypeScript interfaces │ └── assets/ # Logos, icons, etc.
```

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/DeveloperMonirBD/library_management_client.git
cd library_management_client

# Install dependencies
npm install

# Run in development mode
npm run dev 
```

---

## 🔐 API Endpoints (Frontend Consumption)

| Endpoint     | Description                                    |
| ------------ | ------------- |
| /books | Get all books |
| /books/:id | View single book |
| /create-book | Add new book |
| /edit-book/:id | Update book details |
| /borrow/:bookId | Borrow a book |
| /borrow-summary | View aggregated borrow data |

## Submission:

### Frontend:
[GitHub Repository Link](https://github.com/DeveloperMonirBD/library_management_client) and
[Live Deployment Link](https://library-management-client-psi.vercel.app)

### Backend:
[GitHub Repository Link](https://github.com/DeveloperMonirBD/library_management_api) and
[Live Deployment Link](https://library-management-api-a4.vercel.app)


## 👨‍💻 Developer
Md. Monirul Islam