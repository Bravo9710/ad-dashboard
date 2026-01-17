import { SortDirection, SortKey } from "./CampaingTable";

export default function SortHeader({
  label,
  sortKey,
  currentSort,
  direction,
  onSort,
}: {
  label: string;
  sortKey: SortKey;
  currentSort: SortKey;
  direction: SortDirection;
  onSort: (key: SortKey) => void;
}) {
  const isActive = currentSort === sortKey;
  return (
    <th
      onClick={() => onSort(sortKey)}
      className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 select-none text-gray-900"
    >
      <div className="flex items-center gap-1">
        {label}
        {isActive && <span>{direction === "asc" ? "↑" : "↓"}</span>}
      </div>
    </th>
  );
}
