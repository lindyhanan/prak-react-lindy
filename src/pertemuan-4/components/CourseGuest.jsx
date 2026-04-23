import { useState } from "react";
import courseData from "../data/course.json";

export default function CourseGuest() {
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedCategory: "",
    selectedLevel: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value
    });
  };

  const filteredData = courseData.filter((item) => {
    const search = dataForm.searchTerm.toLowerCase();

    const matchSearch =
      item.title.toLowerCase().includes(search) ||
      item.category.toLowerCase().includes(search);

    const matchCategory = dataForm.selectedCategory
      ? item.category === dataForm.selectedCategory
      : true;

    const matchLevel = dataForm.selectedLevel
      ? item.level === dataForm.selectedLevel
      : true;

    return matchSearch && matchCategory && matchLevel;
  });

  const categories = [...new Set(courseData.map((item) => item.category))];
  const levels = [...new Set(courseData.map((item) => item.level))];

  return (
  <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white p-6">

  <div className="w-full px-4 md:px-8 lg:px-12">

    {/* HEADER */}
    <div className="p-2 mb-6">
  <div className="bg-pink-50 border-2 border-pink-200 p-6 rounded-xl shadow-sm">
    
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
      
      <h1 className="text-xl md:text-2xl font-bold text-pink-600">
        Halo! Selamat datang di Course Kami!
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
    <div className="p-2 mb-8">
  <div className="bg-white/80 backdrop-blur border-2 border-pink-200 p-4 rounded-xl shadow-sm 
                  grid grid-cols-1 md:grid-cols-3 gap-4">

    <input
      name="searchTerm"
      onChange={handleChange}
      placeholder="Search courses..."
      className="px-4 py-2 border border-pink-200 rounded-xl outline-none 
                 focus:ring-2 focus:ring-pink-400 text-sm"
    />

    <select
      name="selectedCategory"
      onChange={handleChange}
      className="px-4 py-2 border border-pink-200 rounded-xl text-sm 
                 focus:ring-2 focus:ring-pink-400"
    >
      <option value="">All Category</option>
      {categories.map((cat, i) => (
        <option key={i}>{cat}</option>
      ))}
    </select>

    <select
      name="selectedLevel"
      onChange={handleChange}
      className="px-4 py-2 border border-pink-200 rounded-xl text-sm 
                 focus:ring-2 focus:ring-pink-400"
    >
      <option value="">All Level</option>
      {levels.map((lvl, i) => (
        <option key={i}>{lvl}</option>
      ))}
    </select>

  </div>
</div>

    {/* GRID */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

      {filteredData.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl overflow-hidden border-2 border-pink-200 
           shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300"
        >

          {/* IMAGE */}
          <div className="overflow-hidden">
            <img
              src={item.image}
              className="w-full h-44 object-cover hover:scale-110 transition duration-500"
            />
          </div>

          {/* CONTENT */}
          <div className="p-5">

            <h2 className="text-base font-semibold text-slate-800 mb-1 line-clamp-1">
              {item.title}
            </h2>

            {/* BADGE */}
            <div className="flex gap-2 mb-3 text-xs">
              <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded-md font-medium">
                {item.category}
              </span>
              <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                {item.level}
              </span>
            </div>

            <p className="text-sm text-slate-500 mb-4">
              {item.details.instructor}
            </p>

            {/* FOOTER */}
            <div className="flex justify-between items-center">

              <span className="text-yellow-500 text-sm">
                ⭐ {item.details.rating}
              </span>

              <span className="text-lg font-bold text-pink-600">
                Rp {item.price.toLocaleString("id-ID")}
              </span>

            </div>

          </div>

        </div>
      ))}

    </div>

    {/* EMPTY */}
    {filteredData.length === 0 && (
      <div className="text-center mt-16 text-slate-400 text-lg">
        Data tidak ditemukan 😢
      </div>
    )}

  </div>
</div>
);
}