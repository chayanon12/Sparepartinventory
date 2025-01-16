import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Sparepart/Login Page/login";
import SparePart from "./components/Sparepart/MainPage/MainPage"; 
import Selectsystem from "./components/SelectSystemPage/selectsystem";
// import NewArrivalItems from "./components/NewArrival/Home/Homepage";
import NewArr from "./components/NewArr/MainPage/MainPage";
import axios from "axios";

function App() {
  // const backendUrl = import.meta.env.VITE_SERVICE_URL;
  const backendUrl = `http://${window.location.hostname}:9002`;
  axios.defaults.baseURL = backendUrl;
  const [switchValue, setSwitchValue] = useState(true);
  useEffect(() => {
    const getIp = async () => {
      const response = await axios.get("/Sparepart/api/common/getIPaddress");
      localStorage.setItem("ip", response.data.ip);
    };
    getIp();
  }, []);

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/InventorymanagementSystem" />;
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("username");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/InventorymanagementSystem" element={<Login />} />
        <Route path="/InventorymanagementSystem/selectpage" element={<Selectsystem />} />
      
          <Route
          path="/InventorymanagementSystem/newarrival"
          element={
            <ProtectedRoute
              element={<NewArr switchValue={switchValue} setSwitchValue={setSwitchValue} />}
            />
          }
        />
        <Route
          path="/InventorymanagementSystem/Sparepart"
          element={
            <ProtectedRoute
              element={<SparePart switchValue={switchValue} setSwitchValue={setSwitchValue} />}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
