
import React from 'react';
import { Calendar, UserCheck, ShieldAlert, FileSearch, Sparkles, MapPin } from 'lucide-react';

const UPCOMING_EVENTS = [
  { id: 1, title: 'Annual General Meeting', date: 'Oct 25, 2024', riskLevel: 'High', visitors: 150, lead: 'Security Manager' },
  { id: 2, title: 'Global CEO Visit', date: 'Oct 28, 2024', riskLevel: 'Critical', visitors: 12, lead: 'VIP Detail' },
  { id: 3, title: 'Vendor Tech Showcase', date: 'Nov 02, 2024', riskLevel: 'Low', visitors: 45, lead: 'Site Lead' },
];

const EventSupport: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Event & VIP Support</h2>
          <p className="text-slate-500">Security planning for high-profile visits and office events</p>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2">
          <Calendar size={18} />
          <span>Plan Event</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="font-bold text-lg text-slate-800 px-2">Upcoming High-Profile Events</h3>
          <div className="space-y-4">
            {UPCOMING_EVENTS.map((event) => (
              <div key={event.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4">
                    <div className="bg-slate-50 p-3 rounded-2xl text-indigo-600 group-hover:bg-indigo-50 transition-colors">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900">{event.title}</h4>
                      <p className="text-sm text-slate-500">{event.date}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    event.riskLevel === 'Critical' ? 'bg-red-100 text-red-700' :
                    event.riskLevel === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {event.riskLevel} Risk
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Guest Count</p>
                    <p className="text-sm font-bold text-slate-700">{event.visitors}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Security Lead</p>
                    <p className="text-sm font-bold text-slate-700">{event.lead}</p>
                  </div>
                  <div className="text-right flex items-end justify-end">
                    <button className="text-xs font-bold text-indigo-600 hover:underline">Manage Plan</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Sparkles size={120} />
            </div>
            <h3 className="text-xl font-bold mb-6 relative z-10">Pre-Event Risk Checklist</h3>
            <div className="space-y-4 relative z-10">
              {[
                'Special access badge allocation',
                'Designated parking for VVIP convoy',
                'K9 Sweeps scheduled (if critical)',
                'Elevator lockout protocol tested',
                'Internal comms (Slack/Mail) notification',
              ].map((item, i) => (
                <div key={i} className="flex gap-3 group cursor-pointer">
                  <div className="w-6 h-6 rounded-lg border-2 border-slate-700 flex items-center justify-center group-hover:border-indigo-400 transition-colors">
                    <div className="w-3 h-3 bg-indigo-400 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <span className="text-sm text-slate-300 font-medium group-hover:text-white">{item}</span>
                </div>
              ))}
            </div>
            <button className="mt-8 w-full py-3 bg-indigo-500 rounded-xl font-bold text-sm shadow-lg hover:bg-indigo-400 transition-colors">
              Approve Deployment Plan
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold flex items-center gap-2">
                <FileSearch size={20} className="text-indigo-500" />
                Past Review Reports
              </h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-white hover:shadow-md transition-all cursor-pointer">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-slate-900">Investor Day 2024</p>
                  <span className="text-[10px] text-slate-400">Sept 12</span>
                </div>
                <p className="text-xs text-slate-500 mt-1 italic">"Zero access breaches reported. Parking overflow managed well."</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-white hover:shadow-md transition-all cursor-pointer">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-slate-900">State Govt Visit</p>
                  <span className="text-[10px] text-slate-400">Aug 30</span>
                </div>
                <p className="text-xs text-slate-500 mt-1 italic">"Escorted movement successful. 1 unauthorized drone detected."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSupport;
