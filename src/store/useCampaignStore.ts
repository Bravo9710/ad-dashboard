import { create } from "zustand";
import {
  Campaign,
  CampaignCategory,
  CampaignStatus,
  Event,
  Filters,
} from "@/lib/types";
import { generateCampaigns } from "@/lib/mockData";

interface CampaignStore {
  campaigns: Campaign[];
  events: Event[];
  isPaused: boolean;
  addEvent: (event: Event) => void;
  togglePause: () => void;
  filters: Filters;
  setFilter: (
    key: keyof Filters,
    value: CampaignStatus | CampaignCategory | null,
  ) => void;
  getFilteredCampaigns: () => Campaign[];
}

const MAX_EVENTS = 30;

export const useCampaignStore = create<CampaignStore>((set, get) => ({
  campaigns: generateCampaigns(50),
  events: [],
  isPaused: false,
  filters: { status: null, category: null },

  addEvent: (event) => {
    set((state) => ({
      events: [event, ...state.events].slice(0, MAX_EVENTS),
    }));
  },

  togglePause: () => {
    set((state) => ({ isPaused: !state.isPaused }));
  },

  setFilter: (
    key: keyof Filters,
    value: CampaignStatus | CampaignCategory | null,
  ) => {
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    }));
  },

  getFilteredCampaigns: () => {
    const { campaigns, filters } = get();
    return campaigns.filter((campaign: Campaign) => {
      if (filters.status && campaign.status !== filters.status) return false;
      if (filters.category && campaign.category !== filters.category)
        return false;
      return true;
    });
  },
}));
