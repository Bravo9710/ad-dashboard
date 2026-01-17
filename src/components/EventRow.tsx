import { Event } from "../lib/types";
import clsx from "clsx";

export default function EventRow({ event }: { event: Event }) {
  const isFraud = event.type === "Fraud Alert";
  const timestamp = event.timestamp.toLocaleTimeString();

  return (
    <div
      className={clsx(
        "event-row flex items-center gap-3 p-3 rounded-lg",
        isFraud ? "bg-red-100 border border-red-300" : "bg-blue-50",
      )}
    >
      {isFraud && <span className="text-red-600">⚠️</span>}
      <span className="text-gray-700 text-sm font-mono">{timestamp}</span>
      <span className="font-medium truncate flex-1 text-gray-900">
        {event.campaignName}
      </span>
      <span
        className={clsx(
          "px-2 py-1 rounded text-sm",
          event.type === "Click"
            ? "bg-blue-200 text-blue-800 border border-blue-900"
            : event.type === "Conversion"
              ? "bg-green-100 text-green-800 border border-green-900"
              : "bg-red-400 text-red-900 border border-red-900",
        )}
      >
        {event.type}
      </span>
    </div>
  );
}
