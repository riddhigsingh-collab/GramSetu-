import React from 'react';
import { useAudioNarrator } from '../utils/audioNarrator';
import { Volume2, Play, Pause, Square, Gauge, X } from 'lucide-react';

export const AudioPlayerBar: React.FC<{ isEnglish: boolean }> = ({ isEnglish }) => {
  const { isSpeaking, isPaused, currentTitle, currentText, pause, resume, stop, speechRate, setRate } =
    useAudioNarrator();

  if (!isSpeaking && !isPaused) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-2xl w-[92%] sm:w-full bg-[#0c1f13]/95 backdrop-blur-md text-white rounded-2xl p-3.5 shadow-2xl border border-emerald-500/40 animate-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-center justify-between gap-3">
        {/* Left: Speaker icon & Audio Wave animation */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-400/30">
            <Volume2 className="w-5 h-5 animate-pulse" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                {isEnglish ? 'AUDIO READ-ALOUD' : 'ऑडियो बोलकर सुनाएं'}
              </span>
              <div className="flex items-center gap-0.5 h-3">
                <span className={`w-1 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s] ${isPaused ? 'h-1' : 'h-3'}`} />
                <span className={`w-1 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s] ${isPaused ? 'h-1' : 'h-4'}`} />
                <span className={`w-1 bg-emerald-400 rounded-full animate-bounce ${isPaused ? 'h-1' : 'h-2'}`} />
              </div>
            </div>
            <h5 className="text-xs sm:text-sm font-bold text-white truncate mt-0.5">
              {currentTitle || (isEnglish ? 'Playing voice audio' : 'ऑडियो चल रहा है')}
            </h5>
          </div>
        </div>

        {/* Right Controls: Play/Pause, Stop, Speed */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Speed Selector */}
          <div className="hidden sm:flex items-center gap-1 bg-emerald-950/80 px-2 py-1 rounded-lg border border-emerald-800 text-[11px] font-mono text-emerald-300">
            <Gauge className="w-3 h-3 text-emerald-400" />
            <select
              value={speechRate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="bg-transparent text-emerald-200 focus:outline-none cursor-pointer"
            >
              <option value="0.8">0.8x धीमा</option>
              <option value="0.95">1.0x सामान्य</option>
              <option value="1.2">1.2x तेज़</option>
            </select>
          </div>

          {/* Pause / Resume */}
          {isPaused ? (
            <button
              onClick={resume}
              className="w-8 h-8 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Resume speech"
            >
              <Play className="w-4 h-4 fill-white" />
            </button>
          ) : (
            <button
              onClick={pause}
              className="w-8 h-8 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Pause speech"
            >
              <Pause className="w-4 h-4" />
            </button>
          )}

          {/* Stop */}
          <button
            onClick={stop}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Stop audio"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
          </button>

          <button
            onClick={stop}
            className="p-1 text-slate-400 hover:text-white cursor-pointer ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
