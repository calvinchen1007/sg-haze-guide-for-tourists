import React, { useState } from 'react';
import { Eye, Sun, CloudFog, Camera, Sparkles } from 'lucide-react';
import { IMAGES } from '../data/hazeData';

interface SkylineVisibilityCamProps {
  psi: number;
}

export const SkylineVisibilityCam: React.FC<SkylineVisibilityCamProps> = ({ psi }) => {
  const [showClearComparison, setShowClearComparison] = useState(false);

  // Compute realistic CSS atmospheric filters based on PSI
  const getFilterStyle = (val: number) => {
    if (showClearComparison) {
      return {
        filter: 'brightness(1.05) contrast(1.05) saturate(1.1)',
        hazeOverlayOpacity: 0,
        visualRange: '> 15 km',
        visibilityNote: 'Pristine visibility. Marina Bay Sands and southern islands crystal clear.',
      };
    }

    if (val <= 50) {
      return {
        filter: 'brightness(1.02) contrast(1.02)',
        hazeOverlayOpacity: 0.05,
        visualRange: '12 – 15 km',
        visibilityNote: 'Excellent sightlines across Marina Bay and Singapore Flyer.',
      };
    } else if (val <= 100) {
      return {
        filter: 'brightness(0.98) contrast(0.92) blur(0.3px)',
        hazeOverlayOpacity: 0.25,
        visualRange: '7 – 10 km',
        visibilityNote: 'Slight milky tint on distant horizon. Close buildings remain clear.',
      };
    } else if (val <= 200) {
      return {
        filter: 'brightness(0.92) contrast(0.82) sepia(0.2) blur(0.9px)',
        hazeOverlayOpacity: 0.55,
        visualRange: '3 – 5 km',
        visibilityNote: 'Noticeable smoke haze. Distant skyscrapers washed out; rooftop views obscured.',
      };
    } else if (val <= 300) {
      return {
        filter: 'brightness(0.86) contrast(0.72) sepia(0.4) blur(1.8px)',
        hazeOverlayOpacity: 0.75,
        visualRange: '1 – 2.5 km',
        visibilityNote: 'Dense transboundary haze. Sky appears dull grey-amber; low visibility.',
      };
    } else {
      return {
        filter: 'brightness(0.78) contrast(0.65) sepia(0.55) blur(2.8px)',
        hazeOverlayOpacity: 0.88,
        visualRange: '< 800 metres',
        visibilityNote: 'Hazardous emergency smoke layer. Extreme low visibility.',
      };
    }
  };

  const currentCam = getFilterStyle(psi);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between overflow-hidden">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-slate-700" />
            <h3 className="font-bold text-slate-900 text-base">Skyline Visibility Simulation</h3>
          </div>
          <button
            onClick={() => setShowClearComparison(!showClearComparison)}
            className={`text-xs px-3 py-1 rounded-lg border font-medium transition-colors ${
              showClearComparison
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {showClearComparison ? 'Viewing Normal Day' : 'Compare Clear vs Hazy'}
          </button>
        </div>

        <p className="text-xs text-slate-500 mb-4">
          Real-time optical simulation of Marina Bay skyline based on current PM2.5 and PSI light scattering
        </p>

        {/* Viewport Frame with Dynamic Filter */}
        <div className="relative rounded-2xl overflow-hidden aspect-[16/9] w-full bg-slate-900 shadow-inner">
          <img
            src={IMAGES.skyline}
            alt="Singapore Marina Bay Skyline horizon preview"
            referrerPolicy="no-referrer"
            style={{ filter: currentCam.filter }}
            className="w-full h-full object-cover transition-all duration-700"
          />

          {/* Atmospheric haze smoke tint overlay */}
          <div
            style={{ opacity: currentCam.hazeOverlayOpacity }}
            className="absolute inset-0 bg-gradient-to-t from-amber-100/40 via-amber-200/50 to-slate-200/40 mix-blend-screen transition-opacity duration-700 pointer-events-none"
          />

          {/* Live Visibility HUD */}
          <div className="absolute top-3 left-3 bg-slate-950/75 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/20 text-white text-[11px] flex items-center gap-2">
            <Eye className="w-3.5 h-3.5 text-sky-400" />
            <span>Visual Range:</span>
            <span className="font-mono font-bold text-sky-300">{currentCam.visualRange}</span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-md p-2.5 rounded-xl border border-white/10 text-white text-xs">
            <span className="text-[11px] text-slate-300 line-clamp-1">
              {currentCam.visibilityNote}
            </span>
          </div>
        </div>
      </div>

      {/* Practical Tourist Advice */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
        <span className="font-medium text-slate-900">Rooftop & Observation Decks:</span>
        <span className={psi > 100 ? 'text-amber-700 font-semibold' : 'text-emerald-700 font-semibold'}>
          {psi <= 100 ? 'Recommended (Clear vistas)' : 'Not advised (Obscured view)'}
        </span>
      </div>
    </div>
  );
};
