import React from 'react';
import {
  Wind,
  AlertCircle,
  RefreshCw,
  Compass,
  ShoppingBag,
  Bell,
  CheckCircle2,
  MapPin,
  Info,
  Shield,
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
          bar: 'bg-emerald-500',
          text: 'text-emerald-700',
        };
      case 'Moderate':
        return {
          badge: 'text-sky-700 bg-sky-50 border-sky-200',
          bar: 'bg-sky-500',
          text: 'text-sky-700',
        };
      case 'Unhealthy':
        return {
          badge: 'text-amber-700 bg-amber-50 border-amber-200',
          bar: 'bg-amber-500',
          text: 'text-amber-700',
        };
      case 'Very Unhealthy':
        return {
          badge: 'text-orange-700 bg-orange-50 border-orange-200',
          bar: 'bg-orange-500',
          text: 'text-orange-700',
        };
      case 'Hazardous':
        return {
          badge: 'text-rose-700 bg-rose-50 border-rose-200',
          bar: 'bg-rose-600',
          text: 'text-rose-700',
        };
    }
  };

  const statusStyle = getStatusColor(currentRegionData.status);

  const regionTabs: Array<{ id: SingaporeRegion; label: string; sub: string }> = [
    { id: 'national', label: 'All Singapore', sub: 'Islandwide Avg' },
    { id: 'central', label: 'Central', sub: 'Marina Bay / Orchard' },
    { id: 'south', label: 'South', sub: 'Sentosa / HabourFront' },
    { id: 'east', label: 'East', sub: 'Changi Airport / Expo' },
    { id: 'west', label: 'West', sub: 'Jurong / Clementi' },
    { id: 'north', label: 'North', sub: 'Mandai Zoo / Woodlands' },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Atmosphere Banner with Singapore Skyline & Live Status */}
      <section className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-900 text-white shadow-sm">
        <div className="absolute inset-0">
          <img
            src={IMAGES.skyline}
            alt="Singapore Marina Bay Skyline in morning atmospheric light"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/40" />
        </div>

        <div className="relative z-10 p-6 sm:p-8 lg:p-10 max-w-4xl">
          <div className="flex items-center gap-2 text-xs text-slate-300 mb-3">
            <span className="font-semibold text-white">Singapore Tourist Advisory</span>
            <span aria-hidden="true">·</span>
            <span>National Environment Agency (NEA) Data</span>
            <span aria-hidden="true">·</span>
            <span>haze.gov.sg Partner Feed</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3 text-balance">
            Real-Time Haze Guide & Air Quality Advisory
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mb-6">
            Make the most of your Singapore trip safely. Monitor live regional PSI and 1-hour PM2.5 levels, discover air-conditioned indoor attraction substitutions, and access tourist medical help.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateToItinerary}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-900 font-medium text-xs sm:text-sm hover:bg-slate-100 transition-colors shadow-sm"
            >
              <Compass className="w-4 h-4 text-slate-900" />
              <span>Explore Indoor Substitutions</span>
            </button>
            <button
              onClick={onNavigateToSupplies}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-medium text-xs sm:text-sm border border-slate-700 transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-slate-300" />
              <span>N95 Masks & Pharmacy Guide</span>
            </button>
            <button
              onClick={onNavigateToEducation}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-slate-300 hover:text-white text-xs sm:text-sm transition-colors"
            >
              <Info className="w-4 h-4" />
              <span>What is Haze?</span>
            </button>
          </div>
        </div>
      </section>

      {/* Regional Selector Pills (Interactive Button Controls) */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Regional Air Quality Breakdown</h2>
            <p className="text-xs text-slate-500 mt-0.5">Select your current location in Singapore to see exact local sensor readings</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Updating...' : 'Sync NEA'}</span>
            </button>
            <button
              onClick={onToggleAlertThreshold}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                alertThresholdEnabled
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span>{alertThresholdEnabled ? 'Haze Alerts ON (>100)' : 'Enable PSI Alerts'}</span>
            </button>
          </div>
        </div>

        {/* Region Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {regionTabs.map((r) => {
            const regionData = allRegionsData[r.id];
            const isSelected = selectedRegion === r.id;
            return (
              <button
                key={r.id}
                onClick={() => onSelectRegion(r.id)}
                className={`text-left p-3 rounded-xl border transition-all ${
                  isSelected
                    ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-white text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {r.label}
                  </span>
                  <span
                    className={`text-[11px] font-mono font-bold tabular-nums px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-200 text-slate-800'
                    }`}
                  >
                    PSI {regionData?.psi24Hourly ?? '--'}
                  </span>
                </div>
                <p className={`text-[11px] truncate ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                  {r.sub}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Focus Reading Card */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: 24-hr PSI & 1-hr PM2.5 Gauge */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="font-semibold text-slate-900">{currentRegionData.displayName}</span>
                <span aria-hidden="true">·</span>
                <span>{currentRegionData.updateTime}</span>
              </div>
              <div className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${statusStyle.badge}`}>
                {currentRegionData.status} Band
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-slate-100">
              {/* Primary 24-hr PSI */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium">24-Hour PSI</span>
                  <span>General Daily Trend</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
                    {currentRegionData.psi24Hourly}
                  </span>
                  <div className="text-xs text-slate-500">
                    <span className="font-medium text-slate-700 block">Pollutant Standards Index</span>
                    <span>Range 0 to 500+</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {currentRegionData.description}
                </p>
              </div>

              {/* 1-Hour PM2.5 (The most actionable metric for tourists right now) */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">1-Hour PM2.5 (Immediate)</span>
                  <span className="font-mono text-[11px] text-slate-500">µg/m³</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold font-mono text-slate-900 tabular-nums">
                    {currentRegionData.pm25OneHourly}
                  </span>
                  <span className="text-xs text-slate-500">µg/m³ concentration</span>
                </div>
                <p className="text-[12px] text-slate-600 leading-snug">
                  <span className="font-medium text-slate-900">Why this matters: </span>
                  The 1-hour PM2.5 reading is the best indicator for tourists deciding whether to venture outdoors right this hour.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Action Matrix Based on Current Air Quality */}
          <div className="pt-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Official Tourist Action Directive
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <span className="font-semibold text-slate-900 block">General Sightseers</span>
                <p className="text-slate-600">
                  {currentRegionData.psi24Hourly <= 100
                    ? 'Safe for normal outdoor attractions, city walking, and gardens.'
                    : 'Reduce strenuous outdoor exertion. Plan visits to indoor galleries & domes.'}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <span className="font-semibold text-slate-900 block">Kids & Elderly</span>
                <p className="text-slate-600">
                  {currentRegionData.psi24Hourly <= 100
                    ? 'Normal activities with regular air-conditioned rest stops.'
                    : 'Minimise outdoor exposure. Choose sheltered indoor spaces like Jewel or Science Centre.'}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <span className="font-semibold text-slate-900 block">Mask Recommendation</span>
                <p className="text-slate-600">
                  {currentRegionData.psi24Hourly <= 100
                    ? 'No mask required for general outdoor sightseeing.'
                    : 'Certified N95 respirator recommended for prolonged outdoor walking.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Singapore Region Quick Cards */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900">All 5 Singapore Zones</h3>
              <span className="text-xs text-slate-500">24-hr PSI</span>
            </div>
            <div className="divide-y divide-slate-100">
              {(['central', 'south', 'east', 'west', 'north'] as SingaporeRegion[]).map((rKey) => {
                const item = allRegionsData[rKey];
                const isSelected = selectedRegion === rKey;
                return (
                  <button
                    key={rKey}
                    onClick={() => onSelectRegion(rKey)}
                    className={`w-full py-3 flex items-center justify-between text-left text-xs transition-colors hover:bg-slate-50 px-2 rounded-lg ${
                      isSelected ? 'bg-slate-50 font-medium' : ''
                    }`}
                  >
                    <div>
                      <span className="font-semibold text-slate-900 capitalize block">
                        {rKey} Singapore
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {rKey === 'central' && 'Orchard, Marina Bay, CBD'}
                        {rKey === 'south' && 'Sentosa, VivoCity'}
                        {rKey === 'east' && 'Changi Airport, East Coast'}
                        {rKey === 'west' && 'Jurong, Boon Lay'}
                        {rKey === 'north' && 'Woodlands, Mandai Zoo'}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-sm text-slate-900 tabular-nums">
                        {item?.psi24Hourly ?? '--'}
                      </span>
                      <span className="block text-[10px] text-slate-500">{item?.status}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div className="flex items-center gap-2 font-semibold text-slate-900 mb-1">
              <Shield className="w-4 h-4 text-slate-700" />
              <span>Singapore NEA Advisory Standard</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Readings strictly derived from National Environment Agency (data.gov.sg) certified continuous ambient monitoring stations across Singapore.
            </p>
          </div>
        </div>
      </section>

      {/* Advisory Rules Table: Mapping PSI bands to actions */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Singapore Ministry of Health (MOH) & NEA Advisory Rules
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Standard health advisory guidelines mapping 24-hr PSI air quality bands to recommended tourist activities
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-medium">
                <th className="pb-3 pr-4">PSI Band</th>
                <th className="pb-3 pr-4">Air Status</th>
                <th className="pb-3 pr-4">Health Implications</th>
                <th className="pb-3 pr-4">Healthy Tourists</th>
                <th className="pb-3">Vulnerable Groups (Kids/Seniors/Asthma)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PSI_ADVISORY_BANDS.map((band) => (
                <tr key={band.range} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 pr-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                    {band.range}
                  </td>
                  <td className="py-3.5 pr-4 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${band.badgeColor}`}>
                      {band.status}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 text-slate-600 max-w-xs">{band.summary}</td>
                  <td className="py-3.5 pr-4 text-slate-700 max-w-sm leading-relaxed">
                    {band.generalTourists}
                  </td>
                  <td className="py-3.5 text-slate-700 max-w-sm leading-relaxed">
                    {band.vulnerableTourists}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
