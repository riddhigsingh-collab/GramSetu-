import React from 'react';
import { FarmerProfile } from '../types/profile';
import { Package, TrendingUp, CheckCircle2, Wallet, ArrowUpRight } from 'lucide-react';

interface StatsCardsProps {
  stats: FarmerProfile['stats'];
  isEnglish: boolean;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats, isEnglish }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Crop Listings */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            {isEnglish ? 'Total Crop Listings' : 'कुल सूचीबद्ध उपज'}
          </span>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Package className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
            {stats.totalListingsKg.toLocaleString('en-IN')} <span className="text-lg font-medium text-slate-600">kg</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-emerald-700">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>{isEnglish ? 'Direct from verified farm' : 'सत्यापित खेत से प्रत्यक्ष'}</span>
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>{isEnglish ? 'All seasons combined' : 'सभी फसल चक्र मिलाकर'}</span>
          <span className="font-mono font-medium text-slate-700">{(stats.totalListingsKg / 100).toFixed(1)} Qtl</span>
        </div>
      </div>

      {/* 2. Active Listings */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            {isEnglish ? 'Active Listings' : 'सक्रिय फसल लिस्टिंग'}
          </span>
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
            {stats.activeCropsCount} <span className="text-lg font-medium text-slate-600">{isEnglish ? 'Crops' : 'फसलें'}</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-teal-700">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            <span>
              {stats.activeQuantityKg.toLocaleString('en-IN')} kg {isEnglish ? 'live on market' : 'बाज़ार में उपलब्ध'}
            </span>
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>{isEnglish ? 'Status: Active open lots' : 'स्थिति: खुली फसलें'}</span>
          <span className="font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
            {isEnglish ? 'Accepting Bids' : 'बोली जारी'}
          </span>
        </div>
      </div>

      {/* 3. Completed Sales */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            {isEnglish ? 'Completed Sales' : 'सफल निपटान / बिक्री'}
          </span>
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
            {stats.completedSalesCount} <span className="text-lg font-medium text-slate-600">{isEnglish ? 'Batches' : 'बैच'}</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-blue-700">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>{isEnglish ? 'Zero middleman commission' : 'शून्य आढ़तिया कटौती'}</span>
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>{isEnglish ? '100% On-time Payout' : 'समय पर सीधा बैंक अंतरण'}</span>
          <span className="font-mono font-medium text-slate-700">Direct DBT</span>
        </div>
      </div>

      {/* 4. Total Earnings & Middleman Savings */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            {isEnglish ? 'Total Farmer Earnings' : 'कुल किसान प्रत्यक्ष आय'}
          </span>
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
            <Wallet className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
            ₹{stats.totalEarnings.toLocaleString('en-IN')}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-emerald-700">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>
              {isEnglish ? `+${stats.middlemanSavingsPercent}% extra direct profit` : `+${stats.middlemanSavingsPercent}% अतिरिक्त किसान लाभ`}
            </span>
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>{isEnglish ? 'Net Middleman Saved' : 'बचाई गई दलाली'}</span>
          <span className="font-mono font-bold text-emerald-800">
            +₹{stats.middlemanExtraIncome.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </div>
  );
};
