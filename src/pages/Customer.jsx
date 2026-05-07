import { useState } from "react";
import PageHeader from "../components/PageHeader";
import customers from "../data/customers";

export default function Customer() {

  const [showForm, setShowForm] = useState(false);

  return (
    <div>

      {/* HEADER */}
      <PageHeader
        title="Customers"
        breadcrumb="Dashboard / Customers"
      >
        <button
          onClick={() => setShowForm(true)}
          className="rounded-lg bg-green-500 px-4 py-2 text-white"
        >
          Add Customer
        </button>
      </PageHeader>

      {/* FORM */}
      {showForm && (

        <div className="mb-6 rounded-xl bg-white p-6 shadow">

          <h2 className="mb-4 text-xl font-bold">
            Add Customer
          </h2>

          <div className="grid gap-4">

            <input
              type="text"
              placeholder="Customer ID"
              className="rounded-lg border p-3"
            />

            <input
              type="text"
              placeholder="Customer Name"
              className="rounded-lg border p-3"
            />

            <input
              type="email"
              placeholder="Email"
              className="rounded-lg border p-3"
            />

            <input
              type="text"
              placeholder="Phone"
              className="rounded-lg border p-3"
            />

            <select className="rounded-lg border p-3">

              <option>Bronze</option>
              <option>Silver</option>
              <option>Gold</option>

            </select>

            <button className="rounded-lg bg-blue-500 px-4 py-2 text-white">
              Save Customer
            </button>

          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="rounded-xl bg-white p-6 shadow overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="border-b text-left">

              <th className="py-3">Customer ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Loyalty</th>

            </tr>
          </thead>

          <tbody>

            {customers.map((item) => (

              <tr
                key={item.customerId}
                className="border-b hover:bg-gray-50"
              >

                <td className="py-3">
                  {item.customerId}
                </td>

                <td>
                  {item.customerName}
                </td>

                <td>
                  {item.email}
                </td>

                <td>
                  {item.phone}
                </td>

                <td>
                  {item.loyalty}
                </td>

              </tr>
            ))}

          </tbody>
        </table>
      </div>

    </div>
  );
}