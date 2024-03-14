import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AppointmentList from "./pages/Appointment/AppointmentList";
import AppointmentForm from "./pages/Appointment/AppointmentForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/appointment" element={<AppointmentList />} />
        <Route path="/appointment/create" element={<AppointmentForm />} />
        <Route path="/appointment/update" element={<AppointmentForm />} />
      </Routes>
    </Router>
  );
}

export default App;
