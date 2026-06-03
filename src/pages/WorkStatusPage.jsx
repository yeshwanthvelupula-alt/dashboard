import React, { useState } from 'react';
import { workStatusData } from '../data/mockData';
import { FiCheck, FiArrowRight, FiPlus, FiSearch, FiCalendar, FiClock, FiFileText } from 'react-icons/fi';

export default function WorkStatusPage() {
  // Load tasks from mock data
  const [tasks, setTasks] = useState([
    { id: "T-1001", name: "Set up central auth context & state sync", status: "Completed", dueDate: "2026-06-01", category: "Core Development" },
    { id: "T-1002", name: "Integrate ChartJS widgets on reports screen", status: "Completed", dueDate: "2026-06-02", category: "Analytics" },
    { id: "T-1003", name: "Build interactive payslip modal view", status: "In Progress", dueDate: "2026-06-05", category: "Payroll UI" },
    { id: "T-1004", name: "Optimize mobile sidebar overlay layout", status: "In Progress", dueDate: "2026-06-06", category: "Aesthetics" },
    { id: "T-1005", name: "Implement search filtering for log lists", status: "Pending", dueDate: "2026-06-10", category: "Core Development" },
    { id: "T-1006", name: "Configure dynamic HSL themed style tokens", status: "Pending", dueDate: "2026-06-12", category: "Theme System" },
    { id: "T-1007", name: "Draft walkthrough documentation walkthrough.md", status: "Pending", dueDate: "2026-06-14", category: "Documentation" }
  ]);

  const [search, setSearch] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState({ name: '', category: 'Core Development', dueDate: '' });

  // Columns data
  const columns = ['Pending', 'In Progress', 'Completed'];

  // Filter tasks based on search
  const filteredTasks = tasks.filter(task => 
    task.name.toLowerCase().includes(search.toLowerCase()) ||
    task.category.toLowerCase().includes(search.toLowerCase())
  );

  // Stats
  const completedCount = tasks.filter(t => t.status === 'Completed').length;
  const inProgressCount = tasks.filter(t => t.status === 'In Progress').length;
  const pendingCount = tasks.filter(t => t.status === 'Pending').length;
  const totalCount = tasks.length;
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Move task to next state
  const handleMoveTask = (id, currentStatus) => {
    let nextStatus = '';
    if (currentStatus === 'Pending') nextStatus = 'In Progress';
    else if (currentStatus === 'In Progress') nextStatus = 'Completed';
    else return;

    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: nextStatus } : t));
  };

  // Submit new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.name.trim() || !newTask.dueDate) {
      alert("Please fill in task details.");
      return;
    }

    const createdTask = {
      id: `T-${1000 + tasks.length + 1}`,
      name: newTask.name,
      category: newTask.category,
      dueDate: newTask.dueDate,
      status: 'Pending'
    };

    setTasks([...tasks, createdTask]);
    setNewTask({ name: '', category: 'Core Development', dueDate: '' });
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Work Status & Sprint</h2>
          <p className="text-xs text-slate-500">Track tasks, update completion states, and visualize deliverable progress</p>
        </div>
        
        {/* ADD TASK TRIGGER */}
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-[0.98] transition-all cursor-pointer"
        >
          <FiPlus className="w-4 h-4" /> Create Deliverable
        </button>
      </div>

      {/* SPRINT PROGRESS OVERVIEW CARD */}
      <div className="glass-card rounded-2xl p-6 bg-white shadow-sm grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
        <div className="md:col-span-3">
          <div className="flex justify-between items-baseline mb-2">
            <h3 className="font-semibold text-slate-800 text-sm">Sprint Completion Status</h3>
            <span className="text-sm font-bold text-blue-600">{completionRate}% Finished</span>
          </div>
          <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden flex">
            <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${(completedCount / totalCount) * 100}%` }} />
            <div className="bg-amber-400 h-full transition-all duration-500" style={{ width: `${(inProgressCount / totalCount) * 100}%` }} />
          </div>
          <div className="flex gap-4 mt-3 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> {completedCount} Completed</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> {inProgressCount} In Progress</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-200" /> {pendingCount} Pending</div>
          </div>
        </div>
        
        {/* TOTAL COUNTER BOX */}
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Sprint Tasks</p>
          <h4 className="text-3xl font-extrabold text-slate-800 mt-1">{totalCount}</h4>
        </div>
      </div>

      {/* INLINE TASK ADDITION FORM */}
      {isAdding && (
        <form onSubmit={handleAddTask} className="glass-card rounded-2xl p-5 bg-white shadow-sm border border-blue-100 max-w-xl animate-slide-up space-y-4">
          <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">New Deliverable Details</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Task Deliverable Name</label>
              <input
                type="text"
                placeholder="Describe your active deliverable..."
                value={newTask.name}
                onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-700 font-medium"
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Category Area</label>
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-700 font-semibold"
              >
                <option value="Core Development">Core Development</option>
                <option value="Analytics">Analytics</option>
                <option value="Payroll UI">Payroll UI</option>
                <option value="Aesthetics">Aesthetics</option>
                <option value="Documentation">Documentation</option>
                <option value="Theme System">Theme System</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Due Date</label>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-700 font-medium"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 text-xs">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 font-semibold text-slate-500 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-500/10 transition-all cursor-pointer"
            >
              Save Deliverable
            </button>
          </div>
        </form>
      )}

      {/* SEARCH OR SEARCH LOG INPUT */}
      <div className="relative max-w-md">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <FiSearch className="w-4 h-4" />
        </span>
        <input
          type="text"
          placeholder="Filter deliverables by title or group tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-slate-700"
        />
      </div>

      {/* KANBAN BOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {columns.map((column) => {
          const columnTasks = filteredTasks.filter(t => t.status === column);
          return (
            <div key={column} className="bg-slate-100 rounded-2xl p-4 flex flex-col gap-4 border border-slate-200/40">
              
              {/* COLUMN HEADER */}
              <div className="flex justify-between items-center px-1">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">{column}</span>
                <span className="text-[10px] font-bold bg-white text-slate-500 border border-slate-200/50 w-5 h-5 rounded-full flex items-center justify-center">
                  {columnTasks.length}
                </span>
              </div>

              {/* TASK ITEMS LIST */}
              <div className="space-y-3 min-h-[300px]">
                {columnTasks.length > 0 ? (
                  columnTasks.map((task) => (
                    <div 
                      key={task.id}
                      className="p-4 bg-white border border-slate-200/50 rounded-xl shadow-sm hover:shadow-md transition-all group duration-200"
                    >
                      <div className="flex justify-between items-start gap-3">
                        <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-wide">
                          {task.category}
                        </span>
                        <span className="text-[9px] text-slate-400 font-bold uppercase">
                          {task.id}
                        </span>
                      </div>
                      
                      <h4 className="text-xs font-bold text-slate-800 mt-2.5 leading-relaxed">
                        {task.name}
                      </h4>

                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-medium">
                        <span className="flex items-center gap-1">
                          <FiCalendar className="w-3 h-3 text-slate-400" /> Due: {task.dueDate}
                        </span>
                        
                        {/* COLUMN TRANSITIONS */}
                        {column !== 'Completed' && (
                          <button
                            onClick={() => handleMoveTask(task.id, task.status)}
                            className="p-1 border border-slate-200 rounded-md hover:bg-blue-600 hover:text-white hover:border-blue-600 text-slate-400 transition-colors duration-150 cursor-pointer"
                            title={column === 'Pending' ? 'Start Task' : 'Complete Task'}
                          >
                            <FiArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {column === 'Completed' && (
                          <span className="text-emerald-500 flex items-center gap-0.5 font-bold uppercase text-[8px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                            <FiCheck className="w-2.5 h-2.5" /> Checked
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-[280px] border border-dashed border-slate-300 rounded-xl flex items-center justify-center text-center text-slate-400 text-[11px] font-medium p-6">
                    No deliverables under {column}.
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
