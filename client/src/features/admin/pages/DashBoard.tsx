import Grid from "../components/dashboard/Grid";
import TopBar from "../components/dashboard/TopBar";
import LineChartDashBoard from "../components/dashboard/LineChart";



const DashBoard = () => {
  return (
    <div>
      <TopBar />
      <Grid />
      <LineChartDashBoard/>
    </div>
  );
};

export default DashBoard;
