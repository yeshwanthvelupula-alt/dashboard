import React from 'react';
import { stats } from '../data/mockData';
import { FiCalendar, FiUserCheck, FiFileText, FiUserX, FiActivity } from 'react-icons/fi';

export default function OverviewCards() {
  const cardsData = [
    {
      title: "Total Working Days",
      value: stats.totalWorkingDays,
      icon: <FiCalendar className="w-6 h-6 text-white" />,
      gradient: "from-blue-600 to-indigo-700",
      shadow: "shadow-blue-500/20"
    },
    {
      title: "Present Days",
      value: stats.presentDays,
      icon: <FiUserCheck className="w-6 h-6 text-white" />,
      gradient: "from-emerald-500 to-teal-600",
      shadow: "shadow-emerald-500/20"
    },
    {
      title: "Leave Days",
      value: stats.leaveDays,
      icon: <FiFileText className="w-6 h-6 text-white" />,
      gradient: "from-amber-500 to-orange-600",
      shadow: "shadow-amber-500/20"
    },
    {
      title: "Absent Days",
      value: stats.absentDays,
      icon: <FiUserX className="w-6 h-6 text-white" />,
      gradient: "from-rose-500 to-red-600",
      shadow: "shadow-rose-500/20"
    },
    {
      title: "Work Completion",
      value: `${stats.workCompletionPercentage}%`,
      icon: <FiActivity className="w-6 h-6 text-white" />,
      gradient: "from-purple-600 to-fuchsia-700",
      shadow: "shadow-purple-500/20"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 animate-slide-up">
      {cardsData.map((card, idx) => (
        <div 
          key={idx}
          className={`
            relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br ${card.gradient} 
            text-white shadow-xl ${card.shadow} transform hover:-translate-y-1 hover:scale-[1.02] 
            transition-all duration-300 group cursor-default
          `}
        >
          {/* BACKGROUND BLUR DECORATION */}
          <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 w-24 h-24 rounded-full bg-white/10 group-hover:scale-150 transition-transform duration-500 blur-xl" />
          
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-white/80 text-[11px] font-semibold uppercase tracking-wider">{card.title}</p>
              <h3 className="text-3xl font-bold mt-2 tracking-tight">{card.value}</h3>
            </div>
            <div className="p-3 bg-white/15 rounded-xl backdrop-blur-md border border-white/10">
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
