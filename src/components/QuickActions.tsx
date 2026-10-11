import React, { useState } from 'react';
import { PlusCircle, TrendingUp, Calculator, Bot, X, Sparkles, ArrowUpRight, ArrowDownRight, Minus, Check, Volume2 } from 'lucide-react';
import { MANDI_RATES } from '../data/mockData';
import { useAudioNarrator } from '../utils/audioNarrator';
import { SupportedDialect } from '../utils/dialect';

interface QuickActionsProps {
  isEnglish: boolean;
  onOpenAddCrop: () => void;
  onOpenMandiRates: () => void;
  onOpenProfitCalculator: () => void;
  onOpenAiRecommendations: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  isEnglish,
  onOpenAddCrop,
  onOpenMandiRates,
  onOpenProfitCalculator,
  onOpenAiRecommendations,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <span>⚡</span>
          <span>{isEnglish ? 'Farmer Quick Actions & Tools' : 'त्वरित किसान टूल्स व सेवाएं'}</span>
        </h3>
        <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
          {isEnglish ? 'Direct Shortcuts' : 'सीधे शॉर्टकट'}
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* 1. Add Crop */}
        <button
          onClick={onOpenAddCrop}
          className="flex flex-col items-start p-4 rounded-xl border border-emerald-200/90 bg-emerald-50/50 hover:bg-emerald-100/60 active:scale-98 transition-all text-left cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center mb-3 shadow-xs group-hover:scale-105 transition-transform">
            <PlusCircle className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold text-slate-900 leading-tight">
            {isEnglish ? 'Add Crop' : 'फसल जोड़ें'}
          </span>
          <span className="text-[11px] text-slate-500 mt-1 leading-normal">
            {isEnglish ? 'List new harvest for buyers' : 'सीधी बिक्री हेतु नई उपज जोड़ें'}
          </span>
        </button>

        {/* 2. Mandi Prices */}
        <button
          onClick={onOpenMandiRates}
          className="flex flex-col items-start p-4 rounded-xl border border-teal-200/90 bg-teal-50/50 hover:bg-teal-100/60 active:scale-98 transition-all text-left cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-teal-700 text-white flex items-center justify-center mb-3 shadow-xs group-hover:scale-105 transition-transform">
            <TrendingUp className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold text-slate-900 leading-tight">
            {isEnglish ? 'Mandi Prices' : 'मंडी भाव तुलना'}
          </span>
          <span className="text-[11px] text-slate-500 mt-1 leading-normal">
            {isEnglish ? 'Live APMC benchmarks' : 'लाइव एपीएमसी रेट व रुझान'}
          </span>
        </button>

        {/* 3. Profit Calculator */}
        <button
          onClick={onOpenProfitCalculator}
          className="flex flex-col items-start p-4 rounded-xl border border-amber-200/90 bg-amber-50/50 hover:bg-amber-100/60 active:scale-98 transition-all text-left cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-amber-600 text-white flex items-center justify-center mb-3 shadow-xs group-hover:scale-105 transition-transform">
            <Calculator className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold text-slate-900 leading-tight">
            {isEnglish ? 'Profit Calculator' : 'बचत कैलकुलेटर'}
          </span>
          <span className="text-[11px] text-slate-500 mt-1 leading-normal">
            {isEnglish ? '+22% Middleman simulator' : 'बिचौलिया बचत सिमुलेटर'}
          </span>
        </button>

        {/* 4. AI Crop Recommendations */}
        <button
          onClick={onOpenAiRecommendations}
          className="flex flex-col items-start p-4 rounded-xl border border-emerald-200/90 bg-emerald-50/50 hover:bg-emerald-100/60 active:scale-98 transition-all text-left cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-800 text-white flex items-center justify-center mb-3 shadow-xs group-hover:scale-105 transition-transform">
            <Bot className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold text-slate-900 leading-tight">
            {isEnglish ? 'AI Crop Advisory' : 'एआई फसल परामर्श'}
          </span>
          <span className="text-[11px] text-slate-500 mt-1 leading-normal">
            {isEnglish ? 'Soil & market suggestions' : 'मृदा व मौसम आधारित सलाह'}
          </span>
        </button>
      </div>
    </div>
  );
};

// Modal for Mandi Prices
export const MandiPricesModal: React.FC<{ isOpen: boolean; onClose: () => void; isEnglish: boolean; currentDialect?: SupportedDialect }> = ({
  isOpen,
  onClose,
  isEnglish,
  currentDialect = 'hi',
}) => {
  const { speak } = useAudioNarrator();

  if (!isOpen) return null;

  const handleReadMandiRates = () => {
    const text = isEnglish
      ? 'Live Mandi Rates today: Wheat in Sehore Mandi ₹2750 per quintal, trend is Up. Basmati Paddy in Barabanki ₹4100, trend is Up. Soybean in Indore ₹4650, trend is Down. Mustard in Bathinda ₹5520, trend is Up.'
      : 'मंडी का आज का लाइव भाव: सीहोर मंडी में गेहूं 2750 रुपये क्विंटल, भाव तेज है। बाराबंकी में बासमती धान 4100 रुपये, भाव तेज है। इंदौर में सोयाबीन 4650 रुपये, भाव मंदा है। बठिंडा में सरसों 5520 रुपये, भाव तेज है।';
    speak('Mandi Daily Rates', text, currentDialect);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">📊</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">
                  {isEnglish ? 'Live Mandi (APMC) Daily Rates' : 'मंडी (APMC) का आज का लाइव भाव'}
                </h3>
                <button
                  type="button"
                  onClick={handleReadMandiRates}
                  className="flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200 cursor-pointer"
                  title="Listen to Mandi Rates"
                >
                  <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{isEnglish ? 'Read Aloud' : 'सुनिए'}</span>
                </button>
              </div>
              <p className="text-xs text-slate-500">
                {isEnglish ? 'Official APMC e-NAM Benchmark Rates' : 'आधिकारिक कृषि उपज मंडी समिति दैनिक दरें'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mandi Rates Table matching Screenshot 3 */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-3.5">फसल / Commodity</th>
                <th className="py-3 px-3.5">मंडी व क्षेत्र / Mandi</th>
                <th className="py-3 px-3.5 text-right">मॉडल भाव (₹/क्विंटल)</th>
                <th className="py-3 px-3.5 text-right">मूल्य सीमा</th>
                <th className="py-3 px-3.5 text-center">रुझान / Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {MANDI_RATES.map((rate) => (
                <tr key={rate.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3.5 font-bold text-slate-900">{rate.cropEn}</td>
                  <td className="py-3 px-3.5 text-slate-600">{rate.mandi}</td>
                  <td className="py-3 px-3.5 text-right font-mono font-bold text-emerald-800 text-sm">
                    ₹{rate.modalPrice}
                  </td>
                  <td className="py-3 px-3.5 text-right font-mono text-slate-600">{rate.priceRange}</td>
                  <td className="py-3 px-3.5 text-center">
                    {rate.trend === 'UP' && (
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        <ArrowUpRight className="w-3 h-3" /> UP
                      </span>
                    )}
                    {rate.trend === 'DOWN' && (
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                        <ArrowDownRight className="w-3 h-3" /> DOWN
                      </span>
                    )}
                    {rate.trend === 'STABLE' && (
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                        <Minus className="w-3 h-3" /> STABLE
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/80 text-xs text-emerald-950 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-700" />
            <span>Ramcharan Yadav's listings are benchmarked at +8% to +14% over baseline mandi modal rates.</span>
          </span>
          <span className="font-mono text-[10px] text-emerald-800">LIVE FEED</span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 cursor-pointer"
        >
          Close Mandi Rates
        </button>
      </div>
    </div>
  );
};

// Modal for Farmer Profit Simulator matching Screenshot 2
export const ProfitCalculatorModal: React.FC<{ isOpen: boolean; onClose: () => void; isEnglish: boolean }> = ({
  isOpen,
  onClose,
  isEnglish,
}) => {
  const [quintals, setQuintals] = useState<number>(30);
  const [expectedRate, setExpectedRate] = useState<number>(2800);

  if (!isOpen) return null;

  const totalGramSetuValue = quintals * expectedRate;
  // Traditional middleman cut is ~22% lower due to commission, weighting cuts, delayed payment
  const middlemanDeduction = Math.round(totalGramSetuValue * 0.22);
  const traditionalPayout = totalGramSetuValue - middlemanDeduction;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 my-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">💰</span>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {isEnglish ? 'Farmer Profit Simulator' : 'बिचौलिया बचत कैलकुलेटर (Farmer Profit Simulator)'}
              </h3>
              <p className="text-xs text-slate-500">
                {isEnglish
                  ? 'Calculate extra earnings by selling directly on GramSetu vs traditional middlemen'
                  : 'देखें कि ग्रामसेतु के माध्यम से सीधे बेचने पर बिचौलियों की तुलना में कितना अधिक लाभ होता है।'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              उपज मात्रा (क्विंटल / Quintal):
            </label>
            <input
              type="number"
              min="1"
              value={quintals}
              onChange={(e) => setQuintals(Math.max(1, Number(e.target.value)))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-sm font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              अपेक्षित भाव (₹ प्रति क्विंटल):
            </label>
            <input
              type="number"
              min="100"
              step="50"
              value={expectedRate}
              onChange={(e) => setExpectedRate(Math.max(100, Number(e.target.value)))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-sm font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Highlight Result Card (Exact Match to Screenshot 2) */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 text-center relative overflow-hidden">
          <span className="inline-block text-[11px] font-bold tracking-wider text-emerald-800 bg-emerald-100/90 px-3 py-1 rounded-full uppercase mb-2">
            +22% EXTRA NET INCOME
          </span>

          <span className="text-xs text-slate-600 block mb-1">
            {isEnglish ? 'Direct Additional Farmer Profit:' : 'सीधा अतिरिक्त किसान लाभ:'}
          </span>

          <div className="text-3xl sm:text-4xl font-black text-emerald-900 tracking-tight font-mono">
            +₹{middlemanDeduction.toLocaleString('en-IN')}
          </div>

          <p className="text-xs text-slate-600 mt-2 font-mono">
            (पारंपरिक मंडी में भुगतान: ₹{traditionalPayout.toLocaleString('en-IN')} vs ग्रामसेतु: ₹{totalGramSetuValue.toLocaleString('en-IN')})
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  );
};

// Modal for AI Crop Recommendations
export const AiRecommendationsModal: React.FC<{ isOpen: boolean; onClose: () => void; isEnglish: boolean; currentDialect?: SupportedDialect }> = ({
  isOpen,
  onClose,
  isEnglish,
  currentDialect = 'hi',
}) => {
  const { speak } = useAudioNarrator();

  if (!isOpen) return null;

  const handleReadAdvisory = () => {
    const text = isEnglish
      ? 'AI Crop Advisory for Ramcharan Yadav. Recommended Rabi Next Cycle: Organic Mustard. High demand in Bathinda and Indore mills at 5520 to 5700 rupees per quintal. Soil health Grade A-plus with 0.78 percent organic carbon is ideal for intercropping with Chickpeas.'
      : 'रामचरण यादव जी के लिए एआई फसल सलाह। रबी सीजन हेतु पीली सरसों की बुआई सबसे उपयुक्त है। बठिंडा व इंदौर की तेल मिलों में 5520 से 5700 रुपये का जोरदार भाव मिल रहा है। आपकी ए-प्लस ग्रेड मिट्टी में चना लगाने से प्राकृतिक नाइट्रोजन संवर्धन होगा।';
    speak('AI Crop Advisory', text, currentDialect);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🤖</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">
                  {isEnglish ? 'AI Crop & Market Advisory' : 'एआई फसल डॉक्टर व बाज़ार परामर्श'}
                </h3>
                <button
                  type="button"
                  onClick={handleReadAdvisory}
                  className="flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200 cursor-pointer"
                  title="Listen to AI Advisory"
                >
                  <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{isEnglish ? 'Read Aloud' : 'सुनिए'}</span>
                </button>
              </div>
              <p className="text-xs text-slate-500">
                Personalized recommendations for Ramcharan Yadav (Soil Grade A+ • Sehore MP)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-900">Recommended Rabi Next Cycle: Organic Mustard (सरसों)</span>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">High Demand</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Bathinda & Indore oilseed processing mills indicate high purchase demand at ₹5,520–₹5,700/Qtl. Your solar drip setup on 4 acres will yield an estimated 28 Quintals with ~₹1.5 Lakhs profit.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-teal-900">Soil Carbon Optimization Advisory</span>
              <span className="text-[10px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">Soil Health A+</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              With 0.78% organic carbon, soil is ideal for non-chemical intercropping with Chickpeas (चना). Legume root nodules will naturally fix nitrogen for subsequent Sharbati wheat planting.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-900">Direct Buyer Alert: Premium Milling Flour Mills</span>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">3 Bids Active</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Wholesale buyers in Bhopal have placed standing purchase intents for your 2,500 kg Sharbati wheat batch at ₹28.5/kg. Gram Mitra Mohan can arrange digital weighment inspection.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 cursor-pointer"
        >
          Close Advisory
        </button>
      </div>
    </div>
  );
};
