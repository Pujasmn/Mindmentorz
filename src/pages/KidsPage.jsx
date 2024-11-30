import Sidebar from "../component/parent-component/parent-dashboard/layout/SideBar";
import Topbar from "../component/parent-component/parent-dashboard/layout/Topbar";
import Calendar from "../components/kidsNav/Calender";
import Stats from "../components/kidsNav/Stats";


const KidsPage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <Stats />
            </div>

            <div className="lg:w-2/3">
              <Calendar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KidsPage;
