import { LogOut, Moon, Sun, Upload, User as UserIcon } from "lucide-react";
import logo from "@/assets/logo/claro_logo.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadModal } from "@/features/dashboard/components/UploadModal";
import { UserModal } from "@/features/dashboard/components/UserModal";
import type { User } from "@/shared/types/user";

export default function Topbar() {
    const navigate = useNavigate();
    const storedUser = localStorage.getItem("user");
    let user: User | null = null;

    if (storedUser) {
        user = JSON.parse(storedUser);
    }

    const [darkMode, setDarkMode] = useState(false);
    const [openUploadModal, setUploadModal] = useState(false);
    const [openInfoUserModal, setOpenInfoUserModal] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("tokenRVGC");
        navigate("/login");
    };

    const toggleTheme = () => {
        const newTheme = !darkMode;
        setDarkMode(newTheme);

        if (newTheme) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    const iconBtnClass =
        "group cursor-pointer p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200";

    return (
        <>
            <nav className="w-full h-16 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-sm border-b border-zinc-100 dark:border-zinc-800 flex items-center px-6 transition-all duration-300">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <img src={logo} alt="Claro Logo" className="h-9 object-contain" />
                </div>

                {/* User Area */}
                <div className="px-6 flex items-center gap-2">
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">Olá,</span>
                    <span className="text-sm font-semibold text-zinc-700 dark:text-white">
                        {user?.nome || ""}
                    </span>
                </div>

                {/* Buttons */}
                <div className="ml-auto flex items-center gap-1">
                    {/* Toggle Theme */}
                    <button onClick={toggleTheme} type="button" className={iconBtnClass} title={darkMode ? "Modo Claro" : "Modo Escuro"}>
                        {darkMode ? (
                            <Sun size={20} className="text-yellow-500 group-hover:text-yellow-400 transition-colors" />
                        ) : (
                            <Moon size={20} className="text-zinc-500 group-hover:text-zinc-700 transition-colors" />
                        )}
                    </button>

                    {/* Upload */}
                    {user?.permissoes === true && (
                        <button
                            onClick={() => setUploadModal(true)}
                            type="button"
                            className={iconBtnClass}
                            title="Upload"
                        >
                            <Upload size={20} className="text-zinc-500 dark:text-zinc-400 group-hover:text-red-500 transition-colors" />
                        </button>
                    )}

                    {/* User */}
                    <button
                        onClick={() => setOpenInfoUserModal(true)}
                        className={iconBtnClass}
                        title="Perfil"
                    >
                        <UserIcon size={20} className="text-zinc-500 dark:text-zinc-400 group-hover:text-red-500 transition-colors" />
                    </button>

                    {/* Logout */}
                    <button onClick={logout} className={iconBtnClass} title="Sair">
                        <LogOut size={20} className="text-zinc-500 dark:text-zinc-400 group-hover:text-red-500 transition-colors" />
                    </button>
                </div>
            </nav>

            <UploadModal open={openUploadModal} onClose={() => setUploadModal(false)} />
            <UserModal
                open={openInfoUserModal}
                onClose={() => setOpenInfoUserModal(false)}
                user={user as User}
            />
        </>
    );
}