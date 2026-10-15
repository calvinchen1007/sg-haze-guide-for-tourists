import React from 'react';
import {
  Wind,
  CloudFog,
  ShieldCheck,
  ExternalLink,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

export const HazeEducationGuide: React.FC = () => {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Educational Header */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <span>Tourist Quick Guide</span>
            <span aria-hidden="true">·</span>
            <span>2-Minute Read</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
            Haze in Singapore: What Every Visitor Should Know
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            Visiting Southeast Asia and noticed a smoky horizon or campfire smell? Here is everything you need to know in plain English—no technical jargon.
          </p>
        </div>
      </section>

      {/* Origin & Science in Plain English */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Origin */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <CloudFog className="w-5 h-5 text-slate-700 shrink-0" />
            <span>Where does the smoke come from?</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            The haze is not caused by Singapore’s factories or cars. It originates from agricultural land-clearing fires across neighboring islands (Sumatra and Kalimantan) during the dry season.
          </p>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <span className="font-bold text-slate-900 block mb-1">
              Why does it smell like a campfire?
            </span>
            The soil in those regions consists of deep organic peat. When peat catches fire, it smolders slowly underground without open flames, producing rich aromatic woodsmoke that drifts hundreds of kilometers.
          </div>
        </div>

        {/* Monsoon Wind Cycles */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <Wind className="w-5 h-5 text-slate-700 shrink-0" />
            <span>When does it happen?</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Haze is seasonal and weather-dependent. It depends directly on wind direction and rainfall:
          </p>
          <div className="space-y-2 text-xs text-slate-600">
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
              <span className="font-bold text-slate-900 block">
                June to October (Dry Southwest Monsoon)
              </span>
              <p>
                The only months where haze can occasionally reach Singapore, when southwesterly winds blow smoke northeast across the sea.
              </p>
            </div>
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
              <span className="font-bold text-slate-900 block">
                November to May (Wet Northeast Monsoon)
              </span>
              <p>
                Frequent tropical showers and ocean breezes keep Singapore’s skies bright, clear, and blue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 24-hr PSI vs 1-hr PM2.5 in Plain English */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-2xl mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            PSI vs PM2.5: What's the Difference?
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Singapore app feeds show two numbers. Here is what each means for your day:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
            <span className="font-bold text-slate-900 text-sm block">
              1-Hour PM2.5 = What it feels like right now
            </span>
            <p className="text-slate-600 leading-relaxed">
              This measures the actual microscopic smoke particles in the air in the last 60 minutes. Use this number to decide if you want to walk outside right this moment.
            </p>
            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200">
              <span className="font-bold text-slate-700">Tourist tip: </span>
              Under 35 is great. 35 to 55 is slightly hazy. Over 55 means consider heading indoors.
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
            <span className="font-bold text-slate-900 text-sm block">
              24-Hour PSI = The full-day average
            </span>
            <p className="text-slate-600 leading-relaxed">
              This is the official 24-hour running average. Government health advisories (like school closures or mask advice) are based on this daily number.
            </p>
            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200">
              <span className="font-bold text-slate-700">Tourist tip: </span>
              Under 100 means normal holiday plans. Over 100 means pack an N95 mask.
            </div>
          </div>
        </div>
      </section>

      {/* Why Singapore is Built for Haze */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span>Singapore Travel Perks</span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          Why Singapore is the Easiest City to Visit During Haze
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          Singapore was architected with extensive covered connections. Even if outdoor air is hazy, you can explore the city in pure comfort:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">1. Underground MRT Links</span>
            <p className="text-slate-600">
              You can travel seamlessly between hotels, malls, and attractions through air-conditioned subterranean pedestrian tunnels.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">2. HEPA-Filtered Domes</span>
            <p className="text-slate-600">
              World-famous sites like Cloud Forest, Flower Dome, and Jewel Changi feature state-of-the-art continuous particulate air filtration.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">3. Price-Regulated Pharmacies</span>
            <p className="text-slate-600">
              Singapore enforces strict consumer laws. Masks, eye drops, and throat lozenges are sold at fair fixed retail prices everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Official Government Links */}
      <section className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="font-bold text-slate-900 block mb-0.5">
            Official Singapore Environment Links
          </span>
          <span>
            haze.gov.sg (National Environment Agency) · Ministry of Health (moh.gov.sg)
          </span>
        </div>
        <a
          href="https://www.haze.gov.sg"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 font-semibold hover:bg-slate-100 transition-colors shrink-0"
        >
          <span>Visit haze.gov.sg</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>
      </section>
    </div>
  );
};
