import React, { useState } from 'react';
import {
  ShieldAlert,
  ShoppingBag,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  MapPin,
  Phone,
  Search,
  ExternalLink,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Calculator,
} from 'lucide-react';
import { MEDICAL_SUPPLIES, PHARMACY_CHAINS, IMAGES } from '../data/hazeData';
import { MedicalSupplyItem } from '../types/haze';

export const WhatToBuyGuide: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSupply, setSelectedSupply] = useState<MedicalSupplyItem>(MEDICAL_SUPPLIES[0]);

  const categories = ['All', 'Respiratory Protection', 'Eye Care', 'Throat & Nasal', 'Medication & Devices'];

  const filteredSupplies = MEDICAL_SUPPLIES.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  return (
    <div className="space-y-8">
      {/* Header Banner with High-Fidelity Pharmacy Visual */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2">
              <span className="font-semibold text-slate-900">Official Pharmacy & Supplies Guide</span>
              <span aria-hidden="true">·</span>
              <span>Singapore Price Benchmark (SGD)</span>
              <span aria-hidden="true">·</span>
              <span>MOH Health Standards</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-3">
              What to Buy & Where to Buy It in Singapore
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Don’t get tricked into buying ineffective blue paper masks. Discover why certified N95 respirators are strictly required for fine microscopic PM2.5 smoke, explore essential soothing eye and throat remedies, and find trusted pharmacy chains across Singapore.
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span className="font-semibold text-slate-900">Official Retail Stockists:</span>
              <span>Guardian</span>
              <span aria-hidden="true">·</span>
              <span>Watsons</span>
              <span aria-hidden="true">·</span>
              <span>Unity</span>
              <span aria-hidden="true">·</span>
              <span>Mustafa Centre (Open 24/7)</span>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-sm aspect-[16/10]">
            <img
              src={IMAGES.pharmacy}
              alt="Singapore Guardian Pharmacy health supplies and N95 masks display"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Visual Infographic: N95 Respirator vs Surgical Mask */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
            Critical Tourist Advisory
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Why Surgical Masks Do NOT Protect Against Haze Smoke
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
            The #1 mistake tourists make is purchasing cheap surgical or paper masks. Singapore’s Ministry of Health (MOH) explicitly states that surgical masks do not filter fine haze particulates:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Certified N95 Card */}
          <div className="p-6 rounded-3xl border border-emerald-200 bg-emerald-50/50 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-900 font-bold text-base">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Certified N95 Respirator (Recommended)</span>
              </div>
              <p className="text-xs text-emerald-950/80 leading-relaxed">
                Tested and certified to seal completely against your facial contours and capture $\ge 95\%$ of airborne particulates down to 0.3 microns.
              </p>

              <div className="space-y-2 text-xs text-slate-700 pt-2">
                <div className="p-3 rounded-xl bg-white/80 border border-emerald-200/60">
                  <span className="font-bold text-slate-900 block mb-0.5">Air-Tight Facial Seal</span>
                  <span>Elastic dual head-straps ensure 100% of inhaled air passes through the electrostatic filter medium.</span>
                </div>
                <div className="p-3 rounded-xl bg-white/80 border border-emerald-200/60">
                  <span className="font-bold text-slate-900 block mb-0.5">Blocks PM2.5 Microparticles</span>
                  <span>Safeguards alveoli and bronchial airways from acidic transboundary smoke residue.</span>
                </div>
                <div className="p-3 rounded-xl bg-white/80 border border-emerald-200/60">
                  <span className="font-bold text-slate-900 block mb-0.5">Certified Standards</span>
                  <span>NIOSH N95, EN149 FFP2, or Singapore MOH approved models (3M 8210, 3M Aura, AIR+ Smart Mask).</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-emerald-200 flex items-center justify-between text-xs font-semibold text-emerald-900">
              <span>Protection Rating:</span>
              <span className="text-emerald-700">95%+ Effective (Gold Standard)</span>
            </div>
          </div>

          {/* Ordinary Surgical Mask Card */}
          <div className="p-6 rounded-3xl border border-rose-200 bg-rose-50/50 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-rose-900 font-bold text-base">
                <div className="w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center shrink-0">
                  <XCircle className="w-4 h-4" />
                </div>
                <span>Standard Surgical / Paper Mask (Ineffective)</span>
              </div>
              <p className="text-xs text-rose-950/80 leading-relaxed">
                Designed only for coarse spit and liquid splash protection; fine smoke particles effortlessly pass through gaping side leaks.
              </p>

              <div className="space-y-2 text-xs text-slate-700 pt-2">
                <div className="p-3 rounded-xl bg-white/80 border border-rose-200/60">
                  <span className="font-bold text-slate-900 block mb-0.5">Massive Perimeter Gaps</span>
                  <span>Loose ear loops create gaping voids at cheeks and nose bridge. Air follows the path of least resistance through leaks.</span>
                </div>
                <div className="p-3 rounded-xl bg-white/80 border border-rose-200/60">
                  <span className="font-bold text-slate-900 block mb-0.5">Coarse Mesh Pore Size</span>
                  <span>Pores in paper masks are up to 50 times larger than PM2.5 particulates, providing zero smoke filtration.</span>
                </div>
                <div className="p-3 rounded-xl bg-white/80 border border-rose-200/60">
                  <span className="font-bold text-slate-900 block mb-0.5">Dangerous False Security</span>
                  <span>Wearing one creates a false sense of security, encouraging tourists to remain outdoors in hazardous smoke.</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-rose-200 flex items-center justify-between text-xs font-semibold text-rose-900">
              <span>Protection Rating:</span>
              <span className="text-rose-700">&lt; 15% Protection (Not Recommended)</span>
            </div>
          </div>
        </div>

        {/* 4-Step Visual Seal Check */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="font-bold text-slate-900 text-xs block mb-3">
            The 4-Step N95 Seal Check (Test Before Leaving Your Hotel):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div className="space-y-1">
              <span className="font-mono text-xs font-bold text-slate-900">01. Position</span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Cup respirator in hand, placing over nose and chin comfortably.
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-xs font-bold text-slate-900">02. Straps</span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Pull upper strap to crown of head, lower strap below ears around neck.
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-xs font-bold text-slate-900">03. Nose Strip</span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Use fingers of both hands to mould metal bridge tightly to your nose.
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-xs font-bold text-slate-900">04. Inhale Test</span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Inhale sharply. The mask should collapse slightly without edge air leakage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog Grid */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Recommended Singapore Tourist Haze Kit
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Standard prices in Singapore Dollars (SGD) across verified retail chains
            </p>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSupplies.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedSupply(item)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                selectedSupply.id === item.id
                  ? 'border-slate-900 bg-white shadow-md ring-1 ring-slate-900'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                  <span className="font-medium text-slate-700">{item.category}</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {item.singaporePriceSgd}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm mb-2 leading-snug">
                  {item.name}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {item.whyNeeded}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2 text-[11px]">
                <div className="flex items-center justify-between text-slate-500">
                  <span>Top Recommendation:</span>
                  <span className="font-semibold text-slate-900 text-right">
                    {item.recommendedBrands[0]}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>Stock Availability:</span>
                  <span className="text-emerald-700 font-bold">{item.stockAvailability}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Major Singapore Pharmacy Chains & 24-Hour Stockists */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900">
            Where to Buy: Major Pharmacy Chains & 24/7 Outlets
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Price regulation strictly enforced by Singapore Consumer Protection. No scalping allowed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PHARMACY_CHAINS.map((chain) => (
            <div
              key={chain.name}
              className="p-5 sm:p-6 rounded-3xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-slate-900 text-base">{chain.name}</h3>
                  <span className="text-xs font-mono font-medium text-slate-500">{chain.outletCount}</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{chain.operatingHours}</span>
                </div>

                <div className="space-y-1.5 mb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                    Key Tourist Hub Outlets:
                  </span>
                  <ul className="text-xs text-slate-700 space-y-1">
                    {chain.popularTouristOutlets.map((loc, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>{loc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed bg-white p-3 rounded-2xl border border-slate-200/70">
                  {chain.notes}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <a
                  href={`tel:${chain.hotline.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1 font-semibold text-slate-900 hover:underline"
                >
                  <Phone className="w-3 h-3 text-slate-500" />
                  <span>{chain.hotline}</span>
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    chain.name + ' Singapore'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium"
                >
                  <span>Locate Outlets</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
