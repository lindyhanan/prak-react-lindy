import React from "react";
import "./App.css";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Customer from "./pages/Customer";
import Orders from "./pages/Orders";
import Error400 from "./pages/Error400";
import Error401 from "./pages/Error401";
import Error403 from "./pages/Error403";
import { useLocation } from "react-router-dom";

function Explore() {
  return <h1>Halaman Explore 🔍</h1>;
}

function Profile() {
  return <h1>Halaman Profile 👤</h1>;
}

function OrderDetail() {
  return <h1>Halaman Detail 📄</h1>;
}

// Komponen Utama
function App() {
  const location = useLocation();

  const hideLayoutRoutes = [
    "/error400",
    "/error401",
    "/error403"
  ];

  const hideLayout = hideLayoutRoutes.includes(location.pathname);
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Pages */}
        <div className="App p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/detail" element={<OrderDetail />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/error400" element={<Error400 />} />
            <Route path="/error401" element={<Error401 />} />
            <Route path="/error403" element={<Error403 />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
