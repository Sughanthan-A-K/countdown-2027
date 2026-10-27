import React, { useState, useEffect } from 'react';

/**
 * LokiLoomDevToolbox
 * 
 * Interactive live calibration HUD:
 * - Direct tuning of initial branch size (scale) and stroke width
 * - Order and clearance directions (up, down, off-screen targets: x, y, exit scale)
 * - Timing: Venom duration, idle rest before flight, exit duration per branch, delay gap between branches
 * - Portal: initial scale, zoom scale, approach duration
 * - Live replay / trigger test button
 * - Lock controls toggle
 * - Copy JSON config button
 * - KEYBOARD SHORTCUT: Press 'T' or '~' (backtick) or 'Shift + D' anytime to toggle!
 */
export default function LokiLoomDevToolbox({
  config,
  onChange,
  onResetToDefaults,
  onTriggerReplay,
  activeBranchId,
  onSelectBranch,
  revealAllBranches,
  onToggleRevealAll
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('branch-1'); // Default directly on branches so user sees them!

  // Keyboard shortcut listener ('t', 'T', '`', or 'Shift+D')
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 't' || e.key === 'T' || e.key === '`' || (e.shiftKey && (e.key === 'D' || e.key === 'd'))) {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateBranch = (bId, field, val) => {
    if (isLocked) return;
    onChange(prev => ({
      ...prev,
      branches: {
        ...prev.branches,
        [bId]: {
          ...prev.branches[bId],
          [field]: val
        }
      }
    }));
  };

  const updateGeneral = (field, val) => {
    if (isLocked) return;
    onChange(prev => ({
      ...prev,
      [field]: val
    }));
  };

  const updatePortal = (field, val) => {
    if (isLocked) return;
    onChange(prev => ({
      ...prev,
      portal: {
        ...prev.portal,
        [field]: val
      }
    }));
  };

  const branchKeys = [
    { id: 'branch-1', label: 'Branch 1 (Top/Main)' },
    { id: 'branch-2', label: 'Branch 2 (High Top)' },
    { id: 'branch-5', label: 'Branch 5 (Mid-Lower)' },
    { id: 'branch-3', label: 'Branch 3 (Bottom)' },
    { id: 'branch-4', label: 'Branch 4 (Deep Horizon)' },
  ];

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    if (tabId.startsWith('branch-')) {
      onSelectBranch(tabId);
    } else {
      onSelectBranch(null);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[99999] pointer-events-auto font-mono text-xs select-none">
      {/* Mini Toggle Pill */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-black/90 border-2 border-[#00FF66] text-[#7CFFB2] px-4 py-2.5 rounded-full shadow-[0_0_30px_rgba(0,255,102,0.6)] backdrop-blur-md hover:bg-[#00FF66]/20 transition flex items-center gap-2 cursor-pointer"
        >
          <span className="w-3 h-3 rounded-full bg-[#00FF66] animate-ping" />
          <span className="font-bold tracking-wide">⚡ Loom Toolbox (Press 'T')</span>
        </button>
      )}

      {/* Main Toolbox Modal */}
      {isOpen && (
        <div className="w-[94vw] max-w-[420px] max-h-[85vh] bg-[#020b07]/95 border-2 border-[#00FF66]/70 rounded-2xl shadow-[0_0_50px_rgba(0,255,102,0.45)] backdrop-blur-2xl flex flex-col overflow-hidden text-emerald-100">
          {/* Header */}
          <div className="p-3 bg-black/70 border-b border-[#00FF66]/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00FF66]" />
              <span className="font-bold text-sm tracking-wide text-[#7CFFB2]">Loom Calibration Hub</span>
              <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300">['T' key]</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsLocked(!isLocked)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition ${
                  isLocked 
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300' 
                    : 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                }`}
              >
                {isLocked ? '🔒 Locked' : '🔓 Unlocked'}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-emerald-400"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Action Row */}
          <div className="p-2.5 bg-black/40 border-b border-[#00FF66]/20 flex flex-wrap gap-2">
            <button
              onClick={onToggleRevealAll}
              className={`px-3 py-1.5 rounded-lg font-bold border transition flex items-center gap-1.5 ${
                revealAllBranches 
                  ? 'bg-[#00FF66]/30 border-[#00FF66] text-[#7CFFB2]' 
                  : 'bg-white/5 border-white/20 text-gray-300 hover:text-white'
              }`}
            >
              👁 {revealAllBranches ? 'Hide Inactive' : 'Show All 5 Branches'}
            </button>
            <button
              onClick={onTriggerReplay}
              className="flex-1 py-1.5 bg-[#00C853]/25 hover:bg-[#00C853]/40 border border-[#00FF66]/40 rounded-lg text-emerald-300 font-bold transition flex items-center justify-center gap-1.5"
            >
              ▶ Replay
            </button>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-emerald-200 transition"
            >
              {copied ? '✓ Copied!' : '📋 Copy JSON'}
            </button>
            <button
              onClick={onResetToDefaults}
              disabled={isLocked}
              className="px-2.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 rounded-lg transition disabled:opacity-40"
            >
              ↺ Reset
            </button>
          </div>

          {/* 5 Branches Navigation Row (Prominent Large Buttons) */}
          <div className="p-2 bg-black/60 border-b border-[#00FF66]/30">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1.5 flex justify-between">
              <span>Select Branch to Highlight & Tune:</span>
              {activeBranchId && <span className="text-[#00FF66] font-bold">Glowing: {activeBranchId.replace('branch-', 'B')}</span>}
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {branchKeys.map((b, idx) => {
                const isSelected = activeTab === b.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => handleSelectTab(b.id)}
                    className={`py-2 rounded-lg font-bold text-center border transition flex flex-col items-center justify-center ${
                      isSelected
                        ? 'bg-[#00FF66]/35 border-[#00FF66] text-[#7CFFB2] shadow-[0_0_15px_rgba(0,255,102,0.5)] scale-[1.03]'
                        : 'bg-black/40 border-white/15 text-gray-400 hover:text-white hover:border-[#00FF66]/50'
                    }`}
                  >
                    <span className="text-sm">🌿 B{b.id.replace('branch-', '')}</span>
                    <span className="text-[9px] opacity-75">Layer {idx + 1}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Other Tabs (General & Portal) */}
          <div className="flex p-1.5 bg-black/30 border-b border-[#00FF66]/20 gap-1.5">
            <button
              onClick={() => handleSelectTab('general')}
              className={`flex-1 py-1 rounded-md text-center transition ${
                activeTab === 'general' ? 'bg-[#00FF66]/20 text-[#7CFFB2] border border-[#00FF66]/40 font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              ⚙ General & Venom
            </button>
            <button
              onClick={() => handleSelectTab('portal')}
              className={`flex-1 py-1 rounded-md text-center transition ${
                activeTab === 'portal' ? 'bg-[#00FF66]/20 text-[#7CFFB2] border border-[#00FF66]/40 font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              🌀 Portal Flight
            </button>
          </div>

          {/* Controls Body */}
          <div className="p-3.5 overflow-y-auto space-y-4 flex-1">
            {/* GENERAL & VENOM TAB */}
            {activeTab === 'general' && (
              <div className="space-y-3.5">
                <div>
                  <div className="flex justify-between text-emerald-300 mb-1">
                    <span>Venom Flow Duration (Speed)</span>
                    <span className="font-bold text-[#00FF66]">{config.venomDuration}s</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="20"
                    step="0.5"
                    disabled={isLocked}
                    value={config.venomDuration}
                    onChange={e => updateGeneral('venomDuration', parseFloat(e.target.value))}
                    className="w-full accent-[#00FF66]"
                  />
                  <span className="text-[10px] text-gray-400">Lower = faster pulse; Higher = slow & steady</span>
                </div>

                <div>
                  <div className="flex justify-between text-emerald-300 mb-1">
                    <span>Rest / Observation Before Flight</span>
                    <span className="font-bold text-[#00FF66]">{config.flightStartDelay}s</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    step="0.5"
                    disabled={isLocked}
                    value={config.flightStartDelay}
                    onChange={e => updateGeneral('flightStartDelay', parseFloat(e.target.value))}
                    className="w-full accent-[#00FF66]"
                  />
                  <span className="text-[10px] text-gray-400">How long user watches glowing branches before camera moves</span>
                </div>

                <div>
                  <div className="flex justify-between text-emerald-300 mb-1">
                    <span>Global Branch Scale Multiplier</span>
                    <span className="font-bold text-[#00FF66]">{config.globalBranchScale}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2.5"
                    step="0.05"
                    disabled={isLocked}
                    value={config.globalBranchScale}
                    onChange={e => updateGeneral('globalBranchScale', parseFloat(e.target.value))}
                    className="w-full accent-[#00FF66]"
                  />
                  <span className="text-[10px] text-gray-400">Enlarge or shrink all branches on screen together</span>
                </div>
              </div>
            )}

            {/* PORTAL TAB */}
            {activeTab === 'portal' && (
              <div className="space-y-3.5">
                <div>
                  <div className="flex justify-between text-emerald-300 mb-1">
                    <span>Distant Initial Scale</span>
                    <span className="font-bold text-[#00FF66]">{config.portal.initialScale}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="0.8"
                    step="0.02"
                    disabled={isLocked}
                    value={config.portal.initialScale}
                    onChange={e => updatePortal('initialScale', parseFloat(e.target.value))}
                    className="w-full accent-[#00FF66]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-emerald-300 mb-1">
                    <span>Final Arrival Close-up Scale</span>
                    <span className="font-bold text-[#00FF66]">{config.portal.finalScale}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.6"
                    max="1.8"
                    step="0.05"
                    disabled={isLocked}
                    value={config.portal.finalScale}
                    onChange={e => updatePortal('finalScale', parseFloat(e.target.value))}
                    className="w-full accent-[#00FF66]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-emerald-300 mb-1">
                    <span>Portal Approach Duration</span>
                    <span className="font-bold text-[#00FF66]">{config.portal.duration}s</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    step="1"
                    disabled={isLocked}
                    value={config.portal.duration}
                    onChange={e => updatePortal('duration', parseFloat(e.target.value))}
                    className="w-full accent-[#00FF66]"
                  />
                </div>
              </div>
            )}

            {/* INDIVIDUAL BRANCH TABS */}
            {branchKeys.map(b => {
              if (activeTab !== b.id) return null;
              const bData = config.branches[b.id];
              return (
                <div key={b.id} className="space-y-3.5">
                  <div className="text-sm font-bold text-[#7CFFB2] border-b border-[#00FF66]/20 pb-1">
                    {b.label}
                  </div>

                  <div>
                    <div className="flex justify-between text-emerald-300 mb-1">
                      <span>Initial Size (Scale)</span>
                      <span className="font-bold text-[#00FF66]">{bData.initialScale}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.3"
                      max="2.5"
                      step="0.05"
                      disabled={isLocked}
                      value={bData.initialScale}
                      onChange={e => updateBranch(b.id, 'initialScale', parseFloat(e.target.value))}
                      className="w-full accent-[#00FF66]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-emerald-300 mb-1">
                      <span>Stroke Thickness</span>
                      <span className="font-bold text-[#00FF66]">{bData.strokeWidth}px</span>
                    </div>
                    <input
                      type="range"
                      min="4"
                      max="32"
                      step="1"
                      disabled={isLocked}
                      value={bData.strokeWidth}
                      onChange={e => updateBranch(b.id, 'strokeWidth', parseFloat(e.target.value))}
                      className="w-full accent-[#00FF66]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-emerald-300 mb-1">
                      <span>Exit Delay (When this branch starts leaving)</span>
                      <span className="font-bold text-[#00FF66]">{bData.exitDelay}s</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="60"
                      step="0.5"
                      disabled={isLocked}
                      value={bData.exitDelay}
                      onChange={e => updateBranch(b.id, 'exitDelay', parseFloat(e.target.value))}
                      className="w-full accent-[#00FF66]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-emerald-300 mb-1">
                      <span>Exit Flight Duration</span>
                      <span className="font-bold text-[#00FF66]">{bData.exitDuration}s</span>
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="50"
                      step="1"
                      disabled={isLocked}
                      value={bData.exitDuration}
                      onChange={e => updateBranch(b.id, 'exitDuration', parseFloat(e.target.value))}
                      className="w-full accent-[#00FF66]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-emerald-300 mb-1">
                      <span>Vertical Exit (Y offset: -Up / +Down)</span>
                      <span className="font-bold text-[#00FF66]">{bData.exitY}px</span>
                    </div>
                    <input
                      type="range"
                      min="-1800"
                      max="1800"
                      step="50"
                      disabled={isLocked}
                      value={bData.exitY}
                      onChange={e => updateBranch(b.id, 'exitY', parseFloat(e.target.value))}
                      className="w-full accent-[#00FF66]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-emerald-300 mb-1">
                      <span>Horizontal Exit (X offset)</span>
                      <span className="font-bold text-[#00FF66]">{bData.exitX}px</span>
                    </div>
                    <input
                      type="range"
                      min="-1000"
                      max="1000"
                      step="50"
                      disabled={isLocked}
                      value={bData.exitX}
                      onChange={e => updateBranch(b.id, 'exitX', parseFloat(e.target.value))}
                      className="w-full accent-[#00FF66]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-emerald-300 mb-1">
                      <span>Exit Zoom Scale</span>
                      <span className="font-bold text-[#00FF66]">{bData.exitScale}x</span>
                    </div>
                    <input
                      type="range"
                      min="1.0"
                      max="5.0"
                      step="0.1"
                      disabled={isLocked}
                      value={bData.exitScale}
                      onChange={e => updateBranch(b.id, 'exitScale', parseFloat(e.target.value))}
                      className="w-full accent-[#00FF66]"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
