import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GripHorizontal, X, RotateCcw, Check, Square, CheckSquare, Eye, EyeOff, Sliders, Sparkles } from 'lucide-react';

// EXACT ORDER THAT LIGHTS APPEAR IN THE UI:
// 1 to 6 = Outer lights appearing around the card
// 7 to 14 = Center fissures and climax lasers
export const LIGHT_BEAMS_LIST = [
  // 1. Upper-Left Corner Beam
  { id: 1, name: "1. Upper-Left Corner Beam", delay: "0.05s", group: "Outer", origin: "Top-Left (45,108)" },
  // 2. Blade Beam Mid-Right
  { id: 2, name: "2. Blade Beam Mid-Right", delay: "0.35s", group: "Outer", origin: "Right Edge (182,148)" },
  // 3. Upper-Right Corner Gap
  { id: 3, name: "3. Upper-Right Corner Gap", delay: "0.65s", group: "Outer", origin: "Top-Right (200,5)" },
  // 4. Lower-Right Corner Beam
  { id: 4, name: "4. Lower-Right Corner Beam", delay: "0.95s", group: "Outer", origin: "Bottom-Right (126,274)" },
  // 5. Bottom-Left Corner Gap
  { id: 5, name: "5. Bottom-Left Corner Gap", delay: "1.25s", group: "Outer", origin: "Bottom-Left (0,400)" },
  // 6. South Spine Off-Center
  { id: 6, name: "6. South Spine Off-Center", delay: "1.55s", group: "Outer", origin: "Bottom-Center (102,400)" },

  // Center beams
  // 7. Tap 3 Beam 1 (Upper-Right Infinite Cone)
  { id: 101, name: "7. Upper-Right Center Cone", delay: "Tap 4 / 0.2s", group: "Center", origin: "Center Seam (102,185)" },
  // 8. Tap 3 Beam 2 (Lower-Left Infinite Cone)
  { id: 102, name: "8. Lower-Left Center Cone", delay: "Tap 4 / 0.5s", group: "Center", origin: "Spine Seam (102,185)" },
  // 9. Upper Center Spine Fissure
  { id: 7, name: "9. Upper Center Spine Fissure", delay: "Tap 4 / 0.9s", group: "Center", origin: "Center-Up (92,122)" },
  // 10. Steep Upward Top Spine Shaft
  { id: 8, name: "10. Steep Upward Top Spine", delay: "Tap 4 / 1.3s", group: "Center", origin: "Top-Spine (108,78)" },
  // 11. Left-side Center Fissure
  { id: 9, name: "11. Left Center Fissure", delay: "Tap 4 / 1.7s", group: "Center", origin: "Mid-Left (64,146)" },
  // 12. Center Fissures Red Line 1
  { id: 10, name: "12. Center Fissure Red Line 1", delay: "Tap 4 / 2.0s", group: "Center", origin: "Center-Spine (102,185)" },
  // 13. Center Fissures Red Line 5
  { id: 11, name: "13. Center Fissure Red Line 5", delay: "Tap 4 / 2.3s", group: "Center", origin: "Mid-Right (155,210)" },
  // 14. Final Mega Central Climax Beam
  { id: 12, name: "14. Final Mega Climax Laser", delay: "Tap 4 / 2.6s", group: "Center", origin: "Central Hub Laser" },
];

export default function LokiLightMasterToolbox({
  checkedBeams,
  onToggleCheckBeam,
  activePreviewBeams,
  onTogglePreviewBeam,
  onAllPreviewOn,
  onAllPreviewOff,
  isPreviewAllMode,
  onTogglePreviewAllMode,
  beamTransforms,
  onUpdateBeamTransform,
  onResetBeamTransform,
  circleRadius,
  onChangeCircleRadius,
  onClose
}) {
  // Active target for Angle & Width sliders: defaults to first checked beam or 1
  const [tuneTarget, setTuneTarget] = useState(1);
  const [panelPos, setPanelPos] = useState(() => {
    try {
      const saved = localStorage.getItem('loki_single_toolbox_pos');
      return saved ? JSON.parse(saved) : { x: 24, y: 80 };
    } catch (_) {
      return { x: 24, y: 80 };
    }
  });

  const activeT = beamTransforms?.[tuneTarget] || { angle: 0, scaleX: 1 };

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={panelPos}
      animate={panelPos}
      onDragEnd={(_, info) => {
        const nextPos = {
          x: Math.round(panelPos.x + info.offset.x),
          y: Math.round(panelPos.y + info.offset.y)
        };
        setPanelPos(nextPos);
        localStorage.setItem('loki_single_toolbox_pos', JSON.stringify(nextPos));
      }}
      className="fixed top-0 left-0 z-[9999] pointer-events-auto w-[320px] bg-neutral-900/95 backdrop-blur-md border border-emerald-500/60 rounded-2xl shadow-[0_0_35px_rgba(16,185,129,0.25)] text-white select-none font-sans text-xs p-3.5 space-y-3"
    >
      {/* Title Header with Close */}
      <div className="flex items-center justify-between pb-2 border-b border-neutral-700/80 cursor-grab active:cursor-grabbing">
        <div className="flex items-center gap-2">
          <GripHorizontal size={14} className="text-emerald-400" />
          <span className="font-bold tracking-wide text-emerald-300 text-[11px] uppercase">
            Light Beams & Angle Studio
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          title="Close Toolbox (Checked lights remain active!)"
        >
          <X size={14} />
        </button>
      </div>

      {/* Mode Controls Bar: Checked Preview Mode + All ON / All OFF */}
      <div className="p-2 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold text-neutral-300 flex items-center gap-1">
            <Sparkles size={11} className="text-emerald-400" /> Preview Mode:
          </span>
          <button
            onClick={onTogglePreviewAllMode}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all border ${
              isPreviewAllMode
                ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_10px_#10b981]'
                : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:text-white'
            }`}
          >
            {isPreviewAllMode ? 'Checked Preview (ON)' : 'Normal Tap Mode'}
          </button>
        </div>

        {/* Quick All ON / OFF for preview */}
        <div className="flex items-center gap-1.5 pt-0.5">
          <button
            onClick={onAllPreviewOn}
            className="flex-1 py-1 rounded bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-600/50 text-emerald-300 text-[10px] font-semibold transition-colors flex items-center justify-center gap-1"
          >
            <Eye size={11} /> All ON
          </button>
          <button
            onClick={onAllPreviewOff}
            className="flex-1 py-1 rounded bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-300 text-[10px] font-semibold transition-colors flex items-center justify-center gap-1"
          >
            <EyeOff size={11} /> All OFF
          </button>
        </div>
      </div>

      {/* Circle Radius Slider (Always available) */}
      <div className="p-2 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-1">
        <div className="flex items-center justify-between text-[10px] text-neutral-300">
          <span className="font-bold flex items-center gap-1">
            <Sliders size={10} className="text-emerald-400" /> Card Center Circle Radius:
          </span>
          <span className="font-mono text-emerald-300 font-bold">{circleRadius || 98}px</span>
        </div>
        <input
          type="range"
          min="40"
          max="120"
          step="2"
          value={circleRadius || 98}
          onChange={(e) => onChangeCircleRadius?.(parseInt(e.target.value, 10))}
          className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
        />
        <div className="flex justify-between text-[8px] text-neutral-500 font-mono">
          <span>40px</span>
          <span className="text-neutral-400">Card bound: 98px</span>
          <span>120px</span>
        </div>
      </div>

      {/* Angle & Spread Tuner for the currently selected light */}
      <div className="p-2.5 rounded-xl bg-neutral-950/90 border border-cyan-700/50 space-y-2">
        <div className="flex items-center justify-between text-[10px]">
          <span className="font-bold text-cyan-300 flex items-center gap-1">
            <Sliders size={11} /> Adjust Light #{tuneTarget} Angle:
          </span>
          <button
            onClick={() => onResetBeamTransform?.(tuneTarget)}
            className="text-[9px] text-neutral-400 hover:text-rose-400 flex items-center gap-0.5 transition-colors"
          >
            <RotateCcw size={10} /> Reset
          </button>
        </div>

        {/* Angle Slider */}
        <div>
          <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-0.5">
            <span>Angle Rotation:</span>
            <span className="font-mono text-cyan-300 font-bold">{activeT.angle || 0}°</span>
          </div>
          <input
            type="range"
            min="-180"
            max="180"
            value={activeT.angle || 0}
            onChange={(e) => onUpdateBeamTransform?.(tuneTarget, { angle: parseInt(e.target.value, 10) })}
            className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>

        {/* Width / Spread Slider */}
        <div>
          <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-0.5">
            <span>Width / Spread:</span>
            <span className="font-mono text-emerald-300 font-bold">{(activeT.scaleX || 1).toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0.4"
            max="3.0"
            step="0.1"
            value={activeT.scaleX || 1}
            onChange={(e) => onUpdateBeamTransform?.(tuneTarget, { scaleX: parseFloat(e.target.value) })}
            className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
          />
        </div>
      </div>

      {/* 14 Lights List: Strict chronological UI appearance order */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[10px] uppercase font-bold text-neutral-400 px-1">
          <span>Lights In UI Appearance Order (1-14)</span>
          <span className="text-[9px] text-emerald-400 font-mono">
            {checkedBeams?.length || 0}/14 Checked
          </span>
        </div>

        <div className="max-h-[220px] overflow-y-auto space-y-1 pr-1 custom-scrollbar">
          {LIGHT_BEAMS_LIST.map((beam) => {
            const isChecked = checkedBeams?.includes(beam.id);
            const isVisibleNow = activePreviewBeams?.includes(beam.id);
            const isTuningThis = tuneTarget === beam.id;

            return (
              <div
                key={`beam-row-${beam.id}`}
                onClick={() => setTuneTarget(beam.id)}
                className={`flex items-center justify-between p-1.5 rounded-lg border text-[11px] cursor-pointer transition-all ${
                  isTuningThis
                    ? 'bg-cyan-950/50 border-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                    : isChecked
                    ? 'bg-emerald-950/30 border-emerald-600/40 hover:border-emerald-500/70'
                    : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 opacity-60'
                }`}
              >
                {/* Left: Checkbox (Independent of tap/visibility) */}
                <div
                  className="flex items-center gap-2 flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleCheckBeam(beam.id);
                  }}
                >
                  <button className="text-neutral-400 hover:text-white transition-colors">
                    {isChecked ? (
                      <CheckSquare size={14} className="text-emerald-400" />
                    ) : (
                      <Square size={14} className="text-neutral-500" />
                    )}
                  </button>

                  <div className="flex flex-col leading-tight">
                    <span className={`font-semibold ${isChecked ? 'text-neutral-100' : 'text-neutral-400'}`}>
                      {beam.name}
                    </span>
                    <span className="text-[9px] font-mono text-neutral-500">
                      {beam.group} · {beam.delay}
                    </span>
                  </div>
                </div>

                {/* Right: Eye On/Off Tap toggle (Visible preview) */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTogglePreviewBeam(beam.id);
                      setTuneTarget(beam.id);
                    }}
                    className={`p-1 rounded-md transition-colors ${
                      isVisibleNow
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-neutral-800 text-neutral-500 hover:text-neutral-300'
                    }`}
                    title={isVisibleNow ? 'Light is ON (Click to turn OFF)' : 'Light is OFF (Click to turn ON)'}
                  >
                    {isVisibleNow ? <Eye size={12} /> : <EyeOff size={12} />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-1.5 border-t border-neutral-800 text-[9px] text-neutral-500 flex items-center justify-between">
        <span>Click row to select angle target</span>
        <span className="font-mono text-emerald-400 font-bold">Shift + T</span>
      </div>
    </motion.div>
  );
}
