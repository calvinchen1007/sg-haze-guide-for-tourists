import React, { useState } from 'react';
import { SingaporeRegion, RegionalPsiData } from '../types/haze';
import { MapPin } from 'lucide-react';

interface SingaporeInteractiveMapProps {
  selectedRegion: SingaporeRegion;
  allRegionsData: Record<SingaporeRegion, RegionalPsiData>;
  onSelectRegion: (region: SingaporeRegion) => void;
}

export const SingaporeInteractiveMap: React.FC<SingaporeInteractiveMapProps> = ({
  selectedRegion,
  allRegionsData,
  onSelectRegion,
}) => {
  const [hoveredRegion, setHoveredRegion] = useState<SingaporeRegion | null>(null);

  const getRegionFill = (regionId: SingaporeRegion, isSelected: boolean, isHovered: boolean) => {
    const psi = allRegionsData[regionId]?.psi24Hourly ?? 70;
    let baseColor = '#0284c7'; // Moderate default

    if (psi <= 50) baseColor = '#10b981'; // emerald-500
    else if (psi <= 100) baseColor = '#0ea5e9'; // sky-500
    else if (psi <= 200) baseColor = '#f59e0b'; // amber-500
    else if (psi <= 300) baseColor = '#f97316'; // orange-500
    else baseColor = '#ef4444'; // rose-500

    return {
      fill: baseColor,
      opacity: isSelected ? 0.95 : isHovered ? 0.8 : 0.45,
      stroke: isSelected ? '#0f172a' : '#ffffff',
      strokeWidth: isSelected ? 3 : 1.5,
    };
  };

  const regions: Array<{
    id: SingaporeRegion;
    label: string;
    path: string;
    center: { x: number; y: number };
    landmark: string;
    landmarkPos: { x: number; y: number };
  }> = [
    {
      id: 'north',
      label: 'North',
      // Northern sector: Woodlands, Mandai, Sembawang, Yishun
      path: 'M 190,45 L 290,30 L 370,45 L 390,95 L 340,115 L 280,120 L 210,105 L 180,75 Z',
      center: { x: 285, y: 75 },
      landmark: 'Mandai Zoo',
      landmarkPos: { x: 265, y: 85 },
    },
    {
      id: 'west',
      label: 'West',
      // Western sector: Jurong, Tuas, Clementi, Bukit Batok
      path: 'M 60,110 L 180,75 L 210,105 L 225,145 L 210,185 L 150,210 L 80,185 L 35,145 Z',
      center: { x: 135, y: 145 },
      landmark: 'Science Centre & Jurong',
      landmarkPos: { x: 140, y: 160 },
    },
    {
      id: 'central',
      label: 'Central',
      // Central sector: Orchard, Marina Bay, CBD, Toa Payoh, Bishan
      path: 'M 280,120 L 340,115 L 355,160 L 315,200 L 245,190 L 225,145 L 280,120 Z',
      center: { x: 295, y: 155 },
      landmark: 'Marina Bay & Orchard',
      landmarkPos: { x: 305, y: 180 },
    },
    {
      id: 'east',
      label: 'East',
      // Eastern sector: Changi, Tampines, Bedok, Pasir Ris
      path: 'M 370,45 L 475,80 L 495,125 L 450,170 L 355,160 L 340,115 L 390,95 Z',
      center: { x: 420, y: 115 },
      landmark: 'Jewel Changi Airport',
      landmarkPos: { x: 450, y: 110 },
    },
    {
      id: 'south',
      label: 'South',
      // Southern sector: Sentosa Island, HarbourFront, Telok Blangah
      path: 'M 245,190 L 315,200 L 295,240 L 255,238 Z M 265,248 L 295,248 L 290,260 L 260,258 Z',
      center: { x: 280, y: 220 },
      landmark: 'Sentosa & HarbourFront',
      landmarkPos: { x: 275, y: 250 },
    },
  ];

  const activeRegion = hoveredRegion || (selectedRegion !== 'national' ? selectedRegion : 'central');
  const activeData = allRegionsData[activeRegion];

  return (
    <div className="bg-slate-900 rounded-3xl p-5 sm:p-6 text-white border border-slate-800 shadow-sm relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span className="font-semibold text-slate-200">Interactive Island Sensor Map</span>
            <span aria-hidden="true">·</span>
            <span>Real-Time Singapore NEA Stations</span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            Click Any Region to Inspect Local Air Quality
          </h3>
        </div>

        {/* Selected region summary card */}
        <div className="flex items-center gap-3 bg-slate-800/80 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-700">
          <div className="text-right">
            <span className="text-[11px] text-slate-400 uppercase font-medium block">
              {activeData?.displayName?.split('(')[0] || 'Selected Zone'}
            </span>
            <div className="flex items-center gap-1.5 justify-end">
              <span className="text-xs font-semibold text-slate-200">{activeData?.status}</span>
              <span className="font-mono text-sm font-bold text-white tabular-nums">
                PSI {activeData?.psi24Hourly}
              </span>
            </div>
          </div>
          <div
            className={`w-3 h-8 rounded-full ${
              (activeData?.psi24Hourly ?? 0) <= 50
                ? 'bg-emerald-400'
                : (activeData?.psi24Hourly ?? 0) <= 100
                ? 'bg-sky-400'
                : (activeData?.psi24Hourly ?? 0) <= 200
                ? 'bg-amber-400 animate-pulse'
                : 'bg-rose-500 animate-pulse'
            }`}
          />
        </div>
      </div>

      {/* SVG Map Canvas */}
      <div className="relative w-full aspect-[2/1] min-h-[220px] max-h-[340px] flex items-center justify-center py-2">
        <svg
          viewBox="0 0 530 280"
          className="w-full h-full max-w-2xl overflow-visible drop-shadow-md select-none"
        >
          {/* Subtle geographical grid lines */}
          <line x1="30" y1="70" x2="500" y2="70" stroke="#334155" strokeDasharray="3 4" strokeWidth="0.8" opacity="0.3" />
          <line x1="30" y1="140" x2="500" y2="140" stroke="#334155" strokeDasharray="3 4" strokeWidth="0.8" opacity="0.3" />
          <line x1="30" y1="210" x2="500" y2="210" stroke="#334155" strokeDasharray="3 4" strokeWidth="0.8" opacity="0.3" />

          {/* Map Region Polygons */}
          {regions.map((r) => {
            const isSelected = selectedRegion === r.id;
            const isHovered = hoveredRegion === r.id;
            const style = getRegionFill(r.id, isSelected, isHovered);
            const data = allRegionsData[r.id];

            return (
              <g
                key={r.id}
                onClick={() => onSelectRegion(r.id)}
                onMouseEnter={() => setHoveredRegion(r.id)}
                onMouseLeave={() => setHoveredRegion(null)}
                className="cursor-pointer transition-all duration-200"
              >
                <path
                  d={r.path}
                  fill={style.fill}
                  fillOpacity={style.opacity}
                  stroke={style.stroke}
                  strokeWidth={style.strokeWidth}
                  className="transition-all duration-200 hover:filter hover:brightness-110"
                />

                {/* Region Label Tag & PSI Bubble */}
                <g transform={`translate(${r.center.x}, ${r.center.y})`} className="pointer-events-none">
                  <rect
                    x="-32"
                    y="-16"
                    width="64"
                    height="32"
                    rx="8"
                    fill={isSelected ? '#0f172a' : '#1e293b'}
                    stroke={isSelected ? '#38bdf8' : '#475569'}
                    strokeWidth="1.2"
                    opacity="0.95"
                  />
                  <text
                    x="0"
                    y="-3"
                    textAnchor="middle"
                    fill="#f8fafc"
                    fontSize="10"
                    fontWeight="700"
                  >
                    {r.label}
                  </text>
                  <text
                    x="0"
                    y="10"
                    textAnchor="middle"
                    fill={
                      (data?.psi24Hourly ?? 0) <= 100
                        ? '#38bdf8'
                        : '#fbbf24'
                    }
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="700"
                  >
                    PSI {data?.psi24Hourly ?? '--'}
                  </text>
                </g>

                {/* Landmark Pin Indicator */}
                <circle
                  cx={r.landmarkPos.x}
                  cy={r.landmarkPos.y}
                  r="3.5"
                  fill="#ffffff"
                  stroke="#0f172a"
                  strokeWidth="1.5"
                  className="pointer-events-none"
                />
                <text
                  cx={r.landmarkPos.x}
                  cy={r.landmarkPos.y}
                  x={r.landmarkPos.x + 6}
                  y={r.landmarkPos.y + 3}
                  fill="#94a3b8"
                  fontSize="8.5"
                  fontWeight="500"
                  className="pointer-events-none hidden sm:inline"
                >
                  {r.landmark}
                </text>
              </g>
            );
          })}

          {/* Surrounding body of water labels */}
          <text x="160" y="25" fill="#475569" fontSize="9" fontWeight="600" letterSpacing="2">
            JOHOR STRAIT (MALAYSIA)
          </text>
          <text x="310" y="270" fill="#475569" fontSize="9" fontWeight="600" letterSpacing="2">
            SINGAPORE STRAIT
          </text>
        </svg>
      </div>

      {/* Map Legend Bar */}
      <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-semibold text-slate-300">Air Status Scale:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span>Good (0–50)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" />
            <span>Moderate (51–100)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span>Unhealthy (101–200)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" />
            <span>Very Unhealthy (201–300)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span>Hazardous (301+)</span>
          </div>
        </div>

        <button
          onClick={() => onSelectRegion('national')}
          className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
            selectedRegion === 'national'
              ? 'bg-white text-slate-900 border-white font-semibold'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
          }`}
        >
          View National Islandwide Average
        </button>
      </div>
    </div>
  );
};
