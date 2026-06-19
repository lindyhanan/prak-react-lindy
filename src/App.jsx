import React from "react";
import "./App.css";
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Sidebar = React.lazy(() => import("./components/Sidebar"));
const Header = React.lazy(() => import("./components/Header"));
const Customer = React.lazy(() => import("./pages/Customer"));
const Components = React.lazy(() => import("./pages/Components"));
const Orders = React.lazy(() => import("./pages/Orders"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const Products = React.lazy(() => import("./pages/Products"));
const FiturXYZ = React.lazy(() => import("./pages/FiturXYZ"));
const Error400 = React.lazy(() => import("./pages/Error400"));
const Error401 = React.lazy(() => import("./pages/Error401"));
const Error403 = React.lazy(() => import("./pages/Error403"));
import { useLocation } from "react-router-dom";
import Loading from "./components/Loading";
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

function Profile() {
  return <h1>Halaman Profile 👤</h1>;
}

// Komponen Utama
function App() {
  const location = useLocation();

  const hideLayoutRoutes = ["/error400", "/error401", "/error403"];

  const hideLayout = hideLayoutRoutes.includes(location.pathname);
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
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
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
/*hp aku mana lingdy*/
