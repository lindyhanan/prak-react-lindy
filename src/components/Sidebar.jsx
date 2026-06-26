import { AiFillAppstore } from "react-icons/ai"; 
import { FiLogOut, FiList, FiUser } from "react-icons/fi";
import { MdSpaceDashboard } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const menuClass = ({ isActive }) =>
  `flex cursor-pointer items-center rounded-xl p-4 space-x-2
    ${
      isActive
        ? "text-hijau bg-green-200 font-extrabold"
        : "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
    }`;

export default function Sidebar() {
  const { user, profile, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout gagal:", err.message);
    }
  };

  return (
    <div className="flex min-h-screen w-72 flex-col bg-white p-6 shadow-lg">
      {/* LOGO */}
      <div className="flex flex-col">
        <span className="font-poppins font-[1000] text-[48px]">
          Sedap<b className="text-green-500">.</b>
        </span>
        <span className="text-gray-400 font-semibold font-barlow">
          Modern Admin Dashboard
        </span>
      </div>

      {/* USER INFO */}
      <div className="flex items-center gap-3 mt-4 p-3 bg-gray-50 rounded-xl">
        <img
          src={`https://ui-avatars.com/api/?name=${profile?.full_name || "User"}&background=00B074&color=fff`}
          className="w-10 h-10 rounded-full"
          alt="avatar"
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm truncate">
            {profile?.full_name || "User"}
          </p>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            isAdmin ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600"
          }`}>
            {profile?.role || "member"}
          </span>
        </div>
      </div>

      {/* MENU */}
      <ul className="flex flex-col gap-1 flex-1 mt-4">
        <li>
          <NavLink to="/" className={menuClass}>
            <MdSpaceDashboard className="mr-4 text-xl" />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/orders" className={menuClass}>
            <FiList className="mr-4 text-xl" />
            Order List
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className={menuClass}>
            <FiList className="mr-4 text-xl" />
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/customer" className={menuClass}>
            <FiUser className="mr-4 text-xl" />
            Customer
          </NavLink>
        </li>
        <li>
          <NavLink to="/components" className={menuClass}>
            <FiUser className="mr-4 text-xl" />
            Components
          </NavLink>
        </li>
        <li>
          <NavLink to="/fitur-xyz" className={menuClass}>
            <AiFillAppstore className="mr-4 text-xl" />
            Fitur XYZ
          </NavLink>
        </li>
        <li>
          <NavLink to="/note" className={menuClass}>
            <AiFillAppstore className="mr-4 text-xl" />
            Note
          </NavLink>
        </li>

        {isAdmin && (
          <>
            <li className="mt-4 mb-1 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Admin Pages
            </li>
            <li>
              <NavLink to="/error400" className={menuClass}>
                Error 400
              </NavLink>
            </li>
            <li>
              <NavLink to="/error401" className={menuClass}>
                Error 401
              </NavLink>
            </li>
            <li>
              <NavLink to="/error403" className={menuClass}>
                Error 403
              </NavLink>
            </li>
          </>
        )}
      </ul>

      {/* LOGOUT BUTTON */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 p-3 rounded-xl text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors mb-3"
      >
        <FiLogOut className="text-xl" />
        <span className="font-medium">Logout</span>
      </button>

      {/* FOOTER TEXT */}
      <div className="text-xs text-gray-400">
        <p>Sedap Restaurant Admin Dashboard</p>
        <p>© 2025 All Rights Reserved</p>
      </div>
    </div>
  );
}
