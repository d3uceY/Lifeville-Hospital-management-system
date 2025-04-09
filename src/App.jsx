
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Page from "./app/dashboard/page"
import Register from "./pages/patient-management/Register"
import Patients from "./pages/patient-management/Patients"
import Overview from "./pages/dashboard/Overview"
import PatientProfile from "./pages/patient-management/patientProfile"
import UpcomingAppointments from "./pages/appointments/Appointments"
import Settings from "./pages/settings/settings"
import EditPatientProfile from "./pages/patient-management/EditPatientProfile"
import { SocketContextProvider } from "./providers/SocketContextProvider"
import Deaths from "./pages/birth-and-death/death"

//context providers
import { PatientContextProvider } from "./providers/ApiContextProvider"

function App() {
  return (
    <SocketContextProvider>
      <PatientContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Page />} >
              <Route index element={<Overview />} />
              <Route path="/register" element={<Register />} />
              <Route path="/patients" element={<Patients />} />

              {/* nested patient profile */}
              <Route path="/patient-profile">
                <Route path=":patient_id" element={<PatientProfile />} />
                <Route path="edit/:patient_id" element={<EditPatientProfile />} />
              </Route>

              {/* <Route path="/births" element={<Births />} /> */}
              <Route path="/deaths" element={<Deaths />} />

              <Route path="/appointments" element={<UpcomingAppointments />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      </PatientContextProvider>
    </SocketContextProvider>
  )
}

export default App
