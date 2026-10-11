import React, { useState } from 'react';
import { Phone, MessageSquare, Users, Copy, Check, X, SignalZero } from 'lucide-react';

interface OfflineGuidanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEnglish: boolean;
}

export const OfflineGuidanceModal: React.FC<OfflineGuidanceModalProps> = ({
  isOpen,
  onClose,
  isEnglish,
}) => {
  const [copiedSms, setCopiedSms] = useState(false);

  if (!isOpen) return null;

  const smsTemplate = 'SELL WHEAT 50 QTL 2800 SEHORE';

  const handleCopySms = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(smsTemplate);
      setCopiedSms(true);
      setTimeout(() => setCopiedSms(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <SignalZero className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {isEnglish ? 'Zero Internet & Low Signal Fallbacks' : 'कम नेटवर्क? बिना इंटरनेट के उपयोग करें'}
              </h3>
              <p className="text-xs text-slate-500">
                {isEnglish
                  ? 'Access GramSetu crop listing & mandi prices without data'
                  : 'बिना डेटा या कमजोर नेटवर्क में भी फसल बिक्री व भाव की सुविधा'}
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

        {/* 3 Low-Tech Options */}
        <div className="space-y-4">
          {/* Option A: Toll-Free IVR */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/90 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
                <Phone className="w-4 h-4 text-emerald-700" />
                <span>{isEnglish ? 'Option 1: Toll-Free IVR Voice Listing' : 'विकल्प 1: टोल-फ्री IVR फोन लिस्टिंग (आवाज द्वारा)'}</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                FREE CALL
              </span>
            </div>
            <div className="text-xl font-black font-mono text-emerald-900">
              1800-180-1551 <span className="text-xs font-normal text-slate-600">/ 1800-472-6738</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {isEnglish
                ? 'Dial from any basic feature phone. Automated Indic voice prompt guides you: Press 1 to list wheat, speak quantity & price. Automatically lists your crop.'
                : 'साधारण कीपैड फोन से डायल करें। स्वचालित आवाज पूछेगी: गेहूं के लिए 1 दबाएं, मात्रा व भाव बोलें। आपकी फसल तुरंत पंजीकृत हो जाएगी।'}
            </p>
          </div>

          {/* Option B: SMS Gateway */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/90 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-950">
                <MessageSquare className="w-4 h-4 text-blue-700" />
                <span>{isEnglish ? 'Option 2: Offline SMS Gateway' : 'विकल्प 2: ऑफलाइन एसएमएस गेटवे (बिना इंटरनेट)'}</span>
              </div>
              <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                TO: 56767
              </span>
            </div>
            <div className="bg-white rounded-lg p-2.5 border border-blue-200 flex items-center justify-between">
              <code className="text-xs font-bold font-mono text-blue-900">{smsTemplate}</code>
              <button
                type="button"
                onClick={handleCopySms}
                className="flex items-center gap-1 text-[11px] font-semibold text-blue-700 hover:text-blue-900 bg-blue-50 px-2 py-1 rounded cursor-pointer"
              >
                {copiedSms ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSms ? 'Copied' : 'Copy Text'}</span>
              </button>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {isEnglish
                ? 'Send format: "SELL [CROP] [QTY IN QTL] [EXPECTED RATE] [TEHSIL/VILLAGE]" to 56767. Gateway replies with confirmation code within 30 seconds.'
                : 'संदेश भेजें: "SELL WHEAT 50 QTL 2800 SEHORE" को 56767 पर। सिस्टम से 30 सेकंड में पुष्टिकरण कोड प्राप्त होगा।'}
            </p>
          </div>

          {/* Option C: Gram Mitra Assisted Offline Sync */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/90 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-950">
                <Users className="w-4 h-4 text-amber-700" />
                <span>{isEnglish ? 'Option 3: Gram Mitra Chaupal Sync' : 'विकल्प 3: ग्राम मित्र चौपाल ऑफलाइन सिंक'}</span>
              </div>
              <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                FIELD AGENT
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {isEnglish
                ? 'Assigned agent Mohan visits Pipariya village every Tuesday & Friday with an offline-cached tablet. Your in-app drafts are collected via peer-to-peer Wi-Fi hotspot and batch-synced at the mandi tower.'
                : 'ग्राम मित्र मोहन हर मंगलवार व शुक्रवार को पिपरिया चौपाल आते हैं। आपके फोन में सहेजे गए ड्राफ्ट बिना इंटरनेट के उनके टैब में सिंक होकर मंडी सर्वर पर चढ़ जाते हैं।'}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 cursor-pointer"
        >
          {isEnglish ? 'Got it, Close' : 'समझ गए, बंद करें'}
        </button>
      </div>
    </div>
  );
};
