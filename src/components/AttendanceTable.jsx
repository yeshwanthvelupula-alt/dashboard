import React, { useState } from 'react';
import { attendanceRecords } from '../data/mockData';
import { FiSearch, FiDownload, FiChevronLeft, FiChevronRight, FiChevronUp, FiChevronDown } from 'react-icons/fi';

export default function AttendanceTable() {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('month'); // default sort field
  const [sortDirection, setSortDirection] = useState('desc'); // default sort order
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 1. Search filter
  const filteredRecords = attendanceRecords.filter(record => 
    record.month.toLowerCase().includes(search.toLowerCase()) ||
    record.approvedBy.toLowerCase().includes(search.toLowerCase())
  );

  // Helper to parse "Month Year" to date objects for accurate date sorting
  const parseMonthYear = (str) => {
    const [monthName, year] = str.split(' ');
    const months = {
      January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
      July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
    };
    return new Date(parseInt(year), months[monthName], 1);
  };

  // 2. Sorting
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (sortField === 'month') {
      aVal = parseMonthYear(a.month).getTime();
      bVal = parseMonthYear(b.month).getTime();
    }

    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // 3. Pagination
  const totalPages = Math.ceil(sortedRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRecords = sortedRecords.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1); // Reset page on sort change
  };

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  // CSV Export utility
  const exportToCSV = () => {
    const headers = ['Month', 'Working Days', 'Present Days', 'Leave Days', 'Absent Days', 'Attendance Percentage', 'Approved By'];
    
    const rows = sortedRecords.map(r => [
      r.month,
      r.workingDays,
      r.presentDays,
      r.leaveDays,
      r.absentDays,
      `${r.attendancePercentage}%`,
      r.approvedBy
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Attendance_Report_EMP-2026-8942_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link); // Required for FF
    
    link.click();
    document.body.removeChild(link);
  };

  // Render sort arrow indicators
  const renderSortIndicator = (field) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' 
      ? <FiChevronUp className="w-3.5 h-3.5 inline ml-1 text-blue-600" />
      : <FiChevronDown className="w-3.5 h-3.5 inline ml-1 text-blue-600" />;
  };

  return (
    <div className="glass-card rounded-2xl p-6 shadow-sm flex flex-col gap-4">
      
      {/* SEARCH AND EXPORT HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="font-semibold text-slate-800 text-sm">Attendance Logs</h3>
          <p className="text-xs text-slate-500">Historical monthly attendance verification</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <FiSearch className="w-4 h-4" />
            </span>
            <input 
              type="text"
              placeholder="Search month or approver..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all text-slate-700"
            />
          </div>
          <button 
            onClick={exportToCSV}
            className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            <FiDownload className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* RESPONSIVE TABLE WRAPPER */}
      <div className="overflow-x-auto border border-slate-100 rounded-xl">
        <table className="min-w-full divide-y divide-slate-100 text-left text-xs text-slate-600 table-auto">
          {/* STICKY HEADER */}
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold sticky top-0">
            <tr>
              <th onClick={() => handleSort('month')} className="px-6 py-4 cursor-pointer hover:bg-slate-100 select-none transition-colors">
                Month {renderSortIndicator('month')}
              </th>
              <th onClick={() => handleSort('workingDays')} className="px-6 py-4 cursor-pointer hover:bg-slate-100 select-none text-center transition-colors">
                Working Days {renderSortIndicator('workingDays')}
              </th>
              <th onClick={() => handleSort('presentDays')} className="px-6 py-4 cursor-pointer hover:bg-slate-100 select-none text-center transition-colors">
                Present {renderSortIndicator('presentDays')}
              </th>
              <th onClick={() => handleSort('leaveDays')} className="px-6 py-4 cursor-pointer hover:bg-slate-100 select-none text-center transition-colors">
                Leave Days {renderSortIndicator('leaveDays')}
              </th>
              <th onClick={() => handleSort('absentDays')} className="px-6 py-4 cursor-pointer hover:bg-slate-100 select-none text-center transition-colors">
                Absent {renderSortIndicator('absentDays')}
              </th>
              <th onClick={() => handleSort('attendancePercentage')} className="px-6 py-4 cursor-pointer hover:bg-slate-100 select-none text-center transition-colors">
                Percentage {renderSortIndicator('attendancePercentage')}
              </th>
              <th onClick={() => handleSort('approvedBy')} className="px-6 py-4 cursor-pointer hover:bg-slate-100 select-none transition-colors">
                Approved By {renderSortIndicator('approvedBy')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100 font-medium text-slate-700">
            {paginatedRecords.length > 0 ? (
              paginatedRecords.map((record, index) => {
                // Determine style based on attendance percentage
                const pct = record.attendancePercentage;
                let pctColorClass = "text-slate-800 bg-slate-100";
                if (pct >= 95) pctColorClass = "text-emerald-700 bg-emerald-50";
                else if (pct >= 90) pctColorClass = "text-blue-700 bg-blue-50";
                else if (pct >= 85) pctColorClass = "text-amber-700 bg-amber-50";
                else pctColorClass = "text-rose-700 bg-rose-50";

                return (
                  <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4.5 font-semibold text-slate-900">{record.month}</td>
                    <td className="px-6 py-4.5 text-center">{record.workingDays}</td>
                    <td className="px-6 py-4.5 text-center text-emerald-600 font-semibold">{record.presentDays}</td>
                    <td className="px-6 py-4.5 text-center text-amber-500">{record.leaveDays}</td>
                    <td className="px-6 py-4.5 text-center text-rose-500">{record.absentDays}</td>
                    <td className="px-6 py-4.5 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${pctColorClass}`}>
                        {pct}%
                      </span>
                    </td>
                    <td className="px-6 py-4.5 font-medium text-slate-600">{record.approvedBy}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-10 text-center text-slate-400 font-normal">
                  No records match your search query.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION NAVIGATION */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
          <p className="text-xs text-slate-500">
            Showing <span className="font-semibold text-slate-800">{startIndex + 1}</span> to{' '}
            <span className="font-semibold text-slate-800">
              {Math.min(startIndex + itemsPerPage, filteredRecords.length)}
            </span> of{' '}
            <span className="font-semibold text-slate-800">{filteredRecords.length}</span> records
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500 disabled:opacity-40 disabled:hover:bg-white transition-colors cursor-pointer`}
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>
            
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`
                  w-8 h-8 rounded-lg text-xs font-semibold border transition-all cursor-pointer
                  ${currentPage === page 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/10' 
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50 bg-white'}
                `}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500 disabled:opacity-40 disabled:hover:bg-white transition-colors cursor-pointer`}
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
