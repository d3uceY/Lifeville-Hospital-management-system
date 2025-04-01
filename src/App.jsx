
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Page from "./app/dashboard/page"
import Register from "./pages/Register"
import Patients from "./pages/Patients"
import Overview from "./pages/dashboard/Overview"

//context providers
import { PatientContextProvider } from "./providers/ApiContextProvider"

function App() {
  return (
    <PatientContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Page />} >
            <Route path="/register" element={<Register />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/dashboard" element={<Overview />} />
          </Route>
        </Routes>
      </Router>
    </PatientContextProvider>
  )
}

export default App
