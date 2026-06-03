import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { notifications } from '../data/mockData';
import { 
  FiMenu, FiX, FiBell, FiChevronDown, FiGrid, 
  FiCalendar, FiFolderMinus, FiCheckSquare, 
  FiBarChart2, FiUser, FiSettings, FiLogOut 
} from 'react-icons/fi';

export default function Layout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [localNotifications, setLocalNotifications] = useState(notifications);

  const activePath = location.pathname;
  const unreadCount = localNotifications.filter(n => n.unread).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const markAllAsRead = () => {
    setLocalNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <FiGrid className="w-5 h-5" /> },
    { name: 'Attendance', path: '/attendance', icon: <FiCalendar className="w-5 h-5" /> },
    { name: 'Leaves', path: '/leaves', icon: <FiFolderMinus className="w-5 h-5" /> },
    { name: 'Work Status', path: '/work-status', icon: <FiCheckSquare className="w-5 h-5" /> },
    { name: 'Reports', path: '/reports', icon: <FiBarChart2 className="w-5 h-5" /> },
    { name: 'Profile', path: '/profile', icon: <FiUser className="w-5 h-5" /> },
    { name: 'Settings', path: '/settings', icon: <FiSettings className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* MOBILE SIDEBAR OVERLAY */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800
        transform lg:transform-none lg:opacity-100 transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* LOGO */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <Link to="/" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white tracking-wider">
              GT
            </div>
            <span className="font-semibold text-white tracking-wide text-lg">GlobalTech HR</span>
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)} 
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activePath === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                    : 'hover:bg-slate-800 hover:text-slate-100'}
                `}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* LOGOUT BUTTON IN SIDEBAR */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-rose-400 hover:bg-rose-950/20 hover:text-rose-300 transition-all duration-200"
          >
            <FiLogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        
        {/* HEADER */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm shadow-slate-100">
          {/* LEFT: BURGER BUTTON */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            >
              <FiMenu className="w-6 h-6" />
            </button>
            <div className="hidden sm:block">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">HR Portal</span>
              <h1 className="text-sm font-medium text-slate-800">Welcome back, {user?.firstName}</h1>
            </div>
          </div>

          {/* RIGHT: NOTIFICATIONS & USER PROFILE */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* NOTIFICATIONS DROPDOWN */}
            <div className="relative">
              <button 
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setProfileDropdownOpen(false);
                }}
                className={`p-2 rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-800 relative transition-all duration-150 ${notificationsOpen ? 'bg-slate-100' : ''}`}
              >
                <FiBell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4.5 h-4.5 bg-rose-500 text-[10px] font-bold text-white rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden animate-scale-in">
                  <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <span className="font-semibold text-sm text-slate-800">Recent Notifications</span>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllAsRead}
                        className="text-xs font-medium text-blue-600 hover:underline hover:text-blue-700"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {localNotifications.length > 0 ? (
                      localNotifications.map((notif) => (
                        <div 
                          key={notif.id} 
                          className={`p-4 transition-colors duration-150 hover:bg-slate-50 flex items-start gap-3 ${notif.unread ? 'bg-blue-50/20' : ''}`}
                        >
                          <span className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${notif.unread ? 'bg-blue-600' : 'bg-transparent'}`} />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-slate-800 flex justify-between">
                              {notif.title}
                              <span className="font-normal text-[10px] text-slate-400">{notif.time}</span>
                            </h4>
                            <p className="text-xs text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">{notif.message}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-slate-400 text-xs">No notifications.</div>
                    )}
                  </div>
                  <div className="px-4 py-2 border-t border-slate-100 text-center bg-slate-50">
                    <Link 
                      to="/" 
                      onClick={() => setNotificationsOpen(false)}
                      className="text-xs font-medium text-slate-600 hover:text-slate-800"
                    >
                      View all in Dashboard
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* VERTICAL DIVIDER */}
            <span className="h-6 w-px bg-slate-200" />

            {/* USER PROFILE DROPDOWN */}
            <div className="relative">
              <button 
                onClick={() => {
                  setProfileDropdownOpen(!profileDropdownOpen);
                  setNotificationsOpen(false);
                }}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 text-left transition-all duration-150"
              >
                <img 
                  src={user?.photo} 
                  alt={user?.fullName} 
                  className="w-8 h-8 rounded-lg object-cover ring-2 ring-blue-500/20"
                />
                <div className="hidden md:block">
                  <h4 className="text-xs font-semibold text-slate-800 leading-none">{user?.fullName}</h4>
                  <span className="text-[10px] text-slate-500 font-medium">{user?.designation}</span>
                </div>
                <FiChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-1 overflow-hidden animate-scale-in">
                  <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Signed in as</p>
                    <p className="text-xs font-semibold text-slate-800 truncate">{user?.email}</p>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">ID: {user?.id} ({user?.department})</p>
                  </div>
                  <Link 
                    to="/profile" 
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <FiUser className="w-4 h-4" />
                    My Profile
                  </Link>
                  <Link 
                    to="/settings" 
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <FiSettings className="w-4 h-4" />
                    Account Settings
                  </Link>
                  <hr className="border-slate-100" />
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-xs text-rose-600 hover:bg-rose-50 transition-colors font-medium"
                  >
                    <FiLogOut className="w-4 h-4" />
                    Logout Account
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* CONTAINER FOR VIEWS */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
