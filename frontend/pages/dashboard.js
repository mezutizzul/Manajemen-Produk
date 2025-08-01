import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import TambahProdukForm from "@/components/TambahProdukForm";
import EditProdukModal from "@/components/EditProdukModal";

export default function Dashboard() {
  const [produk, setProduk] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProduk, setEditProduk] = useState(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setProduk(data);
      } catch (err) {
        console.error("Gagal fetch produk", err);
      }
    };

    fetchData();
  }, [token]);

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setProduk(produk.filter((item) => item.id !== id));
      } else {
        alert("Gagal menghapus produk");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menghapus");
    }
  };

  const handleUpdate = (updated) => {
    const updatedList = produk.map((item) =>
      item.id === updated.id ? updated : item
    );
    setProduk(updatedList);
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100 text-gray-900">
        <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Dashboard Produk</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Tambah Produk
            </button>
          </div>

          {showForm && (
            <TambahProdukForm
              onSimpan={(produkBaru) => setProduk([...produk, produkBaru])}
              onBatal={() => setShowForm(false)}
              token={token}
            />
          )}

          <table className="min-w-full border rounded text-sm">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-2 px-4 text-left">Nama</th>
                <th className="py-2 px-4 text-left">Harga</th>
                <th className="py-2 px-4 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {produk.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4">{item.name}</td>
                  <td className="py-2 px-4">Rp{Number(item.price).toLocaleString()}</td>
                  <td className="py-2 px-4 space-x-2">
                    <button
                      onClick={() => setEditProduk(item)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {editProduk && (
        <EditProdukModal
          produk={editProduk}
          onUpdate={handleUpdate}
          onClose={() => setEditProduk(null)}
          token={token}
        />
      )}
    </div>
  );
}
