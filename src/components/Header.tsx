import React from 'react';
import { SupportedDialect, DIALECTS, DIALECT_STRINGS } from '../utils/dialect';
import { NetworkTier, OfflineDraft } from '../utils/offlineStorage';
import { NetworkStatusBadge } from './NetworkStatusBadge';
import { useAudioNarrator } from '../utils/audioNarrator';
import { Mic, Globe, Image as ImageIcon, Volume2, Sparkles, Smartphone } from 'lucide-react';

interface HeaderProps {
  currentDialect: SupportedDialect;
  onSelectDialect: (dialect: SupportedDialect) => void;
  networkTier: NetworkTier;
  pendingDraftsCount: number;
  isSyncing: boolean;
  onSetNetworkMode: (mode: NetworkTier) => void;
  onSyncDrafts: () => void;
  onOpenFallbackModal: () => void;
  onOpenVoiceListing: () => void;
  isPictorialMode: boolean;
  onTogglePictorialMode: () => void;
  drafts: OfflineDraft[];
}

export const Header: React.FC<HeaderProps> = ({
  currentDialect,
  onSelectDialect,
  networkTier,
  pendingDraftsCount,
  isSyncing,
  onSetNetworkMode,
  onSyncDrafts,
  onOpenFallbackModal,
  onOpenVoiceListing,
  isPictorialMode,
  onTogglePictorialMode,
  drafts,
}) => {
  const isEnglish = currentDialect === 'en';
  const strings = DIALECT_STRINGS[currentDialect] || DIALECT_STRINGS.hi;
  const { speak, isSpeaking } = useAudioNarrator();

  const handleReadHeader = () => {
    const text = isEnglish
      ? 'Welcome to GramSetu Farmer Profile Dashboard. Ramcharan Yadav, Pipariya Sehore. 14.5 Acres organic farm. Active crops available for direct selling.'
      : 'ग्रामसेतु किसान प्रोफाइल डैशबोर्ड में आपका स्वागत है। रामचरण यादव, पिपरिया सीहोर। 14.5 एकड़ जैविक खेती। बिचौलिया मुक्त सीधी बिक्री मंच।';
    speak('GramSetu Header', text, currentDialect);
  };

  return (
    <header className="bg-[#14532d] text-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        {/* Left: Logo & Wordmark with Audio Reader */}
        <div className="flex items-center justify-between sm:justify-start gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
              <svg className="w-6 h-6 text-[#166534]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z" fill="#22c55e" fillOpacity="0.2"/>
                <path d="M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="#166534"/>
                <path d="M12 12v6"/>
                <path d="M9 16c1.5 1 4.5 1 6 0"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold tracking-tight text-white leading-tight">
                  {currentDialect === 'pa' ? 'ਗ੍ਰਾਮਸੇਤੂ (GramSetu)' : currentDialect === 'mal' ? 'ग्रामसेतु मालवा' : 'ग्रामसेतु (GramSetu)'}
                </h1>
                <span className="hidden lg:inline-flex text-[11px] font-semibold bg-emerald-800 text-emerald-100 px-2 py-0.5 rounded border border-emerald-600/50">
                  OFFLINE-FIRST PWA
                </span>
              </div>
              <p className="text-xs text-emerald-100/80 leading-normal truncate max-w-xs sm:max-w-md">
                {strings.platformSubtitle}
              </p>
            </div>
          </div>

          {/* Quick Header Audio Read-Aloud Button */}
          <button
            onClick={handleReadHeader}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              isSpeaking
                ? 'bg-emerald-500 text-slate-950 border-emerald-300 animate-pulse'
                : 'bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 border-emerald-600/50'
            }`}
            title="Read header aloud in regional dialect"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Right Action Cluster: Voice-to-Action, Pictorial Mode, Dialect, Network Badge */}
        <div className="flex flex-wrap items-center justify-between md:justify-end gap-2 sm:gap-2.5">
          {/* 1. Speak to List Voice-to-Action CTA */}
          <button
            onClick={onOpenVoiceListing}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md active:scale-95 cursor-pointer ring-2 ring-emerald-300/40"
            title="Voice-Powered Smart Listing & AI Transcription"
          >
            <Mic className="w-3.5 h-3.5 text-slate-950" />
            <span>{strings.speakToList}</span>
          </button>

          {/* 2. Pictorial / Visual Mode Toggle */}
          <button
            onClick={onTogglePictorialMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
              isPictorialMode
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm font-bold'
                : 'bg-emerald-800/70 hover:bg-emerald-700 text-emerald-100 border-emerald-600/50'
            }`}
            title="Toggle high-recognition pictorial & emoji mode for low-literacy farmers"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>{isPictorialMode ? (isEnglish ? '🖼️ Pictorial Mode' : '🖼️ चित्रित मोड') : strings.pictorialMode}</span>
          </button>

          {/* 3. Dialect Switcher Dropdown */}
          <div className="flex items-center gap-1 bg-[#234d31] border border-emerald-600/50 rounded-full px-2.5 py-1 text-xs font-semibold text-emerald-100">
            <Globe className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
            <select
              value={currentDialect}
              onChange={(e) => onSelectDialect(e.target.value as SupportedDialect)}
              className="bg-transparent text-white font-bold cursor-pointer focus:outline-none pr-1 text-xs"
              title="Select local language / dialect"
            >
              <option value="hi" className="text-slate-900">हिंदी (Hindi)</option>
              <option value="mal" className="text-slate-900">मालवी (Malvi - MP)</option>
              <option value="pa" className="text-slate-900">ਪੰਜਾਬੀ (Punjabi)</option>
              <option value="bho" className="text-slate-900">भोजपुरी (Bhojpuri)</option>
              <option value="en" className="text-slate-900">English</option>
            </select>
          </div>

          {/* 4. Visual Network Indicator Badge */}
          <NetworkStatusBadge
            networkTier={networkTier}
            pendingDraftsCount={pendingDraftsCount}
            isSyncing={isSyncing}
            onSetNetworkMode={onSetNetworkMode}
            onSyncDrafts={onSyncDrafts}
            onOpenFallbackModal={onOpenFallbackModal}
            isEnglish={isEnglish}
            drafts={drafts}
          />
        </div>
      </div>

      {/* Low-Network Quick Notice Strip */}
      {networkTier !== 'ONLINE_FAST' && (
        <div className="bg-amber-500 text-slate-950 px-4 py-1.5 text-xs font-bold flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span>⚠️</span>
              <span>
                {networkTier === 'OFFLINE'
                  ? 'ऑफलाइन मोड: लिस्टिंग व गणनाएं स्थानीय स्टोरेज में सुरक्षित रहेंगी। इंटरनेट आते ही स्वतः प्रकाशित होंगी।'
                  : 'कमज़ोर सिग्नल (2G Mode): 600px कैनवस इमेज कंप्रेशन सक्रिय है ताकि धीमे नेटवर्क पर भी तुरंत अपलोड हो सके।'}
              </span>
            </span>
            <button
              onClick={onOpenFallbackModal}
              className="underline hover:text-black ml-2 whitespace-nowrap cursor-pointer"
            >
              {isEnglish ? 'Zero-Internet Help' : 'बिना नेट विकल्प'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
