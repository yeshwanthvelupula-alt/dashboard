// Mock data store for Employee Attendance & HRMS Dashboard

export const employeeDetails = {
  id: "EMP-2026-8942",
  firstName: "Bhaskar",
  lastName: "Balasa",
  fullName: "Bhaskar B. Balasa",
  photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256",
  department: "Engineering & Architecture",
  designation: "Lead Systems Architect",
  email: "bhaskar.balasa@corp-hrms.com",
  phone: "+91 98765 43210",
  joiningDate: "April 12, 2022",
  managerName: "Sowmya I.",
  companyName: "GlobalTech Solutions Ltd.",
  location: "Bangalore, India",
  panNumber: "ABCDE1234F",
  bankName: "HDFC Bank",
  bankAccountNumber: "************4592"
};

export const stats = {
  totalWorkingDays: 240,
  presentDays: 218,
  leaveDays: 15,
  absentDays: 7,
  workCompletionPercentage: 92
};

export const leaveSummary = {
  totalAvailable: 30,
  used: 15,
  remaining: 15,
  types: [
    { name: "Casual Leave", available: 8, used: 5, remaining: 3, color: "bg-blue-500" },
    { name: "Sick Leave", available: 8, used: 4, remaining: 4, color: "bg-emerald-500" },
    { name: "Earned Leave", available: 10, used: 3, remaining: 7, color: "bg-amber-500" },
    { name: "Maternity Leave", available: 0, used: 0, remaining: 0, color: "bg-purple-500" },
    { name: "Emergency Leave", available: 4, used: 3, remaining: 1, color: "bg-rose-500" }
  ]
};

export const leaveHistory = [
  {
    leaveId: "LV-2026-041",
    leaveType: "Sick Leave",
    startDate: "2026-05-18",
    endDate: "2026-05-20",
    days: 3,
    approvedBy: "Sowmya I.",
    approvalDate: "2026-05-17",
    status: "Approved"
  },
  {
    leaveId: "LV-2026-038",
    leaveType: "Casual Leave",
    startDate: "2026-04-09",
    endDate: "2026-04-10",
    days: 2,
    approvedBy: "Sowmya I.",
    approvalDate: "2026-04-07",
    status: "Approved"
  },
  {
    leaveId: "LV-2026-045",
    leaveType: "Emergency Leave",
    startDate: "2026-06-15",
    endDate: "2026-06-16",
    days: 2,
    approvedBy: "Sowmya I.",
    approvalDate: "Pending Review",
    status: "Pending"
  },
  {
    leaveId: "LV-2026-031",
    leaveType: "Earned Leave",
    startDate: "2026-03-02",
    endDate: "2026-03-05",
    days: 4,
    approvedBy: "Sowmya I.",
    approvalDate: "2026-02-28",
    status: "Approved"
  },
  {
    leaveId: "LV-2026-025",
    leaveType: "Casual Leave",
    startDate: "2026-01-15",
    endDate: "2026-01-15",
    days: 1,
    approvedBy: "Sowmya I.",
    approvalDate: "2026-01-14",
    status: "Rejected"
  },
  {
    leaveId: "LV-2025-098",
    leaveType: "Emergency Leave",
    startDate: "2025-12-24",
    endDate: "2025-12-26",
    days: 3,
    approvedBy: "Sowmya I.",
    approvalDate: "2025-12-23",
    status: "Approved"
  }
];

export const attendanceRecords = [
  {
    month: "May 2026",
    workingDays: 22,
    presentDays: 20,
    leaveDays: 1,
    absentDays: 1,
    attendancePercentage: 90.9,
    approvedBy: "Sowmya I."
  },
  {
    month: "April 2026",
    workingDays: 21,
    presentDays: 19,
    leaveDays: 2,
    absentDays: 0,
    attendancePercentage: 90.5,
    approvedBy: "Sowmya I."
  },
  {
    month: "March 2026",
    workingDays: 23,
    presentDays: 19,
    leaveDays: 4,
    absentDays: 0,
    attendancePercentage: 82.6,
    approvedBy: "Sowmya I."
  },
  {
    month: "February 2026",
    workingDays: 20,
    presentDays: 19,
    leaveDays: 0,
    absentDays: 1,
    attendancePercentage: 95.0,
    approvedBy: "Sowmya I."
  },
  {
    month: "January 2026",
    workingDays: 22,
    presentDays: 21,
    leaveDays: 0,
    absentDays: 1,
    attendancePercentage: 95.5,
    approvedBy: "Sowmya I."
  },
  {
    month: "December 2025",
    workingDays: 22,
    presentDays: 18,
    leaveDays: 3,
    absentDays: 1,
    attendancePercentage: 81.8,
    approvedBy: "Sowmya I."
  },
  {
    month: "November 2025",
    workingDays: 20,
    presentDays: 19,
    leaveDays: 0,
    absentDays: 1,
    attendancePercentage: 95.0,
    approvedBy: "Sowmya I."
  },
  {
    month: "October 2025",
    workingDays: 22,
    presentDays: 20,
    leaveDays: 1,
    absentDays: 1,
    attendancePercentage: 90.9,
    approvedBy: "Sowmya I."
  },
  {
    month: "September 2025",
    workingDays: 21,
    presentDays: 20,
    leaveDays: 1,
    absentDays: 0,
    attendancePercentage: 95.2,
    approvedBy: "Sowmya I."
  },
  {
    month: "August 2025",
    workingDays: 22,
    presentDays: 21,
    leaveDays: 0,
    absentDays: 1,
    attendancePercentage: 95.5,
    approvedBy: "Sowmya I."
  },
  {
    month: "July 2025",
    workingDays: 23,
    presentDays: 22,
    leaveDays: 1,
    absentDays: 0,
    attendancePercentage: 95.7,
    approvedBy: "Sowmya I."
  },
  {
    month: "June 2025",
    workingDays: 20,
    presentDays: 18,
    leaveDays: 2,
    absentDays: 0,
    attendancePercentage: 90.0,
    approvedBy: "Sowmya I."
  }
];

export const notifications = [
  {
    id: 1,
    type: "leave",
    title: "Leave Approved",
    message: "Your sick leave request for 3 days (May 18-20) has been approved by Sowmya I.",
    time: "2 hours ago",
    unread: true
  },
  {
    id: 2,
    type: "attendance",
    title: "Attendance Updated",
    message: "Attendance logs for May 2026 have been finalized and approved.",
    time: "1 day ago",
    unread: true
  },
  {
    id: 3,
    type: "task",
    title: "New Work Assignment",
    message: "You have been assigned to 'Cloud Infrastructure Optimization' module.",
    time: "2 days ago",
    unread: false
  },
  {
    id: 4,
    type: "announcement",
    title: "HR Announcement",
    message: "The Annual Strategy Meet has been scheduled for June 20, 2026.",
    time: "4 days ago",
    unread: false
  },
  {
    id: 5,
    type: "holiday",
    title: "Holiday Notification",
    message: "Office will remain closed on June 12, 2026, for the regional festival.",
    time: "1 week ago",
    unread: false
  }
];

export const workStatusData = {
  completed: 28,
  inProgress: 8,
  pending: 4,
  recentTasks: [
    { id: "T-1001", name: "Set up central auth context & state sync", status: "Completed", dueDate: "2026-06-01" },
    { id: "T-1002", name: "Integrate ChartJS widgets on reports screen", status: "Completed", dueDate: "2026-06-02" },
    { id: "T-1003", name: "Build interactive payslip modal view", status: "In Progress", dueDate: "2026-06-05" },
    { id: "T-1004", name: "Optimize mobile sidebar overlay layout", status: "In Progress", dueDate: "2026-06-06" },
    { id: "T-1005", name: "Implement search filtering for log lists", status: "Pending", dueDate: "2026-06-10" }
  ]
};

export const payslips = [
  {
    id: "PS-2026-05",
    month: "May 2026",
    basicSalary: 120000,
    allowances: {
      hra: 48000,
      specialAllowance: 32000,
      conveyance: 1600,
      medicalAllowance: 12500
    },
    deductions: {
      providentFund: 14400,
      professionalTax: 200,
      incomeTax: 18500,
      medicalInsurance: 1500
    },
    netSalary: 166000 // (120000 + 48000 + 32000 + 1600 + 12500) - (14400 + 200 + 18500 + 1500) = 214100 - 34600 = 179500
  },
  {
    id: "PS-2026-04",
    month: "April 2026",
    basicSalary: 120000,
    allowances: {
      hra: 48000,
      specialAllowance: 32000,
      conveyance: 1600,
      medicalAllowance: 12500
    },
    deductions: {
      providentFund: 14400,
      professionalTax: 200,
      incomeTax: 18500,
      medicalInsurance: 1500
    },
    netSalary: 179500
  },
  {
    id: "PS-2026-03",
    month: "March 2026",
    basicSalary: 110000,
    allowances: {
      hra: 44000,
      specialAllowance: 29000,
      conveyance: 1600,
      medicalAllowance: 10000
    },
    deductions: {
      providentFund: 13200,
      professionalTax: 200,
      incomeTax: 16000,
      medicalInsurance: 1500
    },
    netSalary: 163700
  },
  {
    id: "PS-2026-02",
    month: "February 2026",
    basicSalary: 110000,
    allowances: {
      hra: 44000,
      specialAllowance: 29000,
      conveyance: 1600,
      medicalAllowance: 10000
    },
    deductions: {
      providentFund: 13200,
      professionalTax: 200,
      incomeTax: 16000,
      medicalInsurance: 1500
    },
    netSalary: 163700
  },
  {
    id: "PS-2026-01",
    month: "January 2026",
    basicSalary: 110000,
    allowances: {
      hra: 44000,
      specialAllowance: 29000,
      conveyance: 1600,
      medicalAllowance: 10000
    },
    deductions: {
      providentFund: 13200,
      professionalTax: 200,
      incomeTax: 16000,
      medicalInsurance: 1500
    },
    netSalary: 163700
  }
];
