import { FiHome, FiList, FiFileText, FiUser } from "react-icons/fi";
import { MdSpaceDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
const menuClass = ({ isActive }) =>
  `flex cursor-pointer items-center rounded-xl p-4  space-x-2
        ${
          isActive
            ? "text-hijau bg-green-200 font-extrabold"
            : "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
        }`;

export default function Sidebar() {
  return (
    <div className="flex min-h-screen w-72 flex-col bg-white p-6 shadow-lg">
      {/* LOGO */}
      <div className=" flex flex-col ">
        <span className="font-poppins font-[1000] text-[48px]">
          Sedap<b className="text-green-500">.</b>
        </span>
        <span className="text-gray-400 font-semibold font-barlow">
          Modern Admin Dashboard
        </span>
      </div>

      {/* MENU */}
      <ul className="flex flex-col gap-2 flex-1">
        {/* ACTIVE */}

        <li>
          <NavLink id="menu-1" to="/" className={menuClass}>
            <MdSpaceDashboard className="mr-4 text-xl" />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink id="menu-2" to="/orders" className={menuClass}>
            <FiList className="mr-4 text-xl" />
            Order List
          </NavLink>
        </li>

        {/* <li>
          <NavLink id="menu-3" to="/detail" className={menuClass}>
            <FiFileText className="mr-4 text-xl" />
            Order Detail
          </NavLink>
        </li> */}
        <li>
          <NavLink id="menu-4" to="/customer" className={menuClass}>
            <FiUser className="mr-4 text-xl" />
            Customer
          </NavLink>
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
      </ul>

      {/* FOOTER CARD */}
      <div className="bg-green-500 text-white p-4 rounded-xl shadow-md flex justify-between items-center">
        {/* TEXT */}
        <div className="text-sm">
          <p className="mb-3">
            Please, organize your menus through button below!
          </p>

          <button className="bg-white text-green-600 px-4 py-2 rounded-lg text-sm font-medium">
            + Add Menus
          </button>
        </div>

        {/* IMAGE */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
          className="w-16"
        />
      </div>

      {/* FOOTER TEXT */}
      <div className="mt-6 text-xs text-gray-400">
        <p>Sedap Restaurant Admin Dashboard</p>
        <p>© 2020 All Rights Reserved</p>
      </div>
    </div>
  );
}
