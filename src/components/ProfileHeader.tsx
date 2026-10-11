import React, { useState } from 'react';
import { FarmerProfile } from '../types/profile';
import { MapPin, Phone, UserCheck, Edit3, Share2, Award, ShieldCheck, Check, Sparkles, QrCode, Volume2 } from 'lucide-react';
import { useAudioNarrator } from '../utils/audioNarrator';
import { SupportedDialect } from '../utils/dialect';

interface ProfileHeaderProps {
  profile: FarmerProfile;
  isEnglish: boolean;
  currentDialect?: SupportedDialect;
  onEditClick: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, isEnglish, currentDialect = 'hi', onEditClick }) => {
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const { speak, isSpeaking } = useAudioNarrator();

  const handleReadBio = () => {
    const text = isEnglish
      ? `${profile.name}. ${profile.farmName}. Cultivated land: ${profile.cultivatedLandAcres} acres in ${profile.village}, ${profile.district}. ${profile.bio}`
      : `${profile.nameHi}। ${profile.farmNameHi}। कुल जोत: ${profile.cultivatedLandAcres} एकड़, गांव ${profile.village}, ${profile.district}। ${profile.bioHi}`;
    speak(`Farmer Bio: ${profile.name}`, text, currentDialect);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`GramSetu Farmer Profile: ${profile.name} - ${profile.village}, ${profile.district}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 relative overflow-hidden transition-all">
      {/* Subtle decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600" />

      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        {/* Left: Avatar & Farmer Information */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar Container with resilient fallback */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-emerald-500/30 bg-emerald-50 shadow-md">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback container in case of error
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div
              className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-1.5 rounded-full shadow-md border-2 border-white"
              title="Verified Farmer Identity"
            >
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          {/* Farmer Details */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {isEnglish ? profile.name : `${profile.nameHi} (${profile.name})`}
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                {isEnglish ? 'Verified Farmer' : 'सत्यापित किसान'}
              </span>
              <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                ID: {profile.id}
              </span>
            </div>

            {/* Farm Name & Location */}
            <p className="text-sm font-semibold text-emerald-900 flex items-center gap-1.5">
              <span>{isEnglish ? profile.farmName : profile.farmNameHi}</span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-normal text-slate-600">
                {profile.cultivatedLandAcres} {isEnglish ? 'Acres Cultivated' : 'एकड़ कृषि भूमि'}
              </span>
            </p>

            {/* Location & Contact Meta */}
            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-600 pt-0.5">
              <div className="flex items-center gap-1 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>
                  {profile.village}, {profile.district} ({profile.state})
                </span>
              </div>
              <div className="flex items-center gap-1 font-mono text-slate-700">
                <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>+91 {profile.phone}</span>
                <span className="text-[10px] text-emerald-700 font-sans font-medium bg-emerald-100/60 px-1 rounded">
                  OTP Verified
                </span>
              </div>
            </div>

            {/* Assisted by Gram Mitra Tag (Exact motif from screenshot) */}
            <div className="flex items-center gap-1.5 text-xs text-amber-800 bg-amber-50/80 border border-amber-200/60 px-2.5 py-1 rounded-lg w-fit mt-1">
              <span>🤝</span>
              <span className="font-medium">
                {isEnglish ? 'Assisted by: ' : 'सहायक: '}
                <strong className="font-semibold text-amber-950">{profile.assignedGramMitra.name}</strong>
              </span>
              <span className="text-amber-600/70">·</span>
              <span className="text-[11px] text-amber-700">{profile.assignedGramMitra.hub}</span>
            </div>
          </div>
        </div>

        {/* Right: Actions (Edit Profile & Share/QR) */}
        <div className="flex flex-row lg:flex-col items-center lg:items-end gap-2.5 shrink-0 pt-2 lg:pt-0">
          <button
            onClick={onEditClick}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#166534] hover:bg-[#14532d] active:scale-95 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
          >
            <Edit3 className="w-4 h-4" />
            <span>{isEnglish ? 'Edit Profile' : 'प्रोफाइल संपादित करें'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQrModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              title="Show Kisan Digital Card QR"
            >
              <QrCode className="w-3.5 h-3.5 text-slate-600" />
              <span>{isEnglish ? 'Kisan QR' : 'किसान क्यूआर'}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              title="Share profile link"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">{isEnglish ? 'Copied!' : 'कॉपी हुआ!'}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-600" />
                  <span>{isEnglish ? 'Share' : 'शेयर करें'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Farmer Introduction / Bio */}
      <div className="mt-5 pt-4 border-t border-slate-100">
        <div className="flex items-start gap-2">
          <div className="text-slate-400 mt-0.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                {isEnglish ? 'Farmer Introduction & Crop Legacy' : 'किसान परिचय एवं कृषि विशेषता'}
              </span>
              <button
                type="button"
                onClick={handleReadBio}
                className="flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-0.5 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
                title="Listen to Farmer Bio"
              >
                <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>{isEnglish ? 'Read Aloud' : 'सुनिए'}</span>
              </button>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed max-w-4xl">
              {isEnglish ? profile.bio : profile.bioHi}
            </p>
          </div>
        </div>
      </div>

      {/* Kisan QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {isEnglish ? 'GramSetu Digital Kisan Pass' : 'ग्रामसेतु डिजिटल किसान पास'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {profile.name} • {profile.village}, {profile.district}
            </p>

            {/* Simulated Clean SVG QR Code */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 inline-block shadow-inner mb-4">
              <div className="w-44 h-44 bg-slate-900 rounded-lg p-2 flex flex-col justify-between items-center text-white">
                <div className="flex justify-between w-full">
                  <div className="w-10 h-10 border-4 border-white bg-slate-900 rounded-sm"></div>
                  <div className="w-10 h-10 border-4 border-white bg-slate-900 rounded-sm"></div>
                </div>
                <div className="font-mono text-[10px] tracking-widest text-emerald-300">
                  GRAMSETU:VERIFIED
                </div>
                <div className="flex justify-between w-full">
                  <div className="w-10 h-10 border-4 border-white bg-slate-900 rounded-sm"></div>
                  <div className="w-6 h-6 bg-emerald-400 rounded-xs"></div>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-5 leading-normal">
              {isEnglish
                ? 'Buyers can scan this QR at APMC Mandis or Farm Gates to inspect verified harvest lots.'
                : 'मंडी आढ़ती या व्यापारी खेत पर आकर इस क्यूआर को स्कैन कर सत्यापित फसल विवरण देख सकते हैं।'}
            </p>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 text-xs font-semibold rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors"
            >
              {isEnglish ? 'Close Pass' : 'बंद करें'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
