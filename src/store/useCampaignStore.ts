import { create } from "zustand";
import { Campaign, Event } from "@/lib/types";
import { generateCampaigns } from "@/lib/mockData";

interface CampaignStore {
  campaigns: Campaign[];
  events: Event[];
  isPaused: boolean;
  addEvent: (event: Event) => void;
  togglePause: () => void;
}

const MAX_EVENTS = 30;

export const useCampaignStore = create<CampaignStore>((set) => ({
  campaigns: generateCampaigns(50),
  events: [],
  isPaused: false,

  addEvent: (event) => {
    set((state) => ({
      events: [event, ...state.events].slice(0, MAX_EVENTS),
    }));
  },

  togglePause: () => {
    set((state) => ({ isPaused: !state.isPaused }));
  },
}));
