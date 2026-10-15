import React, { useState } from 'react';
import {
  Wind,
  AlertCircle,
  RefreshCw,
  Compass,
  ShoppingBag,
  Bell,
  MapPin,
  Info,
  Shield,
  Layers,
  Map as MapIcon,
} from 'lucide-react';
import { RegionalPsiData, SingaporeRegion } from '../types/haze';
import { PSI_ADVISORY_BANDS, IMAGES } from '../data/hazeData';
import { SingaporeInteractiveMap } from './SingaporeInteractiveMap';
import { PsiRadialGauge } from './PsiRadialGauge';
import { SkylineVisibilityCam } from './SkylineVisibilityCam';

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
  const [viewMode, setViewMode] = useState<'map' | 'cards'>('map');

  const regionTabs: Array<{ id: SingaporeRegion; label: string; sub: string }> = [
    { id: 'central', label: 'Central', sub: 'Marina Bay / Orchard' },
    { id: 'south', label: 'South', sub: 'Sentosa / HabourFront' },
    { id: 'east', label: 'East', sub: 'Changi Airport / Expo' },
    { id: 'west', label: 'West', sub: 'Jurong / Clementi' },
    { id: 'north', label: 'North', sub: 'Mandai Zoo / Woodlands' },
    { id: 'national', label: 'National', sub: 'Islandwide Average' },
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
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 mb-3">
            <span className="font-semibold text-white">Singapore Tourist Companion</span>
            <span aria-hidden="true">·</span>
            <span>National Environment Agency (NEA) Data</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-slate-400">data.gov.sg live feed</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3 text-balance">
            Real-Time Air Quality & Tourist Advisory
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mb-6">
            Make the most of your holiday regardless of air conditions. Track live regional PSI across Singapore, simulate horizon visibility, and swap outdoor excursions for world-class climate-controlled sanctuaries.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateToItinerary}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-900 font-semibold text-xs sm:text-sm hover:bg-slate-100 transition-colors shadow-sm"
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

      {/* Interactive Island Map & Region Selector */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Singapore Regional Air Quality Breakdown
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select your current location on the island or tap a regional zone below
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors shadow-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Updating...' : 'Sync NEA Feed'}</span>
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
              <span>{alertThresholdEnabled ? 'Haze Alerts ON' : 'Enable Alerts'}</span>
            </button>
          </div>
        </div>

        {/* The Interactive Map */}
        <SingaporeInteractiveMap
          selectedRegion={selectedRegion}
          allRegionsData={allRegionsData}
          onSelectRegion={onSelectRegion}
        />

        {/* Quick Region Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {regionTabs.map((r) => {
            const regionData = allRegionsData[r.id];
            const isSelected = selectedRegion === r.id;
            return (
              <button
                key={r.id}
                onClick={() => onSelectRegion(r.id)}
                className={`text-left p-3 rounded-2xl border transition-all ${
                  isSelected
                    ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {r.label}
                  </span>
                  <span
                    className={`text-[11px] font-mono font-bold tabular-nums px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-800'
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

      {/* Main Focus Reading: Radial Gauge + Skyline Visibility Cam */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Interactive Radial Gauge & Action Directives */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <PsiRadialGauge
            psi={currentRegionData.psi24Hourly}
            pm25={currentRegionData.pm25OneHourly}
            status={currentRegionData.status}
            displayName={currentRegionData.displayName}
            updateTime={currentRegionData.updateTime}
          />

          {/* Action Directive Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Official Tourist Action Matrix
              </span>
              <span className="text-xs font-medium text-slate-500">MOH Guidelines</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-bold text-slate-900 block">General Sightseers</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {currentRegionData.psi24Hourly <= 100
                    ? 'Safe for normal outdoor walks, Marina Bay, and rooftop terraces.'
                    : 'Reduce strenuous outdoor cardio. Switch to indoor gallerias.'}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-bold text-slate-900 block">Kids & Seniors</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {currentRegionData.psi24Hourly <= 100
                    ? 'Normal sightseeing with regular air-conditioned hydration stops.'
                    : 'Minimise outdoor exposure. Choose enclosed spots like Jewel Changi.'}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-bold text-slate-900 block">N95 Mask Advice</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {currentRegionData.psi24Hourly <= 100
                    ? 'No mask required for general outdoor sightseeing.'
                    : 'Wear certified N95 respirator if walking outdoors for >1 hour.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Skyline Visibility Camera Simulation */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <SkylineVisibilityCam psi={currentRegionData.psi24Hourly} />
        </div>
      </section>

      {/* Official NEA & MOH Advisory Rules Table */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900">
            Singapore Health Advisory Standards
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Official benchmark mapping 24-hr PSI air quality bands to recommended tourist activities
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-medium">
                <th className="pb-3 pr-4">PSI Band</th>
                <th className="pb-3 pr-4">Air Status</th>
                <th className="pb-3 pr-4">Health Implications</th>
                <th className="pb-3 pr-4">General Tourists</th>
                <th className="pb-3">Vulnerable Groups (Kids/Asthma)</th>
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
