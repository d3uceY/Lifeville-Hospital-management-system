
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import Page from "./app/dashboard/page"
import Register from "./pages/patient-management/Register"

//patient management
import Patients from "./pages/patient-management/Patients"
import Inpatients from "./pages/patient-management/Inpatients"
import Outpatients from "./pages/patient-management/outpatients"

//appointments
import Overview from "./pages/dashboard/Overview"
import PatientProfile from "./pages/patient-management/patientProfile"
import UpcomingAppointments from "./pages/appointments/Appointments"

//settings
import Settings from "./pages/settings/settings"
import EditPatientProfile from "./pages/patient-management/EditPatientProfile"

//birth and death
import Deaths from "./pages/birth-and-death/death"
import Births from "./pages/birth-and-death/birth"

//symptoms
import SymptomTypes from "./pages/symptoms/SymptomTypes"
import SymptomHeads from "./pages/symptoms/SymptomHeads"

//context providers
import { PatientContextProvider } from "./providers/ApiContextProvider"
import { SocketContextProvider } from "./providers/SocketContextProvider"

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
              <Route path="/inpatients" element={<Inpatients />} />
              <Route path="/outpatients" element={<Outpatients />} />
              {/* nested patient profile */}
              <Route path="/patient-profile">
                <Route path=":patient_id" element={<PatientProfile />} />
                <Route path="edit/:patient_id" element={<EditPatientProfile />} />
              </Route>

              <Route path="/births" element={<Births />} />
              <Route path="/deaths" element={<Deaths />} />

              <Route path="/appointments" element={<UpcomingAppointments />} />
              <Route path="/settings" element={<Settings />} />

              <Route path="/symptom-types" element={<SymptomTypes />} />
              <Route path="/symptom-heads" element={<SymptomHeads />} />

            </Route>
          </Routes>
        </Router>
      </PatientContextProvider>
    </SocketContextProvider>
  )
}

export default App
