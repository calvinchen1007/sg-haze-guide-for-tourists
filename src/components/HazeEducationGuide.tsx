import React from 'react';
import {
  Wind,
  CloudFog,
  ShieldCheck,
  Compass,
  Info,
  Calendar,
  Layers,
  HelpCircle,
  ExternalLink,
  Flame,
  ArrowRight,
  Droplets,
} from 'lucide-react';
import { HAZE_EDUCATIONAL_GUIDE, IMAGES } from '../data/hazeData';

export const HazeEducationGuide: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Educational Header */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2">
            <span className="font-semibold text-slate-900">Environmental Science & Tourist Guide</span>
            <span aria-hidden="true">·</span>
            <span>National Environment Agency (NEA) Standards</span>
            <span aria-hidden="true">·</span>
            <span>haze.gov.sg Partner Feed</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
            What is the Haze? Understanding the Singapore Phenomenon
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            For international travelers visiting Southeast Asia, encountering sudden smoke haze can be confusing. Here is the clear environmental science behind where the smoke originates, why it smells like burnt wood, and why Singapore’s modern infrastructure keeps your trip enjoyable.
          </p>
        </div>
      </section>

      {/* Visual Scientific Mechanism: How Haze Forms & Travels */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Transboundary Environmental Science
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            How Regional Peatland Fires Reach Singapore
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Step 1: Peatland Smoldering */}
          <div className="p-5 rounded-3xl border border-slate-200 bg-slate-50/50 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-base">
              <Flame className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <span className="font-mono text-xs font-bold text-slate-400">PHASE 01</span>
              <h3 className="font-bold text-slate-900 text-sm mt-0.5">Smoldering Peatland Soil</h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              During regional dry seasons, agricultural slash-and-burn clearing ignites underground carbon-rich peat soils. Peat can smolder several meters beneath the surface without visible flames, generating immense volumes of fine smoke rich in carbon monoxide, organic compounds, and PM2.5.
            </p>
          </div>

          {/* Step 2: Monsoon Wind Corridor */}
          <div className="p-5 rounded-3xl border border-slate-200 bg-slate-50/50 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-base">
              <Wind className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <span className="font-mono text-xs font-bold text-slate-400">PHASE 02</span>
              <h3 className="font-bold text-slate-900 text-sm mt-0.5">Southwest Monsoon Corridor</h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Between June and October, prevailing southwest monsoon winds blow across the Strait of Malacca and the South China Sea, transporting concentrated plumes of airborne particulate matter across Singapore and Peninsular Malaysia.
            </p>
          </div>

          {/* Step 3: Dissipation by Tropical Rain */}
          <div className="p-5 rounded-3xl border border-slate-200 bg-slate-50/50 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base">
              <Droplets className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <span className="font-mono text-xs font-bold text-slate-400">PHASE 03</span>
              <h3 className="font-bold text-slate-900 text-sm mt-0.5">Tropical Rainstorm Washout</h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              When wind directions shift or heavy tropical equatorial monsoon showers arrive, rain droplets bind with airborne smoke particulates, washing them out of the atmosphere within hours and rapidly returning the air to Good or Moderate bands.
            </p>
          </div>
        </div>

        {/* Why does it smell like a campfire? */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-0.5">Why does the haze smell distinctively like campfire or burning wood?</span>
            <p className="text-amber-900/90 leading-relaxed">
              Peat is composed of partially decomposed ancient vegetation preserved in waterlogged bogs. When burned, it releases lignins and natural wood resins, creating a distinctive smoky, barbecue-like aroma even miles away in downtown Singapore.
            </p>
          </div>
        </div>
      </section>

      {/* Decoding the Metrics: 24-hr PSI vs 1-hr PM2.5 */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="max-w-2xl">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Decoding Singapore Air Metrics: 24-Hour PSI vs 1-Hour PM2.5
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Singapore publishes two distinct numbers on official government channels. Knowing how to read them helps you make instant decisions:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl border border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Daily Policy Benchmark
              </span>
              <span className="font-mono text-xs font-bold text-slate-900">0 – 500+ scale</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">24-Hour PSI (Pollutant Standards Index)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {HAZE_EDUCATIONAL_GUIDE.psiVsPm25.psi}
            </p>
            <div className="text-[11px] text-slate-500 pt-3 border-t border-slate-200">
              <span className="font-bold text-slate-700">Best used for: </span>
              Understanding overall cumulative daily exposure and determining whether outdoor events require adjustment.
            </div>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Instant Tourist Compass
              </span>
              <span className="font-mono text-xs font-bold text-slate-900">µg/m³ concentration</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">1-Hour PM2.5 (Immediate Particles)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {HAZE_EDUCATIONAL_GUIDE.psiVsPm25.pm25}
            </p>
            <div className="text-[11px] text-slate-500 pt-3 border-t border-slate-200">
              <span className="font-bold text-slate-700">Best used for: </span>
              Deciding whether to take a walk around Marina Bay right this hour, or immediately head inside Jewel Changi or the National Gallery.
            </div>
          </div>
        </div>
      </section>

      {/* Why Singapore is Still a Fantastic Holiday Destination During Haze */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Singapore Infrastructure Advantage</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Why Singapore is the World’s Best City to Experience Haze
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
            Singapore’s urban design was intentionally planned with climate shelter. Even during peak haze episodes, travelers can move seamlessly and experience world-class attractions without ever breathing smoke:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 text-sm block">1. 100% Cooled MRT Network</span>
            <p className="text-slate-600 leading-relaxed">
              Singapore’s Mass Rapid Transit (MRT) subway connects hotels, shopping paradises, and tourist hubs through sealed, cooled subterranean tunnels. You can travel from Orchard to Marina Bay without touching the outdoors.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 text-sm block">2. HEPA-Filtered Megadomes</span>
            <p className="text-slate-600 leading-relaxed">
              Attractions like Jewel Changi and the Gardens by the Bay Cloud Forest are enclosed bio-domes with continuous particulate air filtration systems, offering pristine air quality superior even to many home environments.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 text-sm block">3. Strict Price Regulation</span>
            <p className="text-slate-600 leading-relaxed">
              Singapore authorities actively monitor pharmacy inventory and pricing. N95 respirators, saline nasal sprays, and eye drops maintain fair, stable regulated retail pricing with zero black-market price gouging.
            </p>
          </div>
        </div>
      </section>

      {/* Official Government Links & Credits */}
      <section className="bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="font-bold text-slate-900 block mb-0.5">
            Official Singapore Government Air Quality Resources
          </span>
          <span>
            haze.gov.sg (National Environment Agency) · Ministry of Health (moh.gov.sg) · VisitSingapore.com (STB)
          </span>
        </div>
        <a
          href="https://www.haze.gov.sg"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 font-bold hover:bg-slate-100 transition-colors shrink-0 shadow-xs"
        >
          <span>Visit haze.gov.sg</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>
      </section>
    </div>
  );
};
