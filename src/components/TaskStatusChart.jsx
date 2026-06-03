import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { workStatusData } from '../data/mockData';
import { FiCheckCircle, FiLoader, FiAlertCircle } from 'react-icons/fi';

// Register necessary Chart.js modules
ChartJS.register(ArcElement, Tooltip, Legend);

export default function TaskStatusChart() {
  const { completed, inProgress, pending } = workStatusData;
  const total = completed + inProgress + pending;

  // Chart data configuration
  const data = {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: [
      {
        data: [completed, inProgress, pending],
        backgroundColor: [
          '#22C55E', // success (green)
          '#F59E0B', // warning (amber)
          '#EF4444'  // danger (red)
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
        hoverOffset: 8
      }
    ]
  };

  // Chart options configuration
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false // We will render a custom HTML legend for cleaner styling
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = ((value / total) * 100).toFixed(1);
            return ` ${label}: ${value} tasks (${percentage}%)`;
          }
        },
        padding: 10,
        backgroundColor: '#1E293B',
        titleFont: { size: 12, family: 'Inter', weight: 'bold' },
        bodyFont: { size: 12, family: 'Inter' },
        cornerRadius: 8,
        displayColors: false
      }
    }
  };

  // Percentages for HTML legend
  const completedPct = ((completed / total) * 100).toFixed(0);
  const inProgressPct = ((inProgress / total) * 100).toFixed(0);
  const pendingPct = ((pending / total) * 100).toFixed(0);

  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col h-full">
      <div className="border-b border-slate-100 pb-3 mb-5">
        <h3 className="font-semibold text-slate-800 text-sm">Work Status Analytics</h3>
        <p className="text-xs text-slate-500">Distribution of active sprint deliverables</p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row items-center justify-around gap-6">
        {/* CHART CONTAINER */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56">
          <Pie data={data} options={options} />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold text-slate-800">{total}</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Total Tasks</span>
          </div>
        </div>

        {/* CUSTOM LEGENDS */}
        <div className="flex flex-col gap-4 w-full md:w-auto">
          {/* COMPLETED */}
          <div className="flex items-center justify-between gap-6 p-2 rounded-xl hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg">
                <FiCheckCircle className="w-4 h-4" />
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-800">Completed</p>
                <p className="text-[10px] text-slate-500">{completed} tasks</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-slate-800">{completedPct}%</span>
              <div className="w-16 bg-slate-100 h-1.5 rounded-full mt-1 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${completedPct}%` }} />
              </div>
            </div>
          </div>

          {/* IN PROGRESS */}
          <div className="flex items-center justify-between gap-6 p-2 rounded-xl hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 bg-amber-100 text-amber-600 rounded-lg">
                <FiLoader className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-800">In Progress</p>
                <p className="text-[10px] text-slate-500">{inProgress} tasks</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-slate-800">{inProgressPct}%</span>
              <div className="w-16 bg-slate-100 h-1.5 rounded-full mt-1 overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: `${inProgressPct}%` }} />
              </div>
            </div>
          </div>

          {/* PENDING */}
          <div className="flex items-center justify-between gap-6 p-2 rounded-xl hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 bg-rose-100 text-rose-600 rounded-lg">
                <FiAlertCircle className="w-4 h-4" />
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-800">Pending</p>
                <p className="text-[10px] text-slate-500">{pending} tasks</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-slate-800">{pendingPct}%</span>
              <div className="w-16 bg-slate-100 h-1.5 rounded-full mt-1 overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: `${pendingPct}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
