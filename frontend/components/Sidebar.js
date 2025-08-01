// components/Sidebar.js
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="w-64 bg-blue-900 text-white min-h-screen p-6">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-4">
        <li>
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full text-left hover:underline"
          >
            Dashboard Produk
          </button>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="w-full text-left hover:underline"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
