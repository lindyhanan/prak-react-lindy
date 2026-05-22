import React, { useState } from "react"; // PERBAIKAN 1: Sediakan useState di sini
import products from "../data/products";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";

function Products() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter produk berdasarkan apa yang diketik user di search bar (Aman dari null/undefined)
  const filteredProducts = products.filter((item) =>
    item.tittle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <PageHeader title="Products" breadcrumb="Dashboard / Products" />
      <h1 className="mb-4 text-xl font-bold">Halaman Products</h1>
      <div className="mb-4 max-w-md">
        <input
          type="text"
          placeholder="Cari nama produk..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>

      <div className="overflow-x-auto rounded-xl bg-white p-6 shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="py-3">Product ID</th>
              <th>Product Name</th>
              <th>Product Code</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="py-3">{item.id}</td>
                <td className="py-3">
                  <Link to={`/products/${item.id}`} className="text-emerald-400 hover:text-emerald-500">
                    {item.tittle}
                  </Link>
                </td>
                <td>{item.code}</td>
                <td>{item.category}</td>
                <td>Rp {item.price}</td>
                <td>{item.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;