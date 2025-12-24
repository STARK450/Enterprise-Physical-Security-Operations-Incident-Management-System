
import React, { useState } from 'react';
import { AlertCircle, Plus, Search, ChevronRight, CheckCircle, Clock, Zap } from 'lucide-react';
import { Incident, Severity, IncidentStatus } from '../types';
import { analyzeIncident } from '../services/geminiService';

const INITIAL_INCIDENTS: Incident[] = [
  { id: 'INC-2024-001', type: 'Fire', description: 'Minor smoke detected in Pantry Area, Floor 4. Investigation ongoing.', severity: Severity.HIGH, status: IncidentStatus.IN_PROGRESS, timestamp: '10:15 AM', location: 'Floor 4, Block B', reportedBy: 'Guard Rajesh' },
  { id: 'INC-2024-002', type: 'Unauthorized Access', description: 'Piggybacking attempt at Turnstile 3. Individual detained.', severity: Severity.MEDIUM, status: IncidentStatus.RESOLVED, timestamp: '09:40 AM', location: 'Main Reception', reportedBy: 'Security Lead' },
];

const IncidentManagement: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [isReporting, setIsReporting] = useState(false);
  const [description, setDescription] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!description) return;
    setAnalyzing(true);
    const result = await analyzeIncident(description);
    setAnalysis(result);
    setAnalyzing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInc: Incident = {
      id: `INC-2024-00${incidents.length + 1}`,
      type: 'Other',
      description,
      severity: (analysis?.recommendedSeverity as Severity) || Severity.LOW,
      status: IncidentStatus.REPORTED,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      location: 'Unspecified',
      reportedBy: 'System User'
    };
    setIncidents([newInc, ...incidents]);
    setIsReporting(false);
    setDescription('');
    setAnalysis(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Emergency & Incident Center</h2>
          <p className="text-slate-500">Monitor active threats and coordinate response</p>
        </div>
        <button 
          onClick={() => setIsReporting(true)}
          className="bg-red-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-red-200 hover:bg-red-700 transition-colors"
        >
          <Plus size={18} />
          <span>Report New Incident</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4">Response Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle size={16} />
                  <span className="text-sm font-medium">Critical</span>
                </div>
                <span className="font-bold text-lg">0</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-orange-500">
                  <Clock size={16} />
                  <span className="text-sm font-medium">Active</span>
                </div>
                <span className="font-bold text-lg">1</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-green-500">
                  <CheckCircle size={16} />
                  <span className="text-sm font-medium">Resolved (24h)</span>
                </div>
                <span className="font-bold text-lg">5</span>
              </div>
            </div>
          </div>
          <div className="bg-slate-900 p-6 rounded-2xl text-white">
            <h3 className="font-bold text-sm mb-2 opacity-60">Escalation Protocol</h3>
            <p className="text-xs leading-relaxed opacity-80">
              For any HIGH or CRITICAL incidents, immediate notification to Site Security Manager and Facilities Lead is mandatory. 
            </p>
            <button className="mt-4 text-[10px] font-bold uppercase tracking-wider text-blue-400 hover:underline">
              View Detailed Matrix
            </button>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-bold text-slate-700">Incident Feed</h3>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Filter feed..." 
                  className="pl-8 pr-4 py-1 rounded-lg border border-slate-200 text-xs"
                />
              </div>
            </div>
            <div className="divide-y divide-slate-100">
              {incidents.map((incident) => (
                <div key={incident.id} className="p-6 hover:bg-slate-50 transition-colors flex gap-6">
                  <div className={`mt-1 h-10 w-10 shrink-0 rounded-full flex items-center justify-center ${
                    incident.severity === Severity.HIGH ? 'bg-red-100 text-red-600' : 
                    incident.severity === Severity.MEDIUM ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <AlertCircle size={20} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="font-bold text-slate-900">{incident.type}</h4>
                          <span className="text-[10px] font-mono text-slate-400">#{incident.id}</span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">{incident.location} • Reported by {incident.reportedBy}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        incident.status === IncidentStatus.RESOLVED ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {incident.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700">{incident.description}</p>
                    <div className="pt-2 flex gap-2">
                      <button className="text-xs font-bold text-blue-600 hover:underline">View Logs</button>
                      <span className="text-slate-300">•</span>
                      <button className="text-xs font-bold text-blue-600 hover:underline">Escalate</button>
                    </div>
                  </div>
                  <div className="text-right flex flex-col justify-between">
                    <p className="text-xs font-bold text-slate-400">{incident.timestamp}</p>
                    <ChevronRight size={18} className="text-slate-300 self-end" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isReporting && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Emergency Incident Form</h3>
                <p className="text-slate-500 text-sm">Use AI analysis for rapid triage and response suggestions</p>
              </div>
              <button onClick={() => setIsReporting(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                <ChevronRight className="rotate-90" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Describe the situation</label>
                <textarea 
                  rows={4}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none text-slate-700"
                  placeholder="Example: Noticed water leaking from ceiling in server room B-2. Equipment at risk."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="flex justify-center">
                <button 
                  type="button"
                  onClick={handleAnalyze}
                  disabled={analyzing || !description}
                  className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-50 transition-all active:scale-95"
                >
                  <Zap size={18} fill="currentColor" />
                  {analyzing ? 'AI Analyzing...' : 'Run Smart Triage'}
                </button>
              </div>

              {analysis && (
                <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-3xl animate-in slide-in-from-bottom-4 duration-300">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
                      <Zap size={14} />
                    </div>
                    <h4 className="font-bold text-indigo-900">AI Triage Insights</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100">
                      <p className="text-[10px] font-bold text-indigo-400 uppercase mb-1">Recommended Severity</p>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                        analysis.recommendedSeverity === 'CRITICAL' || analysis.recommendedSeverity === 'HIGH' 
                        ? 'bg-red-100 text-red-700' : 'bg-indigo-100 text-indigo-700'
                      }`}>
                        {analysis.recommendedSeverity}
                      </span>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100">
                      <p className="text-[10px] font-bold text-indigo-400 uppercase mb-1">SOP Ref</p>
                      <p className="text-xs font-bold text-indigo-900 truncate">{analysis.relevantSopReference}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-indigo-800">Immediate Response Checklist:</p>
                    <ul className="space-y-1">
                      {analysis.immediateActions.map((action: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-indigo-700">
                          <CheckCircle size={12} className="mt-0.5 shrink-0" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="p-8 border-t border-slate-100 bg-slate-50 rounded-b-[2rem] flex gap-4">
              <button 
                onClick={() => setIsReporting(false)}
                className="flex-1 py-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-colors"
              >
                Discard
              </button>
              <button 
                onClick={handleSubmit}
                className="flex-1 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-black transition-all active:scale-[0.98]"
              >
                File Official Incident Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentManagement;
