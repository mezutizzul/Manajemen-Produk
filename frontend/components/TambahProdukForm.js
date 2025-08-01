import { useState } from "react";

export default function TambahProdukForm({ onSimpan, onBatal, token }) {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!nama.trim() || !harga.trim()) {
    alert("Nama dan harga harus diisi!");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: nama.trim(),
        price: parseFloat(harga),
      }),
    });

    const data = await res.json();

    if (res.ok && data.id && data.name && data.price !== undefined) {
      // pastikan datanya valid sebelum kirim ke dashboard
      onSimpan(data);
      setNama("");
      setHarga("");
    } else {
      alert(data.message || "Gagal menambahkan produk");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Terjadi kesalahan saat menambahkan produk");
  }
};


  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-gray-50 p-4 rounded shadow">
      <div className="mb-2">
        <label className="block text-sm font-semibold mb-1">Nama Produk</label>
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-semibold mb-1">Harga</label>
        <input
          type="number"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
          className="w-full p-2 border rounded text-black"
          required
          min="1"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Simpan
        </button>
        <button
          type="button"
          onClick={onBatal}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
