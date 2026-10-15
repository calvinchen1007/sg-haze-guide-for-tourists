import React from 'react';
import {
  Wind,
  RefreshCw,
  Compass,
  ShoppingBag,
  Bell,
  MapPin,
  Info,
  Shield,
  Eye,
  Activity,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { RegionalPsiData, SingaporeRegion } from '../types/haze';
import { PSI_ADVISORY_BANDS, IMAGES } from '../data/hazeData';

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
  const getStatusColor = (status: RegionalPsiData['status']) => {
    switch (status) {
      case 'Good':
        return {
          badge: 'text-emerald-700 bg-emerald-50 border-emerald-200',
          ring: '#10b981',
          bgGradient: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
          textColor: 'text-emerald-600',
        };
      case 'Moderate':
        return {
          badge: 'text-sky-700 bg-sky-50 border-sky-200',
          ring: '#0ea5e9',
          bgGradient: 'from-sky-500/10 via-sky-500/5 to-transparent',
          textColor: 'text-sky-600',
        };
      case 'Unhealthy':
        return {
          badge: 'text-amber-700 bg-amber-50 border-amber-200',
          ring: '#f59e0b',
          bgGradient: 'from-amber-500/15 via-amber-500/5 to-transparent',
          textColor: 'text-amber-600',
        };
      case 'Very Unhealthy':
        return {
          badge: 'text-orange-700 bg-orange-50 border-orange-200',
          ring: '#f97316',
          bgGradient: 'from-orange-500/20 via-orange-500/5 to-transparent',
          textColor: 'text-orange-600',
        };
      case 'Hazardous':
        return {
          badge: 'text-rose-700 bg-rose-50 border-rose-200',
          ring: '#e11d48',
          bgGradient: 'from-rose-500/25 via-rose-500/5 to-transparent',
          textColor: 'text-rose-600',
        };
    }
  };

  const statusStyle = getStatusColor(currentRegionData.status);

  // Map coordinates for visual pins on Singapore island
  const regionPins: Array<{
    id: SingaporeRegion;
    name: string;
    sub: string;
    x: number; // percentage
    y: number; // percentage
  }> = [
    { id: 'north', name: 'North', sub: 'Woodlands / Mandai', x: 48, y: 22 },
    { id: 'west', name: 'West', sub: 'Jurong / Clementi', x: 22, y: 54 },
    { id: 'central', name: 'Central', sub: 'Orchard / Marina Bay', x: 50, y: 62 },
    { id: 'east', name: 'East', sub: 'Changi / Tampines', x: 80, y: 46 },
    { id: 'south', name: 'South', sub: 'Sentosa / HabourFront', x: 46, y: 84 },
  ];

  // Calculate arc stroke offset for circular gauge (max 350 PSI for gauge circumference)
  const clampedPsi = Math.min(Math.max(currentRegionData.psi24Hourly, 0), 350);
  const strokeDashoffset = 440 - (440 * clampedPsi) / 350;

  return (
    <div className="space-y-8">
      {/* Visual Hero Billboard */}
      <section className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-950 text-white shadow-lg">
        <div className="absolute inset-0">
          <img
            src={IMAGES.skyline}
            alt="Singapore Marina Bay Skyline"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-45 scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />
        </div>

        <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Singapore National Environment Agency Live Network</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Clear Skies or Haze Days, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-sky-200">
              Never Miss Singapore.
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mb-8">
            Live 1-hr PM2.5 and 24-hr PSI tracking across all 5 zones. When smoke levels elevate, seamlessly swap open-air walks with Singapore’s air-conditioned megadomes and subterranean city trails.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateToItinerary}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-950 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-all shadow-md active:scale-98"
            >
              <Compass className="w-4 h-4 text-slate-950" />
              <span>Explore Indoor Substitutions</span>
            </button>
            <button
              onClick={onNavigateToSupplies}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm border border-white/20 backdrop-blur-sm transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-slate-300" />
              <span>N95 Masks & Pharmacy Stock</span>
            </button>
            <button
              onClick={onNavigateToEducation}
              className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-xl text-slate-300 hover:text-white text-xs sm:text-sm transition-colors"
            >
              <Info className="w-4 h-4" />
              <span>What Causes Haze?</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Interactive Dual Console: Visual Circular Gauge & Interactive Visual Map */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Circular Atmospheric Gauge (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full bg-gradient-to-br ${statusStyle.bgGradient} blur-2xl pointer-events-none`} />

          <div>
            {/* Header with Location & Live Status */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span className="font-bold text-sm text-slate-900">
                  {currentRegionData.displayName}
                </span>
              </div>
              <div className={`px-2.5 py-1 rounded-full text-xs font-bold border ${statusStyle.badge}`}>
                {currentRegionData.status}
              </div>
            </div>

            {/* Circular Gauge Centerpiece */}
            <div className="py-6 flex flex-col items-center justify-center">
              <div className="relative w-56 h-56 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                  {/* Background Track */}
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#f1f5f9"
                    strokeWidth="12"
                    fill="transparent"
                  />
                  {/* Value Arc */}
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke={statusStyle.ring}
                    strokeWidth="12"
                    strokeDasharray="440"
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>

                {/* Central Value Readout */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    24-Hr PSI
                  </span>
                  <span className="text-5xl font-black text-slate-900 font-mono tracking-tight tabular-nums my-0.5">
                    {currentRegionData.psi24Hourly}
                  </span>
                  <span className={`text-xs font-bold ${statusStyle.textColor}`}>
                    {currentRegionData.status} Air
                  </span>
                </div>
              </div>

              {/* Instant 1-Hr PM2.5 Strip (Most Actionable for Tourists) */}
              <div className="w-full mt-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                    <Activity className="w-4 h-4 text-sky-400" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      1-Hour PM2.5: {currentRegionData.pm25OneHourly} µg/m³
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Immediate outdoor particle exposure
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">Real-time</span>
              </div>
            </div>
          </div>

          {/* Bottom Directive */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>{currentRegionData.updateTime}</span>
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1 font-medium text-slate-900 hover:text-slate-700 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Visual Singapore Map (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Interactive Singapore Regional Map
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tap any zone pin to switch live readings and tailored advisories
                </p>
              </div>

              {/* Alert Toggle */}
              <button
                onClick={onToggleAlertThreshold}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  alertThresholdEnabled
                    ? 'bg-amber-50 text-amber-800 border-amber-300 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Bell className="w-3.5 h-3.5" />
                <span>{alertThresholdEnabled ? 'Alerts ON (>100)' : 'Enable Alert'}</span>
              </button>
            </div>

            {/* Visual Island Map Display with Interactive Pins */}
            <div className="relative mt-6 rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-900 aspect-[16/9] max-h-72 shadow-inner group">
              <img
                src={IMAGES.islandAerial}
                alt="Singapore Island Map"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-60 group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-900/40" />

              {/* Floating Region Pins on the Island Map */}
              {regionPins.map((pin) => {
                const pinData = allRegionsData[pin.id];
                const isSelected = selectedRegion === pin.id;
                const pinColor = getStatusColor(pinData?.status || 'Moderate');

                return (
                  <button
                    key={pin.id}
                    onClick={() => onSelectRegion(pin.id)}
                    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border transition-all duration-300 z-20 ${
                      isSelected
                        ? 'bg-white text-slate-950 border-white shadow-xl scale-110 ring-4 ring-white/30'
                        : 'bg-slate-900/80 text-white border-white/20 hover:bg-slate-800 hover:scale-105'
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: pinColor.ring }}
                    />
                    <span className="text-[11px] font-bold whitespace-nowrap">
                      {pin.name}
                    </span>
                    <span className="font-mono text-[10px] opacity-80 tabular-nums">
                      {pinData?.psi24Hourly ?? '--'}
                    </span>
                  </button>
                );
              })}

              <div className="absolute bottom-3 left-4 text-[11px] text-white/70 flex items-center gap-2">
                <span>Select zone pin above</span>
                <span aria-hidden="true">·</span>
                <span>Coordinates: Singapore Islandwide</span>
              </div>
            </div>
          </div>

          {/* Quick Zone Selector Strip */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-4 pt-4 border-t border-slate-100">
            {(['national', 'central', 'south', 'east', 'west', 'north'] as SingaporeRegion[]).map((rKey) => {
              const data = allRegionsData[rKey];
              const isSelected = selectedRegion === rKey;
              return (
                <button
                  key={rKey}
                  onClick={() => onSelectRegion(rKey)}
                  className={`p-2 rounded-xl text-left border transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <span className="block text-[11px] font-bold capitalize truncate">
                    {rKey}
                  </span>
                  <span className="font-mono text-xs font-semibold tabular-nums block mt-0.5">
                    PSI {data?.psi24Hourly ?? '--'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visual Quick Actions Strip: High-Intent Visual Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div
          onClick={onNavigateToItinerary}
          className="group relative rounded-3xl overflow-hidden border border-slate-200 cursor-pointer shadow-sm hover:shadow-md transition-all"
        >
          <div className="h-44 w-full overflow-hidden bg-slate-100">
            <img
              src={IMAGES.jewel}
              alt="Jewel Changi Rain Vortex"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          </div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300 block mb-1">
              Itinerary Substitution
            </span>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-white">Indoor World Attractions</h3>
              <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <p className="text-slate-300 text-xs mt-1 line-clamp-1">
              Swap outdoor heat for Jewel Changi & Cloud Forest.
            </p>
          </div>
        </div>

        <div
          onClick={onNavigateToSupplies}
          className="group relative rounded-3xl overflow-hidden border border-slate-200 cursor-pointer shadow-sm hover:shadow-md transition-all"
        >
          <div className="h-44 w-full overflow-hidden bg-slate-100">
            <img
              src={IMAGES.n95Studio}
              alt="N95 Respirator Mask"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          </div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-300 block mb-1">
              What to Buy Guide
            </span>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-white">N95 & Pharmacy Locator</h3>
              <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <p className="text-slate-300 text-xs mt-1 line-clamp-1">
              Guardian, Watsons, Unity & 24h Mustafa stock.
            </p>
          </div>
        </div>

        <div
          onClick={onNavigateToEducation}
          className="group relative rounded-3xl overflow-hidden border border-slate-200 cursor-pointer shadow-sm hover:shadow-md transition-all"
        >
          <div className="h-44 w-full overflow-hidden bg-slate-100">
            <img
              src={IMAGES.futureWorld}
              alt="ArtScience Museum Future World"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          </div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-300 block mb-1">
              Air Quality Science
            </span>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-white">Understanding the Haze</h3>
              <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <p className="text-slate-300 text-xs mt-1 line-clamp-1">
              Monsoons, peat smoke & Singapore sheltered transit.
            </p>
          </div>
        </div>
      </section>

      {/* Advisory Rules Table: Clean Visual Cards */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4 text-slate-600" />
            <span>Singapore MOH & NEA Official Protocol</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Air Quality Bands & Recommended Tourist Actions
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Guidelines mapping 24-hr PSI air quality ranges to safe sightseeing practices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {PSI_ADVISORY_BANDS.map((band) => (
            <div
              key={band.range}
              className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-bold text-sm text-slate-900">
                    {band.range}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${band.badgeColor}`}>
                    {band.status}
                  </span>
                </div>
                <div className={`h-1.5 w-full rounded-full ${band.barColor} mb-2.5`} />
                <p className="text-xs font-medium text-slate-800 leading-snug mb-1">
                  {band.summary}
                </p>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {band.generalTourists}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 text-[10px] text-slate-600">
                <span className="font-semibold text-slate-800 block">Sensitive Groups:</span>
                <span>{band.vulnerableTourists}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
