import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";
import Inventory from "./pages/Inventory/Inventory";
import Login from "./pages/Auth/Login";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import { DashboardLayout } from "./layout/DashboardLayout";
import { Management } from "./pages/Management/Management";
import { Patients } from "./pages/Patients/Patients";
import { Patient } from "./pages/Patients/Patient";

function App() {
  return (
    <>

    <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/auth" element={<Login />} />

          <Route path = "/" element = {<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="patients" element={<Patients />} />
            <Route path="patients/:id" element={<Patient />} />
            <Route path="management" element={<Management />} />
          </Route>

        </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;             