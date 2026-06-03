import React, { useState } from 'react';
import { leaveSummary, leaveHistory } from '../data/mockData';
import { FiPlus, FiBriefcase, FiCheck, FiX, FiCalendar, FiClock } from 'react-icons/fi';

export default function LeaveManagement() {
  const [history, setHistory] = useState(leaveHistory);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Leave Balance calculations
  const [balances, setBalances] = useState({
    available: leaveSummary.totalAvailable,
    used: leaveSummary.used,
    remaining: leaveSummary.remaining,
    types: leaveSummary.types
  });

  // Modal Form State
  const [formData, setFormData] = useState({
    leaveType: 'Casual Leave',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateDays = (start, end) => {
    if (!start || !end) return 1;
    const sDate = new Date(start);
    const eDate = new Date(end);
    const diffTime = Math.abs(eDate - sDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return isNaN(diffDays) ? 1 : diffDays;
  };

  const handleApplyLeave = (e) => {
    e.preventDefault();
    if (!formData.startDate || !formData.endDate) {
      alert("Please fill in start and end dates.");
      return;
    }

    const daysCount = calculateDays(formData.startDate, formData.endDate);
    
    // Create new mock leave request
    const newRequest = {
      leaveId: `LV-2026-${Math.floor(100 + Math.random() * 900)}`,
      leaveType: formData.leaveType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      days: daysCount,
      approvedBy: "Sowmya I.",
      approvalDate: "Pending Review",
      status: "Pending"
    };

    // Update state
    setHistory([newRequest, ...history]);
    setIsModalOpen(false);
    
    // Reset form
    setFormData({
      leaveType: 'Casual Leave',
      startDate: '',
      endDate: '',
      reason: ''
    });
  };

  // Get status color helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
            <FiCheck className="w-3 h-3" /> Approved
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 animate-pulse">
            <FiClock className="w-3 h-3" /> Pending
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700">
            <FiX className="w-3 h-3" /> Rejected
          </span>
        );
      default:
        return <span className="px-2 py-1 rounded text-slate-600 text-xs font-semibold">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER SECTION WITH REQUEST LEAVE BUTTON */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Leave Management</h2>
          <p className="text-xs text-slate-500">Track and request paid, sick, and casual time off</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-[0.98] transition-all cursor-pointer"
        >
          <FiPlus className="w-4 h-4" /> Apply for Leave
        </button>
      </div>

      {/* LEAVE METRICS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-card rounded-2xl p-5 shadow-sm flex items-center gap-4 bg-white">
          <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl">
            <FiCalendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Leave Allowance</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{balances.available} Days</h3>
          </div>
        </div>
        <div className="glass-card rounded-2xl p-5 shadow-sm flex items-center gap-4 bg-white">
          <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <FiBriefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Leaves Consumed</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{balances.used} Days</h3>
          </div>
        </div>
        <div className="glass-card rounded-2xl p-5 shadow-sm flex items-center gap-4 bg-white">
          <div className="p-3.5 bg-amber-50 text-amber-500 rounded-xl">
            <FiClock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Leaves Remaining</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{balances.remaining} Days</h3>
          </div>
        </div>
      </div>

      {/* LEAVE TYPE BREAKDOWN CARDS */}
      <div className="glass-card rounded-2xl p-6 bg-white shadow-sm">
        <h3 className="font-semibold text-slate-800 text-sm border-b border-slate-100 pb-3 mb-4">Leave Types Breakdown</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {balances.types.map((type, idx) => {
            const consumedPct = type.available > 0 ? (type.used / type.available) * 100 : 0;
            return (
              <div key={idx} className="p-4 border border-slate-100 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <p className="text-xs font-bold text-slate-700">{type.name}</p>
                <div className="flex justify-between items-baseline mt-3 text-slate-800">
                  <span className="text-lg font-bold">{type.remaining} <span className="text-[10px] font-normal text-slate-400">left</span></span>
                  <span className="text-xs text-slate-400">{type.used} / {type.available}</span>
                </div>
                
                {/* PROGRESS BAR */}
                {type.available > 0 ? (
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2.5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${type.color}`} 
                      style={{ width: `${100 - consumedPct}%` }} 
                    />
                  </div>
                ) : (
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2.5 flex items-center justify-center">
                    <span className="text-[9px] text-slate-400 font-semibold uppercase">Not Applicable</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* LEAVE HISTORY TABLE */}
      <div className="glass-card rounded-2xl p-6 bg-white shadow-sm overflow-hidden">
        <h3 className="font-semibold text-slate-800 text-sm border-b border-slate-100 pb-3 mb-4">Leave History Logs</h3>
        
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="min-w-full divide-y divide-slate-100 text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">Leave ID</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Start Date</th>
                <th className="px-6 py-4">End Date</th>
                <th className="px-6 py-4 text-center">Days</th>
                <th className="px-6 py-4">Approved By</th>
                <th className="px-6 py-4">Approval Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100 font-medium text-slate-700">
              {history.map((record, index) => (
                <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">{record.leaveId}</td>
                  <td className="px-6 py-4">{record.leaveType}</td>
                  <td className="px-6 py-4">{record.startDate}</td>
                  <td className="px-6 py-4">{record.endDate}</td>
                  <td className="px-6 py-4 text-center text-blue-600 font-semibold">{record.days}</td>
                  <td className="px-6 py-4 text-slate-500">{record.approvedBy}</td>
                  <td className="px-6 py-4 text-slate-400">{record.approvalDate}</td>
                  <td className="px-6 py-4">{getStatusBadge(record.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* APPLY FOR LEAVE MODAL (GLASSMORPHISM) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-sm">Apply for Leave</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleApplyLeave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Leave Type</label>
                <select
                  name="leaveType"
                  value={formData.leaveType}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-700"
                >
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Earned Leave">Earned Leave</option>
                  <option value="Emergency Leave">Emergency Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Reason for Absence</label>
                <textarea
                  name="reason"
                  rows="3"
                  value={formData.reason}
                  onChange={handleInputChange}
                  placeholder="Provide a brief explanation of your request..."
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-700 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/10 transition-all cursor-pointer"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
