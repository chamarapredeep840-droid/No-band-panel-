import React, { useState } from 'react';
import { NdkNinjaConfig, Language } from './types';
import { DEFAULT_NINJA_CONFIG } from './data/ninjaPresets';
import { TRANSLATIONS } from './data/translations';
import { NinjaConfigurator } from './components/NinjaConfigurator';
import { PixelDeviceMatrix } from './components/PixelDeviceMatrix';
import { PartnerBetaGrid } from './components/PartnerBetaGrid';
import { EmulatorGuide } from './components/EmulatorGuide';
import { GsiValidator } from './components/GsiValidator';
import { BehaviorChangesTab } from './components/BehaviorChangesTab';
import {
  Layers,
  Smartphone,
  Tablet,
  Cpu,
  ShieldCheck,
  Languages,
  Sparkles,
  ExternalLink,
  BookOpen,
  Code2,
  Terminal,
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<'ninja' | 'pixel' | 'partner' | 'emulator' | 'gsi' | 'changes'>('ninja');
  const [ninjaConfig, setNinjaConfig] = useState<NdkNinjaConfig>(DEFAULT_NINJA_CONFIG);

  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-950/50">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Terminal className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white tracking-tight">
                  {t.appTitle}
                </h1>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Android 16 • NDK 27+
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                AGP Ninja Build Pipeline &amp; Android 16 (Baklava) Developer Suite
              </p>
            </div>
          </div>

          {/* Right Action Items: Language Toggle & Official Docs */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/80">
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  lang === 'en'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('si')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  lang === 'si'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                සිංහල
              </button>
            </div>

            <a
              href="https://developer.android.com/about/versions/16"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-colors"
            >
              <span>Android 16 Hub</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Horizontal Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto no-scrollbar py-2 border-t border-slate-800/50">
          {[
            { id: 'ninja', label: t.tabNinjaBuilder, icon: Code2 },
            { id: 'pixel', label: t.tabPixelDevices, icon: Smartphone },
            { id: 'partner', label: t.tabPartnerDevices, icon: Tablet },
            { id: 'emulator', label: t.tabEmulatorSetup, icon: Cpu },
            { id: 'gsi', label: t.tabGsiGuide, icon: ShieldCheck },
            { id: 'changes', label: t.tabAndroid16Features, icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {activeTab === 'ninja' && (
          <NinjaConfigurator
            lang={lang}
            config={ninjaConfig}
            onChangeConfig={setNinjaConfig}
          />
        )}

        {activeTab === 'pixel' && <PixelDeviceMatrix lang={lang} />}

        {activeTab === 'partner' && <PartnerBetaGrid lang={lang} />}

        {activeTab === 'emulator' && <EmulatorGuide lang={lang} />}

        {activeTab === 'gsi' && <GsiValidator lang={lang} />}

        {activeTab === 'changes' && <BehaviorChangesTab lang={lang} />}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-900/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>Android 16 &amp; NDK Ninja Studio</span>
            <span>•</span>
            <span>Compatible with AGP 8.8+ &amp; Android 16 (API 36 Baklava)</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://developer.android.com/ndk/guides"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-200 transition-colors"
            >
              NDK Guides
            </a>
            <a
              href="https://ninja-build.org/manual.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-200 transition-colors"
            >
              Ninja Manual
            </a>
            <a
              href="https://developer.android.com/about/versions/16/get"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-200 transition-colors"
            >
              Get Android 16
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
