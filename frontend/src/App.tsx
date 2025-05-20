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
import { RequireAuth } from "./pages/Auth/RequiredAuth";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>

    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          
          <Route path="/login" element={<Login />} />

          
        

          <Route path = "/" element = {
            //<RequireAuth>
              <DashboardLayout />
            //</RequireAuth>
            }>
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