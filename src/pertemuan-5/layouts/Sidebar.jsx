import { FiHome, FiList, FiFileText, FiUser } from "react-icons/fi";

export default function Sidebar() {
  return (
    <div className="flex min-h-screen w-72 flex-col bg-white p-6 shadow-lg">

      {/* LOGO */}
      <div className=" flex flex-col ">
      <span className="font-poppins font-[1000] text-[48px]">Sedap<b className="text-green-500">.</b></span>
      <span className="text-gray-400 font-semibold font-barlow">Modern Admin Dashboard</span>
  </div>

      {/* MENU */}
      <div className="flex flex-col gap-2 flex-1">

        {/* ACTIVE */}
        <div className="flex items-center gap-3 bg-green-100 text-green-600 px-4 py-3 rounded-xl font-medium">
          <FiHome />
          Dashboard
        </div>

        <div className="flex items-center gap-3 text-gray-500 px-4 py-3 hover:bg-gray-100 rounded-xl cursor-pointer">
          <FiList />
          Order List
        </div>

        <div className="flex items-center gap-3 text-gray-500 px-4 py-3 hover:bg-gray-100 rounded-xl cursor-pointer">
          <FiFileText />
          Order Detail
        </div>

        <div className="flex items-center gap-3 text-gray-500 px-4 py-3 hover:bg-gray-100 rounded-xl cursor-pointer">
          <FiUser />
          Customer
        </div>

      </div>

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
  <img src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png" className="w-16" />

</div>

      {/* FOOTER TEXT */}
      <div className="mt-6 text-xs text-gray-400">
        <p>Sedap Restaurant Admin Dashboard</p>
        <p>© 2020 All Rights Reserved</p>
      </div>

    </div>
  );
}