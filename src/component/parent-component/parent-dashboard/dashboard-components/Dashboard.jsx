import AchievementTarget from "../../../../components/dashboard/AchievementTarget";
import ClassActivity from "../../../../components/dashboard/ClassActivity";
import Classes from "../../../../components/dashboard/Classes";
import MetricsCards from "../../../../components/dashboard/MetricsCards";
import PerformanceMetrix from "../../../../components/dashboard/PerformanceMetrix";

const Dashboard = () => {
  return (
    <div className="p-8 space-y-8 h-screen overflow-y-auto">
    
      <div className="w-full">
        <MetricsCards />
      </div>

     
      <div className="w-full">
        <PerformanceMetrix />
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-full">
        <div className="flex-grow flex items-stretch">
          <ClassActivity />
        </div>

        <div className="flex-grow flex items-stretch">
          <Classes />
        </div>

        <div className="flex-grow flex items-stretch">
          <AchievementTarget />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
