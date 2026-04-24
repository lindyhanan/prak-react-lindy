import { FiCalendar, FiChevronDown } from "react-icons/fi";

export default function PageHeader() {
  return (
    <div className="flex items-center justify-between mb-6">

      {/* LEFT */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>
        <p className="text-sm text-gray-400">
          Hi, Samantha. Welcome back to Sedap Admin!
        </p>
      </div>

      {/* RIGHT (FILTER) */}
      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm cursor-pointer">
        <div className="w-9 h-9 flex items-center justify-center bg-blue-100 rounded-lg">
          <FiCalendar className="text-blue-500" size={18} />
        </div>
        <div className="text-sm">
          <p className="text-gray-700 font-medium">Filter Periode</p>
          <p className="text-gray-400 text-xs">
            17 April 2020 - 21 May 2020
          </p>
        </div>
        <FiChevronDown className="text-gray-400" />
      </div>
    </div>
  );
}