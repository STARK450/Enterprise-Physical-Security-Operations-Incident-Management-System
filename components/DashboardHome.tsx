
import React from 'react';
import { 
  Users, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  MapPin,
  Activity
} from 'lucide-react';

const DashboardHome: React.FC = () => {
  const stats = [
    { label: 'Visitors In', value: '42', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Incidents', value: '3', change: '-50%', icon: ShieldAlert, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Guard Coverage', value: '98%', change: 'Steady', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Avg Check-in', value: '2.4m', change: '-0.5m', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const recentActivities = [
    { id: 1, title: 'Badge Issued', user: 'Guest: Mark Sloan', time: '10 mins ago', type: 'visitor' },
    { id: 2, title: 'Incident Resolved', user: 'Post A: Power Failure', time: '45 mins ago', type: 'incident' },
    { id: 3, title: 'Shift Handover', user: 'Night to Swing', time: '1 hour ago', type: 'guard' },
    { id: 4, title: 'New SOP Published', user: 'v2.1 Emergency Medical', time: '3 hours ago', type: 'sop' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">System Overview</h2>
          <p className="text-slate-500">Real-time operational status for Bengaluru HQ</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 flex items-center gap-2">
            <MapPin size={16} className="text-slate-400" />
            <span className="text-sm font-medium">Main Gate South</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 flex items-center gap-2">
            <Activity size={16} className="text-green-500 animate-pulse" />
            <span className="text-sm font-medium">System Online</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg">Operational Trends</h3>
            <button className="text-blue-600 text-sm font-semibold hover:underline">View Full Analytics</button>
          </div>
          <div className="h-64 bg-slate-50 rounded-xl flex items-center justify-center border border-dashed border-slate-200">
            <div className="text-center">
              <TrendingUp className="mx-auto text-slate-300 mb-2" size={48} />
              <p className="text-slate-400 font-medium italic">Peak activity detected during 09:00 - 10:30 shift change</p>
              <p className="text-xs text-slate-300 mt-1">Interactive data visualization loading...</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h3 className="font-bold text-lg mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex gap-4 group cursor-pointer">
                <div className={`w-1 rounded-full ${
                  activity.type === 'visitor' ? 'bg-blue-500' :
                  activity.type === 'incident' ? 'bg-red-500' :
                  activity.type === 'guard' ? 'bg-green-500' : 'bg-slate-400'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {activity.title}
                  </p>
                  <p className="text-xs text-slate-500">{activity.user}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-medium uppercase">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 rounded-xl border-2 border-slate-100 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-colors">
            View All Logs
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
