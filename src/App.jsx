import { Button } from "@/components/ui/button"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Page from "./app/dashboard/page"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page />} >
        </Route>
      </Routes>
    </Router>
  )
}

export default App
