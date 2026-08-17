import React, { useState } from 'react';
import { PIXEL_DEVICES } from '../data/android16Data';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import {
  Smartphone,
  ExternalLink,
  Download,
  Terminal,
  Zap,
  CheckCircle2,
  Copy,
  Check,
  Search,
  Sparkles,
} from 'lucide-react';

interface PixelDeviceMatrixProps {
  lang: Language;
}

export const PixelDeviceMatrix: React.FC<PixelDeviceMatrixProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFamily, setSelectedFamily] = useState<string>('all');
  const [copiedCmd, setCopiedCmd] = useState(false);

  const families = [
    { id: 'all', label: 'All Pixel Devices' },
    { id: 'pixel-9', label: 'Pixel 9 Series' },
    { id: 'pixel-8', label: 'Pixel 8 Series' },
    { id: 'pixel-7', label: 'Pixel 7 Series' },
    { id: 'pixel-6', label: 'Pixel 6 Series' },
    { id: 'fold-tablet', label: 'Fold & Tablet' },
  ];

  const filteredDevices = PIXEL_DEVICES.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.codeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.chipset.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedFamily === 'all') return true;
    if (selectedFamily === 'pixel-9') return d.id.includes('pixel-9');
    if (selectedFamily === 'pixel-8') return d.id.includes('pixel-8');
    if (selectedFamily === 'pixel-7') return d.id.includes('pixel-7');
    if (selectedFamily === 'pixel-6') return d.id.includes('pixel-6');
    if (selectedFamily === 'fold-tablet') return d.id.includes('fold') || d.id.includes('tablet');

    return true;
  });

  const fastbootScript = `# Android 16 Fastboot Flashing Instructions
# 1. Unlock OEM Bootloader in Developer Options
adb reboot bootloader

# 2. Verify Fastboot connectivity
fastboot devices

# 3. Flash Android 16 Factory Image (Wipes user data)
# Windows:
flash-all.bat
# Linux/macOS:
./flash-all.sh

# Or apply Full OTA without wipe via ADB Sideload:
adb reboot recovery
# Select 'Apply update from ADB' in recovery, then:
adb sideload <device-ota-package-16.0.0.zip>`;

  const copyFastboot = () => {
    navigator.clipboard.writeText(fastbootScript);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div id="pixel-device-matrix" className="space-y-8">
      {/* Top Banner & WebUSB Flash Tool Hero */}
      <div className="bg-gradient-to-r from-blue-950/70 via-slate-900 to-indigo-950/70 border border-blue-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              WebUSB Zero-Install Flashing
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {t.recommendedFlashTool}
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              {t.flashToolDesc}
            </p>
          </div>

          <a
            href="https://flash.android.com/release/16.0.0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-950/50 transition-all hover:scale-105 active:scale-95"
          >
            <span>{t.openFlashTool}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {families.map((fam) => (
            <button
              key={fam.id}
              onClick={() => setSelectedFamily(fam.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedFamily === fam.id
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {fam.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Pixel model, codename..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Pixel Devices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredDevices.map((device) => (
          <div
            key={device.id}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 shadow-sm transition-all hover:-translate-y-1 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="p-2 rounded-lg bg-slate-800 text-blue-400 border border-slate-700">
                  <Smartphone className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  Android 16 Ready
                </span>
              </div>

              <div>
                <h3 className="font-bold text-white text-base group-hover:text-blue-300 transition-colors">
                  {device.name}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Codename: <span className="text-slate-300 font-semibold">{device.codeName}</span>
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Processor:</span>
                  <span className="text-slate-300 font-medium">{device.chipset}</span>
                </div>
                <div className="flex justify-between">
                  <span>Memory:</span>
                  <span className="text-slate-300 font-medium">{device.ram}</span>
                </div>
                <div className="flex justify-between">
                  <span>16KB Mode:</span>
                  <span className="text-emerald-400 font-medium">Supported</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center gap-2">
              <a
                href={device.factoryImageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
                title="Download Factory Image"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Factory</span>
              </a>
              <a
                href={device.otaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-medium transition-colors"
                title="Download Full OTA"
              >
                <Download className="w-3.5 h-3.5" />
                <span>OTA</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Manual Fastboot Instructions Terminal */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <h3 className="font-semibold text-slate-200 text-sm">{t.flashInstructions}</h3>
          </div>
          <button
            onClick={copyFastboot}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
          >
            {copiedCmd ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">{t.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{t.copyCode}</span>
              </>
            )}
          </button>
        </div>
        <pre className="p-6 font-mono text-xs text-slate-300 bg-slate-950 overflow-x-auto leading-relaxed">
          <code>{fastbootScript}</code>
        </pre>
      </div>
    </div>
  );
};
