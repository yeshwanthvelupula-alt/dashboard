import React, { useState } from 'react';
import { FiSave, FiCheckCircle } from 'react-icons/fi';

export default function SettingsPage() {
  const [theme, setTheme] = useState('light');
  const [lang, setLang] = useState('en');
  const [notifs, setNotifs] = useState({
    email: true,
    push: true,
    sprint: false,
    monthly: true
  });
  const [savedMsg, setSavedMsg] = useState(false);

  const toggleNotif = (key) => {
    setNotifs({ ...notifs, [key]: !notifs[key] });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER SECTION */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Portal Settings</h2>
        <p className="text-xs text-slate-500">Configure notifications, interface theme preferences, and credentials</p>
      </div>

      {/* SETTINGS CARD */}
      <div className="glass-card rounded-2xl p-6 bg-white shadow-sm max-w-3xl">
        {savedMsg && (
          <div className="mb-5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs flex items-center gap-2.5 leading-relaxed animate-fade-in font-semibold">
            <FiCheckCircle className="w-4 h-4" />
            <span>Settings saved successfully.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6 text-xs text-slate-600">
          
          {/* THEME PREFERENCE */}
          <div className="border-b border-slate-100 pb-5">
            <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">Theme Selection</h3>
            <div className="grid grid-cols-3 gap-3">
              {['light', 'dark', 'system'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTheme(t)}
                  className={`
                    px-4 py-2.5 border rounded-xl font-semibold capitalize text-center transition-all cursor-pointer
                    ${theme === t 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/10' 
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'}
                  `}
                >
                  {t} Mode
                </button>
              ))}
            </div>
          </div>

          {/* NOTIFICATION PREFERENCES */}
          <div className="border-b border-slate-100 pb-5">
            <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">Notifications Alerts</h3>
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-700">Official Email Alerts</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Receive copy of approvals, HR schedules, and payroll directly in mail</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifs.email} 
                  onChange={() => toggleNotif('email')}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-700">Web Push Alerts</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Display toast banners for immediate announcements and tasks assignments</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifs.push} 
                  onChange={() => toggleNotif('push')}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-700">Active Sprint Reminders</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Ping reminders 24 hours prior to work deliverable due dates</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifs.sprint} 
                  onChange={() => toggleNotif('sprint')}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* LOCALIZATION SETTINGS */}
          <div className="pb-2">
            <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">Localization & Language</h3>
            <div className="max-w-xs">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-700 font-semibold"
              >
                <option value="en">English (US/UK)</option>
                <option value="in">English (India)</option>
                <option value="fr">French (Français)</option>
                <option value="de">German (Deutsch)</option>
              </select>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/10 transition-all cursor-pointer active:scale-[0.98]"
            >
              <FiSave className="w-4 h-4" /> Save Configuration
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
