import { useState } from "react";
import frameworkData from "./framework.json";

export default function FrameworkListSearchFilter() {
  /** Deklrasai state **/
  // const [searchTerm, setSearchTerm] = useState("");
  // const [selectedTag, setSelectedTag] = useState("");

  const [dataForm, setDataForm] = useState({
			searchTerm: "",
			selectedTag: "",
			/*Tambah state lain beserta default value*/
			});
		
		/*Inisialisasi Handle perubahan nilai input form*/
		const handleChange = (evt) => {
			const { name, value } = evt.target;
			setDataForm({
				...dataForm,
				[name]: value,
			});
		};

  /** Deklrasai Logic Search & Filter **/
  const _searchTerm = dataForm.searchTerm.toLowerCase();
  const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.name.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm);
    const matchesTag = dataForm.selectedTag
      ? framework.tags.includes(dataForm.selectedTag)
      : true;
    return matchesSearch && matchesTag;
  });
  /** Deklarasi pengambilan unique tags di frameworkData **/
  const allTags = [
    ...new Set(frameworkData.flatMap((framework) => framework.tags)),
  ];

  return (
    <div className="min-h-screen bg-[#fff5f8] p-8 font-sans text-[#5a4a5a]">
      <p className="text-4xl md:text-5xl font-black text-[#ff8fab] tracking-tight drop-shadow-sm">
          <center>✨ Explore Framework ✨</center>
        </p>
        <div className="h-1.5 w-24 bg-[#ffc2d1] rounded-full mx-auto mt-3"></div>
    
      {/* Container Grid dengan perataan rapi */}
      <input
        type="text"
        name="searchTerm"
        placeholder="Search framework..."
        className="w-full p-2 border border-gray-300 rounded mb-4"
        onChange={handleChange}
      />

      <select
        name="selectedTag"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        onChange={handleChange}
      >
        <option value="">All Tags</option>
        {allTags.map((tag, index) => (
          <option key={index} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFrameworks.map((item) => (
          <div
            key={item.id}
            className="relative bg-white rounded-[2rem] p-2 shadow-lg shadow-pink-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-4 border-white"
          >
            {/* Dekorasi Bulatan Kecil ala "Peach" */}
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-pink-200 rounded-full opacity-50 blur-xl"></div>
            
            <div className="p-6">
              {/* Judul dengan gaya Soft & Rounded */}
              <h2 className="text-2xl font-bold tracking-tight text-[#ff8fab] mb-2 text-center">
                ✨ {item.name} ✨
              </h2>

              <p className="text-sm font-medium text-gray-500 leading-relaxed mb-6 text-center italic">
                "{item.description}"
              </p>

              {/* Box Info (Developed By) gaya kartu kecil lucu */}
              <div className="bg-purple-50 rounded-2xl p-3 mb-5 flex items-center justify-center gap-2 border border-purple-100">
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-widest text-purple-400 font-bold">Created By</p>
                  <p className="font-semibold text-purple-600">
                    {item.details.developer}
                  </p>
                </div>
              </div>

              {/* Link bergaya Bubble Button */}
              <a
                href={item.details.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-[#ffc2d1] hover:bg-[#ff8fab] text-white py-3 rounded-full shadow-md shadow-pink-100 font-bold text-sm transition-colors duration-300"
              >
                Visit Website ({item.details.releaseYear.toString()})
              </a>

              {/* Tags bergaya permen (Pills) */}
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-[10px] font-bold border border-yellow-200"
                  >
                    # {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dekorasi Gelombang/Soft Footer di bawah */}
      <div
        className="fixed bottom-0 left-0 w-full h-12 bg-white/60 backdrop-blur-sm border-t border-pink-100 flex items-center justify-center"
      >
        <span className="text-pink-300 text-xs font-bold tracking-[0.2em] uppercase">
          Make with Love &amp; Magic ✨
        </span>
      </div>
    </div>
  );
}