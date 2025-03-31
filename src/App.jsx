
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Page from "./app/dashboard/page"
import Register from "./pages/Register"
import Patients from "./pages/Patients"
import Overview from "./pages/dashboard/Overview"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page />} >
          <Route path="/register" element={<Register />}/>
          <Route path="/patients" element={<Patients />}/>
          <Route path="/dashboard" element={<Overview />}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
