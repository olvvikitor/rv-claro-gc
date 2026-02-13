// components/SummaryCard.jsx
export default function SummaryCard({
  title,
  value,
  subtitle,
  color = "green",
})
 {
  const colors = {
    green: "border-green-300 text-green-600",
    red: "border-red-300 text-red-600",
    blue: "border-blue-300 text-blue-600",
    darkGreen: "bg-green-600 text-white",
  };

  return (
    <div
      className={`rounded-xl p-6 border shadow-sm ${
        colors[color] || ""
      }`}
    >
      <h3 className="text-sm font-medium mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
      {subtitle && (
        <p className="text-sm mt-2 opacity-80">{subtitle}</p>
      )}
    </div>
  );
}
