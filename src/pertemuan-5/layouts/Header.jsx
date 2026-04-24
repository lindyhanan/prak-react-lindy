import { FiSearch, FiBell, FiMessageSquare, FiGift, FiSettings } from "react-icons/fi";

export default function Header() {
  return (
    <div className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">

      {/* SEARCH */}
      <div className="relative w-1/3">
        <input
          type="text"
          placeholder="Search here"
          className="w-full bg-gray-100 rounded-lg py-2 pl-10 pr-4 outline-none"
        />
        <FiSearch className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {/* ICONS */}
        <div className="flex items-center gap-3">

          {/* Bell */}
          <div className="relative">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg">
              <FiBell size={18} />
            </div>
            <span className="absolute -top-1 -right-1 text-xs bg-blue-500 text-white rounded-full px-1">
              2
            </span>
          </div>

          {/* Chat */}
          <div className="relative">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg">
              <FiMessageSquare size={18} />
            </div>
            <span className="absolute -top-1 -right-1 text-xs bg-blue-500 text-white rounded-full px-1">
              5
            </span>
          </div>

          {/* Gift */}
          <div className="relative">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg">
              <FiGift size={18} />
            </div>
            <span className="absolute -top-1 -right-1 text-xs bg-blue-500 text-white rounded-full px-1">
              1
            </span>
          </div>

          {/* Settings */}
          <div className="relative">
            <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-lg">
              <FiSettings size={18} />
            </div>
            <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1">
              19
            </span>
          </div>

        </div>

        {/* USER */}
        <div className="flex items-center gap-2 ml-4">
          <span className="text-sm text-gray-600">
            Hello, <b>Samantha</b>
          </span>
          <img
            src="https://i.pravatar.cc/40"
            className="w-9 h-9 rounded-full"
          />
        </div>

      </div>
    </div>
  );
}