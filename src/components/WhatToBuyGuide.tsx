import React, { useState } from 'react';
import {
  ShoppingBag,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Phone,
  ExternalLink,
  ShieldCheck,
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
    <div className="space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
              <span>Tourist Pharmacy Guide</span>
              <span aria-hidden="true">·</span>
              <span>Fair Singapore Retail Prices</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-3">
              Masks & Health Supplies in Singapore
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Here is what to look for at any local pharmacy. Learn why certified N95 masks work against fine smoke (while regular surgical masks do not), and find trusted stores located right inside MRT stations and malls.
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-900">Found everywhere at:</span>
              <span>Guardian</span>
              <span aria-hidden="true">·</span>
              <span>Watsons</span>
              <span aria-hidden="true">·</span>
              <span>Unity</span>
              <span aria-hidden="true">·</span>
              <span>7-Eleven & Mustafa Centre (24h)</span>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xs max-h-56">
            <img
              src={IMAGES.pharmacy}
              alt="Singapore Pharmacy health supplies and masks"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* N95 vs Surgical Mask Comparison */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-2xl mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            N95 vs Regular Surgical Mask: The 30-Second Rule
          </h2>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Many visitors buy standard blue medical masks, but they leave open gaps where smoke leaks in. Here is the difference:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Certified N95 Card */}
          <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/50 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Certified N95 Mask (Works for Haze)</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <span className="font-semibold text-slate-900 shrink-0">Tight Seal:</span>
                <span>Seals firmly against your cheeks and nose bridge so smoke cannot bypass the filter.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-slate-900 shrink-0">Filters Smoke:</span>
                <span>Blocks at least 95% of fine PM2.5 smoke particles.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-slate-900 shrink-0">Price in SG:</span>
                <span>~S$2.50 each (e.g. 3M 8210, 3M Aura, or AIR+).</span>
              </li>
            </ul>
          </div>

          {/* Regular Surgical Mask Card */}
          <div className="p-5 rounded-2xl border border-rose-200 bg-rose-50/50 space-y-3">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
              <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>Blue Surgical Mask (Does NOT Filter Smoke)</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <span className="font-semibold text-slate-900 shrink-0">Loose Fit:</span>
                <span>Gaps at your cheeks and chin let outdoor smoke flow right in with every breath.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-slate-900 shrink-0">Large Pores:</span>
                <span>Designed only for cough droplets, not microscopic combustion smoke.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-slate-900 shrink-0">Verdict:</span>
                <span>Don't rely on these for haze protection.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 4-Step Quick Fit Check */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
          <span className="font-bold text-slate-900 block mb-2">
            How to put on an N95 in 15 seconds:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-slate-600">
            <div>
              <span className="font-semibold text-slate-800 block">1. Position</span>
              <span>Hold mask over nose and mouth with chin securely in cup.</span>
            </div>
            <div>
              <span className="font-semibold text-slate-800 block">2. Straps</span>
              <span>Pull top strap over head, lower strap behind your neck.</span>
            </div>
            <div>
              <span className="font-semibold text-slate-800 block">3. Nose Clip</span>
              <span>Pinch the metal strip with two hands to mold to your nose bridge.</span>
            </div>
            <div>
              <span className="font-semibold text-slate-800 block">4. Seal Check</span>
              <span>Breathe in quickly. The mask should collapse slightly toward your face.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog Grid */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Tourist Haze Essentials & Prices
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Available over the counter at any Guardian, Watsons, or Unity pharmacy
            </p>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white'
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
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                selectedSupply.id === item.id
                  ? 'border-slate-900 bg-white shadow-md ring-1 ring-slate-900'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                  <span>{item.category}</span>
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

              <div className="pt-3 border-t border-slate-100 space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between text-slate-500">
                  <span>Brands:</span>
                  <span className="font-medium text-slate-800 text-right">
                    {item.recommendedBrands[0]}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>Stock:</span>
                  <span className="text-emerald-700 font-medium">Readily Available</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Where to Buy */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900">
            Where to Buy: Major Pharmacy Chains & 24/7 Outlets
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Prices are government-regulated in Singapore; no tourist gouging permitted.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PHARMACY_CHAINS.map((chain) => (
            <div
              key={chain.name}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white transition-colors flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-slate-900 text-base">{chain.name}</h3>
                  <span className="text-xs text-slate-500">{chain.outletCount}</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{chain.operatingHours}</span>
                </div>

                <div className="space-y-1.5 mb-3">
                  <span className="text-[11px] font-bold text-slate-700 block">
                    Key Tourist Branches:
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

                <p className="text-xs text-slate-500 leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200/60">
                  {chain.notes}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-600">
                <a
                  href={`tel:${chain.hotline.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1 font-medium text-slate-900 hover:underline"
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
                  className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900"
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
