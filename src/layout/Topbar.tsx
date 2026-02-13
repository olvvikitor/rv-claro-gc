import { LogOut, Moon, Sun, User } from "lucide-react";
import logo from "../assets/logo/claro_logo.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react"
import { UploadModal } from "./ModalUpload";
import { UserModal } from "./ModalUser";
export type User = {
  id: string
  matricula: string
  nome: string
  email: string
  supervisor: string
  coordenador: string
  operacao: string
  site: string
  exp: number
  permissoes: boolean
}

export default function Topbar() {
    const navigate = useNavigate()
    const storedUser = localStorage.getItem("user")
    let user:User | null = null

    if (storedUser) {
    user = JSON.parse(storedUser)
    }

    const [darkMode, setDarkMode] = useState(false)

    const [openUploadModal, setUploadModal] = useState(false)
    const [openInfoUserModal, setOpenInfoUserModal] = useState(false)

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme")
        if (savedTheme === "dark") {
            setDarkMode(true)
            document.documentElement.classList.add("dark")
        }
    }, [])

    const logout = () =>{
        localStorage.removeItem("user")
        localStorage.removeItem("tokenRVGC")
        navigate('/login')
    }

    const toggleTheme = () => {
        const newTheme = !darkMode
        setDarkMode(newTheme)

        if (newTheme) {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
        } else {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
        }
    }



    return (
        <>
        <nav className="w-full h-16 bg-white dark:bg-zinc-800 shadow flex items-center px-6 transition-colors">

            {/* Logo */}
            <div>
                <img
                    src={logo}
                    alt="Logo"
                    className="h-10 object-contain"
                />
            </div>

            {/* User Area */}
            <div className="px-6 flex items-center gap-3">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                    Olá,
                </span>
                <span className="text-sm font-semibold text-gray-800 dark:text-white">
                {user?.nome || ""}
                </span>
            </div>

            {/* Buttons */}
            <div className="ml-auto flex items-center gap-2">

                {/* Toggle Theme */}
                <button
                    onClick={toggleTheme}
                    type="button"
                    className="group cursor-pointer p-2 rounded-md hover:bg-gray-500 dark:hover:bg-zinc-300 transition"
                >
                    {darkMode ? (
                        <Sun size={23} className="group-hover:text-red-600 w-5 h-5 text-yellow-500" />
                    ) : (
                        <Moon size={23} className="group-hover:text-red-600 w-5 h-5 text-zinc-600 dark:text-white" />
                    )}
                </button>

                {/* Toggle Modal */}
                {user?.permissoes === true &&(
                <button
                    onClick={()=>setUploadModal(true)}
                    type="button"
                    className="group cursor-pointer p-2 rounded-md hover:bg-gray-500 dark:hover:bg-zinc-300 transition"
                >
                <Upload size={23} className="group-hover:text-red-600 text-gray-700 dark:text-white"></Upload>
                </button>
                )}


                {/* User */}
                <button onClick={()=>setOpenInfoUserModal(true)} className="group cursor-pointer p-2 rounded-md hover:bg-gray-500 dark:hover:bg-zinc-300 transition">
                    <User size={23} className="group-hover:text-red-600 text-gray-700 dark:text-white" />
                </button>

                {/* Logout */}
                <button onClick={logout} className="group cursor-pointer p-2 rounded-md hover:bg-gray-500 dark:hover:bg-zinc-300 transition">
                    <LogOut size={23} className="group-hover:text-red-600 text-gray-700 dark:text-white" />
                </button>

            </div>
        </nav>
        <UploadModal
        open={openUploadModal}
        onClose={() => setUploadModal(false)}
        />
        <UserModal
        open={openInfoUserModal}
        onClose={()=>setOpenInfoUserModal(false)}
        user={user as User}
        />    
    </>
    )
}