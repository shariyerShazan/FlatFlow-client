# FlatFlow — Client (Frontend)

FlatFlow is a modern, full-featured apartment management web application built with React. It allows users to browse, request, manage, and administrate apartment rentals easily and efficiently.

---

## 🎯 Purpose

To provide a digital platform for residents and admins to manage apartment rentals, requests, agreements, and payments in a streamlined and interactive way.

---

## 🌐 Live URL

**Frontend (netlify)** 👉 https://flatflow.netlify.app

---

## ✨ Key Features

- 🔍 **Dynamic Apartment Listing** — Filter apartments by rent range with real-time search.
- 🗂️ **Role-Based Access** — Admin, Member, and User roles with protected routes.
- 📦 **Pagination + Limit Selector** — Paginated apartment list with adjustable limit.
- 📝 **Apartment Booking System** — Users can request to book apartments.
- ❌ **Cancel Request** — Users can cancel their apartment agreement request.
- 🛠️ **Admin Controls**:
  - Create, Edit, Delete apartments
  - Manage members
  - Update apartment availability
- 💳 **Stripe Payment Integration** — Members can pay apartment rent securely.
- 🖼️ **Cloudinary Image Upload** — Upload apartment images via admin panel.
- 💬 **Feedback Section** — Users can submit feedback for FlatFlow.
- 🧠 **Redux + Redux Persist** — Global state management with persistence.
- 🔔 **Toast Notifications** — Instant feedback using `react-toastify`.
- 🎨 **Modern UI** — Built with Tailwind CSS and styled using `daisyUI`.
- 🌍 **Leaflet Map** — Location map integration for apartments.

---

## 📦 Dependencies

```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-router": "^7.6.3",
  "redux": "^9.2.0",
  "react-redux": "^9.2.0",
  "@reduxjs/toolkit": "^2.8.2",
  "redux-persist": "^6.0.0",
  "axios": "^1.10.0",
  "aos": "^2.3.4",
  "lucide-react": "^0.525.0",
  "motion": "^12.23.5",
  "sweetalert2": "^11.22.2",
  "react-toastify": "^11.0.5",
  "@stripe/react-stripe-js": "^3.7.0",
  "tailwindcss": "^4.1.11",
  "leaflet": "^1.9.4",
  "react-leaflet": "^5.0.0"
}
