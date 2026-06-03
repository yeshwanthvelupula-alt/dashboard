import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiLock, FiAlertCircle } from 'react-icons/fi';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [employeeId, setEmployeeId] = useState('EMP-2026-8942'); // prefilled default for easy demonstration
  const [password, setPassword] = useState('password'); // prefilled default
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!employeeId.trim()) {
      setError('Employee ID is required.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }

    setLoading(true);
    
    // Mimic API latency
    setTimeout(() => {
      const res = login(employeeId, password);
      setLoading(false);
      
      if (res.success) {
        navigate('/');
      } else {
        setError(res.message);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden font-sans">
      
      {/* DECORATIVE BACKGROUND BLURS (GLOWS) */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-blue-600/30 blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
      
      {/* LOGIN CARD */}
      <div className="w-full max-w-md glass-dark rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 animate-scale-in">
        
        {/* LOGO & TITLE */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center font-bold text-white tracking-widest text-xl mx-auto shadow-lg shadow-blue-500/20">
            GT
          </div>
          <h2 className="text-xl font-bold text-white mt-4 tracking-tight">GlobalTech HRMS</h2>
          <p className="text-xs text-slate-400 mt-1">Enter credentials to access your employee workspace</p>
        </div>

        {/* ERROR BOX */}
        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2.5 leading-relaxed animate-shake">
            <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* LOGIN FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* EMPLOYEE ID */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Employee ID</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                <FiUser className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="EMP-YYYY-XXXX"
                className="w-full bg-slate-800/40 border border-slate-700/50 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Password</label>
              <button 
                type="button" 
                onClick={() => alert("Please contact the IT Helpdesk support at support@corp-hrms.com to reset your credentials.")}
                className="text-[10px] font-bold text-blue-400 hover:text-blue-300 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                <FiLock className="w-4 h-4" />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-800/40 border border-slate-700/50 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* REMEMBER ME */}
          <div className="flex items-center">
            <input
              id="remember_me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-slate-700/50 bg-slate-800/40 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900 focus:bg-slate-900 border-none cursor-pointer"
            />
            <label htmlFor="remember_me" className="ml-2 text-xs text-slate-400 cursor-pointer select-none">
              Remember my session
            </label>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl text-xs transition-all duration-200 shadow-lg shadow-blue-500/20 active:scale-[0.98] mt-2 flex items-center justify-center cursor-pointer"
          >
            {loading ? (
              <span className="inline-block border-2 border-white border-t-transparent w-4 h-4 rounded-full animate-spin" />
            ) : (
              'Authenticate Securely'
            )}
          </button>
        </form>

        {/* MOCK CORPORATE ANNOUNCEMENT FOOTER */}
        <div className="text-center mt-8 pt-6 border-t border-slate-800 text-[10px] text-slate-500">
          Authorized personnel only. Sessions are encrypted and audited.
        </div>
      </div>
    </div>
  );
}
