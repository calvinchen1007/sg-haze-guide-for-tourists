import React, { useState } from 'react';
import {
  AlertTriangle,
  PhoneCall,
  Phone,
  CheckCircle2,
  MapPin,
  ExternalLink,
  Clock,
  FileText,
} from 'lucide-react';
import {
  SYMPTOM_TRIAGE_DATA,
  AGE_GROUP_GUIDELINES,
  HEALTHCARE_FACILITIES,
} from '../data/hazeData';

export const SymptomAndHelpCenter: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedCohortIndex, setSelectedCohortIndex] = useState<number>(0);
  const [facilityFilter, setFacilityFilter] = useState<string>('All');
  const [facilitySearch, setFacilitySearch] = useState<string>('');

  const symptomChecklist = [
    { id: 'itchy-eyes', label: 'Itchy, stinging, or watery eyes', severity: 'mild' },
    { id: 'throat-tickle', label: 'Dry or scratchy throat', severity: 'mild' },
    { id: 'runny-nose', label: 'Sneezing or runny nose', severity: 'mild' },
    { id: 'mild-headache', label: 'Mild headache after walking outside', severity: 'mild' },
    { id: 'persistent-cough', label: 'Repeated coughing fits', severity: 'moderate' },
    { id: 'wheezing', label: 'Wheezing or whistling breath', severity: 'moderate' },
    { id: 'chest-tightness', label: 'Chest tightness when walking', severity: 'moderate' },
    { id: 'skin-rash', label: 'Skin irritation or eczema flare-up', severity: 'moderate' },
    { id: 'acute-breathlessness', label: 'Shortness of breath while resting', severity: 'severe' },
    { id: 'cannot-speak', label: 'Hard to speak full sentences without gasping', severity: 'severe' },
    { id: 'chest-pain', label: 'Sharp or crushing chest pain', severity: 'severe' },
    { id: 'blue-lips', label: 'Bluish or pale lips / fingernails', severity: 'severe' },
  ];

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const getTriageLevel = () => {
    if (selectedSymptoms.some((s) => ['acute-breathlessness', 'cannot-speak', 'chest-pain', 'blue-lips'].includes(s))) {
      return SYMPTOM_TRIAGE_DATA[2]; // Severe
    }
    if (selectedSymptoms.some((s) => ['persistent-cough', 'wheezing', 'chest-tightness', 'skin-rash'].includes(s))) {
      return SYMPTOM_TRIAGE_DATA[1]; // Moderate
    }
    if (selectedSymptoms.length > 0) {
      return SYMPTOM_TRIAGE_DATA[0]; // Mild
    }
    return null;
  };

  const activeTriage = getTriageLevel();

  const filteredFacilities = HEALTHCARE_FACILITIES.filter((f) => {
    const matchesFilter =
      facilityFilter === 'All' ||
      (facilityFilter === 'Emergency' && f.type.includes('Emergency')) ||
      (facilityFilter === 'Children' && f.type.includes('Children')) ||
      (facilityFilter === '24h GP' && f.type.includes('GP')) ||
      (facilityFilter === 'Telehealth' && f.type.includes('Telemedicine'));

    const matchesSearch =
      facilitySearch === '' ||
      f.name.toLowerCase().includes(facilitySearch.toLowerCase()) ||
      f.area.toLowerCase().includes(facilitySearch.toLowerCase()) ||
      f.address.toLowerCase().includes(facilitySearch.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Emergency Action Header */}
      <section className="bg-rose-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-rose-200">
              <AlertTriangle className="w-4 h-4 text-rose-300" />
              <span>Singapore Emergency Numbers</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Need Urgent Medical Help?
            </h2>
            <p className="text-xs sm:text-sm text-rose-100 leading-relaxed">
              If you or a companion experience severe breathing difficulty or chest pain, call 995 immediately. In Singapore, emergency ambulance calls are free from any mobile SIM (local or international).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="tel:995"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-rose-900 font-bold text-sm hover:bg-rose-50 transition-colors shadow-sm"
            >
              <PhoneCall className="w-4 h-4 text-rose-600" />
              <span>Call 995 (Life Emergency)</span>
            </a>
            <a
              href="tel:1777"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-rose-800 text-white font-medium text-xs sm:text-sm hover:bg-rose-700 transition-colors border border-rose-700"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call 1777 (Non-Emergency)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Symptom Checker */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-2xl mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            Feeling Unwell? Check Your Symptoms
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Tap whatever symptoms you are experiencing for quick, practical advice:
          </p>
        </div>

        {/* Symptoms Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-6">
          {symptomChecklist.map((symptom) => {
            const isChecked = selectedSymptoms.includes(symptom.id);
            return (
              <button
                key={symptom.id}
                onClick={() => toggleSymptom(symptom.id)}
                className={`p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 ${
                  isChecked
                    ? symptom.severity === 'severe'
                      ? 'border-rose-600 bg-rose-50 font-semibold text-rose-950'
                      : symptom.severity === 'moderate'
                      ? 'border-amber-600 bg-amber-50 font-medium text-amber-950'
                      : 'border-slate-900 bg-slate-50 font-medium text-slate-950'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                    isChecked
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <span>{symptom.label}</span>
              </button>
            );
          })}
        </div>

        {/* Triage Advice Box */}
        {activeTriage ? (
          <div
            className={`p-5 rounded-2xl border space-y-4 ${
              activeTriage.level === 'Severe'
                ? 'bg-rose-50 border-rose-300 text-rose-950'
                : activeTriage.level === 'Moderate'
                ? 'bg-amber-50 border-amber-300 text-amber-950'
                : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-current/10">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider block">
                  Assessment: {activeTriage.level}
                </span>
                <h3 className="font-bold text-base mt-0.5">{activeTriage.recommendedAction}</h3>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/80 border border-current/20 self-start sm:self-auto">
                {activeTriage.urgency}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-bold block mb-1.5">What to do right now:</span>
                <ul className="space-y-1 list-disc pl-4 text-current/90">
                  {activeTriage.homeCare.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-bold block mb-1.5">When to see a doctor:</span>
                <p className="text-current/90 leading-relaxed">{activeTriage.whenToSeekDoctor}</p>
                {activeTriage.level === 'Severe' && (
                  <div className="mt-3">
                    <a
                      href="tel:995"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-rose-700 text-white rounded-lg text-xs font-bold hover:bg-rose-800"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call 995 Immediately</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
            Tap your symptoms above for instant guidance on what to do.
          </div>
        )}
      </section>

      {/* Advice for Kids, Elderly & Asthma */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-900">
            Care for Kids, Seniors & Sensitive Travelers
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Choose a group below for tailored tips:
          </p>
        </div>

        {/* Group Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-100 mb-6">
          {AGE_GROUP_GUIDELINES.map((item, idx) => (
            <button
              key={item.group}
              onClick={() => setSelectedCohortIndex(idx)}
              className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-colors ${
                selectedCohortIndex === idx
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {item.group}
            </button>
          ))}
        </div>

        {/* Group Card */}
        {(() => {
          const currentCohort = AGE_GROUP_GUIDELINES[selectedCohortIndex];
          return (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-1">
                  <span className="font-bold text-emerald-800 block">
                    PSI 0 – 100 (Safe)
                  </span>
                  <p className="text-slate-700 leading-relaxed">{currentCohort.psiUnder100}</p>
                </div>
                <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-1">
                  <span className="font-bold text-amber-800 block">
                    PSI 101 – 200 (Hazy)
                  </span>
                  <p className="text-slate-700 leading-relaxed">{currentCohort.psi101To200}</p>
                </div>
                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1">
                  <span className="font-bold text-rose-800 block">
                    PSI 201+ (Heavy Haze)
                  </span>
                  <p className="text-slate-700 leading-relaxed">{currentCohort.psi201Plus}</p>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-900 block mb-2">
                  Key Recommendations:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentCohort.keyPrecautions.map((prec, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{prec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* Tourist-Friendly Clinics & Hospitals */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Tourist Clinics & 24/7 Hospitals
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              English-speaking clinics that provide itemized receipts for travel insurance claims.
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {['All', 'Emergency', 'Children', '24h GP', 'Telehealth'].map((f) => (
              <button
                key={f}
                onClick={() => setFacilityFilter(f)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  facilityFilter === f
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFacilities.map((fac) => (
            <div
              key={fac.id}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-colors flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
                  <span className="font-semibold text-slate-900">{fac.type}</span>
                  <span>{fac.area}</span>
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-1.5">{fac.name}</h3>
                <p className="text-xs text-slate-600 mb-3">{fac.address}</p>

                <div className="space-y-1.5 text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200/70">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Wait Time:</span>
                    <span className="font-medium text-slate-800">{fac.estimatedWaitTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Insurance:</span>
                    <span className="font-medium text-slate-800">{fac.insuranceAccepted}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3 text-xs">
                <a
                  href={`tel:${fac.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {fac.phone}</span>
                </a>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    fac.googleMapsQuery
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Directions</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Travel Insurance Checklist */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-2">
          Claiming from Travel Insurance?
        </h3>
        <p className="text-xs text-slate-600 mb-4 leading-relaxed">
          Before leaving the clinic or hospital, ask the receptionist for these 3 things to ensure 100% claim reimbursement:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">1. Itemized Tax Invoice</span>
            <p className="text-slate-600 text-[11px]">
              Listing doctor fee, medicines, and any treatments separately.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">2. Medical Memo</span>
            <p className="text-slate-600 text-[11px]">
              With doctor's diagnosis stating symptoms caused by haze smoke.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">3. Doctor's Stamp & Reg Number</span>
            <p className="text-slate-600 text-[11px]">
              Singapore Medical Council stamp required by foreign insurers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
