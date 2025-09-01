# Lifeville Hospital Management System

A full-stack web application for managing patient records, appointments, and real-time notifications in a hospital setting. Built with PostgreSQL, Node.js (Express), and React, the project features schema validation with Zod, sleek UI components via shadcn/ui, and real-time updates using Socket.IO.

---

##  Table of Contents

1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Prerequisites](#prerequisites)  
4. [Installation](#installation)  
5. [Environment Variables](#environment-variables)  
6. [Running the Application](#running-the-application)  
7. [API Endpoints](#api-endpoints)  
8. [Real-Time Notifications](#real-time-notifications)  
9. [Form Validation & State Management](#form-validation--state-management)  
10. [Contributing](#contributing)  
11. [License](#license)

---

##  Features

- **Patient Management**: Create, view, edit, and delete patient profiles, including demographics, contact information, medical history, and next of kin.
- **Appointment Scheduling**: Full CRUD support for appointments, with filters for active, past, and upcoming bookings.
- **Real-Time Notifications**: Get instant updates via WebSockets (Socket.IO) whenever a new appointment is created.
- **Responsive and Accessible UI**: Designed with Tailwind CSS and shadcn/ui components for a seamless user experience.
- **Form Validation**: Enhanced form handling with React Hook Form and Zod, providing robust client-side validation.
- **State Management**: Powerful centralized data stores (via Context API) for patients, doctors, and appointments with optimized re-rendering.

---

##  Tech Stack

- **Frontend**:
  - React (v18+)
  - React Router v6
  - React Hook Form
  - Zod + `@hookform/resolvers/zod`
  - shadcn/ui
  - Tailwind CSS

- **Backend**:
  - Node.js + Express  
  - PostgreSQL  
  - `pg` (node-postgres)  
  - Socket.IO  

- **Utilities & Tools**:
  - Axios (HTTP client)
  - Sonner (toast notifications)
  - date-fns (date formatting)
  - dotenv (environment configuration)

---

##  Prerequisites

- Node.js ≥ 16.0  
- PostgreSQL ≥ 12.0  
- npm (comes with Node.js)  
- Git

---

##  Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/d3uceY/Lifeville-Hospital-management-system.git
   cd lifeville
   ```

2. **Install dependencies**

   ```bash
   # Backend
   cd server
   npm install

   # Frontend
   cd ../
   npm install
   ```

---

## Environment Variables

Create a `.env` file inside the `server/` directory with:

```env
VITE_API_URL=http://localhost:3000
```

Add any additional variables as needed (e.g., database URL, JWT secrets).

---

## Running the Application

1. **Backend**

   ```bash
   cd server
   npm start
   ```

2. **Frontend**

   ```bash
   npm run dev
   ```

Visit `http://localhost:5173` (or the port Vite displays in your terminal) to use the application.

---

## Real-Time Notifications

* **Backend**: The server publishes `newAppointment` events via `Socket.IO`, utilizing PostgreSQL triggers or direct emission after insertion.
* **Frontend**:
  * Connects to the WebSocket server (`socket.io-client`) when the app initializes.
  * A notifications feature displays a bell icon with unread appointment count and opens a dropdown with details when clicked.

---

## Form Validation & State Management

* Uses `React Hook Form` with `zodResolver` for schemas defined in Zod.
* Nested and controlled components utilize `FormProvider` and `useFormContext()` for seamless form data flow.
* Controlled inputs (e.g., Select dropdowns) are managed via `Controller`.
* Prefilling form data after fetches is handled using `reset()` inside `useEffect`.

---

## Contributing

We welcome contributions! To collaborate:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Make your changes
4. Submit a pull request explaining what you changed and why

---

## License

Distributed under the MIT License. See `LICENSE` for full details.
