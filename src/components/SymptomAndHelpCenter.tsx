import React, { useState } from 'react';
import {
  AlertTriangle,
  PhoneCall,
  Phone,
  ShieldAlert,
  Stethoscope,
  Heart,
  Baby,
  Users,
  MapPin,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Sparkles,
  Info,
} from 'lucide-react';
import {
  SYMPTOM_TRIAGE_DATA,
  AGE_GROUP_GUIDELINES,
  HEALTHCARE_FACILITIES,
} from '../data/hazeData';
import { ClinicOrHospital } from '../types/haze';

export const SymptomAndHelpCenter: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedCohortIndex, setSelectedCohortIndex] = useState<number>(0);
  const [facilityFilter, setFacilityFilter] = useState<string>('All');
  const [facilitySearch, setFacilitySearch] = useState<string>('');

  const symptomChecklist = [
    { id: 'itchy-eyes', label: 'Itchy, stinging or watery eyes', severity: 'mild' },
    { id: 'throat-tickle', label: 'Dry throat tickle or scratchy cough', severity: 'mild' },
    { id: 'runny-nose', label: 'Clear runny nose or sneezing', severity: 'mild' },
    { id: 'mild-headache', label: 'Mild headache or fatigue after walking outdoors', severity: 'mild' },
    { id: 'persistent-cough', label: 'Persistent dry coughing fits', severity: 'moderate' },
    { id: 'wheezing', label: 'Audible wheezing or whistling breath', severity: 'moderate' },
    { id: 'chest-tightness', label: 'Mild chest tightness upon exertion', severity: 'moderate' },
    { id: 'skin-rash', label: 'Skin irritation or eczema flare-up', severity: 'moderate' },
    { id: 'acute-breathlessness', label: 'Severe shortness of breath at rest', severity: 'severe' },
    { id: 'cannot-speak', label: 'Inability to complete full sentences without gasping', severity: 'severe' },
    { id: 'chest-pain', label: 'Crushing chest pain or pressure', severity: 'severe' },
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
    <div className="space-y-8">
      {/* Top Emergency Action Header (Prominent 995 Helpline) */}
      <section className="bg-rose-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-rose-200">
              <AlertTriangle className="w-4 h-4 text-rose-300" />
              <span>Singapore Civil Defence Force (SCDF) Emergency Protocol</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Emergency Healthcare Assistance in Singapore
            </h2>
            <p className="text-xs sm:text-sm text-rose-100 leading-relaxed">
              If you or a travel companion experiences acute breathlessness, chest pain, or an unresponsive asthma attack, do not wait. Emergency calls in Singapore are free from any international or local mobile SIM.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="tel:995"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-rose-900 font-bold text-sm hover:bg-rose-50 transition-colors shadow-sm"
            >
              <PhoneCall className="w-4 h-4 text-rose-600 animate-pulse" />
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

      {/* Interactive Symptom Checker & Self-Triage Engine */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl mb-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Clinical Guidance</span>
            <span aria-hidden="true">·</span>
            <span>Symptom Checker & Triage Protocol</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            What are your possible symptoms?
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Select any symptoms you or your family members are experiencing to see recommended health actions and appropriate medical channels:
          </p>
        </div>

        {/* Symptoms Multi-Select Checklist */}
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
                      ? 'border-rose-600 bg-rose-50/70 font-semibold text-rose-950'
                      : symptom.severity === 'moderate'
                      ? 'border-amber-600 bg-amber-50/70 font-medium text-amber-950'
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

        {/* Dynamic Triage Result Box */}
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
                  Triage Assessment: {activeTriage.level} Severity
                </span>
                <h3 className="font-bold text-base mt-0.5">{activeTriage.recommendedAction}</h3>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/80 border border-current/20 self-start sm:self-auto">
                {activeTriage.urgency}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-semibold block mb-1.5">Immediate Relief Measures:</span>
                <ul className="space-y-1 list-disc pl-4 text-current/90">
                  {activeTriage.homeCare.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-semibold block mb-1.5">When to Seek Medical Review:</span>
                <p className="text-current/90 leading-relaxed">{activeTriage.whenToSeekDoctor}</p>
                {activeTriage.level === 'Severe' && (
                  <div className="mt-3">
                    <a
                      href="tel:995"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-rose-700 text-white rounded-lg text-xs font-bold hover:bg-rose-800"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Dial SCDF Ambulance 995 Immediately</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
            Select one or more symptoms above to view instant triage instructions and medical recommendations.
          </div>
        )}
      </section>

      {/* Measures to Manage Haze for Different Age Groups & Cohorts */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Target Segments & Vulnerable Groups</span>
            <span aria-hidden="true">·</span>
            <span>MOH Clinical Guidelines</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Measures to Manage Haze for Different Age Groups
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Children, seniors, and asthma sufferers experience different physiological impacts from smoke particulates. Select a group below for tailored safety measures:
          </p>
        </div>

        {/* Cohort Tabs */}
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

        {/* Active Cohort Deep Dive Card */}
        {(() => {
          const currentCohort = AGE_GROUP_GUIDELINES[selectedCohortIndex];
          return (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{currentCohort.group}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{currentCohort.subtext}</p>
                </div>
              </div>

              {/* Threshold Actions Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 text-xs space-y-1.5">
                  <span className="font-bold text-emerald-800 block">
                    PSI 0 – 100 (Good to Moderate)
                  </span>
                  <p className="text-slate-700 leading-relaxed">{currentCohort.psiUnder100}</p>
                </div>
                <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 text-xs space-y-1.5">
                  <span className="font-bold text-amber-800 block">
                    PSI 101 – 200 (Unhealthy)
                  </span>
                  <p className="text-slate-700 leading-relaxed">{currentCohort.psi101To200}</p>
                </div>
                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 text-xs space-y-1.5">
                  <span className="font-bold text-rose-800 block">
                    PSI 201+ (Very Unhealthy / Hazardous)
                  </span>
                  <p className="text-slate-700 leading-relaxed">{currentCohort.psi201Plus}</p>
                </div>
              </div>

              {/* Key Precautions Checklist */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  Key Precautions for this Group:
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

      {/* Singapore Healthcare Directory & Telemedicine */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Hospitals, 24-Hour GP Clinics & Telemedicine
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Top tourist-friendly medical facilities with English-speaking doctors, international insurance documentation, and hotel medicine delivery
            </p>
          </div>

          {/* Filter Pills */}
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
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50/40 hover:bg-white transition-colors flex flex-col justify-between space-y-4"
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
                    <span className="text-slate-500">Languages:</span>
                    <span>{fac.languages.join(', ')}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <span className="font-medium text-slate-700">Insurance: </span>
                    {fac.insuranceAccepted}
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
                  <span>Get Directions</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tourist Travel Insurance & Documentation Checklist */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
          <FileText className="w-4 h-4 text-slate-600" />
          <span>Foreign Visitor Insurance Claim Checklist</span>
        </div>
        <h3 className="text-base font-bold text-slate-900 mb-3">
          How to Ensure Your Singapore Medical Expenses are Reimbursed
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          Singapore clinics and hospitals provide internationally compliant documentation in English. When receiving treatment for haze-related symptoms, always request the following before leaving the clinic:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">1. Itemized Tax Invoice</span>
            <p className="text-slate-600 text-[11px]">
              Must break down consultation fees, medications (e.g. Salbutamol inhaler, antihistamines), and tests separately.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">2. Doctor’s Medical Memo</span>
            <p className="text-slate-600 text-[11px]">
              Explicitly noting the clinical diagnosis (e.g. "Acute bronchospasm secondary to environmental smoke haze").
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">3. Doctor Registration Number</span>
            <p className="text-slate-600 text-[11px]">
              Singapore Medical Council (SMC) registration stamp on the memo is mandatory for overseas insurance processors.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
