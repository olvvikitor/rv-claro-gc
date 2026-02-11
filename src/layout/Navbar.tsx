import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  if (!user) return null;

  return (
    <nav className="w-full border-b bg-white px-6 py-4 flex justify-between shadow-sm">

      {/* Lado direito */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700">
          Olá, <strong>{user.name}</strong>
        </span>

        <button
          onClick={handleLogout}
          className="px-3 py-1.5 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800 transition"
        >
          Sair
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
