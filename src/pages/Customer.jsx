import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../contexts/AuthContext";

export default function Customer() {
  const { isAdmin } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      // Admin melihat semua member; member hanya melihat profil sendiri
      let query = supabase.from("profiles").select("*");

      if (isAdmin) {
        query = query.eq("role", "member");
      } else {
        const { data: { user } } = await supabase.auth.getUser();
        query = query.eq("id", user.id);
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) throw error;
      setCustomers(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, [isAdmin]);

  const getTierBadge = (tier) => {
    const colors = {
      Gold: "bg-yellow-100 text-yellow-700",
      Silver: "bg-gray-100 text-gray-600",
      Bronze: "bg-orange-100 text-orange-700",
    };
    return colors[tier] || "bg-gray-100 text-gray-600";
  };

  return (
    <div>
      <PageHeader
        title={isAdmin ? "Customers" : "My Profile"}
        breadcrumb="Dashboard / Customer"
      />

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4">
          {error}
        </div>
      )}

      <div className="rounded-xl bg-white p-6 shadow overflow-x-auto">
        {loading ? (
          <div className="text-center py-8 text-gray-500">Memuat data...</div>
        ) : customers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {isAdmin ? "Belum ada customer terdaftar." : "Profil tidak ditemukan."}
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="py-3">Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Tier</th>
                <th>Points</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-3 font-medium">
                    {item.full_name || "-"}
                  </td>
                  <td className="py-3">{item.email}</td>
                  <td className="py-3">{item.phone || "-"}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getTierBadge(item.tier)}`}
                    >
                      {item.tier}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="font-semibold text-emerald-600">
                      {item.points ?? 0} pts
                    </span>
                  </td>
                  <td className="py-3 text-sm text-gray-500">
                    {new Date(item.created_at).toLocaleDateString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}