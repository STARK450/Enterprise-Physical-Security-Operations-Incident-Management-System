
import React, { useState } from 'react';
import { UserPlus, Search, MoreHorizontal, Filter, Download } from 'lucide-react';
import { Visitor } from '../types';

const INITIAL_VISITORS: Visitor[] = [
  { id: '1', name: 'James Wilson', host: 'Ananya Sharma', purpose: 'Product Interview', checkIn: '09:15 AM', badgeId: 'V-1002', status: 'In Building' },
  { id: '2', name: 'Emily Chen', host: 'Rohan Gupta', purpose: 'Vendor Delivery', checkIn: '10:05 AM', badgeId: 'V-1005', status: 'Checked Out', checkOut: '10:45 AM' },
  { id: '3', name: 'Robert Fox', host: 'Deepak Kumar', purpose: 'Consultation', checkIn: '08:30 AM', badgeId: 'V-0988', status: 'In Building' },
];

const VisitorManagement: React.FC = () => {
  const [visitors, setVisitors] = useState<Visitor[]>(INITIAL_VISITORS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVisitor, setNewVisitor] = useState<Partial<Visitor>>({});

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const v: Visitor = {
      id: Math.random().toString(36).substr(2, 9),
      name: newVisitor.name || '',
      host: newVisitor.host || '',
      purpose: newVisitor.purpose || '',
      checkIn: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      badgeId: `V-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'In Building'
    };
    setVisitors([v, ...visitors]);
    setIsModalOpen(false);
    setNewVisitor({});
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Visitor Management</h2>
          <p className="text-slate-500">Monitor and register facility visitors</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold hover:bg-slate-300 transition-colors">
            <Download size={18} />
            <span>Export Log</span>
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors"
          >
            <UserPlus size={18} />
            <span>Register Visitor</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <div className="flex items-center gap-2 text-slate-400">
            <Filter size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">Filters</span>
            <div className="flex gap-2 ml-4">
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-600 cursor-pointer">In Building</span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-600 cursor-pointer">Expected</span>
            </div>
          </div>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search visitor or host..." 
              className="pl-9 pr-4 py-1.5 rounded-lg bg-white border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Visitor Name</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Host & Purpose</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Time In</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Badge #</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {visitors.map((visitor) => (
              <tr key={visitor.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={`https://picsum.photos/seed/${visitor.id}/40/40`} className="w-8 h-8 rounded-full" />
                    <span className="font-semibold text-slate-800">{visitor.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-900">{visitor.host}</p>
                  <p className="text-xs text-slate-500">{visitor.purpose}</p>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-700">{visitor.checkIn}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-mono font-bold text-slate-600">
                    {visitor.badgeId}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    visitor.status === 'In Building' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {visitor.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-slate-600">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-slate-900 p-8 text-white relative">
              <h3 className="text-2xl font-bold">New Visitor Registration</h3>
              <p className="text-slate-400 text-sm mt-1">Fill in the visitor details for badge issuance</p>
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
                &times;
              </button>
            </div>
            <form onSubmit={handleRegister} className="p-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Visitor Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="Enter full name"
                    value={newVisitor.name || ''}
                    onChange={(e) => setNewVisitor({...newVisitor, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Internal Host</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="Who are they visiting?"
                    value={newVisitor.host || ''}
                    onChange={(e) => setNewVisitor({...newVisitor, host: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Purpose of Visit</label>
                  <select 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
                    value={newVisitor.purpose || ''}
                    onChange={(e) => setNewVisitor({...newVisitor, purpose: e.target.value})}
                  >
                    <option value="">Select purpose</option>
                    <option value="Meeting">Business Meeting</option>
                    <option value="Interview">Job Interview</option>
                    <option value="Delivery">Package Delivery</option>
                    <option value="Maintenance">Maintenance/Repair</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors"
                >
                  Confirm & Check-in
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitorManagement;
