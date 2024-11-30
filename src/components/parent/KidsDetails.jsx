import { User, UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gettingKidsData } from '../../api/service/parent/ParentService';

const KidsDetails = () => {
  const navigate = useNavigate();
  const [kids, setKids] = useState([]);
  const parentId = localStorage.getItem("parentId");
  console.log("parent id", parentId);

  useEffect(() => {
    const fetchKidsData = async () => {
      const response = await gettingKidsData(parentId);
      console.log("response in fetch kids data", response?.data?.kidsData);
      if (response.status === 200) {
        setKids(response?.data?.kidsData);
      }
    };
    fetchKidsData();
  }, []);


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Kids</h2>
        <button
          onClick={() => navigate('/parent/add-kid')}
          className="inline-flex items-center px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-medium shadow-sm transition-all duration-200 ease-in-out hover:shadow-md active:transform active:scale-95"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add New Kid
        </button>
      </div>
      
      {kids && kids?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kids?.map((kid) => (
            <div key={kid?._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-4">
                {/* Profile Image/Avatar Section */}
                <div className="flex justify-center mb-4">
                  {kid?.imageUrl ? (
                    <img
                      src={kid?.imageUrl}
                      alt={`${kid?.firstName}'s profile`}
                      className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center">
                      <User size={48} className="text-blue-500" />
                    </div>
                  )}
                </div>

                {/* Info Section */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{kid.firstName}</h3>
                  <div className="bg-blue-50 rounded-full px-4 py-1 inline-block mb-3">
                    <span className="text-blue-600 font-medium">Chess ID: {kid.chessId}</span>
                  </div>
                  
                  {/* Active Courses */}
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Active Courses</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {kid?.programs?.map((course, index) => (
                        <span 
                          key={index}
                          className="bg-green-50 text-green-600 text-sm px-3 py-1 rounded-full"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex gap-3 justify-center">
                    <button onClick={() => navigate(`/parent/kid/attendance/${kid._id}`)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                      View Progress
                    </button>
                    <button className="bg-white hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <div className="bg-blue-100 p-4 rounded-full mb-6">
            <UserPlus className="w-8 h-8 text-blue-500" />
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Kids Added Yet
          </h3>

          <p className="text-gray-600 text-center mb-8 max-w-sm">
            Get started by adding your first child to manage their activities and progress
          </p>

          <button 
            onClick={() => navigate('/parent/add-kid')}
            className="inline-flex items-center px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-medium shadow-sm transition-all duration-200 ease-in-out hover:shadow-md active:transform active:scale-95"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add New Kid
          </button>
        </div>
      )}
    </div>
  );
};

export default KidsDetails;
