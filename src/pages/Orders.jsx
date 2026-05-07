import { useState } from "react";
import PageHeader from "../components/PageHeader";
import orders from "../data/orders";

export default function Orders() {

  const [showForm, setShowForm] = useState(false);

  return (
    <div>

      {/* HEADER */}
      <PageHeader
        title="Orders"
        breadcrumb="Dashboard / Orders"
      >
        <button
          onClick={() => setShowForm(true)}
          className="rounded-lg bg-green-500 px-4 py-2 text-white"
        >
          Add Orders
        </button>
      </PageHeader>

      {/* FORM */}
      {showForm && (

        <div className="mb-6 rounded-xl bg-white p-6 shadow">

          <h2 className="mb-4 text-xl font-bold">
            Add Orders
          </h2>

          <div className="grid gap-4">

            <input
              type="text"
              placeholder="Order ID"
              className="rounded-lg border p-3"
            />

            <input
              type="text"
              placeholder="Customer Name"
              className="rounded-lg border p-3"
            />

            <select className="rounded-lg border p-3">

              <option>Pending</option>
              <option>Completed</option>
              <option>Cancelled</option>

            </select>

            <input
              type="number"
              placeholder="Total Price"
              className="rounded-lg border p-3"
            />

            <input
              type="date"
              className="rounded-lg border p-3"
            />

            <button className="rounded-lg bg-blue-500 px-4 py-2 text-white">
              Save Orders
            </button>

          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl bg-white p-6 shadow">

        <table className="w-full">

          <thead>
            <tr className="border-b text-left">

              <th className="py-3">Order ID</th>
              <th>Customer Name</th>
              <th>Status</th>
              <th>Total Price</th>
              <th>Order Date</th>

            </tr>
          </thead>

          <tbody>

            {orders.map((item) => (

              <tr
                key={item.orderId}
                className="border-b hover:bg-gray-50"
              >

                <td className="py-3">
                  {item.orderId}
                </td>

                <td>
                  {item.customerName}
                </td>

                <td>
                  {item.status}
                </td>

                <td>
                  Rp {item.totalPrice}
                </td>

                <td>
                  {item.orderDate}
                </td>

              </tr>
            ))}

          </tbody>
        </table>
      </div>

    </div>
  );
}