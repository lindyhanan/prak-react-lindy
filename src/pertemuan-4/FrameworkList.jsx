import frameworkData from "./framework.json";

export default function FrameworkList() {
  return (
    <div className="min-h-screen bg-[#5c94fc] p-8 font-mono">
      {/* Container Grid dengan perataan rapi */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {frameworkData.map((item) => (
          <div 
            key={item.id} 
            className="relative bg-white border-4 border-black p-1 shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all group"
          >
            {/* Aksen "Baut" di pojok balok (Rare Utility: Mix-blend-mode & Aspect Ratio) */}
            <div className="absolute top-2 left-2 w-2 h-2 bg-gray-300 rounded-full border border-black shadow-[1px_1px_0_rgba(0,0,0,1)]"></div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-gray-300 rounded-full border border-black shadow-[1px_1px_0_rgba(0,0,0,1)]"></div>

            <div className="p-4 pt-6">
              {/* Judul dengan font tebal & efek Upper Case */}
              <h2 className="text-xl font-black uppercase tracking-widest text-black border-b-4 border-dashed border-gray-200 pb-2 mb-4 group-hover:text-red-600 transition-colors">
                {item.name}
              </h2>

              <p className="text-sm font-medium text-gray-700 leading-tight mb-6">
                {item.description}
              </p>

              {/* Box Info (Developed By) mirip status bar game */}
              <div className="bg-[#e7e7d8] border-2 border-black p-2 mb-4 flex items-center gap-3"> 
                <div className="text-[10px] leading-none uppercase">
                  <p className="text-gray-500 mb-1">Developer</p>
                  <p className="font-bold text-black">{item.details.developer}</p>
                </div>
              </div>

              {/* Link bergaya "START" Button */}
              <a 
                href={item.details.officialWebsite} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full text-center bg-[#ff4500] hover:bg-[#cc3700] text-white py-2 border-x-4 border-b-4 border-black shadow-[0_4px_0_rgba(0,0,0,0.3)] active:shadow-none active:translate-y-1 font-bold uppercase text-xs transition-all"
              >
                Visit Website {item.details.releaseYear.toString()}
              </a>

              {/* Tags bergaya koin atau item */}
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="bg-yellow-300 border-2 border-black px-2 py-0.5 text-[9px] font-bold uppercase italic shadow-[2px_2px_0_rgba(0,0,0,1)]"
                  >
                    *{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lantai Brick di bawah (Hiasan tambahan) */}
      <div className="fixed bottom-0 left-0 w-full h-8 bg-[#944444] border-t-4 border-black" 
           style={{ backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(0,0,0,0.5) 50%)', backgroundSize: '40px 100%' }}>
      </div>
    </div>
  )
}