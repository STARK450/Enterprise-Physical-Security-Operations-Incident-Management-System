
import React, { useState } from 'react';
import { 
  Users, 
  Shield, 
  AlertTriangle, 
  FileText, 
  Calendar, 
  BarChart3, 
  LayoutDashboard,
  Bell,
  Search,
  Settings
} from 'lucide-react';
import DashboardHome from './components/DashboardHome';
import VisitorManagement from './components/VisitorManagement';
import GuardOperations from './components/GuardOperations';
import IncidentManagement from './components/IncidentManagement';
import ComplianceSOP from './components/ComplianceSOP';
import EventSupport from './components/EventSupport';
import Analytics from './components/Analytics';

type View = 'dashboard' | 'visitors' | 'guards' | 'incidents' | 'sop' | 'events' | 'analytics';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardHome />;
      case 'visitors': return <VisitorManagement />;
      case 'guards': return <GuardOperations />;
      case 'incidents': return <IncidentManagement />;
      case 'sop': return <ComplianceSOP />;
      case 'events': return <EventSupport />;
      case 'analytics': return <Analytics />;
      default: return <DashboardHome />;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'visitors', label: 'Visitor Mgmt', icon: Users },
    { id: 'guards', label: 'Guard Force', icon: Shield },
    { id: 'incidents', label: 'Incidents', icon: AlertTriangle },
    { id: 'sop', label: 'SOP & Compliance', icon: FileText },
    { id: 'events', label: 'Event Support', icon: Calendar },
    { id: 'analytics', label: 'Reporting', icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Shield size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">SecureOps</h1>
        </div>
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as View)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeView === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} className={activeView === item.id ? 'text-white' : 'text-slate-400 group-hover:text-white'} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-slate-800 text-sm text-slate-500">
          Enterprise Security v2.4.0
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm shrink-0">
          <div className="flex items-center gap-4 bg-slate-100 px-4 py-2 rounded-full w-96">
            <Search size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search across modules..." 
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-blue-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-900">Security Command</p>
                <p className="text-[10px] text-slate-500">Global Admin</p>
              </div>
              <img 
                src="https://picsum.photos/seed/security/100/100" 
                alt="Profile" 
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
              />
            </div>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
