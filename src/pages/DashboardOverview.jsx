import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import OverviewCards from '../components/OverviewCards';
import TaskStatusChart from '../components/TaskStatusChart';
import { notifications, workStatusData } from '../data/mockData';
import { 
  FiBell, FiCalendar, FiArrowRight, 
  FiCheckCircle, FiLoader, FiAlertCircle, 
  FiArrowUpRight, FiFileText 
} from 'react-icons/fi';

export default function DashboardOverview() {
  const navigate = useNavigate();

  // Get status color for recent tasks
  const getTaskStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'text-emerald-700 bg-emerald-50';
      case 'In Progress':
        return 'text-amber-700 bg-amber-50';
      case 'Pending':
        return 'text-rose-700 bg-rose-50';
      default:
        return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Dashboard Overview</h2>
          <p className="text-xs text-slate-500">Overview of attendance metrics, leaves, and active work tasks</p>
        </div>
        <div className="text-xs text-slate-400 font-semibold bg-slate-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          Shift Sync Active
        </div>
      </div>

      {/* OVERVIEW METRIC COUNTERS */}
      <OverviewCards />

      {/* GRID SECTION: TASK CHART & NOTIFICATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* TASK ANALYTICS PIE CHART */}
        <div className="lg:col-span-2">
          <TaskStatusChart />
        </div>

        {/* NOTIFICATIONS PANEL */}
        <div className="glass-card rounded-2xl p-6 bg-white shadow-sm flex flex-col h-full">
          <div className="border-b border-slate-100 pb-3 mb-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-slate-800 text-sm">Recent Alerts</h3>
              <p className="text-xs text-slate-500">Latest HR and system updates</p>
            </div>
            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <FiBell className="w-4 h-4" />
            </span>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto max-h-[320px] pr-1">
            {notifications.slice(0, 4).map((notif) => (
              <div key={notif.id} className="flex items-start gap-3 text-xs">
                <span className="p-1.5 bg-slate-50 border border-slate-100 rounded-lg mt-0.5 text-slate-500">
                  {notif.type === 'leave' && <FiCalendar className="w-3.5 h-3.5 text-amber-500" />}
                  {notif.type === 'attendance' && <FiCheckCircle className="w-3.5 h-3.5 text-blue-500" />}
                  {notif.type === 'task' && <FiLoader className="w-3.5 h-3.5 text-purple-500" />}
                  {notif.type === 'announcement' && <FiAlertCircle className="w-3.5 h-3.5 text-emerald-500" />}
                  {notif.type === 'holiday' && <FiCalendar className="w-3.5 h-3.5 text-rose-500" />}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-800 flex justify-between">
                    {notif.title}
                    <span className="font-normal text-[9px] text-slate-400">{notif.time}</span>
                  </h4>
                  <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5">{notif.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* SPRINT DELIVERABLES & QUICK ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* DELIVERABLES LIST */}
        <div className="glass-card rounded-2xl p-6 bg-white shadow-sm lg:col-span-2">
          <div className="border-b border-slate-100 pb-3 mb-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-slate-800 text-sm">Sprint Deliverables</h3>
              <p className="text-xs text-slate-500">Your current tasks in the active development cycle</p>
            </div>
            <Link to="/work-status" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View All <FiArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {workStatusData.recentTasks.slice(0, 3).map((task) => (
              <div 
                key={task.id}
                className="flex items-center justify-between p-3.5 border border-slate-100 rounded-xl hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${getTaskStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                  <span className="text-xs font-semibold text-slate-800 line-clamp-1">{task.name}</span>
                </div>
                <div className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                  Due: {task.dueDate}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK ACTIONS SIDEBAR */}
        <div className="glass-card rounded-2xl p-6 bg-white shadow-sm flex flex-col">
          <div className="border-b border-slate-100 pb-3 mb-4">
            <h3 className="font-semibold text-slate-800 text-sm">Quick Actions</h3>
            <p className="text-xs text-slate-500">Shortcut controls for HR operations</p>
          </div>

          <div className="flex-1 flex flex-col gap-3 justify-center">
            <button
              onClick={() => navigate('/leaves')}
              className="flex items-center justify-between p-3.5 bg-blue-50/50 hover:bg-blue-50 border border-blue-100/50 text-blue-700 text-xs font-semibold rounded-xl transition-all cursor-pointer group"
            >
              <span className="flex items-center gap-2.5">
                <FiCalendar className="w-4 h-4" /> Apply for Time Off
              </span>
              <FiArrowUpRight className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => navigate('/profile')}
              className="flex items-center justify-between p-3.5 bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100/50 text-emerald-700 text-xs font-semibold rounded-xl transition-all cursor-pointer group"
            >
              <span className="flex items-center gap-2.5">
                <FiFileText className="w-4 h-4" /> View Salary Statements
              </span>
              <FiArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => navigate('/attendance')}
              className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/50 text-slate-700 text-xs font-semibold rounded-xl transition-all cursor-pointer group"
            >
              <span className="flex items-center gap-2.5">
                <FiCheckCircle className="w-4 h-4" /> Inspect Attendance Logs
              </span>
              <FiArrowUpRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
