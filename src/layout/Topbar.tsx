import { LogOut } from "lucide-react";
import logo from "../assets/logo/claro_logo.png";

export default function Topbar() {
    return (
        <div className="flex items-center justify-between px-6 py-3 bg-white shadow-sm">
            {/* Logo */}
            <div>
                <img 
                    src={logo}
                    alt="Logo"
                    className="h-10 object-contain"
                />
            </div>

            {/* User Area */}
            <div className="flex items-center gap-3">
                <div className="flex flex-col leading-tight">
                <span className="text-xs text-gray-400">Bem-vindo</span>
                <span className="text-sm font-semibold text-gray-800">
                    Victor Oliveira
                </span>
                </div>
            </div>

        {/* LOGOUT AREA */}
        <div>
            <button type="button" className="cursor-pointer flex items-center gap-2 px-4 py-2 text-red-600 rounded-md hover:bg-red-50 transition">
            <LogOut size={18} />
            </button>
        </div>

        </div>
    );
}