export default function ProdukTabel({ produk }) {
  return (
    <table className="min-w-full border rounded text-sm">
      <thead>
        <tr className="bg-gray-200 text-gray-700">
          <th className="py-2 px-4 text-left">Nama</th>
          <th className="py-2 px-4 text-left">Harga</th>
        </tr>
      </thead>
      <tbody>
        {produk.map((item) => (
          <tr key={item.id} className="border-t hover:bg-gray-50">
            <td className="py-2 px-4">{item.name}</td>
            <td className="py-2 px-4">Rp{Number(item.price).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
