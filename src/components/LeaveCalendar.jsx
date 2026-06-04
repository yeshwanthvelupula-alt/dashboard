// src/components/LeaveCalendar.jsx
import React, { useState } from 'react';

export default function LeaveCalendar({ leaveData = [] }) {
  // Setup state for tracking the selected year and month (Defaulting to current year 2026)
  const [selectedMonth, setSelectedMonth] = useState(5); // 0-indexed: 5 = June
  const [selectedYear, setSelectedYear] = useState(2026);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Helper: Get the total number of days in the chosen month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Helper: Get the starting day of the week (0 = Sunday, 1 = Monday...) to align the grid layout properly
  const getFirstDayOfWeek = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  const firstDayIndex = getFirstDayOfWeek(selectedYear, selectedMonth);

  // Generate arrays for the grid layout configuration
  const emptySlots = Array.from({ length: firstDayIndex }, (_, i) => i);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Checks if a specific day matches a leave entry inside the selected month/year
  const getLeaveDetails = (dayNumber) => {
    const formattedMonth = String(selectedMonth + 1).padStart(2, '0');
    const formattedDay = String(dayNumber).padStart(2, '0');
    const targetDateString = `${selectedYear}-${formattedMonth}-${formattedDay}`;

    return leaveData.find(leave => leave.date === targetDateString);
  };

  // UI styling maps corresponding to specific leave categories
  const getLeaveStyle = (leaveType) => {
    switch (leaveType) {
      case 'Sick Leave':
        return 'bg-red-100 hover:bg-red-200 text-red-800 border-red-300 font-semibold';
      case 'Casual Leave':
        return 'bg-amber-100 hover:bg-amber-200 text-amber-800 border-amber-300 font-semibold';
      case 'Earned Leave':
        return 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border-emerald-300 font-semibold';
      case 'Loss of Pay (LOP)':
        return 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300 font-semibold';
      default:
        return 'bg-gray-50 text-gray-400';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      
      {/* Calendar Header with Selectors */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 mb-6 gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Employee Attendance Calendar</h3>
          <p className="text-xs text-gray-500">Highlighting active leave cycles and categories</p>
        </div>

        {/* Month & Year Form Options */}
        <div className="flex items-center gap-2">
          <select 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 text-sm bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
          >
            {months.map((month, idx) => (
              <option key={month} value={idx}>{month}</option>
            ))}
          </select>

          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 text-sm bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
          >
            <option value={2025}>2025</option>
            <option value={2026}>2026</option>
            <option value={2027}>2027</option>
          </select>
        </div>
      </div>

      {/* Color Legend Identifier */}
      <div className="flex flex-wrap items-center gap-4 mb-6 text-xs font-medium">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-red-100 border border-red-300 rounded-sm"></span>
          <span className="text-gray-600">Sick Leave</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-amber-100 border border-amber-300 rounded-sm"></span>
          <span className="text-gray-600">Casual Leave</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-emerald-100 border border-emerald-300 rounded-sm"></span>
          <span className="text-gray-600">Earned Leave</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-slate-100 border border-slate-300 rounded-sm"></span>
          <span className="text-gray-600">Loss of Pay (LOP)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-white border border-gray-200 rounded-sm"></span>
          <span className="text-gray-600">Regular Working Day / Present</span>
        </div>
      </div>

      {/* Grid Days Header Label Tracking */}
      <div className="grid grid-cols-7 gap-2 mb-2 text-center font-bold text-xs text-gray-500 tracking-wider uppercase">
        <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
      </div>

      {/* Calendar Block Grid Area */}
      <div className="grid grid-cols-7 gap-2">
        {/* Render empty preceding padding items */}
        {emptySlots.map(slot => (
          <div key={`empty-${slot}`} className="bg-gray-50/50 min-h-[64px] rounded border border-dashed border-gray-100"></div>
        ))}

        {/* Render active day nodes */}
        {daysArray.map(day => {
          const leave = getLeaveDetails(day);
          const styleClasses = leave ? getLeaveStyle(leave.type) : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200';

          return (
            <div 
              key={`day-${day}`}
              className={`min-h-[72px] p-2 border rounded flex flex-col justify-between transition-colors relative group ${styleClasses}`}
            >
              <span className="text-xs font-semibold">{day}</span>
              
              {/* If on leave, show indicator label */}
              {leave && (
                <div className="text-[10px] leading-tight truncate mt-1 block tracking-tight">
                  {leave.type}
                </div>
              )}

              {/* Advanced Tooltip detail display on hover */}
              {leave && leave.reason && (
                <div className="absolute z-10 hidden group-hover:block bg-slate-900 text-white text-[11px] rounded p-2 shadow-lg -top-12 left-1/2 transform -translate-x-1/2 w-48 pointer-events-none">
                  <p className="font-bold">{leave.type}</p>
                  <p className="text-gray-300 text-[10px] mt-0.5">Reason: {leave.reason}</p>
                  <div className="w-2 h-2 bg-slate-900 rotate-45 absolute bottom-[-4px] left-1/2 transform -translate-x-1/2"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
