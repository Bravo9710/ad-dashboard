"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useCampaignStore } from "@/store/useCampaignStore";
import { CampaignCategory } from "@/lib/types";
import clsx from "clsx";

const CATEGORIES: CampaignCategory[] = ["Social", "Search", "Display", "Email"];

interface ChartDataItem {
  category: CampaignCategory;
  spend: number;
  revenue: number;
}

export default function Chart() {
  const { campaigns, setFilter, filters } = useCampaignStore();

  const chartData = useMemo<ChartDataItem[]>(() => {
    return CATEGORIES.map((category) => {
      const categoryCampaigns = campaigns.filter(
        (c) => c.category === category,
      );
      const spend = categoryCampaigns.reduce((sum, c) => sum + c.spent, 0);
      const revenue = categoryCampaigns.reduce((sum, c) => sum + c.revenue, 0);
      return { category, spend, revenue };
    });
  }, [campaigns]);

  const handleBarClick = (category: CampaignCategory) => {
    if (filters.category === category) {
      setFilter("category", null);
    } else {
      setFilter("category", category);
    }
  };

  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

  const formatTooltip = (value?: number | string | Array<number | string>) => {
    if (typeof value === "number") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(value);
    }
    return String(value ?? "");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 h-[440px] flex flex-col">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Spend vs Revenue by Category
      </h2>
      <p
        className={clsx(
          "text-sm  mb-4",
          filters.category ? "text-blue-800" : "text-gray-700",
        )}
      >
        {filters.category ? (
          <span>Showing: {filters.category} campaigns</span>
        ) : (
          <span>Click a bar to filter the table</span>
        )}
      </p>
      <ResponsiveContainer width="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis tickFormatter={formatYAxis} />
          <Tooltip formatter={formatTooltip} />
          <Legend />
          <Bar
            dataKey="spend"
            name="Spend"
            fill="#ef4444"
            onClick={(_, index) => handleBarClick(chartData[index].category)}
            cursor="pointer"
            opacity={filters.category ? 0.5 : 1}
          />
          <Bar
            dataKey="revenue"
            name="Revenue"
            fill="#22c55e"
            onClick={(_, index) => handleBarClick(chartData[index].category)}
            cursor="pointer"
            opacity={filters.category ? 0.5 : 1}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
