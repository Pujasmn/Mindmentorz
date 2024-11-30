import { Link, useLocation } from "react-router-dom";
import account from "../../../../images/default.jpg";
import kids from "../../../../images/kidsnew.webp";
import availability from "../../../../images/avail.svg";
import home from "../../../../images/homeicon.svg";
import walkthrough from "../../../../images/walk.svg";
import support from "../../../../images/sup.svg";
import certification from "../../../../images/certificate.svg";
import attendence from "../../../../images/attendance.svg";
import refer from "../../../../images/Refer.png";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const purpleFilter = 'invert(24%) sepia(70%) saturate(1400%) hue-rotate(245deg) brightness(95%) contrast(96%)';

  const navLinks = [
    { path: "/parent/dashboard", icon: home, label: "Home" },
    { path: "/parent/kid", icon: kids, label: "Kids", isKid: true },
    { path: "/parent/kid/attendance", icon: attendence, label: "Class shedules" },
    { path: "#", icon: availability, label: "Availability" },
    { path: "https://www.youtube.com/watch?v=zhkDRVRu6Rc", icon: walkthrough, label: "Walkthrough" },
    { path: "#", icon: support, label: "Support" },
    { path: "#", icon: certification, label: "Certificates" },
  ];

  return (
    <div className="w-[130px] bg-white flex flex-col shadow-md h-screen">
   
      <div className="relative pt-4 pb-8 flex justify-center">
        <img src={account} alt="Profile" className="w-10 h-10 rounded-full" />
        <div className="w-2.5 h-2.5 bg-green-500 rounded-full absolute bottom-7 right-5 border-2 border-white"></div>
      </div>

      <nav className="flex flex-col space-y-2">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`
              group flex flex-col items-center py-3 px-1 
              transition-colors duration-200 relative
              ${
                isActive(link.path) && !link.isKid ? 'bg-purple-50' : '' // Applies purple background to all except Kid1
              } 
              ${!isActive(link.path) ? 'hover:bg-purple-50' : ''} // Hover effect for all links
            `}
          >
           
            <div className={`
              absolute left-0 top-0 w-1 h-full bg-purple-700
              transition-opacity duration-200
              ${isActive(link.path) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
            `}></div>
            
            <div className={`relative ${link.isKid ? 'w-20 h-20' : 'w-6 h-6'} transition-all duration-200`}>
              <img 
                src={link.icon} 
                alt={link.label} 
                className={`w-full h-full mb-1 transition-[filter] duration-200 ${
                  isActive(link.path) && !link.isKid ? '[filter:var(--purple-filter)]' : ''
                }`}
                style={{
                  filter: isActive(link.path) && !link.isKid ? purpleFilter : 'none',
                }}
              />
            </div>
            <span className={`
              text-[10px] font-semibold
              transition-colors duration-200
              ${isActive(link.path) ? 'text-purple-700' : 'text-gray-600 group-hover:text-purple-700'}
            `}>
              {link.label}
            </span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto py-4 px-2">
        <img src={refer} alt="refer" className="w-auto h-auto mb-1" />
      </div>
    </div>
  );
};

export default Sidebar;
