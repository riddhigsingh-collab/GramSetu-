import React, { useState } from 'react';
import { Users, CheckCircle, Smartphone, WifiOff, FileText, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

interface GramMitraBarProps {
  isEnglish: boolean;
  onOpenVoiceListing: () => void;
  onOpenOfflineSync: () => void;
  pendingDraftsCount: number;
}

export const GramMitraBar: React.FC<GramMitraBarProps> = ({
  isEnglish,
  onOpenVoiceListing,
  onOpenOfflineSync,
  pendingDraftsCount,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-white rounded-2xl shadow-sm border border-amber-700/60 overflow-hidden transition-all">
      {/* Top Bar Banner */}
      <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/30">
            <Users className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-extrabold tracking-tight text-amber-100">
                {isEnglish ? 'Gram Mitra Field Assisted Mode Active' : '🤝 ग्राम मित्र सहायता मोड सक्रिय (Gram Mitra Assisted Mode)'}
              </span>
              <span className="text-[10px] font-bold bg-amber-500/30 text-amber-200 px-2 py-0.5 rounded-full border border-amber-400/40">
                AGENT: MOHAN (SEHORE)
              </span>
            </div>
            <p className="text-xs text-amber-200/90 leading-normal">
              {isEnglish
                ? 'Field guidance for elderly/low-literacy farmers. Facilitate voice listings, photo compression & offline batches.'
                : 'बुजुर्ग व कम पढ़े-लिखे किसानों हेतु स्थानीय सहायता। बोलकर लिस्टिंग कराएं व बिना इंटरनेट चौपाल सिंक करें।'}
            </p>
          </div>
        </div>

        {/* Quick Action Badges */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            onClick={onOpenVoiceListing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <span>🎙️</span>
            <span>{isEnglish ? 'Help Farmer Dictate' : 'किसान को बोलकर लिखाएं'}</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-amber-300 hover:text-white rounded-lg hover:bg-amber-700/60 transition-colors cursor-pointer"
            title="Toggle field checklist"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expandable Field Agent Checklist */}
      {isExpanded && (
        <div className="bg-amber-950/80 border-t border-amber-700/60 p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-amber-900/40 border border-amber-700/40 space-y-1">
            <div className="font-bold text-amber-200 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>1. Digital e-KYC Verification</span>
            </div>
            <p className="text-[11px] text-amber-100/80">
              Cross-check Khasra 142/3 with MP Bhulekh. Ensure weighment scale is zero-calibrated before quoting lot weight.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-amber-900/40 border border-amber-700/40 space-y-1">
            <div className="font-bold text-amber-200 flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-amber-400" />
              <span>2. 2G Low-Data Camera Mode</span>
            </div>
            <p className="text-[11px] text-amber-100/80">
              Automatic HTML5 canvas compressor activates to scale harvest lot photos to 45 KB for instantaneous upload.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-amber-900/40 border border-amber-700/40 space-y-1">
            <div className="font-bold text-amber-200 flex items-center gap-1.5">
              <WifiOff className="w-3.5 h-3.5 text-amber-400" />
              <span>3. Offline Chaupal Hotspot</span>
            </div>
            <p className="text-[11px] text-amber-100/80">
              Collect listings in offline drafts ({pendingDraftsCount} pending). Will auto-sync when connecting to Mandi tower.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
