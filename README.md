# Hospital Management Web Application

## Overview
This Hospital Management Web Application is designed to streamline hospital operations by allowing nurses and receptionists to manage patient records, appointments, and billing, while doctors can access medical records and issue prescriptions. Patients do not need accounts; everything is handled by the hospital staff.

---

## User Roles & Authentication

### **Admin (Doctor/Your Dad)**
- Full access to the system.

### **Doctors**
- View patient records.
- Update diagnoses and prescribe treatments.

### **Nurses & Receptionists**
- Manage patient registrations, appointments, and billing.
- Cannot edit medical records.

**No patient accounts** – all operations are handled by hospital staff.

---

## Features

### **1. Patient Registration & Management** (Handled by Reception)
- Register new patients with:
  - Name, Age, Gender, Contact Information
  - Medical History, Allergies, Ongoing Treatments
  - Emergency Contact
- Search and update existing patient records by **name or phone number**.

### **2. Appointment Scheduling**
- Schedule patient appointments based on doctor availability.
- Print or send SMS appointment confirmations.
- Doctors can view their daily schedules.
- Support for walk-in patients.

**Tech Stack:**
- FullCalendar.js for scheduling.
- Twilio for SMS notifications.

### **3. Electronic Medical Records (EMR) (Doctors Only)**
- Doctors can:
  - View patient history.
  - Add new diagnoses, prescriptions, and lab test requests.
  
**Security:**
- Only doctors can modify patient medical records.
- Nurses can only view records.

### **4. Billing & Payments (Handled by Reception)**
- Generate invoices for:
  - Consultation Fees
  - Lab Tests
  - Medications
- Track payment status (**Paid/Pending**).
- Print receipts.

**Tech Stack:**
- jsPDF for receipt printing.
- Status tracking for unpaid bills.

### **5. Pharmacy & Inventory Management**
- Issue medications based on prescriptions.
- Track medicine stock levels.
- Receive alerts for low-stock medicines.

**Tech Stack:**
- PostgreSQL/MySQL for inventory storage.
- Automated alerts for stock levels.

### **6. Laboratory & Test Reports (Doctors & Lab Technicians)**
- Doctors can request lab tests.
- Lab technicians upload test results.
- Print test results for patients.

**File Handling:**
- Secure file upload for PDFs, X-ray images, and reports.

### **7. Dashboard & Reporting (Admin & Doctors)**
- **Admin Dashboard:**
  - Total Patients Today
  - Number of Appointments
  - Revenue Tracking
- **Doctor Dashboard:**
  - List of today’s patients
  - Quick access to medical records

**Tech Stack:**
- Chart.js or Recharts for data visualization.

### **8. Security & Access Control**
- **Encryption:** Secure patient data storage.
- **Role-based access control:**
  - Receptionists handle only patient registration and billing.
  - Doctors access and modify medical records.
  - Admin has full control.

**Tech Stack:**
- JWT Authentication for secure access.

---

## Tech Stack Recommendation
- **Frontend:** React.js
- **Backend:** Node.js + Express.js (or Laravel for PHP)
- **Database:** PostgreSQL / MySQL
- **Hosting:** AWS, DigitalOcean, or Vercel for frontend deployment

---

## Development Roadmap
1️⃣ **Phase 1:** Patient Registration, Appointment System  
2️⃣ **Phase 2:** EMR (Doctors Access Only)  
3️⃣ **Phase 3:** Billing & Pharmacy Integration  
4️⃣ **Phase 4:** Lab Test Reports & Dashboard  

---

This application ensures **smooth operations for hospital staff**, allowing **nurses to handle everything at reception**, while **doctors focus on patient treatment**. 🚀

