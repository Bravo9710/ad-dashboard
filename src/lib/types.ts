export type CampaignStatus = "active" | "paused" | "completed";
export type CampaignCategory = "Social" | "Search" | "Display" | "Email";
export type EventType = "Click" | "Conversion" | "Fraud Alert";

export interface Campaign {
  id: string;
  name: string;
  status: CampaignStatus;
  category: CampaignCategory;
  budget: number;
  spent: number;
  revenue: number;
  roi: number;
}

export interface Event {
  id: string | number;
  timestamp: Date;
  campaignName: string;
  type: EventType;
}

export interface Filters {
  status: CampaignStatus | null;
  category: CampaignCategory | null;
}
