import Sidebar from "../component/parent-component/parent-dashboard/layout/SideBar";
import Topbar from "../component/parent-component/parent-dashboard/layout/Topbar";
import AttendanceList from "../components/attandance/AttandanceList";
import MenuGrid from "../components/attandance/MenuGrid";



const AttendancePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm">
              <AttendanceList />
            </div>

            <div className="bg-white rounded-lg shadow-sm">
              <MenuGrid />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
