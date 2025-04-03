
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Page from "./app/dashboard/page"
import Register from "./pages/patient-management/Register"
import Patients from "./pages/patient-management/Patients"
import Overview from "./pages/dashboard/Overview"
import PatientProfile from "./pages/patient-management/patientProfile"
import UpcomingAppointments from "./pages/appointments/UpcomingAppointments"
import Settings from "./pages/settings/settings"

//context providers
import { PatientContextProvider } from "./providers/ApiContextProvider"

function App() {
  return (
    <PatientContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Page />} >
            <Route index element={<Overview />} />
            <Route path="/register" element={<Register />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/patient-profile/:patient_id" element={<PatientProfile />} />
            <Route path="/upcoming-appointments" element={<UpcomingAppointments />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </PatientContextProvider>
  )
}

export default App
