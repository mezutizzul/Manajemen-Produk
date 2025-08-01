import { useState, useEffect } from "react";

export default function EditProdukModal({ produk, onUpdate, onClose, token }) {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");

  useEffect(() => {
    if (produk) {
      setNama(produk.name);
      setHarga(produk.price);
    }
  }, [produk]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/products/${produk.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: nama, price: parseFloat(harga) }),
      });
      const data = await res.json();
      if (res.ok) {
        onUpdate(data);
        onClose();
      } else {
        alert(data.message || "Gagal update");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Terjadi kesalahan saat update");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-sm text-black"
      >
        <h2 className="text-xl font-bold mb-4">Edit Produk</h2>
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama"
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="number"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
          placeholder="Harga"
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
