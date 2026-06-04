// src/components/Sidebar.jsx (or your layout file)
import React from 'react';

export default function Sidebar() {
  return (
    <div className="sidebar-container bg-slate-900 text-white w-64 h-screen p-4">
      {/* Updated Company Branding */}
      <div className="flex items-center gap-3 mb-8 border-b border-slate-700 pb-4">
        <div className="bg-orange-500 text-white font-black px-2 py-1 rounded text-lg tracking-wider">
          AGPL
        </div>
        <div>
          <h1 className="text-sm font-bold leading-tight tracking-wide text-gray-100">
            Adani Gangavaram
          </h1>
          <p className="text-xs text-gray-400 font-medium">Port Limited</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-2">
        <a href="#dashboard" className="flex items-center space-x-3 p-2 rounded bg-slate-800 text-white">
          <span>Dashboard</span>
        </a>
        {/* Other links... */}
      </nav>
    </div>
  );
}
