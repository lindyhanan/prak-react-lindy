export default function InputField({ label, type, placeholder }) {
    return(
        <div className="mb-3">
            <label className="block text-red-700 font-medium mb-1" htmlFor="">
                {label}
            </label>
            <input type={type}
             placeholder={placeholder}
             className="w-full p-2 border
            border-gray-300 rounded mb-2"
             />
        </div>
    );
}