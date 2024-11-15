import { ChartConfig } from "@/components/ui/chart";
import { RadialMetricCard } from "./RadialMetricCard";

const visitorData = [
  { metric: "visitors", value: 1260000, fill: "hsl(var(--chart-1))" },
];

const revenueData = [
  { metric: "revenue", value: 2500000, fill: "hsl(var(--chart-2))" },
];

const visitorConfig = {
  visitors: {
    label: "Total Visitors",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const revenueConfig = {
  revenue: {
    label: "Total Revenue",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function MetricsDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <RadialMetricCard
        title="Total Visitors"
        data={visitorData}
        config={visitorConfig}
        period="Showing total visitors for the last 6 months"
        growth={5.2}
        metric="visitors"
      />
      <RadialMetricCard
        title="Total Revenue"
        data={revenueData}
        config={revenueConfig}
        period="Showing total revenue for the last 6 months"
        growth={7.8}
        metric="revenue"
      />
    </div>
  );
}
