import { Info } from "lucide-react";
import { useState } from "react";
interface CardProps {
    title: string;
    value: string;
    color: "green" | "red" | "blue" | "darkGreen";
    description: string;
}

export const Cards: React.FC<CardProps> = ({
    title,
    value,
    color,
    description,
}) => {
    const [showInfo, setShowInfo] = useState(false);

    const colors = {
        green: "border-green-300 text-green-600",
        red: "border-red-300 text-red-600",
        blue: "border-blue-300 text-blue-600",
        darkGreen: "bg-green-600 text-white",
    };

    return (
        <div
            className={`relative rounded-xl p-8 border shadow-sm transition-all hover:shadow-md ${colors[color]}`}
        >
            {/* Header do card */}
            <div className="flex justify-between items-center mb-2 mt-0">
                <h3 className="text-sm font-medium">{title}</h3> 

                <div
                    className="relative"
                    onMouseEnter={() => setShowInfo(true)}
                    onMouseLeave={() => setShowInfo(false)}
                >
                    <Info size={16} className="cursor-pointer opacity-70 hover:opacity-100" />

                    {showInfo && (
                        <div className="absolute top-[-100px] left-[-200px] mt-2 w-64 bg-white dark:bg-gray-800 text-xs p-3 rounded-lg shadow-lg border z-50">
                            {description}
                        </div>
                    )}
                </div>
            </div>
            <p className="text-3xl font-bold">{value}</p>
        </div>
    );
};
