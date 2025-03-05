import { Button } from "@/components/ui/button"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Page from "./app/dashboard/page"
import Register from "./pages/Register"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page />} >
          <Route index element={<Register />}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
