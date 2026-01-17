import {
  Campaign,
  Event,
  CampaignStatus,
  CampaignCategory,
  EventType,
} from "./types";
import { v4 as uuidv4 } from "uuid";

const CAMPAIGN_PREFIXES = [
  "Summer",
  "Winter",
  "Spring",
  "Fall",
  "Holiday",
  "Flash",
  "Premium",
  "Budget",
  "VIP",
  "Launch",
  "Retargeting",
  "Awareness",
  "Growth",
];

const CAMPAIGN_SUFFIXES = [
  "Sale",
  "Promo",
  "Campaign",
  "Blast",
  "Drive",
  "Push",
  "Initiative",
  "Outreach",
  "Engagement",
  "Boost",
  "Special",
  "Exclusive",
];

const STATUSES: CampaignStatus[] = ["active", "paused", "completed"];
const CATEGORIES: CampaignCategory[] = ["Social", "Search", "Display", "Email"];

// Generate a random number between min and max
function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a random element from an array
function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Generate a campaign name
function generateCampaignName(index: number): string {
  const prefix = randomElement(CAMPAIGN_PREFIXES);
  const suffix = randomElement(CAMPAIGN_SUFFIXES);
  return `${prefix} ${suffix} #${index + 1}`;
}

// Generate a single campaign
export function generateCampaign(index: number): Campaign {
  const budget = randomBetween(5000, 100000);
  const spent = randomBetween(1000, budget);
  const revenue = randomBetween(spent * 0.5, spent * 3);
  const roi = ((revenue - spent) / spent) * 100;

  return {
    id: `camp-${index + 1}`,
    name: generateCampaignName(index),
    status: randomElement(STATUSES),
    category: randomElement(CATEGORIES),
    budget,
    spent,
    revenue,
    roi: Math.round(roi * 100) / 100,
  };
}

// Generate multiple campaigns
export function generateCampaigns(count: number = 50): Campaign[] {
  return Array.from({ length: count }, (_, i) => generateCampaign(i));
}

// Generate a single event
export function generateEvent(campaigns: Campaign[]): Event {
  const campaign = randomElement(campaigns);
  // Fraud alerts are rare (5% chance)
  const eventType =
    Math.random() < 0.05
      ? "Fraud Alert"
      : randomElement(["Click", "Conversion"] as EventType[]);

  return {
    id: uuidv4(),
    timestamp: new Date(),
    campaignName: campaign.name,
    type: eventType,
  };
}
