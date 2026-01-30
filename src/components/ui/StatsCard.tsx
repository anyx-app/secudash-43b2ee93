import React from 'react';
import { LucideIcon, ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  color: string;
  isAlert?: boolean;
}

export function StatsCard({ title, value, change, trend, icon: Icon, color, isAlert }: StatsCardProps) {
  return (
    <div className={`
      relative overflow-hidden rounded-xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
      ${isAlert 
        ? 'bg-gradient-to-br from-[#FF4136]/10 to-transparent border-[#FF4136]/30' 
        : 'bg-white/5 backdrop-blur-md border-white/10 hover:border-white/20'
      }
    `}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-slate-400 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-white mt-1 tracking-tight">{value}</h3>
        </div>
        <div className={`p-2 rounded-lg bg-white/5 ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-xs font-medium">
        <span className={`
          flex items-center gap-1 px-2 py-0.5 rounded-full
          ${trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : ''}
          ${trend === 'down' ? 'bg-rose-500/10 text-rose-400' : ''}
          ${trend === 'neutral' ? 'bg-slate-500/10 text-slate-400' : ''}
        `}>
          {trend === 'up' && <ArrowUp className="w-3 h-3" />}
          {trend === 'down' && <ArrowDown className="w-3 h-3" />}
          {trend === 'neutral' && <Minus className="w-3 h-3" />}
          {change}
        </span>
        <span className="text-slate-500">vs last month</span>
      </div>
    </div>
  );
}
