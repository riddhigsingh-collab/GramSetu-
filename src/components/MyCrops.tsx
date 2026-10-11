import React, { useState } from 'react';
import { CropListing, ListingStatus } from '../types/profile';
import { useAudioNarrator } from '../utils/audioNarrator';
import { SupportedDialect } from '../utils/dialect';
import { Search, Plus, MapPin, Phone, Eye, Volume2, Sparkles, AlertCircle } from 'lucide-react';

interface MyCropsProps {
  crops: CropListing[];
  isEnglish: boolean;
  currentDialect: SupportedDialect;
  isPictorialMode: boolean;
  onAddCropClick: () => void;
  onUpdateCropStatus: (cropId: string, newStatus: ListingStatus) => void;
  onViewMandiComparison: (cropName: string) => void;
}

// Visual crop emojis
const CROP_EMOJIS: Record<string, string> = {
  'Sharbati Wheat': '🌾',
  'Basmati Rice': '🍚',
  'Mustard Seed': '🌻',
  'Organic Tomatoes': '🍅',
  'Desi Chickpeas': '🌱',
  'Potato': '🥔',
  'Cotton': '☁️',
  'Soybean': '🫘',
  'Onion': '🧅',
};

export const MyCrops: React.FC<MyCropsProps> = ({
  crops,
  isEnglish,
  currentDialect,
  isPictorialMode,
  onAddCropClick,
  onUpdateCropStatus,
  onViewMandiComparison,
}) => {
  const [filter, setFilter] = useState<'ALL' | ListingStatus>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCropDetails, setSelectedCropDetails] = useState<CropListing | null>(null);
  const { speak, isSpeaking } = useAudioNarrator();

  const handleReadCropAloud = (crop: CropListing) => {
    const text = isEnglish
      ? `${crop.nameEn}. Quantity: ${crop.totalQuantityKg} kg. Rate: ₹${crop.ratePerKg} per kg. Estimated farmer payout: ₹${crop.estimatedPayout}. Status: ${crop.status}. Location: ${crop.location}.`
      : `${crop.nameHi}। कुल मात्रा: ${crop.totalQuantityKg} किलो यानी ${crop.totalQuantityKg / 100} क्विंटल। भाव: ${crop.ratePerKg} रुपये किलो। कुल अनुमानित किसान भुगतान: ${crop.estimatedPayout} रुपये। स्थिति: ${crop.status === 'AVAILABLE' ? 'बिक्री हेतु उपलब्ध' : 'आरक्षित'}।`;
    speak(`Crop: ${crop.nameEn}`, text, currentDialect);
  };

  const filteredCrops = crops.filter((crop) => {
    const matchesFilter = filter === 'ALL' || crop.status === filter;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      crop.nameEn.toLowerCase().includes(query) ||
      crop.nameHi.toLowerCase().includes(query) ||
      crop.variety.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-5">
      {/* Section Header with Add Crop Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌾</span>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              {isEnglish ? 'My Crop Listings (फसल सूची)' : 'मेरी फसल लिस्टिंग (My Crops)'}
            </h3>
            {isPictorialMode && (
              <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300">
                🖼️ Pictorial Icons Enabled
              </span>
            )}
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            {isEnglish
              ? 'Direct farm-to-buyer active inventory with transparent mandi pricing & audio narration.'
              : 'बिचौलियों और दलालों के बिना सीधे किसान से थोक मूल्य पर फसल बिक्री।'}
          </p>
        </div>

        <button
          onClick={onAddCropClick}
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-[#166534] hover:bg-[#14532d] active:scale-95 text-white shadow-xs hover:shadow-md transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{isEnglish ? '+ Add New Crop Listing' : '+ अपनी फसल जोड़ें'}</span>
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isEnglish
                ? 'Search crop name, variety, or season...'
                : 'फसल, किस्म या सीजन खोजें...'
            }
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {(['ALL', 'AVAILABLE', 'RESERVED', 'SOLD_OUT'] as const).map((status) => {
            const count = status === 'ALL' ? crops.length : crops.filter((c) => c.status === status).length;
            const labels = {
              ALL: isEnglish ? 'All Crops' : 'सभी फसलें',
              AVAILABLE: isEnglish ? 'Available' : 'उपलब्ध',
              RESERVED: isEnglish ? 'In Negotiation' : 'आरक्षित/बातचीत',
              SOLD_OUT: isEnglish ? 'Sold Out' : 'बिक चुकी',
            };

            return (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  filter === status
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{labels[status]}</span>
                <span className={`ml-1.5 text-[11px] px-1.5 py-0.2 rounded-full ${
                  filter === status ? 'bg-emerald-950 text-emerald-200' : 'bg-slate-200 text-slate-700'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Crop Cards Grid */}
      {filteredCrops.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-10 text-center">
          <p className="text-sm font-semibold text-slate-700 mb-2">
            {isEnglish ? 'No crop listings found' : 'कोई फसल नहीं मिली'}
          </p>
          <p className="text-xs text-slate-500 mb-4">
            {isEnglish ? 'Try adjusting your search query or add a new crop listing.' : 'कृपया खोज शब्द बदलें या नई फसल जोड़ें।'}
          </p>
          <button
            onClick={onAddCropClick}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 cursor-pointer"
          >
            {isEnglish ? '+ Add Crop' : '+ फसल जोड़ें'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCrops.map((crop) => {
            const cropEmoji = CROP_EMOJIS[crop.nameEn] || '🌱';
            const statusConfig = {
              AVAILABLE: {
                label: 'AVAILABLE',
                bg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                pictorialDot: '🟢',
              },
              RESERVED: {
                label: 'RESERVED',
                bg: 'bg-amber-100 text-amber-800 border-amber-200',
                pictorialDot: '🟡',
              },
              SOLD_OUT: {
                label: 'SOLD OUT',
                bg: 'bg-slate-100 text-slate-700 border-slate-200',
                pictorialDot: '🔴',
              },
            }[crop.status];

            return (
              <div
                key={crop.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Photo Preview Container with Pictorial Badge */}
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden border-b border-slate-100">
                  <img
                    src={crop.image}
                    alt={crop.nameEn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />

                  {/* Pictorial Large Emoji Badge in Visual Mode */}
                  {isPictorialMode && (
                    <div className="absolute bottom-2 left-2 w-12 h-12 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg flex items-center justify-center text-3xl border border-emerald-300">
                      {cropEmoji}
                    </div>
                  )}

                  {/* Organic Badge & Variety Tag */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    {crop.isOrganic && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-900/90 text-white backdrop-blur-xs tracking-wider uppercase">
                        Organic ZBNF
                      </span>
                    )}
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-xs">
                      {crop.variety}
                    </span>
                  </div>

                  {/* Status Overlay */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border shadow-2xs ${statusConfig.bg}`}>
                      {isPictorialMode && <span className="mr-1">{statusConfig.pictorialDot}</span>}
                      {crop.status}
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  {/* Title & Audio Speaker Trigger */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {isPictorialMode && <span className="text-xl">{cropEmoji}</span>}
                        <h4 className="text-lg font-bold text-slate-900 tracking-tight">
                          {isEnglish ? crop.nameEn : `${crop.nameEn} (${crop.nameHi})`}
                        </h4>
                      </div>

                      {/* Prominent Audio Read-Aloud Speaker Button */}
                      <button
                        onClick={() => handleReadCropAloud(crop)}
                        className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors cursor-pointer"
                        title="Read this crop listing aloud"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-600 flex items-center gap-1.5">
                      <span className="font-semibold text-slate-800">Farmer:</span>
                      <span>Ramcharan Yadav</span>
                      <span className="text-slate-300">·</span>
                      <span className="flex items-center gap-1 text-slate-600 font-mono text-[11px]">
                        <Phone className="w-3 h-3 text-emerald-600" />
                        {crop.phone}
                      </span>
                    </p>

                    <p className="text-xs text-slate-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                      <span>{crop.location}</span>
                    </p>

                    <div className="text-xs text-amber-800 italic flex items-center gap-1 pt-0.5">
                      <span>🤝</span>
                      <span>
                        Assisted by: <span className="font-semibold">{crop.gramMitra}</span>
                      </span>
                    </div>
                  </div>

                  {/* Dashed Box Rate & Quantity (Exact Match to Screenshot) */}
                  <div className="border border-dashed border-emerald-300 bg-emerald-50/40 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                          RATE
                        </span>
                        <div className="text-xl font-extrabold text-emerald-900 tabular-nums">
                          ₹{crop.ratePerKg} <span className="text-xs font-normal text-slate-600">/ kg</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                          TOTAL QTY
                        </span>
                        <div className="text-xl font-extrabold text-slate-900 tabular-nums">
                          {crop.totalQuantityKg.toLocaleString('en-IN')}{' '}
                          <span className="text-xs font-normal text-slate-600">kg</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-dashed border-emerald-200/80 flex items-center justify-between text-xs">
                      <span className="text-emerald-800 font-medium">
                        {isEnglish ? 'Estimated Farmer Payout:' : 'Estimated Farmer Payout:'}
                      </span>
                      <span className="font-bold text-emerald-900 tabular-nums font-mono text-sm">
                        ₹{crop.estimatedPayout.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-1">
                    <button
                      onClick={() => setSelectedCropDetails(crop)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#166534] hover:bg-[#14532d] active:scale-98 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <span>🛒</span>
                      <span>{isEnglish ? 'Direct Buyer Inquiries / Details' : 'सीधे खरीदें / संपर्क विवरण'}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onViewMandiComparison(crop.nameEn)}
                        className="flex-1 py-1.5 px-2 text-[11px] font-medium rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        <Eye className="w-3 h-3 text-slate-500" />
                        <span>{isEnglish ? 'Compare Mandi Rate' : 'मंडी भाव जांचें'}</span>
                      </button>

                      <div className="relative">
                        <select
                          value={crop.status}
                          onChange={(e) => onUpdateCropStatus(crop.id, e.target.value as ListingStatus)}
                          className="py-1.5 px-2 text-[11px] font-semibold rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                          title="Change listing status"
                        >
                          <option value="AVAILABLE">Status: Available</option>
                          <option value="RESERVED">Status: Reserved</option>
                          <option value="SOLD_OUT">Status: Sold Out</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Crop Inquiry / Full Details Modal */}
      {selectedCropDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                  Direct Harvest Lot
                </span>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>{CROP_EMOJIS[selectedCropDetails.nameEn] || '🌾'}</span>
                  <span>{selectedCropDetails.nameEn} ({selectedCropDetails.nameHi})</span>
                </h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                {selectedCropDetails.status}
              </span>
            </div>

            <div className="h-44 rounded-xl overflow-hidden bg-slate-100">
              <img
                src={selectedCropDetails.image}
                alt={selectedCropDetails.nameEn}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                <span className="text-slate-500 block">Variety / Grade</span>
                <span className="font-bold text-slate-800">{selectedCropDetails.variety}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                <span className="text-slate-500 block">Harvest Date</span>
                <span className="font-bold text-slate-800">{selectedCropDetails.harvestDate}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                <span className="text-slate-500 block">Offered Rate</span>
                <span className="font-bold text-emerald-800">₹{selectedCropDetails.ratePerKg}/kg (₹{selectedCropDetails.ratePerQuintal}/Qtl)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                <span className="text-slate-500 block">Total Lot Value</span>
                <span className="font-bold text-emerald-800">₹{selectedCropDetails.estimatedPayout.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <span>Verified Direct Farm Gate Pickup Available</span>
              </div>
              <p className="text-emerald-800 text-[11px] leading-relaxed">
                Contact Farmer Ramcharan Yadav at +91 {selectedCropDetails.phone} or Gram Mitra {selectedCropDetails.gramMitra} to schedule lot sample quality inspection in Sehore.
              </p>
            </div>

            <button
              onClick={() => setSelectedCropDetails(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 cursor-pointer"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
