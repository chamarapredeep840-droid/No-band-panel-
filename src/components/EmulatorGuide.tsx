import React, { useState } from 'react';
import {
  PHONE_EMULATOR_STEPS,
  TABLET_EMULATOR_STEPS,
  RESIZABLE_EMULATOR_FEATURES,
} from '../data/android16Data';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import {
  Smartphone,
  Tablet,
  Maximize2,
  Layers,
  CheckCircle2,
  Sliders,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface EmulatorGuideProps {
  lang: Language;
}

export const EmulatorGuide: React.FC<EmulatorGuideProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [subTab, setSubTab] = useState<'phone' | 'tablet' | 'resizable'>('phone');
  const [activeDeviceMode, setActiveDeviceMode] = useState<number>(0);

  const currentMode = RESIZABLE_EMULATOR_FEATURES.modes[activeDeviceMode];

  return (
    <div id="emulator-guide" className="space-y-8">
      {/* Header Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Android Studio Meerkat | 2024.3.1+
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {t.emulatorTitle}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            {t.emulatorDesc}
          </p>
        </div>

        <a
          href="https://developer.android.com/studio"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950/40 transition-colors self-start md:self-auto"
        >
          <span>Download Android Studio Meerkat</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Sub Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setSubTab('phone')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
            subTab === 'phone'
              ? 'bg-indigo-600 text-white font-semibold shadow-sm'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>{t.phoneAvdTab}</span>
        </button>
        <button
          onClick={() => setSubTab('tablet')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
            subTab === 'tablet'
              ? 'bg-indigo-600 text-white font-semibold shadow-sm'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Tablet className="w-4 h-4" />
          <span>{t.tabletAvdTab}</span>
        </button>
        <button
          onClick={() => setSubTab('resizable')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
            subTab === 'resizable'
              ? 'bg-indigo-600 text-white font-semibold shadow-sm'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Maximize2 className="w-4 h-4" />
          <span>{t.resizableAvdTab}</span>
        </button>
      </div>

      {/* Step by Step Guide: Phone */}
      {subTab === 'phone' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PHONE_EMULATOR_STEPS.map((step) => (
            <div
              key={step.stepNumber}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center font-bold text-xs">
                    {step.stepNumber}
                  </span>
                  {step.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {step.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-white text-sm">
                  {lang === 'si' ? step.siTitle : step.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === 'si' ? step.siDescription : step.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80">
                <div className="text-[11px] font-mono text-indigo-400 bg-slate-950 p-2 rounded-lg border border-slate-800 truncate">
                  {lang === 'si' ? step.siActionHint : step.actionHint}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Step by Step Guide: Tablet & Large-Screen */}
      {subTab === 'tablet' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TABLET_EMULATOR_STEPS.map((step) => (
            <div
              key={step.stepNumber}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center font-bold text-xs">
                    {step.stepNumber}
                  </span>
                  {step.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {step.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-white text-sm">
                  {lang === 'si' ? step.siTitle : step.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === 'si' ? step.siDescription : step.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80">
                <div className="text-[11px] font-mono text-purple-400 bg-slate-950 p-2 rounded-lg border border-slate-800 truncate">
                  {lang === 'si' ? step.siActionHint : step.actionHint}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Resizable Emulator Interactive Simulator */}
      {subTab === 'resizable' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-indigo-400" />
              {lang === 'si' ? RESIZABLE_EMULATOR_FEATURES.siTitle : RESIZABLE_EMULATOR_FEATURES.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              {lang === 'si' ? RESIZABLE_EMULATOR_FEATURES.siDescription : RESIZABLE_EMULATOR_FEATURES.description}
            </p>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {RESIZABLE_EMULATOR_FEATURES.modes.map((mode, index) => (
              <button
                key={mode.name}
                onClick={() => setActiveDeviceMode(index)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  activeDeviceMode === index
                    ? 'bg-indigo-950/40 border-indigo-500 text-white shadow-md'
                    : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-xs">{mode.name}</span>
                  {activeDeviceMode === index && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                </div>
                <div className="text-[11px] font-mono text-slate-400 space-y-0.5">
                  <div>Res: {mode.resolution}</div>
                  <div>Aspect: {mode.ratio} ({mode.dpi})</div>
                </div>
              </button>
            ))}
          </div>

          {/* Interactive Screen Preview Frame */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center min-h-[380px] overflow-hidden relative">
            <div
              className="bg-slate-900 border-4 border-slate-700 rounded-2xl shadow-2xl p-4 transition-all duration-500 ease-in-out flex flex-col justify-between text-white relative overflow-hidden"
              style={{
                width: activeDeviceMode === 0 ? '220px' : activeDeviceMode === 1 ? '240px' : activeDeviceMode === 2 ? '380px' : '440px',
                height: activeDeviceMode === 0 ? '340px' : activeDeviceMode === 1 ? '320px' : activeDeviceMode === 2 ? '300px' : '260px',
              }}
            >
              {/* Virtual System Status Bar */}
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pb-2 border-b border-slate-800">
                <span>09:41</span>
                <span>Android 16 (Baklava)</span>
                <span>100% 🔋</span>
              </div>

              {/* Virtual App Content */}
              <div className="text-center py-4 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-500 mx-auto flex items-center justify-center text-white font-bold text-xs shadow-md">
                  A16
                </div>
                <div className="text-xs font-semibold text-slate-200">
                  {currentMode.name}
                </div>
                <div className="text-[10px] font-mono text-emerald-400">
                  {currentMode.resolution} • {currentMode.ratio}
                </div>
              </div>

              {/* Navigation Bar */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-around text-slate-500 text-xs">
                <span>◀</span>
                <span>●</span>
                <span>■</span>
              </div>
            </div>
            <div className="mt-4 text-xs text-slate-400 font-mono text-center">
              Active Display Profile: <span className="text-indigo-300 font-semibold">{currentMode.name}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
