import clsx from "clsx";

export default function StatBox({
  label,
  value,
  subtext,
  className,
}: {
  label: string;
  value: string | number;
  subtext?: string;
  className?: string;
}) {
  return (
    <div
      className={clsx("bg-white rounded-xl shadow-sm border p-6", className)}
    >
      <p className="text-gray-700 text-md mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {subtext && <p className="text-gray-600 text-xs mt-1">{subtext}</p>}
    </div>
  );
}
