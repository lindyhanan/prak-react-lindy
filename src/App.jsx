import React from "react";
import "./App.css";
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Customer = React.lazy(() => import("./pages/Customer"));
const Components = React.lazy(() => import("./pages/Components"));
const Orders = React.lazy(() => import("./pages/Orders"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const Products = React.lazy(() => import("./pages/Products"));
const FiturXYZ = React.lazy(() => import("./pages/FiturXYZ"));
const Error400 = React.lazy(() => import("./pages/Error400"));
const Error401 = React.lazy(() => import("./pages/Error401"));
const Error403 = React.lazy(() => import("./pages/Error403"));

import Loading from "./components/Loading";
import ProtectedRoute from "./components/ProtectedRoute";

const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Note = React.lazy(() => import("./pages/Note"));

function Explore() {
  return <h1>Halaman Explore 🔍</h1>;
}

// Komponen Utama
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Auth Routes — tanpa proteksi */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* Protected Routes — harus login */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/fitur-xyz" element={<FiturXYZ />} />
            <Route path="/note" element={<Note />} />
            <Route path="/components" element={<Components />} />
            <Route path="/error400" element={<Error400 />} />
            <Route path="/error401" element={<Error401 />} />
            <Route path="/error403" element={<Error403 />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
