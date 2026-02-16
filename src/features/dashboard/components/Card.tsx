import { Info } from "lucide-react";
import { useState } from "react";

interface CardProps {
    title: string;
    value: string;
    color: "green" | "red" | "blue" | "darkGreen";
    description: string;
    icon?: React.ReactNode;
}

export const Cards: React.FC<CardProps> = ({
    title,
    value,
    color,
    description,
    icon,
}) => {
    const [showInfo, setShowInfo] = useState(false);

    const colorStyles = {
        green: {
            card: "bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/40 dark:to-zinc-900 border-emerald-200/60 dark:border-emerald-800/40",
            text: "text-emerald-700 dark:text-emerald-400",
            value: "text-emerald-600 dark:text-emerald-300",
            glow: "shadow-emerald-100 dark:shadow-emerald-900/20",
        },
        red: {
            card: "bg-gradient-to-br from-rose-50 to-white dark:from-rose-950/40 dark:to-zinc-900 border-rose-200/60 dark:border-rose-800/40",
            text: "text-rose-700 dark:text-rose-400",
            value: "text-rose-600 dark:text-rose-300",
            glow: "shadow-rose-100 dark:shadow-rose-900/20",
        },
        blue: {
            card: "bg-gradient-to-br from-sky-50 to-white dark:from-sky-950/40 dark:to-zinc-900 border-sky-200/60 dark:border-sky-800/40",
            text: "text-sky-700 dark:text-sky-400",
            value: "text-sky-600 dark:text-sky-300",
            glow: "shadow-sky-100 dark:shadow-sky-900/20",
        },
        darkGreen: {
            card: "bg-gradient-to-br from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-900 border-emerald-500",
            text: "text-emerald-100",
            value: "text-white",
            glow: "shadow-emerald-200 dark:shadow-emerald-900/40",
        },
    };

    const styles = colorStyles[color];

    return (
        <div
            className={`relative rounded-2xl p-6 border transition-all duration-300 
        hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] 
        ${styles.card} ${styles.glow} shadow-md`}
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                    {icon && <span className={styles.text}>{icon}</span>}
                    <h3 className={`text-sm font-semibold uppercase tracking-wide ${styles.text}`}>
                        {title}
                    </h3>
                </div>

                <div
                    className="relative"
                    onMouseEnter={() => setShowInfo(true)}
                    onMouseLeave={() => setShowInfo(false)}
                >
                    <Info
                        size={16}
                        className={`cursor-pointer opacity-60 hover:opacity-100 transition-opacity ${styles.text}`}
                    />

                    {showInfo && (
                        <div className="absolute top-full right-0 mt-2 w-64 
              bg-white dark:bg-zinc-800 text-xs text-zinc-700 dark:text-zinc-300
              p-4 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700 
              z-50 animate-fadeIn leading-relaxed"
                        >
                            {description}
                        </div>
                    )}
                </div>
            </div>

            {/* Value */}
            <p className={`text-3xl font-bold tracking-tight ${styles.value}`}>
                {value}
            </p>
        </div>
    );
};
