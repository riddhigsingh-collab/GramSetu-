import React, { useState } from 'react';
import { CropListing } from '../types/profile';
import { compressCropImage, CompressionResult } from '../utils/imageCompressor';
import { X, Plus, Sprout, Mic, Upload, Image as ImageIcon, CheckCircle, WifiOff } from 'lucide-react';
import cropWheatImg from '../assets/images/crop_wheat_1791720607990.jpg';
import cropRiceImg from '../assets/images/crop_rice_1791720617511.jpg';
import cropMustardImg from '../assets/images/crop_mustard_1791720627455.jpg';
import cropTomatoesImg from '../assets/images/crop_tomatoes_1791720637508.jpg';

interface AddCropModalProps {
  isOpen: boolean;
  isEnglish: boolean;
  isOffline: boolean;
  onClose: () => void;
  onAddCrop: (crop: CropListing, isDraft?: boolean) => void;
  onOpenVoiceAssistant?: () => void;
  prefillData?: Partial<CropListing>;
}

export const AddCropModal: React.FC<AddCropModalProps> = ({
  isOpen,
  isEnglish,
  isOffline,
  onClose,
  onAddCrop,
  onOpenVoiceAssistant,
  prefillData,
}) => {
  const [nameEn, setNameEn] = useState(prefillData?.nameEn || 'Sharbati Wheat');
  const [nameHi, setNameHi] = useState(prefillData?.nameHi || 'शरबती गेहूं');
  const [variety, setVariety] = useState(prefillData?.variety || 'C-306 Gold Grain');
  const [ratePerKg, setRatePerKg] = useState<number>(prefillData?.ratePerKg || 28.5);
  const [totalQuantityKg, setTotalQuantityKg] = useState<number>(prefillData?.totalQuantityKg || 2500);
  const [harvestDate, setHarvestDate] = useState(prefillData?.harvestDate || 'Harvest March 2026');
  const [isOrganic, setIsOrganic] = useState(prefillData?.isOrganic ?? true);
  const [selectedImage, setSelectedImage] = useState(prefillData?.image || cropWheatImg);

  // 2G Image compression state
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionStats, setCompressionStats] = useState<CompressionResult | null>(null);

  if (!isOpen) return null;

  const estimatedPayout = Math.round(ratePerKg * totalQuantityKg);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    try {
      const result = await compressCropImage(file, 600, 0.60);
      setCompressionStats(result);
      setSelectedImage(result.dataUrl);
    } catch (err) {
      console.error('Image compression error:', err);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCrop: CropListing = {
      id: `crop-${Date.now()}`,
      nameEn,
      nameHi,
      image: selectedImage,
      ratePerKg,
      ratePerQuintal: ratePerKg * 100,
      totalQuantityKg,
      harvestDate,
      status: 'AVAILABLE',
      estimatedPayout,
      gramMitra: 'Mohan (Gram Mitra)',
      location: 'Pipariya, Sehore (Madhya Pradesh)',
      phone: '9876543210',
      variety,
      isOrganic,
    };
    onAddCrop(newCrop, isOffline);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-4 my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Sprout className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {isEnglish ? 'Add New Crop Listing' : 'नई फसल लिस्टिंग जोड़ें'}
              </h3>
              <p className="text-xs text-slate-500">
                {isEnglish ? 'Direct farm-to-buyer listing with 2G photo compression' : 'थोक खरीदारों हेतु सीधी फसल बिक्री सूची बनाएं'}
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

        {/* Offline Notification Badge if Offline */}
        {isOffline && (
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-300 text-xs text-amber-900 flex items-start gap-2">
            <WifiOff className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold block">
                {isEnglish ? 'Offline Mode Active' : 'ऑफलाइन मोड सक्रिय'}
              </strong>
              <span>
                {isEnglish
                  ? 'Listing will be saved locally as an Offline Draft in browser storage. It will automatically publish when network connectivity returns.'
                  : 'यह लिस्टिंग स्थानीय ब्राउज़र में "ऑफलाइन ड्राफ्ट" के रूप में सुरक्षित होगी। इंटरनेट चालू होते ही स्वतः प्रकाशित हो जाएगी।'}
              </span>
            </div>
          </div>
        )}

        {/* Quick Voice Auto-Fill CTA */}
        {onOpenVoiceAssistant && (
          <div className="flex items-center justify-between p-3 bg-emerald-50/70 border border-emerald-200/90 rounded-2xl">
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-emerald-700 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-950">
                {isEnglish ? 'Prefer to speak instead of typing?' : 'लिखने के बजाय बोलकर भरना चाहते हैं?'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenVoiceAssistant();
              }}
              className="px-3 py-1 text-xs font-bold bg-[#166534] text-white rounded-lg hover:bg-[#14532d] cursor-pointer"
            >
              🎤 {isEnglish ? 'Speak to Fill' : 'बोलकर भरें'}
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isEnglish ? 'Crop Name (English)' : 'फसल का नाम (अंग्रेज़ी)'} *
              </label>
              <input
                type="text"
                required
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isEnglish ? 'Crop Name (Hindi)' : 'फसल का नाम (हिन्दी)'} *
              </label>
              <input
                type="text"
                required
                value={nameHi}
                onChange={(e) => setNameHi(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isEnglish ? 'Variety / Grade' : 'किस्म / वैरायटी'}
              </label>
              <input
                type="text"
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isEnglish ? 'Harvest Month' : 'कटाई समय'}
              </label>
              <input
                type="text"
                value={harvestDate}
                onChange={(e) => setHarvestDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Pricing & Qty */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isEnglish ? 'Offered Rate (₹ / kg)' : 'अपेक्षित दर (₹/किग्रा)'} *
              </label>
              <input
                type="number"
                step="0.5"
                min="1"
                required
                value={ratePerKg}
                onChange={(e) => setRatePerKg(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs font-mono font-bold rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isEnglish ? 'Total Quantity (kg)' : 'उपज मात्रा (किग्रा)'} *
              </label>
              <input
                type="number"
                min="10"
                step="50"
                required
                value={totalQuantityKg}
                onChange={(e) => setTotalQuantityKg(parseInt(e.target.value, 10) || 0)}
                className="w-full px-3 py-2 text-xs font-mono font-bold rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Client-Side Image Compression for 2G Networks */}
          <div className="space-y-2 p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-emerald-700" />
                <span>{isEnglish ? 'Upload Crop Photo (2G Auto-Compressor)' : 'फोटो अपलोड (2G कैनवस कंप्रेशन)'}</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                MAX 600px / 60% JPEG
              </span>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white border border-dashed border-slate-300 rounded-xl hover:border-emerald-500 hover:bg-emerald-50/30 transition-all cursor-pointer text-xs font-medium text-slate-700">
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                <span>{isCompressing ? 'Compressing on canvas...' : 'Take or Choose Photo (5MB+ OK)'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Live 2G Compression Stats Feedback */}
            {compressionStats && (
              <div className="p-2.5 bg-emerald-100/70 border border-emerald-300 rounded-xl text-xs text-emerald-950 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    Compressed: <strong className="font-mono">{compressionStats.originalSizeKb} KB ➡️ {compressionStats.compressedSizeKb} KB</strong> ({compressionStats.savingsPercentage}% bandwidth saved!)
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-800">2G READY</span>
              </div>
            )}
          </div>

          {/* Quick Preset Photos */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              {isEnglish ? 'Or select library harvest photo:' : 'या उपलब्ध नमूना फोटो चुनें:'}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { img: cropWheatImg, label: 'Wheat' },
                { img: cropRiceImg, label: 'Paddy' },
                { img: cropMustardImg, label: 'Mustard' },
                { img: cropTomatoesImg, label: 'Tomatoes' },
              ].map((item, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setSelectedImage(item.img)}
                  className={`relative rounded-xl overflow-hidden h-14 border-2 transition-all cursor-pointer ${
                    selectedImage === item.img
                      ? 'border-emerald-600 ring-2 ring-emerald-500/30'
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={item.img} alt={item.label} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Real-time Estimated Payout */}
          <div className="p-3.5 bg-emerald-50 border border-emerald-200/90 rounded-xl flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-950">
              {isEnglish ? 'Calculated Gross Payout:' : 'अनुमानित कुल किसान भुगतान:'}
            </span>
            <span className="text-base font-black font-mono text-emerald-900">
              ₹{estimatedPayout.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl cursor-pointer"
            >
              {isEnglish ? 'Cancel' : 'रद्द करें'}
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-[#166534] hover:bg-[#14532d] rounded-xl shadow-xs cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>{isOffline ? (isEnglish ? 'Save as Offline Draft' : 'ऑफलाइन ड्राफ्ट सुरक्षित करें') : (isEnglish ? 'Publish Crop Listing' : 'लिस्टिंग प्रकाशित करें')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
