import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function ProductDetail() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true)
                const { data, error } = await supabase
                    .from("products")
                    .select("*")
                    .eq("id", id)
                    .single()

                if (error) throw error
                setProduct(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        loadProduct()
    }, [id])

    if (loading) return (
        <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        </div>
    )

    if (error) return (
        <div className="text-center p-12">
            <p className="text-red-600 mb-4">{error}</p>
            <Link to="/products" className="text-emerald-500 hover:underline">
                Kembali ke Products
            </Link>
        </div>
    )

    if (!product) return (
        <div className="text-center p-12">
            <p className="text-gray-500 mb-4">Produk tidak ditemukan</p>
            <Link to="/products" className="text-emerald-500 hover:underline">
                Kembali ke Products
            </Link>
        </div>
    )

    return (
        <div className="max-w-2xl mx-auto mt-6">
            <Link
                to="/products"
                className="text-sm text-gray-500 hover:text-emerald-500 mb-4 inline-block"
            >
                ← Kembali ke Products
            </Link>

            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                    {product.name}
                </h2>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="text-2xl font-bold text-emerald-600">
                            Rp {Number(product.price).toLocaleString("id-ID")}
                        </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Stock</p>
                        <p className="text-2xl font-bold text-gray-700">
                            {product.stock}
                        </p>
                    </div>
                </div>

                {product.description && (
                    <div className="mb-4">
                        <h3 className="font-semibold text-gray-700 mb-2">
                            Description
                        </h3>
                        <p className="text-gray-600">{product.description}</p>
                    </div>
                )}
            </div>
        </div>
    )
}