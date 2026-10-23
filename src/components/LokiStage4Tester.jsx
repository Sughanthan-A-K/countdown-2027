import React from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, X } from 'lucide-react';

export const STAGE_4_STEPS = [
  { id: 1, name: "4.1: Edge & Corner Beams", desc: "Outer cracks emit light shafts (0.6s - 2.85s)" },
  { id: 2, name: "4.2: Center Radial Wave", desc: "Concentric white/emerald core wave swells from center" },
  { id: 3, name: "4.3: Center Laser Bursts", desc: "Central fissures burst mega high-speed beams (3.0s - 3.48s)" },
  { id: 4, name: "4.4: Shatter into Portal", desc: "Stage 5 Multiverse Portal Breach" },
];

export default function LokiStage4Tester({
  crackStage,
  onSetCrackStage,
  stepIndex,
  onSetStepIndex,
  onToggleAutoPlay,
  isAutoPlaying,
  onClose
}) {
  return (
    <div className="fixed top-20 left-6 z-[9999] pointer-events-auto bg-neutral-900/95 backdrop-blur-md border border-emerald-500/50 rounded-2xl p-4 shadow-[0_0_30px_rgba(16,185,129,0.3)] text-white w-72 select-none font-sans text-xs">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-neutral-700/80">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span className="font-bold tracking-wide text-emerald-300">LOKI STAGE TESTER</span>
        </div>
        <button 
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          title="Close (Shift+T)"
        >
          <X size={15} />
        </button>
      </div>

      {/* Main Stage Selectors */}
      <div className="mb-3">
        <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-1.5">
          Main Stages (0 - 5)
        </div>
        <div className="grid grid-cols-6 gap-1">
          {[0, 1, 2, 3, 4, 5].map((stg) => (
            <button
              key={`stg-${stg}`}
              onClick={() => onSetCrackStage(stg)}
              className={`py-1.5 rounded-lg font-bold transition-all text-xs ${
                crackStage === stg 
                  ? 'bg-emerald-500 text-black shadow-[0_0_12px_#10b981]' 
                  : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
              }`}
            >
              {stg === 0 ? 'Off' : (stg === 5 ? 'Portal' : `T${stg}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Tap 4 Sub-Step Stepper */}
      <div className="mb-3 pt-2 border-t border-neutral-800">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold">
            Stage 4 Breakdown
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-600/40 font-mono">
            Step {stepIndex} / {STAGE_4_STEPS.length}
          </span>
        </div>

        <div className="bg-neutral-950/80 p-2.5 rounded-xl border border-neutral-800 mb-2">
          <div className="font-semibold text-emerald-300 text-xs">
            {STAGE_4_STEPS[stepIndex - 1]?.name}
          </div>
          <div className="text-[11px] text-neutral-400 mt-0.5 leading-snug">
            {STAGE_4_STEPS[stepIndex - 1]?.desc}
          </div>
        </div>

        {/* Stepper Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onSetStepIndex(Math.max(1, stepIndex - 1))}
            disabled={stepIndex <= 1}
            className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 disabled:hover:bg-neutral-800 transition-colors font-medium text-xs"
          >
            <ChevronLeft size={14} />
            Prev
          </button>
          <button
            onClick={onToggleAutoPlay}
            className={`px-3 py-1.5 rounded-lg flex items-center justify-center transition-colors ${
              isAutoPlaying 
                ? 'bg-amber-500 text-black font-semibold shadow-[0_0_10px_#f59e0b]' 
                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200'
            }`}
            title={isAutoPlaying ? "Pause Auto-play" : "Play Continuous Sequence"}
          >
            {isAutoPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button
            onClick={() => onSetStepIndex(Math.min(STAGE_4_STEPS.length, stepIndex + 1))}
            disabled={stepIndex >= STAGE_4_STEPS.length}
            className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 disabled:hover:bg-neutral-800 transition-colors font-medium text-xs"
          >
            Next
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Quick Action Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-neutral-800 text-[10px] text-neutral-400">
        <span>Toggle Shortcut:</span>
        <span className="font-mono bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-300 border border-neutral-700">
          Shift + T
        </span>
      </div>
    </div>
  );
}
