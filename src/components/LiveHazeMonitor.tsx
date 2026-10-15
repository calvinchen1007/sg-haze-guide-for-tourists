import React from 'react';
import {
  RefreshCw,
  Compass,
  ShoppingBag,
  Bell,
  MapPin,
  Info,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';
import { RegionalPsiData, SingaporeRegion } from '../types/haze';
import { IMAGES } from '../data/hazeData';

interface LiveHazeMonitorProps {
  currentRegionData: RegionalPsiData;
  allRegionsData: Record<SingaporeRegion, RegionalPsiData>;
  selectedRegion: SingaporeRegion;
  onSelectRegion: (region: SingaporeRegion) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  onNavigateToItinerary: () => void;
  onNavigateToSupplies: () => void;
  onNavigateToEducation: () => void;
  alertThresholdEnabled: boolean;
  onToggleAlertThreshold: () => void;
}

export const LiveHazeMonitor: React.FC<LiveHazeMonitorProps> = ({
  currentRegionData,
  allRegionsData,
  selectedRegion,
  onSelectRegion,
  onRefresh,
  isRefreshing,
  onNavigateToItinerary,
  onNavigateToSupplies,
  onNavigateToEducation,
  alertThresholdEnabled,
  onToggleAlertThreshold,
}) => {
  const psi = currentRegionData.psi24Hourly;

  // Simple, human-friendly status interpretation
  const getStatusDetails = (value: number) => {
    if (value <= 50) {
      return {
        label: 'Good Air',
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        textColor: 'text-emerald-700',
        barColor: 'bg-emerald-500',
        headline: 'Clear skies! Perfect weather for outdoor sightseeing.',
        canGoOutside: 'Yes! Completely safe to walk, explore gardens, or lounge at beaches.',
        needMask: 'No mask needed. Enjoy the fresh air.',
        recommendedPlan: 'Great time for Gardens by the Bay, Singapore Zoo, or Marina Bay walk.',
      };
    }
    if (value <= 100) {
      return {
        label: 'Moderate Air',
        badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
        textColor: 'text-sky-700',
        barColor: 'bg-sky-500',
        headline: 'Acceptable air. Safe for almost all tourist activities.',
        canGoOutside: 'Yes. Safe for sightseeing, outdoor dining, and walking around town.',
        needMask: 'No mask needed for most people. Sensitive travelers may pack one just in case.',
        recommendedPlan: 'Normal holiday plans. Drink plenty of water in Singapore’s tropical warmth.',
      };
    }
    if (value <= 200) {
      return {
        label: 'Hazy (Unhealthy)',
        badgeColor: 'bg-amber-50 text-amber-800 border-amber-300',
        textColor: 'text-amber-800',
        barColor: 'bg-amber-500',
        headline: 'Noticeable smoke haze. Tone down intense outdoor exertion.',
        canGoOutside: 'Limit prolonged outdoor walking. Swap open parks for air-conditioned indoor spots.',
        needMask: 'Wear a certified N95 mask if you plan to stay outdoors for over 1 hour.',
        recommendedPlan: 'Head into Flower Dome, Cloud Forest, Jewel Changi, or shopping malls.',
      };
    }
    if (value <= 300) {
      return {
        label: 'Dense Haze',
        badgeColor: 'bg-orange-50 text-orange-800 border-orange-300',
        textColor: 'text-orange-800',
        barColor: 'bg-orange-500',
        headline: 'Heavy smoke haze. Stay inside air-conditioned spaces.',
        canGoOutside: 'Avoid outdoor sightseeing. Stick to indoor museums, malls, and sheltered trains.',
        needMask: 'N95 respirator strongly advised for any unavoidable outdoor walking.',
        recommendedPlan: 'Explore Singapore’s 100% sheltered MRT underpasses and megamalls.',
      };
    }
    return {
      label: 'Emergency Haze',
      badgeColor: 'bg-rose-50 text-rose-800 border-rose-300',
      textColor: 'text-rose-800',
      barColor: 'bg-rose-600',
      headline: 'Severe air quality alert. Remain in closed indoor facilities.',
      canGoOutside: 'Stay strictly indoors in air-conditioned buildings with closed windows.',
      needMask: 'Certified N95 mask required if stepping outdoors.',
      recommendedPlan: 'Stay in hotel lounges, indoor cinema complexes, or airport terminals.',
    };
  };

  const status = getStatusDetails(psi);

  const regionTabs: Array<{ id: SingaporeRegion; label: string; location: string }> = [
    { id: 'national', label: 'All Singapore', location: 'Islandwide Average' },
    { id: 'central', label: 'Central', location: 'Marina Bay & Orchard' },
    { id: 'south', label: 'South', location: 'Sentosa & HarbourFront' },
    { id: 'east', label: 'East', location: 'Changi Airport & Jewel' },
    { id: 'north', label: 'North', location: 'Mandai Zoo & Woodlands' },
    { id: 'west', label: 'West', location: 'Jurong & Botanic Link' },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Visual Hero Card with Singapore Skyline & Live Status */}
      <section className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-950 text-white shadow-xs">
        <div className="absolute inset-0">
          <img
            src={IMAGES.skyline}
            alt="Singapore Marina Bay Skyline"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
        </div>

        <div className="relative z-10 p-6 sm:p-8 lg:p-10">
          {/* Top meta strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300 mb-6">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">Singapore Air Quality Guide</span>
              <span aria-hidden="true">·</span>
              <span>Live NEA data</span>
              <span aria-hidden="true">·</span>
              <span>{currentRegionData.updateTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onRefresh}
                disabled={isRefreshing}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
                title="Refresh latest data"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{isRefreshing ? 'Updating...' : 'Refresh'}</span>
              </button>
              <button
                onClick={onToggleAlertThreshold}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  alertThresholdEnabled
                    ? 'bg-amber-400 text-slate-950 font-semibold'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                <Bell className="w-3.5 h-3.5" />
                <span>{alertThresholdEnabled ? 'Haze Alert On' : 'Alerts Off'}</span>
              </button>
            </div>
          </div>

          {/* Big Headline & Live Air Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentRegionData.displayName}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                {status.headline}
              </h1>

              <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
                Current air quality is in the <strong className="text-white">{status.label}</strong> range. 
                Everything you need to know in plain English below:
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onNavigateToItinerary}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-950 font-semibold text-xs sm:text-sm hover:bg-slate-100 transition-colors shadow-sm"
                >
                  <Compass className="w-4 h-4 text-slate-900" />
                  <span>Browse Indoor Attractions</span>
                </button>
                <button
                  onClick={onNavigateToSupplies}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-medium text-xs sm:text-sm border border-slate-700 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4 text-slate-300" />
                  <span>Where to Buy Masks</span>
                </button>
              </div>
            </div>

            {/* Right Gauge Box */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 text-white">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
                <span className="font-medium">Air Quality Index</span>
                <span>24-Hour PSI</span>
              </div>

              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-6xl sm:text-7xl font-bold font-mono tracking-tight tabular-nums text-white">
                  {psi}
                </span>
                <div>
                  <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-bold border ${status.badgeColor}`}>
                    {status.label}
                  </span>
                  <span className="block text-[11px] text-slate-300 mt-1">
                    PM2.5: {currentRegionData.pm25OneHourly} µg/m³
                  </span>
                </div>
              </div>

              {/* Air Quality Progress Bar */}
              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <div className="flex justify-between text-[11px] text-slate-300">
                  <span>0 (Fresh)</span>
                  <span>100 (Safe)</span>
                  <span>200 (Hazy)</span>
                  <span>300+</span>
                </div>
                <div className="h-2.5 w-full bg-white/20 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${status.barColor} transition-all duration-500 rounded-full`}
                    style={{ width: `${Math.min(100, Math.max(5, (psi / 300) * 100))}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Region Selector Bar */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <h2 className="text-sm font-bold text-slate-900">
            Check Air Quality by Singapore Area
          </h2>
          <span className="text-xs text-slate-500">
            Tap your area to see local readings
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {regionTabs.map((r) => {
            const regionData = allRegionsData[r.id];
            const isSelected = selectedRegion === r.id;
            const regionPsi = regionData?.psi24Hourly ?? 70;

            return (
              <button
                key={r.id}
                onClick={() => onSelectRegion(r.id)}
                className={`text-left p-3 rounded-xl border transition-all ${
                  isSelected
                    ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-white text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {r.label}
                  </span>
                  <span
                    className={`text-[11px] font-mono font-bold tabular-nums px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-800'
                    }`}
                  >
                    {regionPsi}
                  </span>
                </div>
                <p className={`text-[11px] truncate ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                  {r.location}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3 Plain-English Answers for Tourists */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Answer 1: Can I go outside? */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            Can I go outside today?
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {status.canGoOutside}
          </p>
        </div>

        {/* Answer 2: Do I need a mask? */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center mb-3">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            Do I need to wear a mask?
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {status.needMask}
          </p>
          <button
            onClick={onNavigateToSupplies}
            className="text-[11px] font-semibold text-slate-900 hover:underline pt-1 inline-flex items-center gap-1"
          >
            <span>See N95 mask guide & prices</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Answer 3: Best plan right now */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
            <Compass className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            Best plan for today
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {status.recommendedPlan}
          </p>
          <button
            onClick={onNavigateToItinerary}
            className="text-[11px] font-semibold text-slate-900 hover:underline pt-1 inline-flex items-center gap-1"
          >
            <span>View sheltered indoor swaps</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </section>

      {/* Understand the Numbers in 10 Seconds */}
      <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-3">
          Singapore Air Quality in 10 Seconds
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200">
            <div className="flex items-center justify-between font-bold text-emerald-800 mb-1">
              <span>0 – 50</span>
              <span>Good</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Clean air. Safe for running, swimming, rooftop bars, and all outdoor trips.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-200">
            <div className="flex items-center justify-between font-bold text-sky-800 mb-1">
              <span>51 – 100</span>
              <span>Moderate</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Normal everyday air. Safe for everyone except individuals with severe asthma.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200">
            <div className="flex items-center justify-between font-bold text-amber-800 mb-1">
              <span>101 – 200</span>
              <span>Hazy / Unhealthy</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Noticeable smoke smell. Reduce outdoor sports. N95 masks advised outdoors.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200">
            <div className="flex items-center justify-between font-bold text-rose-800 mb-1">
              <span>201+</span>
              <span>Very Unhealthy</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Dense smoke. Stay inside cooled malls, museums, and bio-domes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
