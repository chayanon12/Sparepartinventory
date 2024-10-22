import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login Page/login";
import MainPage from "./components/MainPage/MainPage"; 
import axios from "axios";

function App() {
  const backendUrl = import.meta.env.VITE_SERVICE_URL;
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
    return isAuthenticated() ? element : <Navigate to="/SparepartinventorySystem" />;
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("username");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/SparepartinventorySystem" element={<Login />} />
        <Route
          path="/SparepartinventorySystem/mainPage"
          element={
            <ProtectedRoute
              element={<MainPage switchValue={switchValue} setSwitchValue={setSwitchValue} />}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
