import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import PageHeader from "../components/PageHeader";
import { FiFileText, FiBox, FiX, FiShoppingBag, FiPlus, FiCheck } from "react-icons/fi";
import {
  PieChart, Pie, Cell,
  LineChart, Line, XAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function Dashboard() {
  const pieData = [
    { name: "Orders", value: 81 },
    { name: "Growth", value: 22 },
    { name: "Revenue", value: 62 }
  ];

  const COLORS = ["#FF6B6B", "#1ABC9C", "#4DA3FF"];

  const chartData = [
    { day: "Sun", value: 20 },
    { day: "Mon", value: 40 },
    { day: "Tue", value: 35 },
    { day: "Wed", value: 60 },
    { day: "Thu", value: 45 },
    { day: "Fri", value: 70 },
    { day: "Sat", value: 55 }
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex flex-col flex-1">

        <Header />

        <main className="p-6">

          <PageHeader />

          {/* STAT CARDS */}
          <div className="grid grid-cols-4 gap-6 mb-6">

            {/* CARD 1 */}
            <div className="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4">
              <div className="relative w-14 h-14 flex items-center justify-center bg-[#E6F7F2] rounded-full">
                <FiFileText className="text-[#1ABC9C]" size={22} />
                <div className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-red-500 rounded-full">
                  <FiPlus className="text-white" size={12} />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold">75</h2>
                <p className="text-sm text-gray-500">Total Orders</p>
                <span className="text-xs text-green-500">▲ 4% (30 days)</span>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4">
              <div className="relative w-14 h-14 flex items-center justify-center bg-[#E6F7F2] rounded-full">
                <FiBox className="text-[#1ABC9C]" size={22} />
                <div className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-green-500 rounded-full">
                  <FiCheck className="text-white" size={12} />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold">357</h2>
                <p className="text-sm text-gray-500">Total Delivered</p>
                <span className="text-xs text-green-500">▲ 4% (30 days)</span>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4">
              <div className="relative w-14 h-14 flex items-center justify-center bg-[#E6F7F2] rounded-full">
                <FiX className="text-red-500" size={22} />
                <div className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-red-500 rounded-full">
                  <FiX className="text-white" size={12} />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold">65</h2>
                <p className="text-sm text-gray-500">Total Canceled</p>
                <span className="text-xs text-red-500">▼ 25% (30 days)</span>
              </div>
            </div>

            {/* CARD 4 */}
            <div className="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4">
              <div className="relative w-14 h-14 flex items-center justify-center bg-[#E6F7F2] rounded-full">
                <FiShoppingBag className="text-[#1ABC9C]" size={22} />
                <div className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-green-500 rounded-full">
                  <FiCheck className="text-white" size={12} />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold">$128</h2>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <span className="text-xs text-red-500">▼ 12% (30 days)</span>
              </div>
            </div>

          </div>

          {/* CHART SECTION */}
          <div className="grid grid-cols-2 gap-4">

            {/* PIE CHART */}
            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-semibold mb-2">Pie Chart</h3>
              <div className="h-40 flex items-center justify-center">
                <PieChart width={200} height={150}>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
            </div>

            {/* LINE CHART */}
            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-semibold mb-2">Order Chart</h3>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis dataKey="day" />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#1ABC9C" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}