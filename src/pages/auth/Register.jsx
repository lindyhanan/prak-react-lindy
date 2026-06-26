import { useState } from "react";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi: password cocok
    if (dataForm.password !== dataForm.confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      return;
    }

    if (dataForm.password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await register(dataForm.email, dataForm.password, dataForm.fullName);
      setSuccess("Registrasi berhasil! Silakan cek email Anda untuk verifikasi.");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.message || "Registrasi gagal.");
    } finally {
      setLoading(false);
    }
  };

  const errorInfo = error ? (
    <div className="bg-red-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
      <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
      {error}
    </div>
  ) : null;

  const successInfo = success ? (
    <div className="bg-green-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
      {success}
    </div>
  ) : null;

  const loadingInfo = loading ? (
    <div className="bg-gray-200 mb-5 p-5 text-sm rounded flex items-center">
      <ImSpinner2 className="me-2 animate-spin" />
      Mohon Tunggu...
    </div>
  ) : null;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
        Create Your Account ✨
      </h2>

      {errorInfo}
      {successInfo}
      {loadingInfo}

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={dataForm.fullName}
            onChange={handleChange}
            id="fullName"
            required
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
            placeholder="Nama Lengkap"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={dataForm.email}
            onChange={handleChange}
            id="email"
            required
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={dataForm.password}
            onChange={handleChange}
            id="password"
            required
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
            placeholder="Min. 6 karakter"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={dataForm.confirmPassword}
            onChange={handleChange}
            id="confirmPassword"
            required
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
            placeholder="********"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Mendaftarkan..." : "Register"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-4">
        Sudah punya akun?{" "}
        <Link to="/login" className="text-green-500 hover:underline">
          Login di sini
        </Link>
      </p>
    </div>
  );
}
