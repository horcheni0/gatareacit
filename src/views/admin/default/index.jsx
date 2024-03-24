import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import Number from "views/admin/default/components/Number";
import Data from "views/admin/default/components/data";
import Time from "views/admin/default/components/time"
const Dashboard = () => {
  return (
    <div>
      <div className="mt-5 grid  gap-5 md:grid-cols-3">
        <Number />
        <Data />
        <Time/>
      </div>
      <div className="mt-5 grid  gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>
      <div className="mt-2 grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
        <div>
        <DailyTraffic />
        </div>
        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <PieChartCard />
          <MiniCalendar  />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
