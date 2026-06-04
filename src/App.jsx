import React, { useState } from 'react';
import Navbar from './components/Navbar';
import OverviewCards from './components/OverviewCards';
import TaskStatusChart from './components/TaskStatusChart';
import AttendanceTable from './components/AttendanceTable';
import LeaveCalendar from './components/LeaveCalendar';

// 1. Centralized Mock Database for HR Admin lookup capabilities
const mockEmployeeDatabase = {
  "EMP101": {
    name: "Bhaskar B. Balasa",
    role: "Lead Systems Architect",
    metrics: { workingDays: 240, present: 218, leaves: 15, absent: 7, completion: 92 },
    tasks: { completed: 12, inProgress: 3, pending: 1 },
    leaveHistory: [
      { date: "2026-05-18", type: "Sick Leave", reason: "Viral fever recovery" },
      { date: "2026-05-19", type: "Sick Leave", reason: "Viral fever recovery" },
      { date: "2026-05-05", type: "Casual Leave", reason: "Personal family work" }
    ]
  },
  "EMP102": {
    name: "Sowmya I.",
    role: "HR Operations Manager",
    metrics: { workingDays: 240, present: 230, leaves: 8, absent: 2, completion: 95 },
    tasks: { completed: 18, inProgress: 1, pending: 0 },
    leaveHistory: [
      { date: "2026-05-12", type: "Casual Leave", reason: "Bank related work" }
    ]
  }
};

export default function App() {
  // 2. Define state variables for controlling the current searched employee context
  const [searchId, setSearchId] = useState("EMP101");
  const [currentEmployee, setCurrentEmployee] = useState(mockEmployeeDatabase["EMP101"]);
  const [error, setError] = useState("");

  // 3. Search handling mechanism called from the Navbar trigger
  const handleSearchSubmit = (targetId) => {
    const cleanId = targetId.toUpperCase().trim();
    const empData = mockEmployeeDatabase[cleanId];
    
    if (empData) {
      setCurrentEmployee(empData);
      setError("");
    } else {
      setError("Employee ID not found in AGPL records.");
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      
      {/* Main Container Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Pass search controls into Navbar layout */}
        <Navbar 
          searchId={searchId}
          setSearchId={setSearchId}
          onSearchSubmit={handleSearchSubmit}
          errorMessage={error}
          employeeName={currentEmployee.name}
        />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Context Header */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-orange-600 uppercase tracking-wider">Currently Administering</p>
                <h2 className="text-xl font-semibold text-gray-800">{currentEmployee.name}</h2>
                <p className="text-sm text-gray-500">{currentEmployee.role} — Profile Context Active</p>
              </div>
              <div className="bg-slate-100 px-3 py-1.5 rounded text-xs font-mono font-bold text-slate-700">
                ID: {searchId.toUpperCase()}
              </div>
            </div>

            {/* 4. Pass specific data properties down to OverviewCards */}
            <OverviewCards metrics={currentEmployee.metrics} />

            {/* Middle Analytics Layout Row Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Task Matrix Section */}
              <div className="lg:col-span-1">
                <TaskStatusChart taskData={currentEmployee.tasks} />
              </div>

              {/* Step 3 Component Integration: Dynamic Attendance & Leave Calendar */}
              <div className="lg:col-span-2">
                <LeaveCalendar leaveData={currentEmployee.leaveHistory} />
              </div>
            </div>

            {/* Historical Raw Table View */}
            <AttendanceTable employeeId={searchId} />

          </div>
        </main>
      </div>
    </div>
  );
}
