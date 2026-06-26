import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

function Products() {
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openAddForm = () => {
    setEditId(null);
    setFormData({ name: "", description: "", price: "", stock: "" });
    setShowForm(true);
  };

  const openEditForm = (product) => {
    setEditId(product.id);
    setFormData({
      name: product.name,
      description: product.description || "",
      price: String(product.price),
      stock: String(product.stock),
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      };

      if (editId) {
        // Update
        const { error } = await supabase
          .from("products")
          .update(payload)
          .eq("id", editId);
        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase.from("products").insert([payload]);
        if (error) throw error;
      }

      setShowForm(false);
      loadProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;

    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      loadProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredProducts = products.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <PageHeader title="Products" breadcrumb="Dashboard / Products">
        {isAdmin && (
          <button
            onClick={openAddForm}
            className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            + Add Product
          </button>
        )}
      </PageHeader>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4">
          {error}
        </div>
      )}

      {/* FORM ADD / EDIT */}
      {showForm && isAdmin && (
        <div className="mb-6 rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold">
            {editId ? "Edit Product" : "Add Product"}
          </h2>
          <form onSubmit={handleSubmit} className="grid gap-4 max-w-lg">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              required
              className="rounded-lg border p-3"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              rows="2"
              className="rounded-lg border p-3"
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              required
              min="0"
              className="rounded-lg border p-3"
            />
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Stock"
              required
              min="0"
              className="rounded-lg border p-3"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                {editId ? "Update" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SEARCH */}
      <div className="mb-4 max-w-md">
        <input
          type="text"
          placeholder="Cari nama produk..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl bg-white p-6 shadow">
        {loading ? (
          <div className="text-center py-8 text-gray-500">Memuat produk...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Tidak ada produk.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="py-3">Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stock</th>
                {isAdmin && <th>Aksi</th>}
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">
                    <Link
                      to={`/products/${item.id}`}
                      className="text-emerald-500 hover:text-emerald-600 font-medium"
                    >
                      {item.name}
                    </Link>
                  </td>
                  <td className="py-3 text-gray-500 text-sm">
                    {item.description || "-"}
                  </td>
                  <td className="py-3">
                    Rp {Number(item.price).toLocaleString("id-ID")}
                  </td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        item.stock > 10
                          ? "bg-green-100 text-green-600"
                          : item.stock > 0
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.stock}
                    </span>
                  </td>
                  {isAdmin && (
                    <td className="py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditForm(item)}
                          className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Products;