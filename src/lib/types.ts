export type CampaignStatus = "Active" | "Paused" | "Completed";
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
  id: string;
  timestamp: Date;
  campaignName: string;
  type: EventType;
}
