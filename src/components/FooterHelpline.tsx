import React from 'react';
import { PhoneCall, ShieldCheck, Volume2 } from 'lucide-react';
import { useAudioNarrator } from '../utils/audioNarrator';
import { SupportedDialect } from '../utils/dialect';

interface FooterHelplineProps {
  isEnglish: boolean;
  currentDialect?: SupportedDialect;
}

export const FooterHelpline: React.FC<FooterHelplineProps> = ({ isEnglish, currentDialect = 'hi' }) => {
  const { speak } = useAudioNarrator();

  const handleReadHelplines = () => {
    const text = isEnglish
      ? 'Government Agricultural Helplines: Kisan Call Center Agri Advisory toll-free 1800-180-1551. PM-Kisan and KCC Helpline 155261. National Agriculture Market e-NAM toll-free 1800-270-0224.'
      : 'सरकारी किसान हेल्पलाइन: किसान कॉल सेंटर कृषि वैज्ञानिक परामर्श 1800-180-1551। पीएम-किसान सम्मान निधि एवं केसीसी हेल्पलाइन 155261। राष्ट्रीय कृषि बाज़ार ई-नाम टोल-फ्री 1800-270-0224।';
    speak('Agricultural Helplines', text, currentDialect);
  };

  return (
    <footer className="mt-12 bg-[#091120] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
      {/* Helpline Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg">📞</span>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {isEnglish
                  ? '24x7 National Rural & Farmer Helplines'
                  : '24x7 राष्ट्रीय ग्रामीण व किसान हेल्पलाइन'}
              </h4>
              <button
                type="button"
                onClick={handleReadHelplines}
                className="flex items-center gap-1 text-[11px] font-semibold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 px-2 py-0.5 rounded cursor-pointer"
                title="Listen to Helplines Aloud"
              >
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isEnglish ? 'Read Aloud' : 'बोलकर सुनें'}</span>
              </button>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {isEnglish
              ? 'Connect directly for free scientific agricultural advice & government schemes'
              : 'मुफ्त सरकारी सहायता एवं कृषि परामर्श के लिए सीधे संपर्क करें'}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#0d2818] border border-emerald-500/40 px-3 py-1.5 rounded-full text-emerald-400 text-xs font-semibold self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{isEnglish ? 'LIVE AGRI SUPPORT ACTIVE' : 'LIVE AGRI SUPPORT ACTIVE'}</span>
        </div>
      </div>

      {/* 3 Helpline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {/* Helpline 1 */}
        <div className="bg-[#111c33] rounded-2xl p-4 border border-slate-800/80 hover:border-emerald-500/40 transition-colors flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500" />
          <div>
            <span className="text-xs text-slate-400 block mb-1">
              {isEnglish ? 'Kisan Call Center (Agri Advisory)' : 'किसान कॉल सेंटर (Agri Advisory)'}
            </span>
            <div className="text-xl sm:text-2xl font-black font-mono text-emerald-400 tracking-tight">
              1800-180-1551
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800">
            {isEnglish
              ? 'Toll-free agricultural scientist advisory (6 AM to 10 PM)'
              : 'निःशुल्क कृषि वैज्ञानिक सलाह (सुबह 6 से रात 10)'}
          </p>
        </div>

        {/* Helpline 2 */}
        <div className="bg-[#111c33] rounded-2xl p-4 border border-slate-800/80 hover:border-cyan-500/40 transition-colors flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-500" />
          <div>
            <span className="text-xs text-slate-400 block mb-1">
              {isEnglish ? 'PM-Kisan & KCC Helpline' : 'पीएम-किसान व केसीसी हेल्पलाइन'}
            </span>
            <div className="text-xl sm:text-2xl font-black font-mono text-cyan-400 tracking-tight">
              155261 / 1800-115-526
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800">
            {isEnglish
              ? 'Samman Nidhi installment & Kisan Credit Card queries'
              : 'सम्मान निधि किस्त व किसान क्रेडिट कार्ड पूछताछ'}
          </p>
        </div>

        {/* Helpline 3 */}
        <div className="bg-[#111c33] rounded-2xl p-4 border border-slate-800/80 hover:border-amber-500/40 transition-colors flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />
          <div>
            <span className="text-xs text-slate-400 block mb-1">
              {isEnglish ? 'National Agri Market (e-NAM) Toll-Free' : 'राष्ट्रीय कृषि बाज़ार (e-NAM) टोल-फ्री'}
            </span>
            <div className="text-xl sm:text-2xl font-black font-mono text-amber-400 tracking-tight">
              1800-270-0224
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800">
            {isEnglish
              ? 'Digital mandi e-trading & modal price assistance'
              : 'ऑनलाइन डिजिटल मंडी व्यापार व भाव सहायता'}
          </p>
        </div>
      </div>

      {/* Footer Branding & Disclaimer */}
      <div className="text-center pt-4 border-t border-slate-800/90 text-xs text-slate-400 space-y-1">
        <p className="flex items-center justify-center gap-1.5 font-medium text-slate-300">
          <span>🌱</span>
          <span>
            <strong className="text-white">ग्रामसेतु (GramSetu)</strong> — Direct Farm-to-Buyer Marketplace & Crop Health Advisory Platform.
          </span>
        </p>
        <p className="text-[11px] text-slate-500">
          Standalone Profile Section Prototype. Built exclusively for presentation and integration review.
        </p>
      </div>
    </footer>
  );
};
