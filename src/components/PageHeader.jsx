import { FiCalendar, FiChevronDown } from "react-icons/fi";

export default function PageHeader({
  title,
  breadcrumb,
  children
}) {
  return (
    <div className="mb-6 flex items-center justify-between">

      {/* LEFT */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          {title}
        </h1>

        <p className="text-sm text-gray-400">
          {breadcrumb}
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* CHILDREN */}
        {children}

        {/* FILTER */}
        <div className="flex cursor-pointer items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
            <FiCalendar
              className="text-blue-500"
              size={18}
            />
          </div>

          <div className="text-sm">
            <p className="font-medium text-gray-700">
              Filter Periode
            </p>

            <p className="text-xs text-gray-400">
              17 April 2020 - 21 May 2020
            </p>
          </div>

          <FiChevronDown className="text-gray-400" />

        </div>
      </div>
    </div>
  );
}