import React, { useState, useEffect } from 'react';
import { NdkNinjaConfig } from '../types';
import { Play, RotateCcw, CheckCircle, Terminal, X, ShieldCheck, AlertCircle } from 'lucide-react';

interface LiveBuildSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: NdkNinjaConfig;
}

interface LogLine {
  text: string;
  type: 'info' | 'success' | 'warn' | 'cmd' | 'header';
  time: string;
}

export const LiveBuildSimulatorModal: React.FC<LiveBuildSimulatorModalProps> = ({
  isOpen,
  onClose,
  config,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      handleRunBuild();
    } else {
      setIsRunning(false);
      setProgress(0);
      setLogs([]);
      setCompleted(false);
    }
  }, [isOpen]);

  const handleRunBuild = () => {
    setIsRunning(true);
    setProgress(0);
    setCompleted(false);
    setLogs([]);

    const timestamp = () => new Date().toLocaleTimeString();

    const sequence: { delay: number; log: LogLine; pct: number }[] = [
      {
        delay: 150,
        log: {
          text: `[AGP Ninja] Initializing native build via configure-ninja script: ${config.configureScript}`,
          type: 'header',
          time: timestamp(),
        },
        pct: 10,
      },
      {
        delay: 400,
        log: {
          text: `[AGP] Target ABIs: ${config.abiFilters.join(', ')} | Min SDK: ${config.minSdkVersion} | Target SDK: ${config.targetSdkVersion}`,
          type: 'info',
          time: timestamp(),
        },
        pct: 25,
      },
      {
        delay: 700,
        log: {
          text: `[Ninja] Read build.ninja with ${config.rules.length} rules and ${config.targets.length} targets`,
          type: 'info',
          time: timestamp(),
        },
        pct: 40,
      },
    ];

    let currentDelay = 800;

    // Simulate rule execution
    config.targets.forEach((tgt, idx) => {
      currentDelay += 450;
      const isPhony = tgt.isPhony || tgt.rule.toLowerCase() === 'phony';
      sequence.push({
        delay: currentDelay,
        log: {
          text: isPhony
            ? `[Ninja Phony] Evaluating target '${tgt.output}' <- [${tgt.inputs}]`
            : `[Ninja Command] [${idx + 1}/${config.targets.length}] ${tgt.rule}: ${tgt.inputs} => ${tgt.output}`,
          type: isPhony ? 'info' : 'cmd',
          time: timestamp(),
        },
        pct: 40 + Math.floor(((idx + 1) / config.targets.length) * 40),
      });
    });

    if (config.enable16KbPageSize) {
      currentDelay += 350;
      sequence.push({
        delay: currentDelay,
        log: {
          text: `[16KB Validator] Verifying ELF segments for max-page-size=16384 (0x4000) alignment...`,
          type: 'info',
          time: timestamp(),
        },
        pct: 88,
      });

      currentDelay += 300;
      sequence.push({
        delay: currentDelay,
        log: {
          text: `[16KB Validator] [PASS] All generated .so shared libraries satisfy Android 16 16KB page boundaries!`,
          type: 'success',
          time: timestamp(),
        },
        pct: 95,
      });
    }

    currentDelay += 400;
    sequence.push({
      delay: currentDelay,
      log: {
        text: `[BUILD SUCCESSFUL] AGP Ninja exported targets [${config.selectedTargets.join(', ')}] built in ${(currentDelay / 1000).toFixed(2)}s`,
        type: 'success',
        time: timestamp(),
      },
      pct: 100,
    });

    sequence.forEach((item, idx) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, item.log]);
        setProgress(item.pct);
        if (idx === sequence.length - 1) {
          setIsRunning(false);
          setCompleted(true);
        }
      }, item.delay);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        id="ninja-live-build-modal"
        className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-100">
                AGP Ninja Build Pipeline Simulation
              </h2>
              <p className="text-xs text-slate-400">
                Simulating Android NDK clang compilation &amp; Ninja graph execution
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-1.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 h-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status ribbon */}
        <div className="px-6 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">
              {isRunning ? 'Executing Ninja Targets...' : completed ? 'Build Finished' : 'Idle'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-400">ABIs: {config.abiFilters.join(', ')}</span>
            {config.enable16KbPageSize && (
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1 font-sans text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" /> 16KB Verified
              </span>
            )}
          </div>
        </div>

        {/* Terminal Log Console */}
        <div className="p-5 font-mono text-xs overflow-y-auto space-y-2 bg-slate-950 flex-1 min-h-[280px] text-slate-300">
          {logs.map((log, i) => (
            <div key={i} className="flex items-start gap-2.5 leading-relaxed">
              <span className="text-slate-500 select-none flex-shrink-0">[{log.time}]</span>
              {log.type === 'header' && (
                <span className="text-blue-400 font-semibold">{log.text}</span>
              )}
              {log.type === 'cmd' && (
                <span className="text-amber-300">{log.text}</span>
              )}
              {log.type === 'success' && (
                <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {log.text}
                </span>
              )}
              {log.type === 'warn' && (
                <span className="text-amber-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {log.text}
                </span>
              )}
              {log.type === 'info' && <span className="text-slate-300">{log.text}</span>}
            </div>
          ))}
          {isRunning && (
            <div className="flex items-center gap-2 text-slate-500 pt-2 animate-pulse">
              <span>❯</span>
              <span>Running Ninja build tasks...</span>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Target Outputs: <code className="text-slate-200 font-mono">{config.selectedTargets.join(', ')}</code>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleRunBuild}
              disabled={isRunning}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-xs font-medium text-slate-200 border border-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Re-run Build
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
