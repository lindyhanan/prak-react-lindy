import { useState } from "react";
import courseData from "../data/course.json";

export default function CourseAdmin() {
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedCategory: "",
    selectedLevel: ""
  });

  const handleChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  const filteredData = courseData.filter((item) => {
    const search = dataForm.searchTerm.toLowerCase();
    const matchSearch = item.title.toLowerCase().includes(search) || item.category.
    toLowerCase().includes(search);
    const matchCategory = dataForm.selectedCategory ? item.category === dataForm.selectedCategory : true;
    const matchLevel = dataForm.selectedLevel ? item.level === dataForm.selectedLevel : true;
    return matchSearch && matchCategory && matchLevel;
  });

  const categories = [...new Set(courseData.map(item => item.category))];
  const levels = [...new Set(courseData.map(item => item.level))];

return (
<div className="min-h-screen bg-gradient-to-br from-+rose-50 via-pink-50 to-pink-100 p-4 md:p-8 w-full">

  <div className="w-full px-4 md:px-8">

    {/* HEADER */}
    <div className="p-2 mb-6">
  <div className="bg-pink-50 border-2 border-pink-200 p-6 rounded-xl shadow-sm">
    
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
      
      <h1 className="text-xl md:text-2xl font-bold text-pink-600">
        DATA ADMIN COURSE
      </h1>

      <div className="text-sm text-pink-500">
        Total Data:{" "}
        <span className="font-semibold text-pink-600">
          {filteredData.length}
        </span>
      </div>

    </div>

  </div>
</div>

    {/* FILTER */}
    <div className="p-2 mb-6">
  <div className="bg-white border-2 border-pink-200 p-4 rounded-xl shadow-sm 
                  grid grid-cols-1 md:grid-cols-3 gap-3">

    <input
      name="searchTerm"
      onChange={handleChange}
      placeholder="Search..."
      className="p-2 border border-pink-200 rounded-lg outline-none 
                 focus:ring-2 focus:ring-pink-400 text-sm"
    />

    <select
      name="selectedCategory"
      onChange={handleChange}
      className="p-2 border border-pink-200 rounded-lg text-sm 
                 focus:ring-2 focus:ring-pink-400"
    >
      <option value="">All Category</option>
      {categories.map((cat, i) => (
        <option key={i} value={cat}>{cat}</option>
      ))}
    </select>

    <select
      name="selectedLevel"
      onChange={handleChange}
      className="p-2 border border-pink-200 rounded-lg text-sm 
                 focus:ring-2 focus:ring-pink-400"
    >
      <option value="">All Level</option>
      {levels.map((lvl, i) => (
        <option key={i} value={lvl}>{lvl}</option>
      ))}
    </select>

  </div>
</div>

    {/* TABLE */}
    <div className="bg-white rounded-xl shadow-sm border-2 border-pink-200 hover:border-pink-300 transition w-full overflow-x-auto">

      <table className="w-full text-sm">

        <thead className="bg-pink-50 text-pink-600 uppercase text-xs">
          <tr>
            <th className="p-3 text-left">Course</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Level</th>
            <th className="p-3 text-left">Instructor</th>
            <th className="p-3 text-left">Price</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id} className="border-t border-pink-100 hover:bg-pink-50 transition">

              {/* COURSE */}
              <td className="p-3">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    className="w-10 h-10 object-cover rounded-md border border-pink-100"
                  />
                  <span className="font-medium text-slate-700">
                    {item.title}
                  </span>
                </div>
              </td>

              <td className="p-3 text-slate-600">{item.category}</td>

              <td className="p-3">
                <span className="px-2 py-1 text-xs rounded bg-pink-100 text-pink-600">
                  {item.level}
                </span>
              </td>

              <td className="p-3 text-slate-600">
                {item.details.instructor}
              </td>

              <td className="p-3 font-semibold text-pink-600">
                Rp {item.price.toLocaleString("id-ID")}
              </td>

            </tr>
          ))}
        </tbody>

      </table>

      {/* EMPTY */}
      {filteredData.length === 0 && (
        <div className="text-center p-6 text-pink-400">
          Data tidak ditemukan
        </div>
      )}

    </div>

  </div>
</div>
);
}