import React from 'react';
import AttendanceTable from '../components/AttendanceTable';

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Attendance Ledger</h2>
        <p className="text-xs text-slate-500">Search, filter, and inspect your official attendance records</p>
      </div>
      <AttendanceTable />
    </div>
  );
}
