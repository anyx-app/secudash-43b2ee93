import React from 'react';
import { ShieldCheck, AlertTriangle, Server, Activity, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { StatsCard } from '../components/ui/StatsCard';

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero / Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
            Security Overview
          </h1>
          <p className="text-slate-400 text-lg">
            Real-time monitoring of your infrastructure's security posture.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 transition-all text-sm font-medium">
            Generate Report
          </button>
          <button className="px-4 py-2 bg-[#0A74DA] hover:bg-[#005bb5] text-white rounded-lg shadow-[0_0_15px_rgba(10,116,218,0.4)] transition-all text-sm font-medium">
            Run Scan
          </button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Security Score" 
          value="85/100" 
          change="+2.4%" 
          trend="up" 
          icon={ShieldCheck} 
          color="text-emerald-400" 
        />
        <StatsCard 
          title="Active Threats" 
          value="3" 
          change="1 Critical" 
          trend="down" 
          icon={AlertTriangle} 
          color="text-[#FF4136]" 
          isAlert 
        />
        <StatsCard 
          title="Assets Monitored" 
          value="1,240" 
          change="+12 New" 
          trend="neutral" 
          icon={Server} 
          color="text-blue-400" 
        />
        <StatsCard 
          title="Compliance Status" 
          value="92%" 
          change="SOC2 Passing" 
          trend="up" 
          icon={CheckCircle2} 
          color="text-purple-400" 
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Chart / Main Panel Placeholder */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white/90">Vulnerability Trends</h2>
            <select className="bg-black/20 border border-white/10 rounded-lg text-sm text-slate-300 px-3 py-1 outline-none">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>Last 24 Hours</option>
            </select>
          </div>
          
          {/* Visual Mock of a Chart */}
          <div className="relative h-64 w-full flex items-end justify-between gap-2 px-4 border-b border-white/5">
            {[40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 95].map((h, i) => (
              <div key={i} className="w-full bg-gradient-to-t from-[#0A74DA]/20 to-[#0A74DA] rounded-t-sm hover:opacity-80 transition-opacity relative group" style={{ height: `${h}%` }}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {h}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-slate-500 mt-2 px-2">
            <span>May 01</span>
            <span>May 15</span>
            <span>Jun 01</span>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] flex flex-col">
          <h2 className="text-xl font-semibold text-white/90 mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#FF4136]" />
            Live Threat Feed
          </h2>
          
          <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
            {[
              { title: "SQL Injection Attempt", time: "2 mins ago", severity: "high", source: "192.168.1.45" },
              { title: "Failed Login (Root)", time: "15 mins ago", severity: "medium", source: "10.0.0.12" },
              { title: "New Port Detected", time: "1 hour ago", severity: "low", source: "Server-DB-01" },
              { title: "Malware Signature", time: "2 hours ago", severity: "critical", source: "Endpoint-WK-22" },
            ].map((item, idx) => (
              <div key={idx} className="group flex gap-4 items-start p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                  item.severity === 'critical' ? 'bg-[#FF4136] shadow-[0_0_8px_#FF4136]' :
                  item.severity === 'high' ? 'bg-orange-500' :
                  item.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <div>
                  <h3 className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{item.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{item.source} • {item.time}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-[#0A74DA] ml-auto opacity-0 group-hover:opacity-100 transition-all" />
              </div>
            ))}
          </div>
          
          <button className="mt-auto pt-4 text-sm text-[#0A74DA] hover:text-white transition-colors w-full text-center">
            View All Events
          </button>
        </div>
      </div>
    </div>
  );
}
