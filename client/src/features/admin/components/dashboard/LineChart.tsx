import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Area, AreaChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";
import { useGetBookingMonthBaseAnlaylisisQuery } from "../../services/api/analyticsApi";

const chartConfig = {
  bookings: {
    label: "Total Bookings",
    color: "hsl(var(--chart-1))",
  },
  completed: {
    label: "Completed Bookings",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MonthlyBookingsChart = () => {
  const [timeRange, setTimeRange] = useState("12m");
  const {
    data: bookingData,
    isLoading,
    error,
  } = useGetBookingMonthBaseAnlaylisisQuery({});

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-[400px]">
          <div className="text-gray-500">Loading booking data...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-[400px]">
          <div className="text-red-500">Error loading booking data</div>
        </CardContent>
      </Card>
    );
  }

  const processedData = months.map((month, index) => ({
    month: month,
    bookings: bookingData?.monthBaseBookings[index] || 0,
    completed: bookingData?.monthBaseCompleted[index] || 0,
  }));

  const filteredData = processedData.filter((_, index) => {
    const totalMonths = months.length;
    let monthsToShow = 12;

    if (timeRange === "6m") monthsToShow = 6;
    if (timeRange === "3m") monthsToShow = 3;

    return index >= totalMonths - monthsToShow;
  });

  return (
    <Card className="m-4">
      <CardHeader className="flex items-center gap-2  space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Bookings Overview</CardTitle>
          <CardDescription>
            Total: {bookingData?.metadata.totalBookings || 0} | Completed:{" "}
            {bookingData?.metadata.totalCompleted || 0}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto">
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
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[350px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillBookings" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="12%"
                  stopColor="var(--color-bookings)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-bookings)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-completed)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-completed)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => value}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="completed"
              type="monotone"
              fill="url(#fillCompleted)"
              stroke="var(--color-completed)"
              stackId="a"
            />
            <Area
              dataKey="bookings"
              type="monotone"
              fill="url(#fillBookings)"
              stroke="var(--color-bookings)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default MonthlyBookingsChart;
