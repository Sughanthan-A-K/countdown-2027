import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * LokiLoomDevToolbox
 * 
 * Clean, dedicated calibration hub built step-by-step.
 * Step 1: ORDER ARRANGE (Z-Index / Layer order & Exit Order)
 * - Move Up / Move Down buttons for each branch
 * - Visual live highlight
 * - Bring to Top / Send to Back
 * - Reveal All Branches toggle so you can see all branches during arrange
 */
export default function LokiLoomDevToolbox({
  renderOrder = ['branch-4', 'branch-3', 'branch-5', 'branch-2', 'branch-1'],
  onUpdateRenderOrder,
  activeBranchId,
  onSelectBranch,
  revealAllBranches,
  onToggleRevealAll,
  onTriggerReplay
}) {
  const [isOpen, setIsOpen] = useState(true);

  const branchLabels = {
    'branch-1': 'Branch 1 (Forefront / Main Tap)',
    'branch-2': 'Branch 2 (Top High Vine)',
    'branch-5': 'Branch 5 (Center-Right Flow)',
    'branch-3': 'Branch 3 (Bottom Low Vine)',
    'branch-4': 'Branch 4 (Deepest Horizon)'
  };

  const branchColors = {
    'branch-1': '#00FF66',
    'branch-2': '#7CFFB2',
    'branch-5': '#B9FFD0',
    'branch-3': '#39FF14',
    'branch-4': '#00E676'
  };

  // Move item in order array
  const moveBranch = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= renderOrder.length) return;
    const updated = [...renderOrder];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;
    if (onUpdateRenderOrder) {
      onUpdateRenderOrder(updated);
    }
  };

  const bringToTop = (index) => {
    if (index === renderOrder.length - 1) return;
    const updated = [...renderOrder];
    const [item] = updated.splice(index, 1);
    updated.push(item);
    if (onUpdateRenderOrder) {
      onUpdateRenderOrder(updated);
    }
  };

  const sendToBack = (index) => {
    if (index === 0) return;
    const updated = [...renderOrder];
    const [item] = updated.splice(index, 1);
    updated.unshift(item);
    if (onUpdateRenderOrder) {
      onUpdateRenderOrder(updated);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999] pointer-events-auto font-mono text-xs select-none">
      {/* Mini Toggle Pill */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="mb-2 px-3 py-1.5 rounded-full bg-emerald-950/90 text-emerald-400 border border-emerald-500/40 shadow-[0_0_15px_rgba(0,255,102,0.3)] hover:bg-emerald-900 flex items-center gap-2 cursor-pointer transition-all ml-auto"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-bold">Loom Order Arrange</span>
        <span>{isOpen ? '▼' : '▲'}</span>
      </button>

      {/* Toolbox Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-80 sm:w-96 p-4 rounded-2xl bg-black/90 backdrop-blur-xl border border-emerald-500/40 shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(0,255,102,0.2)] text-emerald-100 flex flex-col gap-3.5 max-h-[85vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
              <div>
                <h3 className="font-bold text-sm text-emerald-300 tracking-wider flex items-center gap-1.5">
                  <span className="text-base">🎛️</span> BRANCH ORDER ARRANGE
                </h3>
                <p className="text-[10px] text-emerald-500/80">Top of list = Front Layer / Exit First</p>
              </div>

              <button
                onClick={onTriggerReplay}
                className="px-2.5 py-1 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold transition-all cursor-pointer"
                title="Restart animation from beginning"
              >
                🔄 Replay
              </button>
            </div>

            {/* Quick Helper: Reveal All Branches */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/20">
              <span className="text-[11px] text-emerald-300">👁️ Reveal all 5 branches on screen:</span>
              <button
                onClick={onToggleRevealAll}
                className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                  revealAllBranches 
                    ? 'bg-emerald-500 text-black shadow-[0_0_10px_#00ff66]' 
                    : 'bg-emerald-900/80 text-emerald-300 border border-emerald-500/30'
                }`}
              >
                {revealAllBranches ? 'ON (Visible)' : 'OFF (Hidden)'}
              </button>
            </div>

            {/* Ordering List */}
            <div className="flex flex-col gap-1.5">
              <div className="text-[10px] uppercase font-bold text-emerald-400/70 px-1 flex justify-between">
                <span>FRONT (Top Layer)</span>
                <span>Move / Layer</span>
              </div>

              {/* Displaying from Top layer (last index) down to Back layer (first index) */}
              {[...renderOrder].reverse().map((branchId, displayIndex) => {
                const actualIndex = renderOrder.length - 1 - displayIndex;
                const isSelected = activeBranchId === branchId;
                const color = branchColors[branchId] || '#00FF66';

                return (
                  <div
                    key={branchId}
                    onClick={() => onSelectBranch(isSelected ? null : branchId)}
                    className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-emerald-950/80 border-emerald-400 shadow-[0_0_12px_rgba(0,255,102,0.3)]'
                        : 'bg-black/50 border-emerald-500/20 hover:border-emerald-500/50 hover:bg-emerald-950/30'
                    }`}
                  >
                    {/* Left: Indicator & Name */}
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
                      <div className="truncate">
                        <div className="font-bold text-[11px] text-emerald-200 truncate">
                          {branchLabels[branchId] || branchId}
                        </div>
                        <div className="text-[9px] text-emerald-500/70">
                          Layer #{actualIndex + 1} of {renderOrder.length} {isSelected ? '• Selected' : ''}
                        </div>
                      </div>
                    </div>

                    {/* Right: Order Arrange Action Buttons */}
                    <div className="flex items-center gap-1 flex-shrink-0" onClick={e => e.stopPropagation()}>
                      {/* Move Up (Forward in Z-order) */}
                      <button
                        disabled={actualIndex === renderOrder.length - 1}
                        onClick={() => moveBranch(actualIndex, 1)}
                        className="w-6 h-6 rounded flex items-center justify-center bg-emerald-900/60 hover:bg-emerald-700 text-emerald-200 disabled:opacity-30 disabled:cursor-not-allowed border border-emerald-500/20 text-xs font-bold"
                        title="Bring 1 Step Forward"
                      >
                        ▲
                      </button>

                      {/* Move Down (Backward in Z-order) */}
                      <button
                        disabled={actualIndex === 0}
                        onClick={() => moveBranch(actualIndex, -1)}
                        className="w-6 h-6 rounded flex items-center justify-center bg-emerald-900/60 hover:bg-emerald-700 text-emerald-200 disabled:opacity-30 disabled:cursor-not-allowed border border-emerald-500/20 text-xs font-bold"
                        title="Send 1 Step Backward"
                      >
                        ▼
                      </button>

                      {/* Send to Top */}
                      <button
                        disabled={actualIndex === renderOrder.length - 1}
                        onClick={() => bringToTop(actualIndex)}
                        className="px-1.5 h-6 rounded flex items-center justify-center bg-emerald-950 hover:bg-emerald-800 text-emerald-300 disabled:opacity-30 disabled:cursor-not-allowed border border-emerald-500/20 text-[9px] font-bold"
                        title="Bring to Front"
                      >
                        Top
                      </button>

                      {/* Send to Back */}
                      <button
                        disabled={actualIndex === 0}
                        onClick={() => sendToBack(actualIndex)}
                        className="px-1.5 h-6 rounded flex items-center justify-center bg-emerald-950 hover:bg-emerald-800 text-emerald-300 disabled:opacity-30 disabled:cursor-not-allowed border border-emerald-500/20 text-[9px] font-bold"
                        title="Send to Back"
                      >
                        Back
                      </button>
                    </div>
                  </div>
                );
              })}

              <div className="text-[10px] uppercase font-bold text-emerald-500/50 px-1 pt-1">
                <span>BACK (Bottom Layer)</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
