import React from 'react';
import { RegionalPsiData } from '../types/haze';

interface PsiRadialGaugeProps {
  psi: number;
  pm25: number;
  status: RegionalPsiData['status'];
  displayName: string;
  updateTime: string;
}

export const PsiRadialGauge: React.FC<PsiRadialGaugeProps> = ({
  psi,
  pm25,
  status,
  displayName,
  updateTime,
}) => {
  // Gauge is a semi-circle from -180 deg to 0 deg (or -140 deg to 140 deg)
  // Let's map PSI 0..350 to angle -135deg .. 135deg (total 270 degrees)
  const clampedPsi = Math.min(Math.max(psi, 0), 400);
  const percentage = Math.min(clampedPsi / 350, 1);
  const needleRotation = -135 + percentage * 270;

  const getStatusColor = (s: RegionalPsiData['status']) => {
    switch (s) {
      case 'Good':
        return { text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', hex: '#10b981' };
      case 'Moderate':
        return { text: 'text-sky-700', bg: 'bg-sky-50', border: 'border-sky-200', hex: '#0ea5e9' };
      case 'Unhealthy':
        return { text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', hex: '#f59e0b' };
      case 'Very Unhealthy':
        return { text: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200', hex: '#f97316' };
      case 'Hazardous':
        return { text: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-200', hex: '#e11d48' };
    }
  };

  const currentTheme = getStatusColor(status);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between relative overflow-hidden">
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
              Official NEA Index
            </span>
            <h3 className="font-bold text-slate-900 text-base">{displayName}</h3>
          </div>
          <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${currentTheme.bg} ${currentTheme.text} ${currentTheme.border}`}>
            {status}
          </span>
        </div>

        {/* Circular Gauge Arc */}
        <div className="relative w-full max-w-[260px] mx-auto aspect-[1/0.85] flex items-center justify-center pt-2">
          <svg viewBox="0 0 200 160" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="25%" stopColor="#0ea5e9" />
                <stop offset="55%" stopColor="#f59e0b" />
                <stop offset="80%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#e11d48" />
              </linearGradient>
            </defs>

            {/* Background Track Arc */}
            <path
              d="M 30,130 A 70,70 0 1,1 170,130"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="14"
              strokeLinecap="round"
            />

            {/* Color Gradient Active Arc */}
            <path
              d="M 30,130 A 70,70 0 1,1 170,130"
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray="330"
              strokeDashoffset={330 - percentage * 330}
              className="transition-all duration-700 ease-out"
            />

            {/* Scale tick marks */}
            <text x="22" y="148" fill="#94a3b8" fontSize="8" fontFamily="monospace" fontWeight="600">0</text>
            <text x="45" y="65" fill="#94a3b8" fontSize="8" fontFamily="monospace" fontWeight="600">50</text>
            <text x="94" y="38" fill="#94a3b8" fontSize="8" fontFamily="monospace" fontWeight="600">100</text>
            <text x="145" y="65" fill="#94a3b8" fontSize="8" fontFamily="monospace" fontWeight="600">200</text>
            <text x="165" y="148" fill="#94a3b8" fontSize="8" fontFamily="monospace" fontWeight="600">350+</text>

            {/* Pivot circle & needle */}
            <g transform="translate(100, 120)">
              <g
                transform={`rotate(${needleRotation})`}
                className="transition-transform duration-700 ease-out"
              >
                <path d="M -3,0 L 0,-62 L 3,0 Z" fill="#0f172a" />
                <circle cx="0" cy="0" r="7" fill="#0f172a" />
                <circle cx="0" cy="0" r="3" fill="#ffffff" />
              </g>
            </g>
          </svg>

          {/* Central Digits Overlay */}
          <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-none">
            <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-mono tracking-tight tabular-nums block">
              {psi}
            </span>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              24-Hour PSI
            </span>
          </div>
        </div>
      </div>

      {/* Dual Key Metrics Strip */}
      <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
          <span className="text-slate-500 text-[11px] block">1-Hour PM2.5</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">
              {pm25}
            </span>
            <span className="text-[11px] text-slate-500">µg/m³</span>
          </div>
          <span className="text-[10px] text-slate-500">Immediate Air Quality</span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
          <span className="text-slate-500 text-[11px] block">Safe Window</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-sm font-bold text-slate-900">
              {psi <= 100 ? 'All Day' : 'Sheltered Only'}
            </span>
          </div>
          <span className="text-[10px] text-slate-500">
            {psi <= 100 ? 'Normal touring' : 'AC indoor venues'}
          </span>
        </div>
      </div>
    </div>
  );
};
