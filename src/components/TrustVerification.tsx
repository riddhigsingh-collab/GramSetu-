import React, { useState } from 'react';
import { VerificationItem } from '../types/profile';
import { ShieldCheck, AlertTriangle, CheckCircle, Info, ExternalLink, HelpCircle } from 'lucide-react';

interface TrustVerificationProps {
  items: VerificationItem[];
  isEnglish: boolean;
}

export const TrustVerification: React.FC<TrustVerificationProps> = ({ items, isEnglish }) => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'VERIFIED' | 'DEMO'>('ALL');

  const verifiedItems = items.filter((i) => i.category === 'VERIFIED');
  const demoItems = items.filter((i) => i.category === 'DEMO_DATA');

  const displayedItems =
    activeTab === 'VERIFIED' ? verifiedItems : activeTab === 'DEMO' ? demoItems : items;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-6">
      {/* Header with Transparency Disclaimer */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              {isEnglish
                ? 'Trust, Verification & Data Authenticity'
                : 'विश्वसनीयता, सत्यापन एवं डेटा प्रमाणिकता'}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {isEnglish
              ? 'Transparently distinguishes official verified farmer credentials from prototype demonstration records.'
              : 'आधिकारिक सत्यापित किसान रिकॉर्ड और प्रोटोटाइप डेमो डेटा के बीच पारदर्शी अंतर।'}
          </p>
        </div>

        {/* Filter Segmented Buttons */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start md:self-auto">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'ALL'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isEnglish ? 'All Records' : 'समस्त रिकॉर्ड'} ({items.length})
          </button>
          <button
            onClick={() => setActiveTab('VERIFIED')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'VERIFIED'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isEnglish ? 'Verified Only' : 'सत्यापित'} ({verifiedItems.length})
          </button>
          <button
            onClick={() => setActiveTab('DEMO')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'DEMO'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isEnglish ? 'Demo / Simulated' : 'डेमो डेटा'} ({demoItems.length})
          </button>
        </div>
      </div>

      {/* Prominent Demo Transparency Callout */}
      <div className="rounded-xl p-4 bg-amber-50/70 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-950">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-bold text-amber-900 block">
            {isEnglish
              ? 'Hackathon Prototype Transparency Declaration'
              : 'हैकथॉन प्रोटोटाइप पारदर्शिता घोषणापत्र'}
          </strong>
          <p className="leading-relaxed text-amber-800">
            {isEnglish
              ? 'This module is a standalone frontend prototype designed exclusively for the Profile section. Real data verification relies on mock simulated credentials for presentation. Edits are handled reactively in local browser memory and will not modify an external production database.'
              : 'यह मॉड्यूल केवल किसान प्रोफाइल सेक्शन हेतु तैयार एक स्वतंत्र फ्रंटेंड प्रोटोटाइप है। डेमो के दौरान प्रदर्शित सत्यापन रिकॉर्ड प्रस्तुति आधारित हैं और कोई भी संपादन केवल ब्राउज़र मेमोरी में रहता है।'}
          </p>
        </div>
      </div>

      {/* Verification Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedItems.map((item) => {
          const isVerified = item.category === 'VERIFIED';
          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                isVerified
                  ? 'bg-emerald-50/30 border-emerald-200/80 hover:border-emerald-300'
                  : 'bg-amber-50/20 border-amber-200/70 hover:border-amber-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-900">
                    {isEnglish ? item.title : `${item.title} (${item.titleHi})`}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 ${
                      isVerified
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-900 border border-amber-300'
                    }`}
                  >
                    {isVerified ? (
                      <>
                        <CheckCircle className="w-3 h-3 text-emerald-700" />
                        <span>Verified Spec</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-3 h-3 text-amber-700" />
                        <span>Demo Model</span>
                      </>
                    )}
                  </span>
                </div>

                <div className="text-sm font-semibold text-slate-800 mb-1.5 font-mono">
                  {item.value}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.notes}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200/50 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <HelpCircle className="w-3 h-3 text-slate-400" />
                  <span>
                    {isVerified
                      ? (isEnglish ? 'Source: Kisan Land Portal' : 'स्रोत: किसान भूलेख')
                      : (isEnglish ? 'Source: Prototype Mock State' : 'स्रोत: प्रोटोटाइप स्टेट')}
                  </span>
                </span>
                <span className="font-mono text-[10px] text-slate-600">
                  {isVerified ? 'DOC-REF #892' : 'SIM-ENGINE v1'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
