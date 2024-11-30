/* eslint-disable react/prop-types */
import { Monitor, Users, PenTool, BookMarked } from 'lucide-react';

const MetricCard = ({ number, label, icon: Icon, isPurple }) => {
  const baseClasses = "flex items-center justify-between p-4 rounded-xl border";
  const colorClasses = isPurple 
    ? "bg-purple-600 text-white border-purple-600" 
    : "bg-white text-purple-600 border-purple-100";

  return (
    <div className={`${baseClasses} ${colorClasses}`}>
      <div className="flex flex-col">
        <span className="text-2xl font-bold">{number}</span>
        <span className="text-sm">{label}</span>
      </div>
      <Icon className={`w-6 h-6 ${isPurple ? 'text-white' : 'text-purple-600'}`} />
    </div>
  );
};

const MetricsCards = () => {
  const metrics = [
    {
      number: 2,
      label: "Classes Pending",
      icon: Monitor,
      isPurple: true
    },
    {
      number: 1,
      label: "Kid(s) Registered",
      icon: Users,
      isPurple: false
    },
    {
      number: 6,
      label: "Days Present",
      icon: PenTool,
      isPurple: false
    },
    {
      number: 3,
      label: "Level",
      icon: BookMarked,
      isPurple: false
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          number={metric.number}
          label={metric.label}
          icon={metric.icon}
          isPurple={metric.isPurple}
        />
      ))}
    </div>
  );
};

export default MetricsCards;