export default function TailwindCSS() {
    return (
        <div className="min-h-screen bg-slate-50 antialiased">
            <FlexboxGrid/>
            
            {/* Bagian Hero / Header */}
            <div className="max-w-4xl mx-auto py-16 px-6">
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                    <h1 className="text-3xl md:text-4xl font-black text-blue-950 tracking-tight">
                        Belajar <span className="text-orange-400">Tailwind CSS 4</span>
                    </h1>
                    <button className="bg-blue-950 text-orange-300 font-bold
                                     px-8 py-4 rounded-2xl
                                     shadow-xl shadow-blue-950/20 
                                     hover:bg-blue-900 transition-all active:scale-95">
                        Click Me
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto space-y-12 pb-20 px-6">
                <Spacing/>
                <Typography/>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col justify-center space-y-4">
                        <BorderRadius/>
                    </div>
                    <BackgroundColors/>
                </div>
                <ShadowEffects/>
            </div>
        </div>
    )
}

function Spacing(){
    return (
        <div className="bg-blue-950 shadow-2xl shadow-blue-950/20 p-10 rounded-[2rem] border border-white/5 relative overflow-hidden group">
            <div className="relative z-10">
                <h2 className="text-white text-2xl font-bold tracking-tight">Card Title</h2>
                <p className="mt-4 text-orange-300 text-lg leading-relaxed opacity-90">
                    Ini adalah contoh penggunaan padding dan margin di Tailwind.
                </p>
            </div>
            {/* Aksen dekoratif */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-orange-300/10 rounded-full blur-3xl group-hover:bg-orange-300/20 transition-all duration-500"></div>
        </div>
    )
}

function Typography(){
    return (
        <div className="py-8 border-l-4 border-orange-300 pl-8">
            <h1 className="text-4xl md:text-5xl font-black text-blue-950 tracking-tighter">
                Tailwind Typography
            </h1>
            <p className="text-slate-500 text-xl mt-4 font-medium italic">
                Belajar Tailwind sangat menyenangkan dan cepat!
            </p>
        </div>
    )
}

function BorderRadius(){
    return (
        <div className="flex flex-wrap gap-4">
            <button className="border-2 border-orange-300 text-orange-300 font-bold
            bg-blue-950 px-8 py-3 rounded-l-full hover:bg-orange-300 hover:text-blue-950 transition-all"> 
                Klik Saya 
            </button>
            <button className="border-2 border-orange-300 text-orange-300 font-bold
            bg-blue-950 px-8 py-3 rounded-r-full hover:bg-orange-300 hover:text-blue-950 transition-all"> 
                Klik Saya 
            </button>
        </div>
    )
}

function BackgroundColors(){
    return(
        <div className="bg-orange-300 text-blue-950 p-10 rounded-[2rem] shadow-xl shadow-orange-300/20 flex flex-col justify-center">
            <h3 className="text-2xl font-extrabold tracking-tight">Tailwind Colors</h3>
            <p className="mt-4 font-bold text-blue-900/80 uppercase tracking-widest text-sm">
                Belajar Tailwind itu seru dan fleksibel!
            </p>
        </div>
    )
}

function FlexboxGrid(){
    return (
        <nav className="flex flex-wrap justify-between items-center bg-blue-950 px-8 py-5 text-white sticky top-0 z-50 shadow-lg border-b border-white/10">
            <h1 className="text-2xl text-orange-300 font-black tracking-tighter hover:scale-105 transition-transform cursor-pointer">
                MyWebsite
            </h1>
            <ul className="flex space-x-8 font-semibold text-white/80">
                <li><a href="#" className="hover:text-orange-300 transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-orange-300 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-orange-300 transition-colors">Contact</a></li>
            </ul>
            <h1 className="text-sm font-black text-red-400 bg-red-400/10 px-5 py-2 rounded-full border border-red-400/20 hover:bg-red-400 hover:text-white transition-all cursor-pointer uppercase tracking-widest">
                Logout
            </h1>
        </nav>
    )
}

function ShadowEffects(){
    return (
        <div className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(253,186,116,0.2)] p-10 rounded-[2.5rem] hover:rotate-2 transition-all duration-500 cursor-pointer border border-slate-50 group">
            <h3 className="text-2xl font-bold text-blue-950 group-hover:text-orange-400 transition-colors">Hover me!</h3>
            <p className="text-slate-500 mt-3 text-lg font-medium">
                Lihat efek bayangan saat hover.
            </p>
        </div>
    )
}