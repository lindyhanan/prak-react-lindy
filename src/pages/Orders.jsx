import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../contexts/AuthContext";
import { FiShoppingBag } from "react-icons/fi";

export default function Orders() {
  const { isAdmin, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Checkout form
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");

      let query = supabase
        .from("orders")
        .select("*, profiles:customer_id(full_name, email), order_items(*, product:product_id(name, price))");

      if (!isAdmin) {
        query = query.eq("customer_id", user.id);
      }

      const { data, error } = await query.order("created_at", { ascending: false });
      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      const { data } = await supabase.from("products").select("id, name, price, stock").order("name");
      setProducts(data || []);
    } catch (err) {
      console.warn("Gagal memuat produk:", err.message);
    }
  };

  useEffect(() => {
    loadOrders();
    loadProducts();
  }, [isAdmin, user]);

  // ─── CART / CHECKOUT ─────────────────────────────────

  const addToCart = () => {
    if (!selectedProduct) return;
    const product = products.find((p) => p.id === selectedProduct);
    if (!product) return;

    // Hitung total qty yang sudah di cart untuk produk ini
    const existingQty = cart.find((item) => item.product_id === selectedProduct)?.quantity || 0;
    const totalQty = existingQty + quantity;

    if (totalQty > product.stock) {
      setError(`Stok ${product.name} hanya ${product.stock}. Tidak bisa menambahkan ${quantity} lagi.`);
      return;
    }

    setError("");

    setCart((prev) => {
      const exist = prev.find((item) => item.product_id === selectedProduct);
      if (exist) {
        return prev.map((item) =>
          item.product_id === selectedProduct
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          product_id: product.id,
          name: product.name,
          price: Number(product.price),
          quantity,
        },
      ];
    });

    setSelectedProduct("");
    setQuantity(1);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product_id !== productId));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      setError("Pilih minimal 1 produk.");
      return;
    }

    setError("");

    try {
      // 0. Pastikan profile user ada (untuk foreign key)
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();

      if (!existingProfile) {
        // Buat profile otomatis jika belum ada
        const { error: profileError } = await supabase
          .from("profiles")
          .insert([{
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || "User",
            role: "member",
            tier: "Bronze",
            points: 0,
          }]);

        if (profileError) throw profileError;
      }

      // 1. Insert order
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([{ customer_id: user.id, total_amount: totalAmount }])
        .select();

      if (orderError) throw orderError;

      const orderId = orderData[0].id;

      // 2. Insert order_items
      const items = cart.map((item) => ({
        order_id: orderId,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase.from("order_items").insert(items);
      if (itemsError) throw itemsError;

      setShowForm(false);
      setCart([]);
      loadOrders();
    } catch (err) {
      setError(err.message);
    }
  };

  // ─── ADMIN: COMPLETE / CANCEL ─────────────────────────

  const completeOrder = async (order) => {
    try {
      const pointsEarned = Math.floor(Number(order.total_amount) / 10000);

      // 1. Ambil order items untuk kurangi stok
      const { data: items, error: itemsError } = await supabase
        .from("order_items")
        .select("product_id, quantity")
        .eq("order_id", order.id);

      if (itemsError) throw itemsError;

      // 2. Kurangi stok setiap produk
      for (const item of items || []) {
        const { data: product } = await supabase
          .from("products")
          .select("stock")
          .eq("id", item.product_id)
          .single();

        if (product) {
          const newStock = Math.max(0, product.stock - item.quantity);
          await supabase
            .from("products")
            .update({ stock: newStock })
            .eq("id", item.product_id);
        }
      }

      // 3. Update order status + points
      const { error: updateError } = await supabase
        .from("orders")
        .update({ status: "completed", points_earned: pointsEarned })
        .eq("id", order.id);

      if (updateError) throw updateError;

      // 4. Ambil data profile customer saat ini
      const { data: customerProfile } = await supabase
        .from("profiles")
        .select("points")
        .eq("id", order.customer_id)
        .single();

      const currentPoints = customerProfile?.points || 0;
      const newPoints = currentPoints + pointsEarned;

      // 5. Tentukan tier baru
      let newTier = "Bronze";
      if (newPoints >= 5000) newTier = "Gold";
      else if (newPoints >= 1000) newTier = "Silver";

      // 6. Update profile customer
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ points: newPoints, tier: newTier })
        .eq("id", order.customer_id);

      if (profileError) throw profileError;

      loadOrders();
    } catch (err) {
      setError(err.message);
    }
  };

  const cancelOrder = async (id) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: "cancelled" })
        .eq("id", id);

      if (error) throw error;
      loadOrders();
    } catch (err) {
      setError(err.message);
    }
  };

  // ─── UI HELPERS ───────────────────────────────────────

  const getStatusBadge = (status) => {
    const colors = {
      completed: "bg-green-100 text-green-600",
      pending: "bg-yellow-100 text-yellow-600",
      cancelled: "bg-red-100 text-red-600",
    };
    return colors[status] || "bg-gray-100 text-gray-600";
  };

  const itemCount = (order) => {
    return order.order_items?.length || 0;
  };

  return (
    <div>
      <PageHeader title="Orders" breadcrumb="Dashboard / Orders">
        {!isAdmin && (
          <button
            onClick={() => {
              setShowForm(true);
              setCart([]);
            }}
            className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            + New Order
          </button>
        )}
      </PageHeader>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4">
          {error}
        </div>
      )}

      {/* ─── CHECKOUT FORM ─────────────────────────────── */}
      {showForm && !isAdmin && (
        <div className="mb-6 rounded-xl bg-white p-6 shadow-lg border border-gray-100">
          {/* HEADER */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <FiShoppingBag className="text-emerald-600" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">New Order</h2>
              <p className="text-sm text-gray-400">Select products to order</p>
            </div>
          </div>

          {/* Product Selector */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-600 mb-1.5">
                  🏷️ Product
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 p-3 bg-white focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none"
                >
                  <option value="">-- Pilih Produk --</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — Rp {Number(p.price).toLocaleString("id-ID")} (📦 {p.stock})
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-24">
                <label className="block text-sm font-semibold text-gray-600 mb-1.5">
                  🔢 Qty
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full rounded-lg border border-gray-200 p-3 bg-white focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none"
                />
              </div>
              <button
                type="button"
                onClick={addToCart}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-lg transition-colors shadow-sm"
              >
                + Tambah
              </button>
            </div>
          </div>

          {/* Cart Items */}
          {cart.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                🛒 Cart Items ({cart.length})
              </h3>
              <div className="border border-gray-100 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr className="text-left text-gray-500">
                      <th className="py-3 px-4 font-medium">Product</th>
                      <th className="py-3 px-4 font-medium">Price</th>
                      <th className="py-3 px-4 font-medium">Qty</th>
                      <th className="py-3 px-4 font-medium">Subtotal</th>
                      <th className="py-3 px-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {cart.map((item) => (
                      <tr key={item.product_id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{item.name}</td>
                        <td className="py-3 px-4">Rp {item.price.toLocaleString("id-ID")}</td>
                        <td className="py-3 px-4">
                          <span className="bg-gray-100 px-2.5 py-0.5 rounded-full text-xs font-medium">
                            {item.quantity}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-emerald-600">
                          Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => removeFromCart(item.product_id)}
                            className="text-red-400 hover:text-red-600 transition-colors text-xs font-medium"
                          >
                            ✕ Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary Card */}
              <div className="mt-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl p-5 text-white">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm opacity-80">Total Belanja</p>
                    <p className="text-2xl font-bold">
                      Rp {totalAmount.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Poin yang Didapat</p>
                    <p className="text-2xl font-bold flex items-center gap-1">
                      ⭐ {Math.floor(totalAmount / 10000)}
                    </p>
                    <p className="text-xs opacity-70">
                      (Rp 10.000 = 1 poin)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {cart.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <FiShoppingBag className="mx-auto mb-2" size={32} />
              <p>Belum ada produk dipilih</p>
              <p className="text-xs mt-1">Pilih produk dan klik + Tambah</p>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ✅ Checkout Sekarang
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setCart([]);
              }}
              className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* ─── ORDERS TABLE ──────────────────────────────── */}
      <div className="overflow-x-auto rounded-xl bg-white p-6 shadow">
        {loading ? (
          <div className="text-center py-8 text-gray-500">Memuat orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Belum ada order.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="py-3">Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Points</th>
                <th>Date</th>
                {isAdmin && <th>Aksi</th>}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <>
                  <tr
                    key={order.id}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() =>
                      setExpandedOrder(expandedOrder === order.id ? null : order.id)
                    }
                  >
                    <td className="py-3">
                      <div>
                        <p className="font-medium">
                          {order.profiles?.full_name || "Unknown"}
                        </p>
                        <p className="text-xs text-gray-400">
                          {order.profiles?.email || ""}
                        </p>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="text-sm text-gray-500">
                        {itemCount(order)} item{itemCount(order) !== 1 ? "s" : ""}
                      </span>
                    </td>
                    <td className="py-3 font-semibold">
                      Rp {Number(order.total_amount).toLocaleString("id-ID")}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-500">
                      {order.points_earned ?? "-"} pts
                    </td>
                    <td className="py-3 text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString("id-ID")}
                    </td>
                    {isAdmin && (
                      <td className="py-3">
                        {order.status === "pending" && (
                          <div className="flex gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                completeOrder(order);
                              }}
                              className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded hover:bg-green-200"
                            >
                              Complete
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                cancelOrder(order.id);
                              }}
                              className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </td>
                    )}
                  </tr>

                  {/* Expanded: Order Items */}
                  {expandedOrder === order.id && order.order_items?.length > 0 && (
                    <tr key={`${order.id}-items`}>
                      <td colSpan={isAdmin ? 7 : 6} className="bg-gray-50 p-4">
                        <h4 className="font-semibold text-sm text-gray-600 mb-2">Order Items</h4>
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b text-gray-500">
                              <th className="py-1 text-left">Product</th>
                              <th className="py-1 text-left">Price</th>
                              <th className="py-1 text-left">Qty</th>
                              <th className="py-1 text-left">Subtotal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.order_items.map((item) => (
                              <tr key={item.id}>
                                <td className="py-1">{item.product?.name || "-"}</td>
                                <td className="py-1">
                                  Rp {Number(item.price).toLocaleString("id-ID")}
                                </td>
                                <td className="py-1">{item.quantity}</td>
                                <td className="py-1">
                                  Rp {(Number(item.price) * item.quantity).toLocaleString("id-ID")}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
