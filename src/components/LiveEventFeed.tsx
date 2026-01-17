import Button from "./Button";
import EventRow from "./EventRow";
import { Event } from "../lib/types";

export default function LiveEventFeed({ events }: { events: Event[] }) {
  return (
    <div className="live-event-feed rounded-[12px] border border-amber-900 p-6 shadow bg-white">
      <div className="flex justify-between mb-4">
        <h3 className="text-2xl font-bold">Live Event Feed</h3>
        <Button text="Pause/Resume" />
      </div>

      <div className="flex flex-col gap-3">
        {events.map((event) => (
          <EventRow key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
