import Grid from "../components/dashboard/Grid";
import { LineChartDashBoard } from "../components/dashboard/LineChart";
import TopBar from "../components/dashboard/TopBar";



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
