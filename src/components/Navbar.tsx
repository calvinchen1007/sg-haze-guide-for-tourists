import React from 'react';
import { ShieldAlert, Compass, ShoppingBag, Stethoscope, BookOpen, Bell } from 'lucide-react';

interface NavbarProps {
  activeTab: 'live' | 'itinerary' | 'supplies' | 'health' | 'education';
  onSelectTab: (tab: 'live' | 'itinerary' | 'supplies' | 'health' | 'education') => void;
  onOpenSimulator: () => void;
  isSimulating: boolean;
  simulatedPsi: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenSimulator,
  isSimulating,
  simulatedPsi,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Brand wordmark (single text element wordmark, display face, whitespace-nowrap) */}
        <button
          onClick={() => onSelectTab('live')}
          className="flex items-center gap-2.5 text-left text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            CH
          </div>
          <span>Captain Haze</span>
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onSelectTab('live')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'live' ? 'text-slate-950 font-semibold underline underline-offset-8 decoration-2 decoration-slate-900' : 'hover:text-slate-900'
            }`}
          >
            Air Quality
          </button>
          <button
            onClick={() => onSelectTab('itinerary')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'itinerary' ? 'text-slate-950 font-semibold underline underline-offset-8 decoration-2 decoration-slate-900' : 'hover:text-slate-900'
            }`}
          >
            Indoor Swaps
          </button>
          <button
            onClick={() => onSelectTab('supplies')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'supplies' ? 'text-slate-950 font-semibold underline underline-offset-8 decoration-2 decoration-slate-900' : 'hover:text-slate-900'
            }`}
          >
            Masks & Shops
          </button>
          <button
            onClick={() => onSelectTab('health')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'health' ? 'text-slate-950 font-semibold underline underline-offset-8 decoration-2 decoration-slate-900' : 'hover:text-slate-900'
            }`}
          >
            Clinics & Help
          </button>
          <button
            onClick={() => onSelectTab('education')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'education' ? 'text-slate-950 font-semibold underline underline-offset-8 decoration-2 decoration-slate-900' : 'hover:text-slate-900'
            }`}
          >
            Haze 101
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSimulator}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 border ${
              isSimulating
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
            }`}
          >
            {isSimulating ? `Simulator Active (PSI ${simulatedPsi})` : 'Test Scenario'}
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Navigation Tabs */}
      <div className="md:hidden flex items-center justify-between overflow-x-auto px-4 py-2 border-t border-slate-100 bg-slate-50 gap-2 text-xs font-medium">
        <button
          onClick={() => onSelectTab('live')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'live' ? 'bg-slate-900 text-white' : 'text-slate-600 bg-white border border-slate-200'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Air Quality</span>
        </button>
        <button
          onClick={() => onSelectTab('itinerary')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'itinerary' ? 'bg-slate-900 text-white' : 'text-slate-600 bg-white border border-slate-200'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Indoor Swaps</span>
        </button>
        <button
          onClick={() => onSelectTab('supplies')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'supplies' ? 'bg-slate-900 text-white' : 'text-slate-600 bg-white border border-slate-200'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Masks</span>
        </button>
        <button
          onClick={() => onSelectTab('health')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'health' ? 'bg-slate-900 text-white' : 'text-slate-600 bg-white border border-slate-200'
          }`}
        >
          <Stethoscope className="w-3.5 h-3.5" />
          <span>Clinics</span>
        </button>
        <button
          onClick={() => onSelectTab('education')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'education' ? 'bg-slate-900 text-white' : 'text-slate-600 bg-white border border-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Haze 101</span>
        </button>
      </div>
    </header>
  );
};
