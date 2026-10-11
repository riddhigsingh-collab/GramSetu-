import React, { useState } from 'react';
import { FarmerProfile } from '../types/profile';
import { X, Check, AlertCircle, RotateCcw, User, MapPin, Phone, Building2, Sprout } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  profile: FarmerProfile;
  isEnglish: boolean;
  onClose: () => void;
  onSave: (updatedProfile: Partial<FarmerProfile>) => void;
  onResetToDefault: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  profile,
  isEnglish,
  onClose,
  onSave,
  onResetToDefault,
}) => {
  const [formData, setFormData] = useState({
    name: profile.name,
    nameHi: profile.nameHi,
    farmName: profile.farmName,
    farmNameHi: profile.farmNameHi,
    phone: profile.phone,
    village: profile.village,
    district: profile.district,
    state: profile.state,
    cultivatedLandAcres: profile.cultivatedLandAcres,
    irrigatedLandAcres: profile.irrigatedLandAcres,
    irrigationMethod: profile.irrigationMethod,
    farmingTechnique: profile.farmingTechnique,
    bio: profile.bio,
    bioHi: profile.bioHi,
    cropsGrown: [...profile.cropsGrown],
  });

  const [newCropInput, setNewCropInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.name.trim()) {
      errs.name = isEnglish ? 'Farmer name is required' : 'किसान का नाम आवश्यक है';
    }
    if (!formData.farmName.trim()) {
      errs.farmName = isEnglish ? 'Farm name is required' : 'फार्म का नाम आवश्यक है';
    }
    if (!/^\d{10}$/.test(formData.phone.trim())) {
      errs.phone = isEnglish ? 'Valid 10-digit mobile number required' : '10 अंकों का मान्य मोबाइल नंबर दर्ज करें';
    }
    if (!formData.village.trim()) {
      errs.village = isEnglish ? 'Village is required' : 'गांव का नाम आवश्यक है';
    }
    if (formData.cultivatedLandAcres <= 0) {
      errs.cultivatedLandAcres = isEnglish ? 'Land must be greater than 0' : 'भूमि 0 से अधिक होनी चाहिए';
    }
    if (formData.irrigatedLandAcres > formData.cultivatedLandAcres) {
      errs.irrigatedLandAcres = isEnglish ? 'Irrigated land cannot exceed total land' : 'सिंचित भूमि कुल भूमि से अधिक नहीं हो सकती';
    }
    if (!formData.bio.trim() || formData.bio.trim().length < 15) {
      errs.bio = isEnglish ? 'Bio must be at least 15 characters' : 'परिचय कम से कम 15 अक्षरों का होना चाहिए';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
      onClose();
    }
  };

  const handleAddCrop = () => {
    if (newCropInput.trim() && !formData.cropsGrown.includes(newCropInput.trim())) {
      setFormData({
        ...formData,
        cropsGrown: [...formData.cropsGrown, newCropInput.trim()],
      });
      setNewCropInput('');
    }
  };

  const handleRemoveCrop = (cropToRemove: string) => {
    setFormData({
      ...formData,
      cropsGrown: formData.cropsGrown.filter((c) => c !== cropToRemove),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {isEnglish ? 'Edit Farmer Profile' : 'किसान प्रोफाइल संपादित करें'}
              </h3>
              <p className="text-xs text-slate-500">
                {isEnglish
                  ? 'Update verified farming credentials, land records & contact info'
                  : 'कृषि विवरण, भूमि जोत एवं संपर्क जानकारी अद्यतन करें'}
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          {/* General Alert */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block">
                {isEnglish ? 'Demo Prototype Persistence' : 'डेमो प्रोटोटाइप सूचना'}
              </strong>
              <span>
                {isEnglish
                  ? 'Changes will update live in your current preview session. No external database is modified.'
                  : 'परिवर्तन वर्तमान पूर्वावलोकन सत्र में तुरंत प्रभावी होंगे।'}
              </span>
            </div>
          </div>

          {/* Section: Farmer Identity */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-700" />
              <span>{isEnglish ? 'Basic Identity' : 'मूल पहचान'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isEnglish ? 'Farmer Name (English)' : 'किसान का नाम (अंग्रेज़ी)'} *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3 py-2 text-xs rounded-xl border ${
                    errors.name ? 'border-rose-500 bg-rose-50/30' : 'border-slate-300'
                  } focus:ring-2 focus:ring-emerald-500 focus:outline-none`}
                />
                {errors.name && <p className="text-[11px] text-rose-600 mt-0.5">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isEnglish ? 'Farmer Name (Hindi)' : 'किसान का नाम (हिन्दी)'}
                </label>
                <input
                  type="text"
                  value={formData.nameHi}
                  onChange={(e) => setFormData({ ...formData, nameHi: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isEnglish ? 'Mobile Phone (10 digits)' : 'मोबाइल नंबर (10 अंक)'} *
                </label>
                <input
                  type="text"
                  maxLength={10}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                  className={`w-full px-3 py-2 text-xs rounded-xl border font-mono ${
                    errors.phone ? 'border-rose-500 bg-rose-50/30' : 'border-slate-300'
                  } focus:ring-2 focus:ring-emerald-500 focus:outline-none`}
                />
                {errors.phone && <p className="text-[11px] text-rose-600 mt-0.5">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isEnglish ? 'Farm Entity / Name' : 'फार्म का नाम'} *
                </label>
                <input
                  type="text"
                  value={formData.farmName}
                  onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                  className={`w-full px-3 py-2 text-xs rounded-xl border ${
                    errors.farmName ? 'border-rose-500 bg-rose-50/30' : 'border-slate-300'
                  } focus:ring-2 focus:ring-emerald-500 focus:outline-none`}
                />
                {errors.farmName && <p className="text-[11px] text-rose-600 mt-0.5">{errors.farmName}</p>}
              </div>
            </div>
          </div>

          {/* Section: Location */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>{isEnglish ? 'Village & Location' : 'गांव एवं पता'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isEnglish ? 'Village / Gram' : 'ग्राम / गांव'} *
                </label>
                <input
                  type="text"
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  className={`w-full px-3 py-2 text-xs rounded-xl border ${
                    errors.village ? 'border-rose-500 bg-rose-50/30' : 'border-slate-300'
                  } focus:ring-2 focus:ring-emerald-500 focus:outline-none`}
                />
                {errors.village && <p className="text-[11px] text-rose-600 mt-0.5">{errors.village}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isEnglish ? 'District' : 'जिला'}
                </label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isEnglish ? 'State' : 'राज्य'}
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section: Land & Agricultural Operations */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Sprout className="w-3.5 h-3.5 text-emerald-700" />
              <span>{isEnglish ? 'Land & Cultivation Details' : 'जोत एवं कृषि विवरण'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isEnglish ? 'Total Cultivated Land (Acres)' : 'कुल कृषि रकबा (एकड़)'} *
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={formData.cultivatedLandAcres}
                  onChange={(e) =>
                    setFormData({ ...formData, cultivatedLandAcres: parseFloat(e.target.value) || 0 })
                  }
                  className={`w-full px-3 py-2 text-xs rounded-xl border ${
                    errors.cultivatedLandAcres ? 'border-rose-500 bg-rose-50/30' : 'border-slate-300'
                  } focus:ring-2 focus:ring-emerald-500 focus:outline-none`}
                />
                {errors.cultivatedLandAcres && (
                  <p className="text-[11px] text-rose-600 mt-0.5">{errors.cultivatedLandAcres}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isEnglish ? 'Irrigated Land (Acres)' : 'सिंचित रकबा (एकड़)'}
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.irrigatedLandAcres}
                  onChange={(e) =>
                    setFormData({ ...formData, irrigatedLandAcres: parseFloat(e.target.value) || 0 })
                  }
                  className={`w-full px-3 py-2 text-xs rounded-xl border ${
                    errors.irrigatedLandAcres ? 'border-rose-500 bg-rose-50/30' : 'border-slate-300'
                  } focus:ring-2 focus:ring-emerald-500 focus:outline-none`}
                />
                {errors.irrigatedLandAcres && (
                  <p className="text-[11px] text-rose-600 mt-0.5">{errors.irrigatedLandAcres}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isEnglish ? 'Irrigation Method' : 'सिंचाई पद्धति'}
                </label>
                <select
                  value={formData.irrigationMethod}
                  onChange={(e) => setFormData({ ...formData, irrigationMethod: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="Solar Drip & Canal Fed">Solar Drip & Canal Fed</option>
                  <option value="Borewell & Sprinkler">Borewell & Sprinkler</option>
                  <option value="Canal Gravity Flow">Canal Gravity Flow</option>
                  <option value="Rainfed (Barani)">Rainfed (Barani)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isEnglish ? 'Farming Technique' : 'कृषि पद्धति'}
                </label>
                <select
                  value={formData.farmingTechnique}
                  onChange={(e) => setFormData({ ...formData, farmingTechnique: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="ZBNF & Natural Organic Practices">ZBNF & Natural Organic Practices</option>
                  <option value="Certified NPOP Organic">Certified NPOP Organic</option>
                  <option value="Integrated Pest Management (IPM)">Integrated Pest Management (IPM)</option>
                  <option value="Conventional Sustainable">Conventional Sustainable</option>
                </select>
              </div>
            </div>

            {/* Crops Grown Multi-Tag Editor */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isEnglish ? 'Crops Grown (Add / Remove)' : 'उत्पादित फसलें'}
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {formData.cropsGrown.map((crop) => (
                  <span
                    key={crop}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-slate-100 text-slate-800 border border-slate-200"
                  >
                    <span>{crop}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCrop(crop)}
                      className="text-slate-400 hover:text-rose-600 cursor-pointer ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCropInput}
                  onChange={(e) => setNewCropInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCrop();
                    }
                  }}
                  placeholder={isEnglish ? 'e.g. Maize, Mustard, Garlic...' : 'उदा. मक्का, सरसों, लहसुन...'}
                  className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddCrop}
                  className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 cursor-pointer"
                >
                  + Add Tag
                </button>
              </div>
            </div>
          </div>

          {/* Section: Farmer Bio */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-700">
              {isEnglish ? 'Farmer Introduction / Legacy Bio' : 'किसान परिचय एवं विशेषता'} *
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className={`w-full px-3 py-2 text-xs rounded-xl border ${
                errors.bio ? 'border-rose-500 bg-rose-50/30' : 'border-slate-300'
              } focus:ring-2 focus:ring-emerald-500 focus:outline-none`}
            />
            {errors.bio && <p className="text-[11px] text-rose-600">{errors.bio}</p>}
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onResetToDefault}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isEnglish ? 'Restore Baseline Demo' : 'मूल डेमो रीसेट करें'}</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl cursor-pointer"
              >
                {isEnglish ? 'Cancel' : 'रद्द करें'}
              </button>
              <button
                type="submit"
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-[#166534] hover:bg-[#14532d] rounded-xl shadow-xs cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{isEnglish ? 'Save Profile' : 'सुरक्षित करें'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
