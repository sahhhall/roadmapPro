import * as React from "react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MetricsDashboard } from "../components/dashboard/MetricsDashboard"

const chartData = [
  { month: "2024-01", users: 15000, revenue: 75000 },
  { month: "2024-02", users: 17500, revenue: 82500 },
  { month: "2024-03", users: 19000, revenue: 95000 },
  { month: "2024-04", users: 22000, revenue: 110000 },
  { month: "2024-05", users: 25000, revenue: 125000 },
  { month: "2024-06", users: 28000, revenue: 140000 },
  { month: "2024-07", users: 30000, revenue: 150000 },
  { month: "2024-08", users: 32000, revenue: 160000 },
  { month: "2024-09", users: 35000, revenue: 175000 },
  { month: "2024-10", users: 37000, revenue: 185000 },
  { month: "2024-11", users: 39000, revenue: 195000 },
  { month: "2024-12", users: 42000, revenue: 210000 },
]

const chartConfig = {
  metrics: {
    label: "Metrics",
  },
  users: {
    label: "Total Users",
    color: "hsl(var(--chart-1))",
  },
  revenue: {
    label: "Revenue ($)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function DashBoard() {
  const [timeRange, setTimeRange] = React.useState("12m")
  
  const filteredData = React.useMemo(() => {
    const months = {
      "3m": 3,
      "6m": 6,
      "12m": 12
    }
    const count = months[timeRange] || 12
    return chartData.slice(-count)
  }, [timeRange])

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Annual Performance Overview</CardTitle>
          <CardDescription>
            Tracking total users and revenue trends
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select time range"
          >
            <SelectValue placeholder="Last 12 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="12m" className="rounded-lg">
              Last 12 months
            </SelectItem>
            <SelectItem value="6m" className="rounded-lg">
              Last 6 months
            </SelectItem>
            <SelectItem value="3m" className="rounded-lg">
              Last 3 months
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            {/* <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} /> */}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <MetricsDashboard/>
    </Card>
  )
}

export default DashBoard


