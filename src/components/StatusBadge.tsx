import { CampaignStatus } from "@/lib/types";

export default function StatusBadge({ status }: { status: CampaignStatus }) {
  const colors = {
    active: "bg-green-100 text-green-800 border-green-700",
    paused: "bg-yellow-100 text-yellow-800 border-yellow-700",
    completed: "bg-gray-100 text-gray-800 border-gray-700",
  };
  return (
    <span className={`px-2 py-1 rounded border text-sm ${colors[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
