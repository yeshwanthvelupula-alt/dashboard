// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import LeaveCalendar from '../components/LeaveCalendar'; // We will build this in Step 3

// Mock database simulating employee-specific records
const mockEmployeeDatabase = {
  "EMP101": {
    name: "Bhaskar B. Balasa",
    role: "Lead Systems Architect",
    metrics: { workingDays: 240, present: 218, leaves: 15, absent: 7, completion: 92 },
    tasks: [
      { id: 1, title: "Set up central auth context & state sync", status: "Completed", due: "2026-06-01" },
      { id: 2, title: "Integrate ChartJS widgets on reports screen", status: "Completed", due: "2026-06-02" },
      { id: 3, title: "Build interactive payslip modal view", status: "In Progress", due: "2026-06-05" }
    ],
    leaveHistory: [
      { date: "2026-05-18", type: "Sick Leave" },
      { date: "2026-05-19", type: "Sick Leave" },
      { date: "2026-05-20", type: "Sick Leave" },
      { date: "2026-05-05", type: "Casual Leave" }
    ]
  },
  "EMP102": {
    name: "Sowmya I.",
    role: "HR Operations Manager",
    metrics: { workingDays: 240, present: 230, leaves: 8, absent: 2, completion: 95 },
    tasks: [
      { id: 1, title: "Finalize May 2026 payroll parameters", status: "Completed", due: "2026-05-28" },
      { id: 2, title: "Optimize HR recruitment workflow", status: "In Progress", due: "2026-06-15" }
    ],
    leaveHistory: [
      { date: "2026-05-12", type: "Casual Leave" }
    ]
  }
};

export default function Dashboard() {
  const [searchId, setSearchId] = useState("EMP101");
  const [currentEmployee, setCurrentEmployee] = useState(mockEmployeeDatabase["EMP101"]);
  const [error, setError] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const empData = mockEmployeeDatabase[searchId.toUpperCase().trim()];
    if (empData) {
      setCurrentEmployee(empData);
      setError("");
    } else {
      setError("Employee ID not found");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Header & Admin Search Control */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4 mb-6 gap-4">
        <div>
          <span className="text-xs font-bold text-orange-600 tracking-widest uppercase block mb-1">HR Admin Portal</span>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
          <p className="text-sm text-gray-500">Viewing data for: <strong className="text-slate-900">{currentEmployee.name} ({currentEmployee.role})</strong></p>
        </div>

        {/* Employee Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Employee ID (e.g., EMP101)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {error && <p className="text-xs text-red-500 absolute mt-1">{error}</p>}
          </div>
          <button type="submit" className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 text-sm rounded transition-colors">
            Search
          </button>
        </form>
      </div>

      {/* --- Dynamic Metric Cards Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow-sm border-t-4 border-blue-500">
          <p className="text-xs text-gray-500 uppercase font-semibold">Total Working Days</p>
          <p className="text-2xl font-bold text-gray-800">{currentEmployee.metrics.workingDays}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-sm border-t-4 border-green-500">
          <p className="text-xs text-gray-500 uppercase font-semibold">Present Days</p>
          <p className="text-2xl font-bold text-gray-800">{currentEmployee.metrics.present}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-sm border-t-4 border-amber-500">
          <p className="text-xs text-gray-500 uppercase font-semibold">Leave Days</p>
          <p className="text-2xl font-bold text-gray-800">{currentEmployee.metrics.leaves}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-sm border-t-4 border-red-500">
          <p className="text-xs text-gray-500 uppercase font-semibold">Absent Days</p>
          <p className="text-2xl font-bold text-gray-800">{currentEmployee.metrics.absent}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-sm border-t-4 border-purple-500">
          <p className="text-xs text-gray-500 uppercase font-semibold">Work Completion</p>
          <p className="text-2xl font-bold text-gray-800">{currentEmployee.metrics.completion}%</p>
        </div>
      </div>

      {/* Leave Calendar Section Component */}
      <div className="mt-8">
        <LeaveCalendar leaveData={currentEmployee.leaveHistory} />
      </div>
    </div>
  );
}
