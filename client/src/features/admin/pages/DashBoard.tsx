import Grid from "../components/dashboard/Grid";
import { LineChartDashBoard } from "../components/dashboard/LineChart";
import TopBar from "../components/dashboard/TopBar";

const dashboardData = {
  stats: [
    {
      id: "1",
      title: "Gross revenue",
      value: "$45,231",
      pillText: "+20.1%",
      trend: "up",
      changePercentage: 20.1,
      period: "Last 30 days",
    },
    {
      id: "2",
      title: "Active users",
      value: "1,234",
      pillText: "-5.2% from last month",
      trend: "down",
      changePercentage: -5.2,
      period: "Last 30 days",
    },
    {
      id: "3",
      title: "Booking rate",
      value: "3.8%",
      pillText: "+2.2% from last month",
      trend: "up",
      changePercentage: 2.2,
      period: "Last 30 days",
    },
  ],
};

const DashBoard = () => {
  return (
    <div>
      <TopBar />
      <Grid stats={dashboardData.stats as any} />
      <LineChartDashBoard/>
    </div>
  );
};

export default DashBoard;
