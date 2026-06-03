import React from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  PointElement, 
  LineElement, 
  ArcElement, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { attendanceRecords, leaveSummary, stats } from '../data/mockData';
import { FiTrendingUp, FiActivity, FiBriefcase, FiCalendar } from 'react-icons/fi';

// Register ChartJS plugins
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  PointElement, 
  LineElement, 
  ArcElement, 
  Tooltip, 
  Legend
);

export default function ReportsPage() {
  
  // 1. Monthly Attendance Trend Chart Data (Last 6 months)
  const last6Months = [...attendanceRecords].slice(0, 6).reverse();
  const monthsLabels = last6Months.map(r => r.month.split(' ')[0]); // Get month name
  
  const attendanceTrendData = {
    labels: monthsLabels,
    datasets: [
      {
        label: 'Present Days',
        data: last6Months.map(r => r.presentDays),
        backgroundColor: '#3B82F6', // Blue
        borderRadius: 6
      },
      {
        label: 'Leave Days',
        data: last6Months.map(r => r.leaveDays),
        backgroundColor: '#F59E0B', // Amber
        borderRadius: 6
      },
      {
        label: 'Absent Days',
        data: last6Months.map(r => r.absentDays),
        backgroundColor: '#EF4444', // Red
        borderRadius: 6
      }
    ]
  };

  const attendanceTrendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { font: { family: 'Inter', size: 10, weight: 'bold' }, padding: 15 }
      },
      tooltip: { padding: 10, cornerRadius: 8 }
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 10 } } },
      y: { grid: { color: '#F1F5F9' }, ticks: { font: { family: 'Inter', size: 10 }, stepSize: 5 } }
    }
  };

  // 2. Leave Usage Chart Data
  const leaveUsageData = {
    labels: ['Consumed Leaves', 'Remaining Leaves'],
    datasets: [
      {
        data: [leaveSummary.used, leaveSummary.remaining],
        backgroundColor: ['#6366F1', '#E2E8F0'], // Indigo, Slate
        borderWidth: 2,
        borderColor: '#ffffff',
        hoverOffset: 6
      }
    ]
  };

  const leaveUsageOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { font: { family: 'Inter', size: 10, weight: 'bold' }, padding: 15 }
      },
      tooltip: { padding: 10, cornerRadius: 8 }
    }
  };

  // 3. Performance Trend (Task Completion % over 5 months)
  const performanceTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Task Completion Rate',
        data: [78, 85, 88, 90, 92],
        fill: true,
        borderColor: '#10B981', // Emerald
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.35,
        borderWidth: 3,
        pointBackgroundColor: '#10B981',
        pointHoverRadius: 6
      }
    ]
  };

  const performanceTrendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { padding: 10, cornerRadius: 8 }
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 10 } } },
      y: { min: 60, max: 100, grid: { color: '#F1F5F9' }, ticks: { font: { family: 'Inter', size: 10 }, stepSize: 10 } }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER TITLE */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Analytics & Reports</h2>
        <p className="text-xs text-slate-500">Visual performance summaries, leave breakdowns, and attendance tracking</p>
      </div>

      {/* QUICK HIGHLIGHT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card rounded-2xl p-5 bg-white shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <FiCalendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">YTD Attendance</p>
            <h4 className="text-md font-bold text-slate-800 mt-0.5">90.8% Avg</h4>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 bg-white shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <FiBriefcase className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Leaves Taken</p>
            <h4 className="text-md font-bold text-slate-800 mt-0.5">15 of 30 days</h4>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 bg-white shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <FiActivity className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Task Completion</p>
            <h4 className="text-md font-bold text-slate-800 mt-0.5">92% Average</h4>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 bg-white shadow-sm flex items-center gap-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
            <FiTrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Sprint Status</p>
            <h4 className="text-md font-bold text-slate-800 mt-0.5">Excellent (Tier-1)</h4>
          </div>
        </div>
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CHART 1: MONTHLY ATTENDANCE TREND */}
        <div className="glass-card rounded-2xl p-6 bg-white shadow-sm lg:col-span-2 flex flex-col min-h-[350px]">
          <div className="border-b border-slate-100 pb-3 mb-4">
            <h3 className="font-semibold text-slate-800 text-sm">Monthly Attendance Report</h3>
            <p className="text-xs text-slate-500">Distribution of present, leave, and absent days over the last 6 months</p>
          </div>
          <div className="flex-1 relative">
            <Bar data={attendanceTrendData} options={attendanceTrendOptions} />
          </div>
        </div>

        {/* CHART 2: LEAVE USAGE */}
        <div className="glass-card rounded-2xl p-6 bg-white shadow-sm flex flex-col min-h-[350px]">
          <div className="border-b border-slate-100 pb-3 mb-4">
            <h3 className="font-semibold text-slate-800 text-sm">Leave Allocation Usage</h3>
            <p className="text-xs text-slate-500">Ratio of total leaves consumed vs remaining balance</p>
          </div>
          <div className="flex-1 relative flex items-center justify-center">
            <div className="w-48 h-48 sm:w-52 sm:h-52">
              <Doughnut data={leaveUsageData} options={leaveUsageOptions} />
            </div>
          </div>
        </div>

        {/* CHART 3: PERFORMANCE TREND */}
        <div className="glass-card rounded-2xl p-6 bg-white shadow-sm lg:col-span-3 flex flex-col min-h-[320px]">
          <div className="border-b border-slate-100 pb-3 mb-4">
            <h3 className="font-semibold text-slate-800 text-sm">Performance Progression</h3>
            <p className="text-xs text-slate-500">Monthly sprint deliverables completion velocity trend (%)</p>
          </div>
          <div className="flex-1 relative">
            <Line data={performanceTrendData} options={performanceTrendOptions} />
          </div>
        </div>

      </div>

    </div>
  );
}
