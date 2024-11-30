import Enquires from "../../centeradmin-components/dashboard/Enquires";
import Sidebar from "../../centeradmin-components/layout/Sidebar";
import Topbar from "../../component/parent-component/parent-dashboard/layout/Topbar";


const CenterListingEnquiries = () => {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 mr-4 p-4 overflow-x-hidden">
        {/* Content inside the main area */}
        <Topbar/>
        <Enquires />
      </div>
    </div>
  );
};

export default CenterListingEnquiries;
