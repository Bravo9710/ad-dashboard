"use client";

import { useCampaignStore } from "@/store/useCampaignStore";
import { useMemo } from "react";
import StatBox from "./StatBox";
import formatCurrency from "@/lib/formatCurrency";

export default function StatsLayout() {
  const { getFilteredCampaigns, filters } = useCampaignStore();
  const filteredCampaigns = getFilteredCampaigns();

  // Compute aggregate stats from filtered campaigns (memoized)
  const stats = useMemo(() => {
    const totalSpend = filteredCampaigns.reduce((sum, c) => sum + c.spent, 0);
    const totalRevenue = filteredCampaigns.reduce(
      (sum, c) => sum + c.revenue,
      0,
    );
    const avgRoi =
      filteredCampaigns.length > 0
        ? filteredCampaigns.reduce((sum, c) => sum + c.roi, 0) /
          filteredCampaigns.length
        : 0;

    return {
      count: filteredCampaigns.length,
      totalSpend,
      totalRevenue,
      avgRoi,
    };
  }, [filteredCampaigns]);

  const hasFilters = filters.status || filters.category;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatBox
        label="Total Campaigns"
        value={stats.count}
        subtext={hasFilters ? "Filtered" : "All Campaigns"}
      />
      <StatBox
        label="Total Events"
        value={formatCurrency(stats.totalSpend)}
        subtext={hasFilters ? "Filtered" : "All Campaigns"}
      />
      <StatBox
        label="Total Revenue"
        value={formatCurrency(stats.totalRevenue)}
        subtext={hasFilters ? "Filtered" : "All Campaigns"}
      />
      <StatBox
        label="Total ROI"
        value={`${stats.avgRoi >= 0 ? "+" : ""}${stats.avgRoi.toFixed(1)}%`}
        subtext={hasFilters ? "Filtered" : "All Campaigns"}
      />
    </div>
  );
}
