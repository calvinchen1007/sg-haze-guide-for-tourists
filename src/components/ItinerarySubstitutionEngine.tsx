import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  Sparkles,
  Train,
  Check,
  Bookmark,
  MapPin,
  Clock,
  Filter,
  Search,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { ITINERARY_SUBSTITUTIONS } from '../data/hazeData';
import { ItinerarySubstitution } from '../types/haze';

export const ItinerarySubstitutionEngine: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<ItinerarySubstitution>(ITINERARY_SUBSTITUTIONS[0]);
  const [savedPlanIds, setSavedPlanIds] = useState<string[]>(['gardens-outdoors-to-domes']);
  const [selectedAreaFilter, setSelectedAreaFilter] = useState<string>('All');

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
    const matchesArea =
      selectedAreaFilter === 'All' || item.outdoorZone.toLowerCase().includes(selectedAreaFilter.toLowerCase());

    return matchesCategory && matchesSearch && matchesArea;
  });

  const toggleSavePlan = (id: string) => {
    setSavedPlanIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-8">
      {/* Header Introduction */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <span>Value Proposition 3</span>
            <span aria-hidden="true">·</span>
            <span>Intelligent Itinerary Substitution Engine</span>
            <span aria-hidden="true">·</span>
            <span>Zero Day Ruined</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
            Swap Outdoor Plans for World-Class Indoor Sanctuaries
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            Singapore boasts some of the world’s most advanced climate-controlled, HEPA-filtered indoor attractions. Select what you originally planned outdoors, and Captain Haze will immediately substitute it with a safer, air-conditioned indoor experience with MRT underground routes.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search outdoor attraction, indoor place, or MRT station..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-900"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
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

      {/* Main Dual-Column Substitution Workbench */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: List of Outdoor -> Indoor Substitution Cards */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1 mb-1">
            <span>Showing {filteredItems.length} curated substitutions</span>
            <span>Click to inspect indoor route</span>
          </div>

          <div className="space-y-3">
            {filteredItems.map((item) => {
              const isSelected = selectedItem.id === item.id;
              const isSaved = savedPlanIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-slate-900 bg-white shadow-md ring-1 ring-slate-900'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  {/* Outdoor -> Indoor Indicator Header */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                    <span className="text-rose-600 font-semibold flex items-center gap-1">
                      Outdoor: High Exposure
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSavePlan(item.id);
                      }}
                      className="text-slate-400 hover:text-slate-800 p-1"
                      title={isSaved ? 'Saved in my plan' : 'Save to my plan'}
                    >
                      <Bookmark
                        className={`w-4 h-4 ${isSaved ? 'fill-slate-900 text-slate-900' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Outdoor Name */}
                  <div className="line-through text-slate-400 text-xs mb-1">
                    {item.outdoorAttraction}
                  </div>

                  {/* Indoor Swap Name */}
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0" />
                    <h3 className="font-semibold text-slate-900 text-sm leading-snug">
                      {item.indoorAlternative}
                    </h3>
                  </div>

                  {/* Unboxed Metadata (Zero-pill discipline) */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    <span>{item.alternativeCategory}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-700 font-medium">{item.indoorAirQuality}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.admission}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Dive Featured Alternative Showcase */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
          {/* Hero Visual Asset */}
          <div className="relative h-64 sm:h-72 w-full bg-slate-100 overflow-hidden">
            <img
              src={selectedItem.imageUrl}
              alt={selectedItem.indoorAlternative}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-2 text-xs text-slate-300 mb-1">
                <span className="font-semibold text-white">{selectedItem.alternativeCategory}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedItem.admission} Admission</span>
                <span aria-hidden="true">·</span>
                <span>{selectedItem.suggestedDuration}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {selectedItem.indoorAlternative}
              </h2>
            </div>
          </div>

          {/* Deep Details Body */}
          <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
            <div className="space-y-5">
              {/* Comparison Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-rose-600 font-bold block mb-1">
                    Replaces Outdoor Plan
                  </span>
                  <span className="font-medium text-slate-900 block mb-0.5">
                    {selectedItem.outdoorAttraction}
                  </span>
                  <p className="text-slate-500 text-[11px]">{selectedItem.outdoorDescription}</p>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-emerald-700 font-bold block mb-1">
                    Indoor Advantage
                  </span>
                  <span className="font-medium text-slate-900 block mb-0.5">
                    Air Quality: {selectedItem.indoorAirQuality}
                  </span>
                  <p className="text-slate-600 text-[11px]">{selectedItem.highlight}</p>
                </div>
              </div>

              {/* Transit & Shelter Directions */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  MRT Subway & Sheltered Transit Route
                </h3>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start gap-3 text-xs">
                  <Train className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">
                      {selectedItem.nearestMrt}
                    </span>
                    <span className="text-slate-500 block text-[11px] mt-0.5">
                      {selectedItem.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Practical Tips */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Tourist Haze Survival & Comfort Tips
                </h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  {selectedItem.practicalTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => toggleSavePlan(selectedItem.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg transition-colors border ${
                  savedPlanIds.includes(selectedItem.id)
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>
                  {savedPlanIds.includes(selectedItem.id) ? 'Saved in Today\'s Plan' : 'Save to Today\'s Plan'}
                </span>
              </button>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  selectedItem.indoorAlternative + ' Singapore'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-900 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-slate-600" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3 text-slate-400 ml-0.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Saved Itinerary Strip if user has saved items */}
      {savedPlanIds.length > 0 && (
        <section className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <span>Personalized Haze Contingency Itinerary</span>
                <span aria-hidden="true">·</span>
                <span>{savedPlanIds.length} Saved Indoor Stops</span>
              </div>
              <h3 className="text-base font-bold text-white">
                Your Sheltered Singapore Day Pass
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-300">
                100% sheltered & air-conditioned
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
            {savedPlanIds.map((id) => {
              const item = ITINERARY_SUBSTITUTIONS.find((i) => i.id === id);
              if (!item) return null;
              return (
                <div
                  key={id}
                  className="p-3 rounded-xl bg-slate-800/90 border border-slate-700 text-xs flex items-center justify-between"
                >
                  <div className="truncate mr-2">
                    <span className="font-semibold text-white block truncate">
                      {item.indoorAlternative}
                    </span>
                    <span className="text-slate-400 text-[11px] block truncate">
                      {item.nearestMrt}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleSavePlan(id)}
                    className="text-slate-400 hover:text-rose-400 text-xs shrink-0"
                    title="Remove stop"
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
