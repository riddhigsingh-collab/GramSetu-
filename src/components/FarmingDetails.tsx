import React from 'react';
import { FarmerProfile } from '../types/profile';
import { Sprout, LandPlot, Droplets, ShieldCheck, Sun, Warehouse } from 'lucide-react';

interface FarmingDetailsProps {
  profile: FarmerProfile;
  isEnglish: boolean;
}

export const FarmingDetails: React.FC<FarmingDetailsProps> = ({ profile, isEnglish }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Sprout className="w-5 h-5 text-emerald-600" />
            <span>{isEnglish ? 'Farming & Land Operations' : 'कृषि भूमि एवं परिचालन विवरण'}</span>
          </h3>
          <p className="text-xs text-slate-500">
            {isEnglish
              ? 'Verified agricultural profile, land holdings, and cultivation techniques.'
              : 'सत्यापित कृषि प्रोफ़ाइल, जोत का रकबा और जैविक/पारंपरिक खेती की तकनीकें।'}
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
          {isEnglish ? 'Panchayat Geo-Tagged' : 'पंचायत स्तर पर सत्यापित'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Farm Name & Registration */}
        <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/70 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <Warehouse className="w-4 h-4 text-emerald-600" />
            <span>{isEnglish ? 'Farm Entity' : 'फार्म का नाम व इकाई'}</span>
          </div>
          <div className="text-base font-bold text-slate-900">
            {isEnglish ? profile.farmName : profile.farmNameHi}
          </div>
          <p className="text-xs text-slate-600">
            {isEnglish ? 'Registered Family Farmstead (Khasra 142/3)' : 'पंजीकृत पारिवारिक कृषि फार्म (खसरा 142/3)'}
          </p>
        </div>

        {/* Land Holding Breakdown */}
        <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/70 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <LandPlot className="w-4 h-4 text-emerald-600" />
            <span>{isEnglish ? 'Cultivated Land' : 'कुल जोत व कृषि रकबा'}</span>
          </div>
          <div className="text-base font-bold text-slate-900 tabular-nums">
            {profile.cultivatedLandAcres} {isEnglish ? 'Acres Total' : 'एकड़ कुल रकबा'}
          </div>
          <p className="text-xs text-slate-600 flex items-center gap-1.5">
            <span className="font-medium text-emerald-700">{profile.irrigatedLandAcres} Acres Irrigated</span>
            <span>·</span>
            <span className="text-slate-500">{(profile.cultivatedLandAcres - profile.irrigatedLandAcres).toFixed(1)} Acres Rainfed</span>
          </p>
        </div>

        {/* Irrigation Method */}
        <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/70 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <Droplets className="w-4 h-4 text-teal-600" />
            <span>{isEnglish ? 'Irrigation Method' : 'सिंचाई व्यवस्था'}</span>
          </div>
          <div className="text-base font-bold text-slate-900">
            {profile.irrigationMethod}
          </div>
          <p className="text-xs text-slate-600 flex items-center gap-1">
            <Sun className="w-3 h-3 text-amber-500" />
            <span>{isEnglish ? '100% PM-KUSUM Solar Submersible' : 'पीएम-कुसुम सौर ऊर्जा पंप संयोजित'}</span>
          </p>
        </div>

        {/* Farming Technique */}
        <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/70 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{isEnglish ? 'Farming Method' : 'खेती की पद्धति'}</span>
          </div>
          <div className="text-base font-bold text-slate-900">
            {profile.farmingTechnique}
          </div>
          <p className="text-xs text-slate-600">
            {isEnglish ? 'Jeevamrit, Beejamrit & Zero-Residue Bio-inputs' : 'जीवामृत, बीजामृत एवं जैविक खाद द्वारा संवर्धित'}
          </p>
        </div>

        {/* Soil Health Grade */}
        <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/70 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <Sprout className="w-4 h-4 text-emerald-600" />
            <span>{isEnglish ? 'Soil Health Card' : 'मृदा स्वास्थ्य कार्ड'}</span>
          </div>
          <div className="text-base font-bold text-emerald-800">
            {profile.soilHealthGrade}
          </div>
          <p className="text-xs text-slate-600">
            {isEnglish ? 'KVK Sehore Lab Certified (Valid: Dec 2027)' : 'केवीके सीहोर प्रयोगशाला द्वारा प्रमाणित (वैध: 2027)'}
          </p>
        </div>

        {/* Storage & Packhouse */}
        <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/70 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <Warehouse className="w-4 h-4 text-slate-600" />
            <span>{isEnglish ? 'Storage & Logistics' : 'भंडारण व पैकहाउस'}</span>
          </div>
          <div className="text-base font-bold text-slate-900">
            {isEnglish ? '200 Quintal Ventilated Shed' : '200 क्विंटल हवादार गोदाम'}
          </div>
          <p className="text-xs text-slate-600">
            {isEnglish ? 'Moisture & Pest-Proof Sealed Grain Bins' : 'नमी-रोधी व कीट-रहित सुरक्षित अनाज भंडारण'}
          </p>
        </div>
      </div>

      {/* Crops Grown Tag Strip */}
      <div className="pt-2 border-t border-slate-100">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2.5">
          {isEnglish ? 'Primary Crops Cultivated (फसल विविधता)' : 'मुख्य उत्पादित फसलें एवं किस्में'}
        </span>
        <div className="flex flex-wrap gap-2">
          {profile.cropsGrown.map((crop, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-900 border border-emerald-200/80"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>{crop}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
