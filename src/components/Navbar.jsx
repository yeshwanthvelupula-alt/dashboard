// src/components/Navbar.jsx
import React from 'react';

export default function Navbar({ searchId, setSearchId, onSearchSubmit, errorMessage, employeeName }) {
  
  const executeFormSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(searchId);
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 z-10 shadow-sm">
      
      {/* AGPL Branding Logo Context Area */}
      <div className="flex items-center gap-2">
        <span className="bg-orange-600 text-white font-black text-xs px-2 py-1 rounded">AGPL</span>
        <span className="text-sm font-bold text-slate-800 hidden sm:inline">Adani Gangavaram Port Limited</span>
      </div>

      {/* Interactive Search Bar Action Implementation Form Container */}
      <form onSubmit={executeFormSubmit} className="flex items-center gap-2 relative">
        <div className="relative">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Search Employee ID..."
            className="border border-gray-300 rounded-md px-3 py-1.5 text-xs w-48 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
          />
          {errorMessage && (
            <span className="absolute left-0 -bottom-4 text-[10px] text-red-500 font-medium whitespace-nowrap">
              {errorMessage}
            </span>
          )}
        </div>
        <button 
          type="submit" 
          className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
        >
          Query
        </button>
      </form>
    </header>
  );
}
