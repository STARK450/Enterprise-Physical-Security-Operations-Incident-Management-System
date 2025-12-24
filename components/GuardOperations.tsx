
import React from 'react';
import { Calendar, Users, MapPin, ClipboardList, ShieldCheck } from 'lucide-react';
import { Guard } from '../types';

const GUARDS: Guard[] = [
  { id: '1', name: 'John Miller', vendor: 'IronShield Pvt', shift: 'Day', post: 'Main Gate', status: 'On Duty' },
  { id: '2', name: 'Sarah Connor', vendor: 'Securitas', shift: 'Day', post: 'Reception', status: 'On Break' },
  { id: '3', name: 'Mike Ross', vendor: 'IronShield Pvt', shift: 'Night', post: 'Parking B2', status: 'Off Duty' },
  { id: '4', name: 'Elena Gilbert', vendor: 'Global Guard', shift: 'Day', post: 'Server Room', status: 'On Duty' },
];

const GuardOperations: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Guard Force Operations</h2>
          <p className="text-slate-500">Manage deployment, vendors, and shifts</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-600 shadow-sm hover:bg-slate-50">
            Export Roster
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-md hover:bg-blue-700 transition-colors">
            Modify Deployment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Guard Roster */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Users size={20} className="text-blue-500" />
              Current Deployment
            </h3>
            <div className="space-y-4">
              {GUARDS.map((guard) => (
                <div key={guard.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
                      {guard.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{guard.name}</p>
                      <p className="text-xs text-slate-500">{guard.vendor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Post</p>
                      <p className="text-xs font-semibold text-slate-700">{guard.post}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Shift</p>
                      <p className="text-xs font-semibold text-slate-700">{guard.shift}</p>
                    </div>
                    <div className="w-24 text-right">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                        guard.status === 'On Duty' ? 'bg-green-100 text-green-700' :
                        guard.status === 'On Break' ? 'bg-orange-100 text-orange-700' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {guard.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Ops */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <ClipboardList size={18} className="text-blue-400" />
              Vendor Performance
            </h3>
            <div className="space-y-6">
              {[
                { name: 'IronShield', score: 94, guards: 12 },
                { name: 'Securitas', score: 88, guards: 8 },
                { name: 'Global Guard', score: 91, guards: 6 }
              ].map((v, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold">{v.name}</span>
                    <span className="text-slate-400">{v.guards} Guards active</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${v.score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <MapPin size={18} className="text-red-500" />
              Post Vacancies
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 text-red-700 rounded-xl border border-red-100">
                <span className="text-sm font-bold">North Exit Gate</span>
                <span className="text-[10px] font-bold bg-red-200 px-2 py-0.5 rounded uppercase">Urgent</span>
              </div>
              <div className="flex items-center justify-center p-6 border-2 border-dashed border-slate-100 rounded-xl text-slate-400 text-sm italic">
                All other posts currently manned
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuardOperations;
