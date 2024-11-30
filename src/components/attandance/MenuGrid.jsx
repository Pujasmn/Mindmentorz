import { Link, useParams } from "react-router-dom";
import { Infinity, Flag, Snowflake, CircuitBoard } from "lucide-react";

const MenuGrid = () => {
  const { id } = useParams();

  const menuItems = [
    {
      id: id,
      icon: <Infinity className="w-6 h-6 text-white" />,
      title: "Demo / Class",
      subtitle: "Requests",
      bgColor: "bg-pink-500",
      route: "#",
    },
    {
      id: id,
      icon: <Flag className="w-6 h-6 text-white" />,
      title: "Class",
      subtitle: "Schedules",
      bgColor: "bg-orange-500",
      route: "/class-schedule",
    },
    {
      id: id,
      icon: <Snowflake className="w-6 h-6 text-white" />,
      title: "Manage",
      subtitle: "Child Login",
      bgColor: "bg-purple-500",
      route: "/parent/kid",
    },
    {
      id: id,
      icon: <CircuitBoard className="w-6 h-6 text-white" />,
      title: "Reports",
      subtitle: "(Detailed View)",
      bgColor: "bg-green-500",
      route: "#",
    },
    {
      id: id,
      icon: <Infinity className="w-6 h-6 text-white" />,
      title: "Fee",
      subtitle: "Details",
      bgColor: "bg-pink-500",
      route: "/fee-details",
    },
    {
      id: id,
      icon: <Flag className="w-6 h-6 text-white" />,
      title: "Kid(s)",
      subtitle: "Profile",
      bgColor: "bg-orange-500",
      route: "/parent/kid",
    },
  ];

  return (
    <div className="max-w-4xl p-6">
      <div className="grid grid-cols-2 gap-8">
        {menuItems.map((item) => (
          <Link key={item.id} to={item.route.replace(":id", item.id)}>
            <div className="flex items-center gap-4 cursor-pointer">
              <div
                className={`w-14 h-14 rounded-full ${item.bgColor} flex items-center justify-center shadow-md`}
              >
                {item.icon}
              </div>
              <div>
                <div className="font-medium text-gray-900">{item.title}</div>
                <div className="text-gray-600">{item.subtitle}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MenuGrid;
