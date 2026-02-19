import React from "react";
import type { User } from "@/shared/types/user";
import { IdCardLanyard, ShieldUser, User as UserIcon, UserStar, X } from "lucide-react";

type UserModalProps = {
    open: boolean;
    onClose: () => void;
    user: User;
};

export function UserModal({ open, onClose, user }: UserModalProps) {
    if (!open || !user) return null;

    const initials = user.nome
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-fadeIn border border-zinc-200 dark:border-zinc-800"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Gradient */}
                <div
                    className="relative h-28 flex justify-end p-4
          bg-gradient-to-br from-red-500 to-rose-600
          dark:from-red-900 dark:to-zinc-900"
                >
                    <button
                        onClick={onClose}
                        className="p-1 rounded-lg hover:bg-white/20 transition h-fit"
                    >
                        <X size={20} className="text-white" />
                    </button>
                </div>

                {/* Content */}
                <div className="bg-white dark:bg-zinc-900 px-8 pb-10 pt-20 relative">
                    {/* Avatar */}
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2">
                        <div
                            className="w-28 h-28 rounded-full 
              bg-gradient-to-br from-red-500 to-rose-600 dark:from-red-800 dark:to-zinc-800
              flex items-center justify-center text-3xl font-bold text-white
              shadow-lg border-4 border-white dark:border-zinc-900"
                        >
                            {initials}
                        </div>
                    </div>

                    {/* Name */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-zinc-800 dark:text-white">
                            {user.nome}
                        </h2>
                        <p className="text-red-500 font-semibold text-sm mt-1">
                            {user.operacao}
                        </p>
                    </div>

                    {/* Info Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <InfoCard icon={<UserIcon size={18} />} label="Nome Completo" value={user.nome} />
                        <InfoCard icon={<IdCardLanyard size={18} />} label="Matrícula" value={user.matricula} />
                        <InfoCard icon={<UserStar size={18} />} label="Supervisor" value={user.supervisor} />
                        <InfoCard icon={<ShieldUser size={18} />} label="Coordenador" value={user.coordenador} />
                    </div>
                </div>
            </div>
        </div>
    );
}

interface InfoCardProps {
    label: string;
    value?: string;
    icon: React.ReactNode;
}

function InfoCard({ label, value, icon }: InfoCardProps) {
    return (
        <div className="rounded-xl p-4 flex items-start gap-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 transition hover:border-red-200 dark:hover:border-red-800/40">
            <div className="text-red-500 mt-0.5">{icon}</div>
            <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{label}</p>
                <p className="text-sm font-semibold text-zinc-800 dark:text-white mt-0.5">
                    {value ?? "-"}
                </p>
            </div>
        </div>
    );
}
