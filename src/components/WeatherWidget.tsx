import React, { useState } from 'react';
import { CloudRain, Droplets, Sun, Wind, MapPin, Volume2, Calendar, RefreshCw, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useAudioNarrator } from '../utils/audioNarrator';
import { SupportedDialect } from '../utils/dialect';

interface WeatherWidgetProps {
  location: string;
  isEnglish: boolean;
  currentDialect: SupportedDialect;
  isOffline?: boolean;
}

interface ForecastDay {
  day: string;
  dayHi: string;
  temp: string;
  condition: string;
  rainProb: number;
  icon: string;
}

const FORECAST_DAYS: ForecastDay[] = [
  { day: 'Today', dayHi: 'आज', temp: '29°C / 17°C', condition: 'Sunny & Clear', rainProb: 10, icon: '☀️' },
  { day: 'Tomorrow', dayHi: 'कल', temp: '30°C / 18°C', condition: 'Clear Sky', rainProb: 5, icon: '🌤️' },
  { day: 'Tuesday', dayHi: 'मंगलवार', temp: '28°C / 16°C', condition: 'Mild Breeze', rainProb: 15, icon: '⛅' },
  { day: 'Wednesday', dayHi: 'बुधवार', temp: '29°C / 17°C', condition: 'Open Sun', rainProb: 10, icon: '☀️' },
];

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  location,
  isEnglish,
  currentDialect,
  isOffline = false,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('11:30 AM');
  const { speak } = useAudioNarrator();

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }));
    }, 800);
  };

  const handleReadWeather = () => {
    const text = isEnglish
      ? `Agri-Weather report for ${location}. Current temperature is 29 degrees Celsius, sunny and clear. Humidity is 48 percent. Rainfall probability is 10 percent with zero millimeter rain forecast. Weather is highly favorable for wheat harvesting, threshing and grain sun-drying.`
      : `${location} का कृषि मौसम पूर्वानुमान। वर्तमान तापमान 29 डिग्री सेल्सियस, मौसम साफ और धूप खिली है। नमी 48 प्रतिशत है। बारिश की संभावना केवल 10 प्रतिशत है। गेहूं की कटाई, गहाई और खलिहान में अनाज सुखाने हेतु मौसम पूर्णतः अनुकूल है।`;
    speak('Weather Report', text, currentDialect);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-5 sm:p-6 relative overflow-hidden">
      {/* Decorative top accent gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-amber-400 to-emerald-500" />

      {/* Widget Header: Location & Audio Read */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xl">🌤️</span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              {isEnglish ? 'Agri-Weather Advisory & Climate Telemetry' : 'कृषि मौसम सलाह एवं लाइव स्थानीय रिपोर्ट'}
            </h3>
            {isOffline && (
              <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300">
                CACHED SYNC
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600 mt-0.5">
            <div className="flex items-center gap-1 font-semibold text-slate-800">
              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>{location}</span>
            </div>
            <span className="text-slate-300">·</span>
            <span className="text-[11px] text-slate-500">
              IMD Sehore Krishi Vigyan Kendra ({lastUpdated})
            </span>
          </div>
        </div>

        {/* Action Buttons: Audio Narrator & Refresh */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={handleReadWeather}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition-colors cursor-pointer"
            title="Listen to Weather Advisory"
          >
            <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>{isEnglish ? 'Listen Advisory' : 'मौसम सुनें'}</span>
          </button>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            title="Refresh Weather Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-700' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Real-time Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
        {/* 1. Real-time Temperature */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50/60 to-orange-50/40 border border-amber-200/70 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-1">
            <span className="uppercase tracking-wider">{isEnglish ? 'Temperature' : 'वर्तमान तापमान'}</span>
            <Sun className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-mono">
              29°C
            </div>
            <p className="text-xs text-amber-800 font-medium mt-1">
              {isEnglish ? 'Feels like 31°C · Sunny & Dry' : 'महसूस: 31°C · खिली धूप'}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-amber-200/60 text-[11px] text-slate-600 flex justify-between">
            <span>{isEnglish ? 'Max / Min' : 'अधिकतम/न्यूनतम'}</span>
            <span className="font-mono font-bold text-slate-800">31°C / 17°C</span>
          </div>
        </div>

        {/* 2. Humidity */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-sky-50/60 to-blue-50/40 border border-sky-200/70 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-sky-900 mb-1">
            <span className="uppercase tracking-wider">{isEnglish ? 'Relative Humidity' : 'सापेक्ष आर्द्रता (नमी)'}</span>
            <Droplets className="w-4 h-4 text-sky-600" />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-mono">
              48%
            </div>
            <p className="text-xs text-sky-800 font-medium mt-1">
              {isEnglish ? 'Optimal for Wheat Threshing' : 'गेहूं गहाई व भंडारण हेतु उत्तम'}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-sky-200/60 text-[11px] text-slate-600 flex justify-between">
            <span>{isEnglish ? 'Grain Moisture' : 'अनाज सुरक्षित सीमा'}</span>
            <span className="font-mono font-bold text-emerald-700">&lt; 12% Moisture</span>
          </div>
        </div>

        {/* 3. Rainfall Probability */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50/60 to-teal-50/40 border border-emerald-200/70 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-900 mb-1">
            <span className="uppercase tracking-wider">{isEnglish ? 'Rainfall Probability' : 'वर्षा की संभावना'}</span>
            <CloudRain className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-mono">
              10%
            </div>
            <p className="text-xs text-emerald-800 font-medium mt-1">
              {isEnglish ? 'Dry Spell (0 mm next 48 hrs)' : 'सूखा मौसम (अगले 48 घंटे 0 मिमी)'}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-emerald-200/60 text-[11px] text-slate-600 flex justify-between">
            <span>{isEnglish ? 'Cloud Cover' : 'बादल छाए रहने का अनुमान'}</span>
            <span className="font-mono font-bold text-slate-800">Clear 8%</span>
          </div>
        </div>

        {/* 4. Wind & Field Conditions */}
        <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
            <span className="uppercase tracking-wider">{isEnglish ? 'Wind & Soil' : 'हवा एवं मृदा नमी'}</span>
            <Wind className="w-4 h-4 text-slate-600" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
              11 <span className="text-sm font-normal text-slate-500">km/h</span>
            </div>
            <p className="text-xs text-slate-600 font-medium mt-1">
              North-West (उत्तर-पश्चिम)
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-200 text-[11px] text-slate-600 flex justify-between">
            <span>{isEnglish ? 'Soil Moisture' : 'मृदा नमी'}</span>
            <span className="font-mono font-bold text-emerald-800">22% VWC (Adequate)</span>
          </div>
        </div>
      </div>

      {/* Field Activity Recommendation Banner & 4-Day Outlook */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
        {/* Recommendation Tag */}
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-200/80">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span className="font-medium">
            <strong>{isEnglish ? 'Harvest Window Advisory:' : 'कृषि कार्य सलाह:'}</strong>{' '}
            {isEnglish
              ? 'Weather is clear and dry in Sehore. Ideal for Sharbati wheat combine harvesting and open-yard sun drying.'
              : 'सीहोर में मौसम शुष्क व साफ है। शरबती गेहूं की कटाई, गहाई और खलिहान में सुखाने हेतु पूर्णतः सुरक्षित।'}
          </span>
        </div>

        {/* 4-Day Mini Forecast Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          {FORECAST_DAYS.map((fc, idx) => (
            <div
              key={idx}
              className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-center shrink-0 min-w-[76px]"
            >
              <div className="text-[10px] font-bold text-slate-500">
                {isEnglish ? fc.day : fc.dayHi}
              </div>
              <div className="text-sm">{fc.icon}</div>
              <div className="font-mono text-[11px] font-bold text-slate-800">{fc.temp.split(' ')[0]}</div>
              <div className="text-[9px] text-sky-700 font-mono font-medium">{fc.rainProb}% Rain</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
