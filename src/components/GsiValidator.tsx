import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Terminal, Copy, Check, ShieldCheck, Download, ExternalLink, Cpu } from 'lucide-react';

interface GsiValidatorProps {
  lang: Language;
}

export const GsiValidator: React.FC<GsiValidatorProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const trebleCheck = `# 1. Verify Project Treble compliance on connected device:
adb shell getprop ro.treble.enabled
# Output MUST be: true

# 2. Check architecture and system-as-root status:
adb shell getprop ro.product.cpu.abi
# (e.g., arm64-v8a or x86_64)

adb shell getprop ro.build.system_root_image
# (e.g., true for modern A/B devices)`;

  const dsuScript = `# Dynamic System Update (DSU) via ADB (No Bootloader Unlock Needed!)
# 1. Download Android 16 GSI .zip with GMS / Basic
# 2. Invoke DSU loader via adb activity manager:
adb shell am start-activity \\
  -n com.android.dynsystem/com.android.dynsystem.VerificationActivity \\
  -a android.os.image.action.START_INSTALL \\
  -d "file:///sdcard/Download/gsi_arm64-16.0.0.zip" \\
  --el KEY_USERDATA_SIZE 17179869184

# 3. Accept prompt in Android Notification drawer and reboot into Guest DSU OS!`;

  const fastbootdScript = `# Flashing Android 16 GSI directly via fastbootd:
# 1. Reboot to fastbootd
adb reboot fastboot

# 2. Disable Android Verified Boot (AVB) verity if required:
fastboot --disable-verity --disable-verification flash vbmeta vbmeta.img

# 3. Erase current system & flash Android 16 GSI system.img:
fastboot erase system
fastboot flash system system.img

# 4. Wipe user data & reboot:
fastboot -w
fastboot reboot`;

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div id="gsi-validator" className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            Treble Compliance &amp; DSU
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {t.gsiTitle}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            {t.gsiDesc}
          </p>
        </div>

        <a
          href="https://developer.android.com/topic/generic-system-image"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors self-start md:self-auto"
        >
          <span>developer.android.com/gsi</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* 3 Step Toolcards */}
      <div className="space-y-6">
        {/* Step 1: Check Treble */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
            <div className="flex items-center gap-2.5">
              <Cpu className="w-4 h-4 text-blue-400" />
              <h3 className="font-semibold text-slate-200 text-sm">{t.trebleCheckCmd}</h3>
            </div>
            <button
              onClick={() => handleCopy('treble', trebleCheck)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
            >
              {copiedKey === 'treble' ? (
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
          <pre className="p-6 font-mono text-xs text-blue-300 bg-slate-950 overflow-x-auto leading-relaxed">
            <code>{trebleCheck}</code>
          </pre>
        </div>

        {/* Step 2: DSU Loader */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
            <div className="flex items-center gap-2.5">
              <Download className="w-4 h-4 text-emerald-400" />
              <h3 className="font-semibold text-slate-200 text-sm">{t.dsuLoaderGuide}</h3>
            </div>
            <button
              onClick={() => handleCopy('dsu', dsuScript)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
            >
              {copiedKey === 'dsu' ? (
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
          <pre className="p-6 font-mono text-xs text-emerald-300 bg-slate-950 overflow-x-auto leading-relaxed">
            <code>{dsuScript}</code>
          </pre>
        </div>

        {/* Step 3: Fastbootd */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
            <div className="flex items-center gap-2.5">
              <Terminal className="w-4 h-4 text-amber-400" />
              <h3 className="font-semibold text-slate-200 text-sm">{t.fastbootdGuide}</h3>
            </div>
            <button
              onClick={() => handleCopy('fastbootd', fastbootdScript)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
            >
              {copiedKey === 'fastbootd' ? (
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
          <pre className="p-6 font-mono text-xs text-amber-300 bg-slate-950 overflow-x-auto leading-relaxed">
            <code>{fastbootdScript}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
