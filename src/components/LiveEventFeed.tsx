"use client";

import Button from "./Button";
import EventRow from "./EventRow";
import { useEffect } from "react";
import { generateEvent } from "@/lib/mockData";
import { useCampaignStore } from "@/store/useCampaignStore";

export default function LiveEventFeed() {
  const { events, campaigns, isPaused, addEvent, togglePause } =
    useCampaignStore();

  useEffect(() => {
    if (isPaused || campaigns.length === 0) return;

    const interval = setInterval(
      () => {
        const newEvent = generateEvent(campaigns);
        addEvent(newEvent);
      },
      1000 + Math.random() * 1000,
    ); // 1-2 seconds

    return () => clearInterval(interval);
  }, [isPaused, campaigns, addEvent]);

  return (
    <div className="live-event-feed rounded-[12px] border border-amber-900 p-6 shadow bg-white">
      <div className="flex justify-between mb-4">
        <h3 className="text-2xl font-bold">Live Event Feed</h3>
        <Button text={isPaused ? "Resume" : "Pause"} onClick={togglePause} />
      </div>

      <div className="flex flex-col gap-3 h-full max-h-[334px] overflow-y-auto scrollbar-thin">
        {events.length === 0 ? (
          <p className="text-gray-700 text-center py-[15px]">
            {isPaused
              ? "Feed paused. Click Resume to continue."
              : "Waiting for events..."}
          </p>
        ) : (
          events.map((event) => <EventRow key={event.id} event={event} />)
        )}
      </div>
    </div>
  );
}
