
import React from 'react';
import { FileText, CheckSquare, ShieldCheck, Download, ExternalLink, History } from 'lucide-react';
import { SOP } from '../types';

const SOPS: SOP[] = [
  { id: 'SOP-001', title: 'Emergency Fire Evacuation', category: 'Emergency', version: '2.1', lastUpdated: 'Jan 2024' },
  { id: 'SOP-002', title: 'Visitor Badge Policy', category: 'Access Control', version: '1.4', lastUpdated: 'Mar 2024' },
  { id: 'SOP-003', title: 'Data Center Access Protocol', category: 'High Security', version: '3.0', lastUpdated: 'Oct 2023' },
  { id: 'SOP-004', title: 'Medical First Response', category: 'Emergency', version: '2.0', lastUpdated: 'Feb 2024' },
];

const ComplianceSOP: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">SOP & Compliance</h2>
          <p className="text-slate-500">Centralized governance for site security standards</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-200">
            <History size={18} />
            <span>Audit History</span>
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700">
            Create SOP
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2">
                <FileText size={20} className="text-blue-500" />
                Active SOPs
              </h3>
              <div className="flex gap-2">
                <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold">4 Active</span>
                <span className="text-xs bg-slate-50 text-slate-400 px-3 py-1 rounded-full font-bold">2 Draft</span>
              </div>
            </div>
            <div className="divide-y divide-slate-50">
              {SOPS.map((sop) => (
                <div key={sop.id} className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                  <div className="flex gap-4 items-center">
                    <div className="bg-slate-100 p-3 rounded-xl text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{sop.title}</h4>
                      <p className="text-xs text-slate-500">{sop.category} • v{sop.version}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Updated</p>
                      <p className="text-xs font-semibold text-slate-600">{sop.lastUpdated}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-all">
                        <Download size={16} />
                      </button>
                      <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-all">
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <CheckSquare size={20} className="text-green-500" />
              Site Compliance
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Guard Post Inspection', status: true },
                { label: 'CCTV Health Check', status: true },
                { label: 'Emergency Kit Audit', status: false },
                { label: 'Fire Extinguisher QC', status: true },
                { label: 'Turnstile Sensitivity', status: true }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-sm font-medium text-slate-700">{item.label}</span>
                  {item.status ? (
                    <ShieldCheck size={18} className="text-green-500" />
                  ) : (
                    <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">Pending</span>
                  )}
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-green-600 text-white rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 transition-colors">
              Run Daily Audit
            </button>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl">
            <h4 className="font-bold text-lg mb-2">Policy Review</h4>
            <p className="text-sm opacity-80 mb-6">Your next global compliance review is due in 12 days. Prepare documentation for Site Auditor.</p>
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md">
              <div className="flex justify-between text-xs mb-1">
                <span>Readiness Score</span>
                <span className="font-bold">85%</span>
              </div>
              <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceSOP;
