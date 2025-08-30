import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Kamel from "./pages/Kamel";
import DoctorAppointments from "./pages/DoctorAppointments";
import Monexa from "./pages/Monexa";
import Stoxly from "./pages/Stoxly";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* الصفحة الرئيسية بكل أقسامها (Home, Skills, Projects, Experiences, iPhone) */}
        <Route path="/" element={<Layout />} />

        {/* الصفحات المستقلة */}
        <Route path="/kamel" element={<Kamel />} />
        <Route path="/cura" element={<DoctorAppointments />} />
        <Route path="/monexa" element={<Monexa />} />
        <Route path="/stoxly" element={<Stoxly />} />
      </Routes>
    </Router>
  );
}

export default App;
