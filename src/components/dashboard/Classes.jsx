/* eslint-disable react/prop-types */

import { LayoutList } from 'lucide-react';

const CircularProgress = ({ progress }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
     
      <svg className="w-full h-full -rotate-90">
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="#F3F4F6"
          strokeWidth="12"
          fill="none"
        />
       
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="#9333EA"
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
   
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-4xl font-semibold text-purple-600">
          {progress}%
        </span>
      </div>
    </div>
  );
};

const Classes = () => {
  return (
    <div className="w-full max-w-xs bg-white rounded-lg shadow-md p-6">
    
      <div className="flex items-center gap-3 mb-8">
        <div className="w-11 h-11 rounded-full bg-purple-50 flex items-center justify-center">
          <LayoutList className="w-5 h-5 text-purple-600" />
        </div>
        <h2 className="text-[22px] font-semibold">Classes</h2>
      </div>

 
      <div className="flex flex-col items-center">
        <CircularProgress progress={60} />
        <h3 className="text-xl text-purple-600 font-medium mt-4 mb-6">
          Classes Completed
        </h3>
        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors">
          UPGRADE
        </button>
      </div>
    </div>
  );
};

export default Classes;