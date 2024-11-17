import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetBookingDaysAnlaylisisQuery } from "../../services/api/analyticsApi"; 

const LineChartDashBoard = () => {
  const { data: bookingData, isLoading, error } = useGetBookingDaysAnlaylisisQuery({ days: 30 });


  if (isLoading) {
    return (
      <Card className="m-4">
        <CardContent className="flex items-center justify-center h-[400px]">
          <div className="text-gray-500">Loading booking data...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="m-4">
        <CardContent className="flex items-center justify-center h-[400px]">
          <div className="text-red-500">Error loading booking data</div>
        </CardContent>
      </Card>
    );
  }

  const getDateNDaysAgo = (n: number) => {
    const date = new Date();
    date.setDate(date.getDate() - n);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };


  const processedData = bookingData?.dayBaseBookings.map((bookings:any, index:any) => {
    //it will get the data length
    const daysAgo = bookingData.dayBaseBookings.length - 1 - index;
    return {
      date: getDateNDaysAgo(daysAgo),
      bookings: bookings,
      completed: bookingData.dayBaseCompleted[index],
    };
  }) || [];

  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle>Bookings Overview - Last 30 Days</CardTitle>
      </CardHeader>
      <CardContent className="m-4">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={processedData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '1px',
                  padding: '1px'
                }}
              />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#2563eb"
                strokeWidth={1}
                dot={{ r: 1 }}
                name="Bookings"
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#16a34a"
                strokeWidth={1}
                dot={{ r: 1 }}
                name="Completed"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LineChartDashBoard;