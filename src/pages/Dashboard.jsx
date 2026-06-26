import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../contexts/AuthContext";
import {
  FiFileText,
  FiBox,
  FiX,
  FiShoppingBag,
  FiPlus,
  FiCheck,
  FiStar,
  FiTrendingUp,
} from "react-icons/fi";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#FF6B6B", "#1ABC9C", "#4DA3FF"];

export default function Dashboard() {
  const { profile, isAdmin } = useAuth();

  // Stats state
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalDelivered: 0,
    totalCanceled: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalCustomers: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        if (isAdmin) {
          // === ADMIN DASHBOARD ===
          const [ordersRes, productsRes, customersRes] = await Promise.all([
            supabase.from("orders").select("*"),
            supabase.from("products").select("id", { count: "exact" }),
            supabase.from("profiles").select("id", { count: "exact" }).eq("role", "member"),
          ]);

          const orders = ordersRes.data || [];

          const totalOrders = orders.length;
          const totalDelivered = orders.filter((o) => o.status === "completed").length;
          const totalCanceled = orders.filter((o) => o.status === "cancelled").length;
          const totalRevenue = orders
            .filter((o) => o.status === "completed")
            .reduce((sum, o) => sum + Number(o.total_amount), 0);

          setStats({
            totalOrders,
            totalDelivered,
            totalCanceled,
            totalRevenue,
            totalProducts: productsRes.count || 0,
            totalCustomers: customersRes.count || 0,
          });

          // Chart data per day
          const dailyMap = {};
          orders
            .filter((o) => o.status === "completed")
            .forEach((o) => {
              const day = new Date(o.created_at).toLocaleDateString("id-ID", { weekday: "short" });
              dailyMap[day] = (dailyMap[day] || 0) + Number(o.total_amount);
            });

          const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          setChartData(
            days.map((day) => ({
              day,
              value: dailyMap[day] || 0,
            }))
          );
        } else {
          // === MEMBER DASHBOARD ===
          const { data: orders } = await supabase
            .from("orders")
            .select("*")
            .eq("customer_id", profile?.id);

          const myOrders = orders || [];
          const totalOrders = myOrders.length;
          const totalDelivered = myOrders.filter((o) => o.status === "completed").length;
          const totalCanceled = myOrders.filter((o) => o.status === "cancelled").length;
          const totalRevenue = myOrders
            .filter((o) => o.status === "completed")
            .reduce((sum, o) => sum + Number(o.total_amount), 0);

          setStats({ totalOrders, totalDelivered, totalCanceled, totalRevenue });
        }
      } catch (err) {
        console.error("Dashboard error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (profile) loadDashboard();
  }, [profile, isAdmin]);

  const nextTier = () => {
    if (!profile) return { name: "Bronze", pointsNeeded: 1000 };
    const points = profile.points || 0;
    if (points >= 5000) return { name: "Gold (Max)", pointsNeeded: 0, progress: 100 };
    if (points >= 1000) {
      return { name: "Gold", pointsNeeded: 5000 - points, progress: (points / 5000) * 100 };
    }
    return { name: "Silver", pointsNeeded: 1000 - points, progress: (points / 1000) * 100 };
  };

  const tierInfo = nextTier();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Dashboard"
        breadcrumb={
          isAdmin
            ? "Hi, Admin. Welcome back to Sedap Admin!"
            : `Hi, ${profile?.full_name || "Member"}. Welcome back!`
        }
      />

      {/* MEMBER: Points & Tier Card */}
      {!isAdmin && profile && (
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl p-6 text-white mb-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm opacity-80">Your Tier</p>
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <FiStar className="text-yellow-300" />
                {profile.tier || "Bronze"}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-80">Points</p>
              <p className="text-3xl font-bold">{profile.points ?? 0}</p>
            </div>
          </div>

          {tierInfo.progress < 100 && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Progress to {tierInfo.name}</span>
                <span>{tierInfo.pointsNeeded} pts needed</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-2.5">
                <div
                  className="bg-yellow-300 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(tierInfo.progress, 100)}%` }}
                ></div>
              </div>
            </div>
          )}

          {tierInfo.progress >= 100 && (
            <p className="text-sm opacity-90 flex items-center gap-1">
              <FiCheck /> Maximum tier reached!
            </p>
          )}
        </div>
      )}

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4">
          <div className="relative w-14 h-14 flex items-center justify-center bg-[#E6F7F2] rounded-full">
            <FiFileText className="text-[#1ABC9C]" size={22} />
            <div className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-red-500 rounded-full">
              <FiPlus className="text-white" size={12} />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">{stats.totalOrders}</h2>
            <p className="text-sm text-gray-500">Total Orders</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4">
          <div className="relative w-14 h-14 flex items-center justify-center bg-[#E6F7F2] rounded-full">
            <FiBox className="text-[#1ABC9C]" size={22} />
            <div className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-green-500 rounded-full">
              <FiCheck className="text-white" size={12} />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">{stats.totalDelivered}</h2>
            <p className="text-sm text-gray-500">Total Delivered</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4">
          <div className="relative w-14 h-14 flex items-center justify-center bg-[#E6F7F2] rounded-full">
            <FiX className="text-red-500" size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold">{stats.totalCanceled}</h2>
            <p className="text-sm text-gray-500">Total Canceled</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4">
          <div className="relative w-14 h-14 flex items-center justify-center bg-[#E6F7F2] rounded-full">
            <FiShoppingBag className="text-[#1ABC9C]" size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold">
              Rp {Number(stats.totalRevenue).toLocaleString("id-ID")}
            </h2>
            <p className="text-sm text-gray-500">Total Revenue</p>
          </div>
        </div>
      </div>

      {/* ADMIN: Extra stats row */}
      {isAdmin && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 flex items-center justify-center bg-purple-100 rounded-full">
              <FiBox className="text-purple-500" size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold">{stats.totalProducts}</h2>
              <p className="text-sm text-gray-500">Total Products</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 flex items-center justify-center bg-blue-100 rounded-full">
              <FiTrendingUp className="text-blue-500" size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold">{stats.totalCustomers}</h2>
              <p className="text-sm text-gray-500">Total Customers</p>
            </div>
          </div>
        </div>
      )}

      {/* CHARTS — hanya untuk Admin */}
      {isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* PIE CHART */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Order Distribution</h3>
            <div className="h-40 flex items-center justify-center">
              <PieChart width={200} height={150}>
                <Pie
                  data={[
                    { name: "Completed", value: stats.totalDelivered || 1 },
                    { name: "Pending", value: Math.max(stats.totalOrders - stats.totalDelivered - stats.totalCanceled, 1) },
                    { name: "Canceled", value: stats.totalCanceled || 1 },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={index} fill={color} />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>

          {/* LINE CHART */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Revenue Chart</h3>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="day" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#1ABC9C"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
