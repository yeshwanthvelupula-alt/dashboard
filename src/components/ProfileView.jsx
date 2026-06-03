import React, { useState } from 'react';
import { employeeDetails, payslips } from '../data/mockData';
import { FiUser, FiMail, FiPhone, FiCalendar, FiBriefcase, FiLock, FiPrinter, FiDownload, FiDollarSign, FiX } from 'react-icons/fi';

export default function ProfileView() {
  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const [isPayslipOpen, setIsPayslipOpen] = useState(false);

  // Helper to format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Helper to convert number to words (for typical Indian currency layout)
  const numberToWords = (num) => {
    const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    
    if ((num = num.toString()).length > 9) return 'overflow';
    const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return ''; 
    
    let str = '';
    str += (Number(n[1]) !== 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += (Number(n[2]) !== 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += (Number(n[3]) !== 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += (Number(n[4]) !== 0) ? a[Number(n[4])] + 'Hundred ' : '';
    str += (Number(n[5]) !== 0) ? ((str !== '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Only' : 'Only';
    
    return str.trim();
  };

  const handleOpenPayslip = (payslip) => {
    setSelectedPayslip(payslip);
    setIsPayslipOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER TITLE */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Employee Profile</h2>
        <p className="text-xs text-slate-500">Manage personal configurations and salary archives</p>
      </div>

      {/* CORE PROFILE CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: VISUAL BIO CARD */}
        <div className="glass-card rounded-2xl p-6 bg-white shadow-sm flex flex-col items-center justify-center text-center">
          <div className="relative group">
            <img 
              src={employeeDetails.photo} 
              alt={employeeDetails.fullName} 
              className="w-32 h-32 rounded-2xl object-cover ring-4 ring-blue-500/20 group-hover:scale-[1.03] transition-all duration-300"
            />
            <div className="absolute inset-0 bg-slate-900/40 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
              <span className="text-[10px] font-bold text-white uppercase tracking-wider bg-blue-600/90 px-2.5 py-1 rounded-full cursor-pointer">Update Photo</span>
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-slate-800 mt-4 leading-snug">{employeeDetails.fullName}</h3>
          <p className="text-xs font-semibold text-blue-600 mt-0.5">{employeeDetails.designation}</p>
          <span className="text-[10px] text-slate-400 font-medium uppercase mt-2 px-2 py-0.5 bg-slate-100 rounded-md">ID: {employeeDetails.id}</span>
          
          <hr className="w-full border-slate-100 my-5" />

          {/* QUICK LINKS */}
          <div className="w-full space-y-3.5 text-left text-xs text-slate-600">
            <div className="flex items-center gap-3">
              <FiBriefcase className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 font-semibold">Department</p>
                <p className="font-semibold text-slate-700">{employeeDetails.department}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FiUser className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 font-semibold">Reporting Manager</p>
                <p className="font-semibold text-slate-700">{employeeDetails.managerName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FiCalendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 font-semibold">Joining Date</p>
                <p className="font-semibold text-slate-700">{employeeDetails.joiningDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DETAILED INFO CARDS */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* DETAILED INFORMATION */}
          <div className="glass-card rounded-2xl p-6 bg-white shadow-sm">
            <h3 className="font-semibold text-slate-800 text-sm border-b border-slate-100 pb-3 mb-4">Contact & Security</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Official Email</label>
                  <div className="flex items-center gap-2.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
                    <FiMail className="w-4 h-4 text-slate-400" />
                    <span className="font-semibold text-slate-700">{employeeDetails.email}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Mobile Phone</label>
                  <div className="flex items-center gap-2.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
                    <FiPhone className="w-4 h-4 text-slate-400" />
                    <span className="font-semibold text-slate-700">{employeeDetails.phone}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Office Location</label>
                  <div className="flex items-center gap-2.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
                    <FiLock className="w-4 h-4 text-slate-400" />
                    <span className="font-semibold text-slate-700">{employeeDetails.location}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Account Password</label>
                  <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="font-semibold text-slate-400 tracking-widest">••••••••</span>
                    <button className="text-[10px] font-bold text-blue-600 hover:text-blue-700 hover:underline">Change</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PAYSLIPS HISTORY TABLE */}
          <div className="glass-card rounded-2xl p-6 bg-white shadow-sm">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="font-semibold text-slate-800 text-sm">Monthly Payslips</h3>
                <p className="text-xs text-slate-500">View and download your monthly salary statements</p>
              </div>
              <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                <FiDollarSign className="w-4 h-4" />
              </span>
            </div>
            
            <div className="overflow-x-auto border border-slate-100 rounded-xl">
              <table className="min-w-full divide-y divide-slate-100 text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="px-6 py-3.5">Payslip ID</th>
                    <th className="px-6 py-3.5">Month</th>
                    <th className="px-6 py-3.5 text-right">Net Salary</th>
                    <th className="px-6 py-3.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 font-medium text-slate-700">
                  {payslips.map((slip) => (
                    <tr key={slip.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-3.5 font-semibold text-slate-900">{slip.id}</td>
                      <td className="px-6 py-3.5">{slip.month}</td>
                      <td className="px-6 py-3.5 text-right text-emerald-600 font-bold">{formatCurrency(slip.netSalary)}</td>
                      <td className="px-6 py-3.5 text-center">
                        <button 
                          onClick={() => handleOpenPayslip(slip)}
                          className="px-3.5 py-1.5 text-[10px] font-bold bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors cursor-pointer"
                        >
                          View Payslip
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

      {/* PAYSLIP DETAIL VIEW MODAL */}
      {isPayslipOpen && selectedPayslip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in print:bg-white print:p-0">
          <div className="bg-white border border-slate-200 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden animate-scale-in flex flex-col max-h-[90vh] print:border-none print:shadow-none print:max-h-full print:rounded-none">
            
            {/* MODAL HEADER */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between print:hidden">
              <h3 className="font-bold text-slate-800 text-sm">Payslip Details - {selectedPayslip.month}</h3>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  <FiPrinter className="w-3.5 h-3.5" /> Print
                </button>
                <button 
                  onClick={() => setIsPayslipOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1.5 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* PAYSLIP DOCUMENT TO PRINT */}
            <div id="printable-payslip" className="flex-1 overflow-y-auto p-8 space-y-6 text-slate-700 font-sans text-xs bg-white">
              
              {/* SLIP LOGO & TITLE */}
              <div className="flex justify-between items-start border-b-2 border-slate-200 pb-5">
                <div>
                  <h1 className="text-lg font-bold text-slate-900 tracking-wide uppercase">{employeeDetails.companyName}</h1>
                  <p className="text-[10px] text-slate-400 mt-0.5">{employeeDetails.location}</p>
                </div>
                <div className="text-right">
                  <h2 className="text-md font-bold text-slate-800 uppercase">Payslip Statement</h2>
                  <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Month/Year: {selectedPayslip.month}</p>
                  <p className="text-[10px] text-slate-400">Slip ID: {selectedPayslip.id}</p>
                </div>
              </div>

              {/* EMPLOYEE INFO COLUMNS */}
              <div className="grid grid-cols-2 gap-6 border-b border-slate-100 pb-5">
                <div className="space-y-1.5">
                  <div className="grid grid-cols-3">
                    <span className="font-bold text-slate-400 text-[10px] uppercase">Employee Name:</span>
                    <span className="col-span-2 font-bold text-slate-800">{employeeDetails.fullName}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="font-bold text-slate-400 text-[10px] uppercase">Employee ID:</span>
                    <span className="col-span-2 font-semibold text-slate-800">{employeeDetails.id}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="font-bold text-slate-400 text-[10px] uppercase">Department:</span>
                    <span className="col-span-2 text-slate-600">{employeeDetails.department}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="font-bold text-slate-400 text-[10px] uppercase">Designation:</span>
                    <span className="col-span-2 text-slate-600">{employeeDetails.designation}</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="grid grid-cols-3">
                    <span className="font-bold text-slate-400 text-[10px] uppercase">Bank Name:</span>
                    <span className="col-span-2 text-slate-600">{employeeDetails.bankName}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="font-bold text-slate-400 text-[10px] uppercase">Account No:</span>
                    <span className="col-span-2 text-slate-600 font-semibold">{employeeDetails.bankAccountNumber}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="font-bold text-slate-400 text-[10px] uppercase">PAN Number:</span>
                    <span className="col-span-2 text-slate-600 font-semibold">{employeeDetails.panNumber}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="font-bold text-slate-400 text-[10px] uppercase">Paid Days:</span>
                    <span className="col-span-2 text-slate-600 font-semibold">30 Days</span>
                  </div>
                </div>
              </div>

              {/* EARNINGS & DEDUCTIONS TABLES */}
              <div className="grid grid-cols-1 md:grid-cols-2 border border-slate-200 rounded-xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-slate-200">
                
                {/* EARNINGS */}
                <div className="flex flex-col">
                  <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
                    <span className="font-bold text-slate-800 text-[10px] uppercase tracking-wider">Earnings</span>
                  </div>
                  <div className="flex-1 p-4 space-y-2.5">
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-600">Basic Salary</span>
                      <span className="font-semibold text-slate-800">{formatCurrency(selectedPayslip.basicSalary)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-600">House Rent Allowance (HRA)</span>
                      <span className="font-semibold text-slate-800">{formatCurrency(selectedPayslip.allowances.hra)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-600">Special Allowance</span>
                      <span className="font-semibold text-slate-800">{formatCurrency(selectedPayslip.allowances.specialAllowance)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-600">Medical Allowance</span>
                      <span className="font-semibold text-slate-800">{formatCurrency(selectedPayslip.allowances.medicalAllowance)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-600">Conveyance</span>
                      <span className="font-semibold text-slate-800">{formatCurrency(selectedPayslip.allowances.conveyance)}</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 flex justify-between font-bold">
                    <span className="text-[10px] text-slate-600 uppercase tracking-wider">Gross Earnings</span>
                    <span className="text-slate-800">
                      {formatCurrency(
                        selectedPayslip.basicSalary + 
                        selectedPayslip.allowances.hra + 
                        selectedPayslip.allowances.specialAllowance + 
                        selectedPayslip.allowances.medicalAllowance + 
                        selectedPayslip.allowances.conveyance
                      )}
                    </span>
                  </div>
                </div>

                {/* DEDUCTIONS */}
                <div className="flex flex-col">
                  <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
                    <span className="font-bold text-slate-800 text-[10px] uppercase tracking-wider">Deductions</span>
                  </div>
                  <div className="flex-1 p-4 space-y-2.5">
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-600">Provident Fund (PF)</span>
                      <span className="font-semibold text-slate-800">{formatCurrency(selectedPayslip.deductions.providentFund)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-600">Income Tax (TDS)</span>
                      <span className="font-semibold text-slate-800">{formatCurrency(selectedPayslip.deductions.incomeTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-600">Medical Insurance</span>
                      <span className="font-semibold text-slate-800">{formatCurrency(selectedPayslip.deductions.medicalInsurance)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-600">Professional Tax</span>
                      <span className="font-semibold text-slate-800">{formatCurrency(selectedPayslip.deductions.professionalTax)}</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 flex justify-between font-bold">
                    <span className="text-[10px] text-slate-600 uppercase tracking-wider">Total Deductions</span>
                    <span className="text-slate-800">
                      {formatCurrency(
                        selectedPayslip.deductions.providentFund + 
                        selectedPayslip.deductions.incomeTax + 
                        selectedPayslip.deductions.medicalInsurance + 
                        selectedPayslip.deductions.professionalTax
                      )}
                    </span>
                  </div>
                </div>

              </div>

              {/* NET SALARY CARD */}
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h3 className="font-bold text-emerald-800 uppercase tracking-wider text-[10px]">Net Take-Home Salary</h3>
                  <p className="text-[10px] text-slate-500 font-medium mt-0.5 capitalize">Amount in words: {numberToWords(selectedPayslip.netSalary)}</p>
                </div>
                <div className="text-right sm:text-right">
                  <span className="text-xl font-bold text-emerald-700">{formatCurrency(selectedPayslip.netSalary)}</span>
                </div>
              </div>

              {/* STAMPS & SIGNATURES */}
              <div className="flex justify-between items-center pt-8 border-t border-slate-100 text-[10px] text-slate-400">
                <div>
                  <p className="font-semibold">Note: This is a system-generated statement and requires no physical signature.</p>
                  <p className="mt-0.5">Generated via GT-HRMS Suite. IP logged.</p>
                </div>
                <div className="text-center font-semibold text-slate-500">
                  <div className="w-24 h-px bg-slate-300 mx-auto mb-1.5" />
                  <p>HR Department</p>
                  <p className="text-[8px] text-slate-400 font-normal">GlobalTech Solutions Ltd.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
