import React from "react"
import { User as TypeUser } from "./Topbar"
import { IdCardLanyard, ShieldUser, User, UserStar, X } from "lucide-react"
type userModalProps = {
    open: boolean
    onClose: () => void
    user: TypeUser
}

export function UserModal({ open, onClose, user }: userModalProps) {
    if (!open || !user) return null

    const initials = user.nome.split(" ")
        .map((n) => n[0]).slice(0, 2).join("").toUpperCase()

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="w-[95vw] md:w-[60vw] lg:w-[40vw] rounded-2xl overflow-hidden shadow-2xl">

                {/* HEADER GRADIENTE */}
                <div className="relative h-28 flex justify-end p-4 
                    bg-gradient-to-t from-white to-zinc-500 
                    dark:bg-gradient-to-t dark:from-zinc-800 dark:to-red-900">
                    <button onClick={onClose} className="text-white hover:text-red-500 transition">
                        <X size={23}></X>
                    </button>
                </div>

                {/* CONTENT */}
                <div className="
                bg-white text-zinc-500
                dark:bg-zinc-800 dark:text-white px-8 pb-10 pt-20 relative">

                    {/* AVATAR */}

                    <div className="absolute -top-14 left-1/2 -translate-x-1/2">
                        <div className="w-28 h-28 rounded-full bg-gradient-to-t from-zinc-350 to-red-500 
                                 dark:bg-gradient-to-t dark:from-zinc-700 dark:to-zinc-900 flex items-center justify-center text-3xl font-bold shadow-lg border-4 border-zinc-500">
                            {initials}
                        </div>
                    </div>

                    {/* NOME */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold">{user.nome}</h2>
                        <p className="text-red-500 font-bold dark:text-red-500 font-medium">{user.operacao}</p>
                    </div>

                    {/* CARDS DE INFO */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Info icon={<User size={23} />} label="Nome Completo" value={user.nome} highlight />
                        <Info icon={<IdCardLanyard size={23} />} label="Matrícula" value={user.matricula} highlight />
                        <Info icon={<UserStar size={23} />} label="Supervisor" value={user.supervisor} highlight />
                        <Info icon={<ShieldUser size={23} />} label="Coordenador" value={user.coordenador} highlight />
                    </div>
                </div>
            </div>
        </div>
    )

    type InfoCardProps = {
        label: string
        value?: string
        icon: React.ReactNode
        highlight?: boolean
    }
    function Info(props: InfoCardProps) {
        return (

            <div className={`rounded-xl p-4 flex items-start gap-3 transition ${props.highlight
                ? "dark:bg-red-500/10 bg-zinc-200 border border-zinc-400 dark:border-red-500/40"
                : "bg-zinc-200 border border-zinc-400 dark:bg-zinc-700 dark:border-zinc-900"}`}>
                <div className="text-red-500 mt-1">
                    {props.icon}
                </div>
                <div>
                    <p className="text-xs text-zinc-500 dark:text-gray-400">{props.label}</p>
                    <p className="text-[10px] font-semibold text-zinc-900 dark:text-white">{props.value ?? "-"}</p>
                </div>
            </div>
        )
    }
}