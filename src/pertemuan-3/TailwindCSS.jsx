export default function TailwindCSS() {
    return (
        <>
        <FlexboxGrid/>
        <div>
            <h1 className="border m-4">Belajar Tailwind CSS 4</h1>
            <button className="bg-blue-900 text-orange-300
                                px-4 py-2 mx-4 rounded
                                shadow-lg">Click Me</button>
        </div>
        <Spacing/>
        <Typography/>
        <BorderRadius/>
        <BackgroundColors/>
        <ShadowEffects/>
        </>
    )
}
function Spacing(){
    return (
        <div className="bg-blue-950 shadow-lg p-6 m-8 rounded-lg">
            <h2 className="text-white text-lg font-semibold">Card Title</h2>
            <p className="mt-2 text-orange-300">Ini adalah contoh penggunaan padding dan margin di Tailwind.</p>
        </div>
    )
}
function Typography(){
    return (
        <div className="m-4">
            <h1 className="text-3xl font-extrabold text-blue-950">Tailwind Typography</h1>
            <p className="text-gray-600 text-lg mt-2">Belajar Tailwind sangat menyenangkan dan cepat!</p>
        </div>
    )
}
function BorderRadius(){
    return (
        <>
        <button className="border-2 border-orange-300 text-orange-300 ml-4
        bg-blue-950 px-4 py-2 rounded-l-3xl"> Klik Saya </button>
        <button className="border-2 border-orange-300 text-orange-300 ml-4
        bg-blue-950 px-4 py-2 rounded-r-3xl"> Klik Saya </button>
        </>
    )
}
function BackgroundColors(){
    return(
        <div className="m-4 bg-orange-300 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Tailwind Colors</h3>
            <p className="mt-2">Belajar Tailwind itu seru dan fleksibel!</p>
        </div>
    )
}
function FlexboxGrid(){
    return (
        <nav className="flex justify-between bg-blue-950 p-4 text-white">
            <h1 className="text-lg text-orange-300 font-bold">MyWebsite</h1>
            <ul className="flex space-x-4 text-white">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
            <h1 className="text-lg text-red-400 font-bold">Logout</h1>
        </nav>
    )
}
function ShadowEffects(){
    return (
        <div className="bg-white shadow-lg p-6 rounded-lg hover:rotate-3 transition">
            <h3 className="text-xl font-semibold">Hover me!</h3>
            <p className="text-gray-600 mt-2">Lihat efek bayangan saat hover.</p>
        </div>
    )
}

