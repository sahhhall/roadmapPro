import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
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
const chartData = [
  { date: "2024-04-01", bookings: 222, mobile: 150 },
  { date: "2024-04-02", bookings: 97, mobile: 180 },
  { date: "2024-04-03", bookings: 167, mobile: 120 },
  { date: "2024-04-04", bookings: 242, mobile: 260 },
  { date: "2024-04-05", bookings: 373, mobile: 290 },
  { date: "2024-04-06", bookings: 301, mobile: 340 },
  { date: "2024-04-07", bookings: 245, mobile: 180 },
  { date: "2024-04-08", bookings: 409, mobile: 320 },
  { date: "2024-04-09", bookings: 59, mobile: 110 },
  { date: "2024-04-10", bookings: 261, mobile: 190 },
  { date: "2024-04-11", bookings: 327, mobile: 350 },
  { date: "2024-04-12", bookings: 292, mobile: 210 },
  { date: "2024-04-13", bookings: 342, mobile: 380 },
  { date: "2024-04-14", bookings: 137, mobile: 220 },
  { date: "2024-04-15", bookings: 120, mobile: 170 },
  { date: "2024-04-16", bookings: 138, mobile: 190 },
  { date: "2024-04-17", bookings: 446, mobile: 360 },
  { date: "2024-04-18", bookings: 364, mobile: 410 },
  { date: "2024-04-19", bookings: 243, mobile: 180 },
  { date: "2024-04-20", bookings: 89, mobile: 150 },
  { date: "2024-04-21", bookings: 137, mobile: 200 },
  { date: "2024-04-22", bookings: 224, mobile: 170 },
  { date: "2024-04-23", bookings: 138, mobile: 230 },
  { date: "2024-04-24", bookings: 387, mobile: 290 },
  { date: "2024-04-25", bookings: 215, mobile: 250 },
  { date: "2024-04-26", bookings: 75, mobile: 130 },
  { date: "2024-04-27", bookings: 383, mobile: 420 },
  { date: "2024-04-28", bookings: 122, mobile: 180 },
  { date: "2024-04-29", bookings: 315, mobile: 240 },
  { date: "2024-04-30", bookings: 454, mobile: 380 },
  { date: "2024-05-01", bookings: 165, mobile: 220 },
  { date: "2024-05-02", bookings: 293, mobile: 310 },
  { date: "2024-05-03", bookings: 247, mobile: 190 },
  { date: "2024-05-04", bookings: 385, mobile: 420 },
  { date: "2024-05-05", bookings: 481, mobile: 390 },
  { date: "2024-05-06", bookings: 498, mobile: 520 },
  { date: "2024-05-07", bookings: 388, mobile: 300 },
  { date: "2024-05-08", bookings: 149, mobile: 210 },
  { date: "2024-05-09", bookings: 227, mobile: 180 },
  { date: "2024-05-10", bookings: 293, mobile: 330 },
  { date: "2024-05-11", bookings: 335, mobile: 270 },
  { date: "2024-05-12", bookings: 197, mobile: 240 },
  { date: "2024-05-13", bookings: 197, mobile: 160 },
  { date: "2024-05-14", bookings: 448, mobile: 490 },
  { date: "2024-05-15", bookings: 473, mobile: 380 },
  { date: "2024-05-16", bookings: 338, mobile: 400 },
  { date: "2024-05-17", bookings: 499, mobile: 420 },
  { date: "2024-05-18", bookings: 315, mobile: 350 },
  { date: "2024-05-19", bookings: 235, mobile: 180 },
  { date: "2024-05-20", bookings: 177, mobile: 230 },
  { date: "2024-05-21", bookings: 82, mobile: 140 },
  { date: "2024-05-22", bookings: 81, mobile: 120 },
  { date: "2024-05-23", bookings: 252, mobile: 290 },
  { date: "2024-05-24", bookings: 294, mobile: 220 },
  { date: "2024-05-25", bookings: 201, mobile: 250 },
  { date: "2024-05-26", bookings: 213, mobile: 170 },
  { date: "2024-05-27", bookings: 420, mobile: 460 },
  { date: "2024-05-28", bookings: 233, mobile: 190 },
  { date: "2024-05-29", bookings: 78, mobile: 130 },
  { date: "2024-05-30", bookings: 340, mobile: 280 },
  { date: "2024-05-31", bookings: 178, mobile: 230 },
  { date: "2024-06-01", bookings: 178, mobile: 200 },
  { date: "2024-06-02", bookings: 470, mobile: 410 },
  { date: "2024-06-03", bookings: 103, mobile: 160 },
  { date: "2024-06-04", bookings: 439, mobile: 380 },
  { date: "2024-06-05", bookings: 88, mobile: 140 },
  { date: "2024-06-06", bookings: 294, mobile: 250 },
  { date: "2024-06-07", bookings: 323, mobile: 370 },
  { date: "2024-06-08", bookings: 385, mobile: 320 },
  { date: "2024-06-09", bookings: 438, mobile: 480 },
  { date: "2024-06-10", bookings: 155, mobile: 200 },
  { date: "2024-06-11", bookings: 92, mobile: 150 },
  { date: "2024-06-12", bookings: 492, mobile: 420 },
  { date: "2024-06-13", bookings: 81, mobile: 130 },
  { date: "2024-06-14", bookings: 426, mobile: 380 },
  { date: "2024-06-15", bookings: 307, mobile: 350 },
  { date: "2024-06-16", bookings: 371, mobile: 310 },
  { date: "2024-06-17", bookings: 475, mobile: 520 },
  { date: "2024-06-18", bookings: 107, mobile: 170 },
  { date: "2024-06-19", bookings: 341, mobile: 290 },
  { date: "2024-06-20", bookings: 408, mobile: 450 },
  { date: "2024-06-21", bookings: 169, mobile: 210 },
  { date: "2024-06-22", bookings: 317, mobile: 270 },
  { date: "2024-06-23", bookings: 480, mobile: 530 },
  { date: "2024-06-24", bookings: 132, mobile: 180 },
  { date: "2024-06-25", bookings: 141, mobile: 190 },
  { date: "2024-06-26", bookings: 434, mobile: 380 },
  { date: "2024-06-27", bookings: 448, mobile: 490 },
  { date: "2024-06-28", bookings: 149, mobile: 200 },
  { date: "2024-06-29", bookings: 103, mobile: 160 },
  { date: "2024-06-30", bookings: 446, mobile: 400 },
]
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  bookings: {
    label: "bookings",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig
export function LineChartDashBoard() {
  const [timeRange, setTimeRange] = React.useState("90d")
  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })
  return (
    <Card className="m-4">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Bookings Trend - Interactive</CardTitle>
          <CardDescription>
            Showing total bookings for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillbookings" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-bookings)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-bookings)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
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
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="bookings"
              type="natural"
              fill="url(#fillbookings)"
              stroke="var(--color-bookings)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
