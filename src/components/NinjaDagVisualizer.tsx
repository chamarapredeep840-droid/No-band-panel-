import React from 'react';
import { NinjaRule, NinjaBuildTarget } from '../types';
import { Layers, ArrowRight, CheckCircle2, Box, Cpu, FileCode2 } from 'lucide-react';

interface NinjaDagVisualizerProps {
  rules: NinjaRule[];
  targets: NinjaBuildTarget[];
  selectedTargets: string[];
  enable16Kb: boolean;
}

export const NinjaDagVisualizer: React.FC<NinjaDagVisualizerProps> = ({
  rules,
  targets,
  selectedTargets,
  enable16Kb,
}) => {
  // Extract all unique input sources (e.g. .cpp, .c, .h)
  const sourceNodes: string[] = [];
  targets.forEach((t) => {
    if (t.inputs) {
      t.inputs.split(/\s+/).forEach((inp) => {
        if (inp && !sourceNodes.includes(inp)) {
          sourceNodes.push(inp);
        }
      });
    }
  });

  return (
    <div id="ninja-dag-visualizer" className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white overflow-hidden shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-100 flex items-center gap-2">
              Ninja Dependency Graph (DAG)
              {enable16Kb && (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  16KB Aligned
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-400">
              Interactive topological build execution pipeline from source inputs to AGP export artifacts
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
            {rules.length} Rules
          </span>
          <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
            {targets.length} Targets
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {/* Step 1: Source Files */}
        <div className="space-y-2.5">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-semibold">
            <FileCode2 className="w-3.5 h-3.5 text-blue-400" />
            1. Source Inputs
          </div>
          <div className="space-y-2">
            {sourceNodes.length > 0 ? (
              sourceNodes.map((src, i) => (
                <div
                  key={`src-${i}`}
                  className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-lg p-2.5 transition-all text-xs font-mono text-blue-300 flex items-center justify-between shadow-sm"
                >
                  <span className="truncate">{src}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 font-sans">
                    input
                  </span>
                </div>
              ))
            ) : (
              <div className="text-xs text-slate-500 italic p-3 border border-dashed border-slate-800 rounded-lg">
                No direct source files detected
              </div>
            )}
          </div>
        </div>

        {/* Step 2: Ninja Rules (Transformations) */}
        <div className="space-y-2.5">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-semibold">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            2. Applied Rules
          </div>
          <div className="space-y-2">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="bg-slate-800/80 hover:bg-slate-800 border border-amber-500/20 rounded-lg p-2.5 transition-all text-xs shadow-sm"
              >
                <div className="flex items-center justify-between font-mono font-medium text-amber-300 mb-1">
                  <span>rule {rule.name}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 font-sans">
                    Rule
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-400 truncate" title={rule.command}>
                  {rule.command}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 3: Intermediate & Shared Objects */}
        <div className="space-y-2.5">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-semibold">
            <Box className="w-3.5 h-3.5 text-purple-400" />
            3. Build Targets
          </div>
          <div className="space-y-2">
            {targets.map((tgt) => {
              const isSelected = selectedTargets.includes(tgt.output);
              const isPhony = tgt.isPhony || tgt.rule.toLowerCase() === 'phony';
              return (
                <div
                  key={tgt.id}
                  className={`border rounded-lg p-2.5 transition-all text-xs font-mono shadow-sm ${
                    isSelected
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                      : isPhony
                      ? 'bg-purple-950/30 border-purple-500/30 text-purple-200'
                      : 'bg-slate-800/80 border-slate-700/80 text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold mb-1">
                    <span className="truncate">{tgt.output}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-sans uppercase ${
                        isPhony
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {isPhony ? 'phony' : tgt.rule}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1 truncate">
                    <ArrowRight className="w-3 h-3 text-slate-500 flex-shrink-0" />
                    <span className="truncate">{tgt.inputs || '(passthrough)'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 4: AGP Export & Final Artifacts */}
        <div className="space-y-2.5">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            4. AGP Export Targets
          </div>
          <div className="space-y-2">
            {selectedTargets.map((targetName, idx) => (
              <div
                key={`sel-${idx}`}
                className="bg-emerald-950/50 border border-emerald-500/50 rounded-lg p-3 text-xs font-mono text-emerald-300 shadow-sm"
              >
                <div className="flex items-center justify-between font-bold mb-1">
                  <span>{targetName}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-sans">
                    AGP Target
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">
                  Referenced in <code>experimentalProperties["ninja.targets"]</code>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
