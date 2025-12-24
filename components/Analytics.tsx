
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { FileDown, CalendarDays, Filter, ChevronDown } from 'lucide-react';

const INCIDENT_DATA = [
  { month: 'Jan', fire: 0, medical: 2, access: 5 },
  { month: 'Feb', fire: 1, medical: 1, access: 3 },
  { month: 'Mar', fire: 0, medical: 4, access: 8 },
  { month: 'Apr', fire: 2, medical: 0, access: 4 },
  { month: 'May', fire: 0, medical: 3, access: 6 },
  { month: 'Jun', fire: 0, medical: 1, access: 2 },
];

const VISITOR_TRAFFIC = [
  { time: '08:00', visitors: 12 },
  { time: '10:00', visitors: 45 },
  { time: '12:00', visitors: 30 },
  { time: '14:00', visitors: 55 },
  { time: '16:00', visitors: 20 },
  { time: '18:00', visitors: 8 },
];

const GUARD_STATS = [
  { name: 'IronShield', value: 45 },
  { name: 'Securitas', value: 30 },
  { name: 'Global Guard', value: 25 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const Analytics: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Reporting & Analytics</h2>
          <p className="text-slate-500">Security performance indicators and trend analysis</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-3 cursor-pointer">
            <CalendarDays size={18} className="text-slate-400" />
            <span className="text-sm font-bold text-slate-700">Last 30 Days</span>
            <ChevronDown size={14} className="text-slate-400" />
          </div>
          <button className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-black transition-all">
            <FileDown size={18} />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-lg mb-8 flex justify-between items-center">
            Incident Breakdown by Category
            <Filter size={16} className="text-slate-300" />
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={INCIDENT_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="access" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
                <Bar dataKey="medical" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={32} />
                <Bar dataKey="fire" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-8 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-xs font-bold text-slate-500">Access Control</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-xs font-bold text-slate-500">Medical</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-xs font-bold text-slate-500">Fire/Other</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-lg mb-8">Visitor Traffic Density</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={VISITOR_TRAFFIC}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Line type="monotone" dataKey="visitors" stroke="#3b82f6" strokeWidth={3} dot={{r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-6 text-xs text-center text-slate-400 font-medium">Peaks usually occur during vendor delivery windows (10am & 2pm)</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-lg mb-8">Guard Force Allocation (by Vendor)</h3>
          <div className="flex items-center justify-between">
            <div className="h-64 w-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={GUARD_STATS}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {GUARD_STATS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-6 pl-12">
              {GUARD_STATS.map((vendor, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-700">{vendor.name}</span>
                    <span className="text-sm font-bold text-slate-400">{vendor.value}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full">
                    <div className="h-full rounded-full" style={{ width: `${vendor.value}%`, backgroundColor: COLORS[i] }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2rem] text-white flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-4">Executive Summary</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Monthly security compliance score stands at <span className="text-green-400 font-bold">92.4%</span>. Access control incidents increased slightly in the first week of March due to turnstile maintenance. Guard vendor performance remains within SLA parameters.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-4 rounded-2xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Avg Response Time</p>
                <p className="text-2xl font-bold">4.2m</p>
              </div>
              <div className="bg-white/10 p-4 rounded-2xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase">SLA Compliance</p>
                <p className="text-2xl font-bold text-green-400">98%</p>
              </div>
            </div>
          </div>
          <button className="mt-8 w-full py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-blue-50 transition-colors">
            Generate Quarterly Audit Pack
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
