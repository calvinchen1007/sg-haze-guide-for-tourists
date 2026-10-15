import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  Train,
  Bookmark,
  MapPin,
  Clock,
  Search,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Check,
  Sparkles,
} from 'lucide-react';
import { ITINERARY_SUBSTITUTIONS } from '../data/hazeData';
import { ItinerarySubstitution } from '../types/haze';

export const ItinerarySubstitutionEngine: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<ItinerarySubstitution>(ITINERARY_SUBSTITUTIONS[0]);
  const [savedPlanIds, setSavedPlanIds] = useState<string[]>(['gardens-outdoors-to-domes', 'marina-barrage-to-jewel']);

  const categories = [
    'All',
    'Botanical Dome',
    'Museum & Culture',
    'Mega Entertainment',
    'Shopping & Dining',
    'Family & Kids',
  ];

  const filteredItems = ITINERARY_SUBSTITUTIONS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.alternativeCategory === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.outdoorAttraction.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.indoorAlternative.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nearestMrt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const toggleSavePlan = (id: string) => {
    setSavedPlanIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-8">
      {/* Visual Header */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2">
            <span className="font-semibold text-slate-900">Indoor Sanctuary Navigator</span>
            <span aria-hidden="true">·</span>
            <span>HEPA Filtered & 100% Air-Conditioned</span>
            <span aria-hidden="true">·</span>
            <span>Zero Outdoor Exposure</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
            Outdoor Itinerary Substitution Engine
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            Don’t let smoke haze cancel your holiday. Singapore features some of the world’s most advanced climate-controlled bio-domes, neoclassical galleries, and subterranean entertainment centers. Pick what you planned outdoors to discover its direct indoor match.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by outdoor attraction, indoor place, or MRT station..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-900 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Workbench Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visual List of Swap Cards */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1 mb-1">
            <span>Showing {filteredItems.length} curated substitutions</span>
            <span className="font-medium text-slate-700">Select to inspect route</span>
          </div>

          <div className="space-y-3">
            {filteredItems.map((item) => {
              const isSelected = selectedItem.id === item.id;
              const isSaved = savedPlanIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-4 rounded-3xl border text-left cursor-pointer transition-all relative overflow-hidden group ${
                    isSelected
                      ? 'border-slate-900 bg-white shadow-md ring-1 ring-slate-900'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="space-y-0.5">
                      <span className="text-[11px] text-rose-600 font-semibold uppercase tracking-wider block line-through">
                        {item.outdoorAttraction}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-sky-700 transition-colors">
                        {item.indoorAlternative}
                      </h3>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSavePlan(item.id);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
                      title={isSaved ? 'Remove from my day pass' : 'Save to my day pass'}
                    >
                      <Bookmark
                        className={`w-4 h-4 ${isSaved ? 'fill-slate-900 text-slate-900' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Visual Metadata Row */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    <span className="font-medium text-slate-800">{item.alternativeCategory}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-700 font-semibold">{item.indoorAirQuality}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.admission}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-400">{item.suggestedDuration}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Featured Interactive Deep Dive Showcase */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col sticky top-20">
          {/* Hero Visual Asset */}
          <div className="relative h-72 sm:h-80 w-full bg-slate-900 overflow-hidden">
            <img
              src={selectedItem.imageUrl}
              alt={selectedItem.indoorAlternative}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 mb-1.5">
                <span className="font-bold text-white">{selectedItem.alternativeCategory}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-300 font-semibold">{selectedItem.indoorAirQuality}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedItem.admission} Admission</span>
                <span aria-hidden="true">·</span>
                <span>{selectedItem.suggestedDuration}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">
                {selectedItem.indoorAlternative}
              </h2>
            </div>
          </div>

          {/* Deep Details Body */}
          <div className="p-6 sm:p-7 space-y-6">
            {/* The Direct Swap Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-rose-600 font-bold block">
                  Replaces Outdoor Plan
                </span>
                <span className="font-semibold text-slate-900 block">
                  {selectedItem.outdoorAttraction}
                </span>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  {selectedItem.outdoorDescription}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-emerald-700 font-bold block">
                  Indoor Sanctuary Advantage
                </span>
                <span className="font-semibold text-slate-900 block">
                  Filtered Air: {selectedItem.indoorAirQuality}
                </span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {selectedItem.highlight}
                </p>
              </div>
            </div>

            {/* MRT Subway & Sheltered Subterranean Route */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                Sheltered Subway & Walkway Route
              </span>
              <div className="p-4 rounded-2xl border border-slate-200 bg-white flex items-start gap-3.5 text-xs">
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                  <Train className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-sm block">
                    {selectedItem.nearestMrt}
                  </span>
                  <span className="text-slate-500 block text-xs mt-0.5">
                    {selectedItem.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Step-by-Step Haze Comfort Tips */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                Tourist Navigation & Comfort Tips
              </span>
              <div className="space-y-2 text-xs">
                {selectedItem.practicalTips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5 text-slate-700"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => toggleSavePlan(selectedItem.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all border ${
                  savedPlanIds.includes(selectedItem.id)
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>
                  {savedPlanIds.includes(selectedItem.id)
                    ? 'Saved in My Sheltered Plan'
                    : 'Add to My Day Pass'}
                </span>
              </button>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  selectedItem.indoorAlternative + ' Singapore'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-900 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-slate-700" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Persistent Day Pass Strip */}
      {savedPlanIds.length > 0 && (
        <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <span>Personalized Contingency Day Pass</span>
                <span aria-hidden="true">·</span>
                <span className="text-sky-300 font-semibold">{savedPlanIds.length} Saved Indoor Sanctuaries</span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Your 100% Air-Conditioned Singapore Itinerary
              </h3>
            </div>
            <span className="text-xs text-emerald-400 font-medium bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/80 self-start sm:self-auto">
              Guaranteed Sheltered Transit
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {savedPlanIds.map((id) => {
              const item = ITINERARY_SUBSTITUTIONS.find((i) => i.id === id);
              if (!item) return null;
              return (
                <div
                  key={id}
                  className="p-3.5 rounded-2xl bg-slate-800/90 border border-slate-700 text-xs flex items-center justify-between gap-2"
                >
                  <div className="truncate">
                    <span className="font-bold text-white block truncate">
                      {item.indoorAlternative}
                    </span>
                    <span className="text-slate-400 text-[11px] block truncate mt-0.5">
                      {item.nearestMrt}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleSavePlan(id)}
                    className="text-slate-400 hover:text-rose-400 text-xs shrink-0 px-2 py-1"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
