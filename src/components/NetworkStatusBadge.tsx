import React, { useState } from 'react';
import { NetworkTier, OfflineDraft } from '../utils/offlineStorage';
import { Wifi, WifiOff, SignalLow, RefreshCw, Smartphone, Radio, X, CheckCircle, Database } from 'lucide-react';

interface NetworkStatusBadgeProps {
  networkTier: NetworkTier;
  pendingDraftsCount: number;
  isSyncing: boolean;
  onSetNetworkMode: (mode: NetworkTier) => void;
  onSyncDrafts: () => void;
  onOpenFallbackModal: () => void;
  isEnglish: boolean;
  drafts: OfflineDraft[];
}

export const NetworkStatusBadge: React.FC<NetworkStatusBadgeProps> = ({
  networkTier,
  pendingDraftsCount,
  isSyncing,
  onSetNetworkMode,
  onSyncDrafts,
  onOpenFallbackModal,
  isEnglish,
  drafts,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const config = {
    ONLINE_FAST: {
      label: isEnglish ? 'Online (Fast)' : 'ऑनलाइन (तेज़ 4G/5G)',
      badgeClass: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60 hover:bg-emerald-900',
      dotClass: 'bg-emerald-400',
      icon: <Wifi className="w-3 h-3 text-emerald-400" />,
    },
    '2G_WEAK': {
      label: isEnglish ? '2G / Weak Signal Mode' : '2G / कमज़ोर सिग्नल मोड',
      badgeClass: 'bg-amber-950/80 text-amber-300 border-amber-700/60 hover:bg-amber-900',
      dotClass: 'bg-amber-400',
      icon: <SignalLow className="w-3 h-3 text-amber-400" />,
    },
    OFFLINE: {
      label: isEnglish ? 'Offline Mode (Drafts Enabled)' : 'ऑफलाइन मोड (ड्राफ्ट सक्रिय)',
      badgeClass: 'bg-rose-950/80 text-rose-300 border-rose-700/60 hover:bg-rose-900 animate-pulse',
      dotClass: 'bg-rose-400',
      icon: <WifiOff className="w-3 h-3 text-rose-400" />,
    },
  }[networkTier];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${config.badgeClass}`}
        title="Click to inspect network tier & offline drafts"
      >
        <span className={`w-2 h-2 rounded-full ${config.dotClass}`} />
        <span className="hidden sm:inline">{config.label}</span>
        <span className="sm:hidden">{networkTier === 'OFFLINE' ? 'Offline' : networkTier === '2G_WEAK' ? '2G' : 'Online'}</span>
        {pendingDraftsCount > 0 && (
          <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full ml-0.5">
            {pendingDraftsCount}
          </span>
        )}
      </button>

      {/* Network Strategy & Offline Management Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {isEnglish ? 'Rural Network & Offline Sync Control' : 'ग्रामीण नेटवर्क व ऑफलाइन सिंक नियंत्रण'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isEnglish ? 'Service Worker & Low-Bandwidth Management' : 'कम बैंडविड्थ व बिना इंटरनेट सुविधा'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Test Simulation Controls */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                {isEnglish ? 'Simulate Network Connectivity (For Testing)' : 'नेटवर्क स्थिति बदलें (परीक्षण हेतु)'}:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => onSetNetworkMode('ONLINE_FAST')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    networkTier === 'ONLINE_FAST'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/30'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Wifi className="w-4 h-4 text-emerald-600" />
                  <span>Online Fast</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSetNetworkMode('2G_WEAK')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    networkTier === '2G_WEAK'
                      ? 'border-amber-600 bg-amber-50 text-amber-900 ring-2 ring-amber-500/30'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <SignalLow className="w-4 h-4 text-amber-600" />
                  <span>2G / Weak</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSetNetworkMode('OFFLINE')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    networkTier === 'OFFLINE'
                      ? 'border-rose-600 bg-rose-50 text-rose-900 ring-2 ring-rose-500/30'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <WifiOff className="w-4 h-4 text-rose-600" />
                  <span>Offline</span>
                </button>
              </div>
            </div>

            {/* Offline Drafts Queue */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <Database className="w-4 h-4 text-emerald-700" />
                  <span>
                    {isEnglish ? 'Pending Offline Drafts' : 'लंबित ऑफलाइन ड्राफ्ट'}{' '}
                    <span className="font-mono text-emerald-800">({pendingDraftsCount})</span>
                  </span>
                </div>
                {pendingDraftsCount > 0 && networkTier !== 'OFFLINE' && (
                  <button
                    onClick={onSyncDrafts}
                    disabled={isSyncing}
                    className="flex items-center gap-1 text-[11px] font-bold text-white bg-emerald-700 hover:bg-emerald-800 px-2.5 py-1 rounded-lg transition-all cursor-pointer"
                  >
                    <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
                  </button>
                )}
              </div>

              {drafts.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No offline drafts pending.</p>
              ) : (
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {drafts.map((d) => (
                    <div
                      key={d.id}
                      className="p-2 rounded-lg bg-white border border-slate-200/80 text-xs flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-slate-900">{d.title}</div>
                        <div className="text-[11px] text-slate-500">{d.summary}</div>
                      </div>
                      <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                        Pending
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* PWA & Service Worker Cache Info */}
            <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/80 text-xs text-emerald-950 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-700" />
                <span>PWA Service Worker & App Shell Active</span>
              </div>
              <p className="text-emerald-800 text-[11px] leading-relaxed">
                App shell, styling, offline listings cache, and Indic voice models are preserved locally. You can refresh or browse without internet connectivity.
              </p>
            </div>

            {/* Non-Internet Fallback Button */}
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenFallbackModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-800 transition-colors cursor-pointer"
            >
              <Smartphone className="w-4 h-4 text-slate-600" />
              <span>{isEnglish ? 'View Zero-Internet IVR & SMS Options' : 'बिना इंटरनेट के फोन व एसएमएस विकल्प देखें'}</span>
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
