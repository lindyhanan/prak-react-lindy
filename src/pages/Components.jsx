import PageHeader from "../components/PageHeader";

import Button from "../components/Button";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";

import Container from "../components/Container";
import Footer from "../components/Footer";

import Card from "../components/Card";
import ProductCard from "../components/ProductCard";
import Table from "../components/Table";

export default function Components() {
  const headers = [
    "No",
    "Nama Produk",
    "Kategori",
    "Harga",
    "Aksi",
  ];

  const products = [
    {
      id: 1,
      name: "Laptop Asus",
      category: "Elektronik",
      price: "Rp 8.000.000",
    },
    {
      id: 2,
      name: "Sepatu Sport",
      category: "Fashion",
      price: "Rp 450.000",
    },
    {
      id: 3,
      name: "Jam Tangan",
      category: "Aksesoris",
      price: "Rp 799.000",
    },
  ];

  return (
    <div>
      <PageHeader
        title="Components"
        breadcrumb="Dashboard / Components"
      />

      {/* BUTTON */}
      <div className="flex gap-2 mt-4">
        <Button type="primary">Edit</Button>
        <Button type="success">Simpan</Button>
        <Button type="danger">Hapus</Button>
      </div>

      {/* BADGE */}
      <div className="flex gap-2 mt-4">
        <Badge type="success">Aktif</Badge>
        <Badge type="warning">Pending</Badge>
        <Badge type="danger">Nonaktif</Badge>
      </div>

      {/* AVATAR */}
      <div className="flex gap-2 mt-4">
        <Avatar name="Fikri" />
        <Avatar name="Hendra" />
        <Avatar name="Suci" />
      </div>

      {/* CARD */}
      <div className="mt-4">
        <Card>
          <h2 className="text-xl font-bold">
            Judul Card
          </h2>

          <p className="text-gray-600">
            Ini adalah isi dari card.
          </p>
        </Card>
      </div>

      {/* PRODUCT CARD */}
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <ProductCard
          image="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
          title="Sepatu Sport"
          category="Fashion"
          price="Rp 450.000"
          description="Sepatu sport modern dengan desain nyaman dan ringan."
        />

        <ProductCard
          image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
          title="Smartphone"
          category="Elektronik"
          price="Rp 4.500.000"
          description="Smartphone dengan performa cepat dan baterai tahan lama."
        />
      </div>

      {/* TABLE */}
      <div className="mt-6">
        <Table headers={headers}>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td className="border px-4 py-3">
                {index + 1}
              </td>

              <td className="border px-4 py-3">
                {product.name}
              </td>

              <td className="border px-4 py-3">
                {product.category}
              </td>

              <td className="border px-4 py-3">
                {product.price}
              </td>

              <td className="border px-4 py-3">
                <Button type="primary">
                  Detail
                </Button>
              </td>
            </tr>
          ))}
        </Table>
      </div>

      {/* CONTAINER */}
      <Container className="bg-gray-100 mt-6 rounded-xl">
        <h1 className="text-2xl font-bold">
          Container Component
        </h1>

        <p className="text-gray-600">
          Ini contoh penggunaan Container.
        </p>
      </Container>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}