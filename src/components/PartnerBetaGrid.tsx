import React, { useState } from 'react';
import { PARTNER_BRANDS } from '../data/android16Data';
import { Language, PartnerBrand } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ExternalLink, Smartphone, Info, ShieldAlert } from 'lucide-react';

interface PartnerBetaGridProps {
  lang: Language;
}

export const PartnerBetaGrid: React.FC<PartnerBetaGridProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [selectedBrand, setSelectedBrand] = useState<PartnerBrand | null>(null);

  return (
    <div id="partner-beta-grid" className="space-y-8">
      {/* Header Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
            <Smartphone className="w-3.5 h-3.5" />
            OEM Partner Developer Programs
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {t.partnerTitle}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            {t.partnerDesc}
          </p>
        </div>

        <a
          href="https://developer.android.com/about/versions/16/devices"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors self-start md:self-auto"
        >
          <span>developer.android.com/devices</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Warning Notice */}
      <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3 text-amber-200 text-xs leading-relaxed">
        <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Notice before flashing OEM Beta images:</span> Partner Beta builds may disable specific vendor hardware features (e.g., in-display fingerprint, custom HDR camera pipelines, or VoLTE). Always backup all user partitions before flashing.
        </div>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {PARTNER_BRANDS.map((brand) => (
          <div
            key={brand.id}
            onClick={() => setSelectedBrand(brand)}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 shadow-sm transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-xs shadow-inner"
                  style={{ backgroundColor: brand.accentColor }}
                >
                  {brand.logoText}
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {brand.models.length} Flagships
                </span>
              </div>

              <div>
                <h3 className="font-bold text-lg text-white group-hover:text-amber-300 transition-colors">
                  {brand.name}
                </h3>
                <div className="mt-2 space-y-1">
                  {brand.models.map((model, i) => (
                    <div key={i} className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                      <span>{model}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>{t.getBetaRom}</span>
              <span>→</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Detailed Drawer for Selected Brand */}
      {selectedBrand && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl p-6 space-y-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-xs"
                  style={{ backgroundColor: selectedBrand.accentColor }}
                >
                  {selectedBrand.logoText}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedBrand.name} Android 16 Beta</h3>
                  <p className="text-xs text-slate-400">Supported Target Hardware</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedBrand(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-slate-300">Supported Models:</div>
              <div className="flex flex-wrap gap-2">
                {selectedBrand.models.map((m, i) => (
                  <span key={i} className="px-2.5 py-1 rounded bg-slate-800 text-amber-300 text-xs font-mono">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-400" />
                Flashing &amp; Installation Instructions:
              </div>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/60 p-3.5 rounded-xl border border-slate-700">
                {lang === 'si' ? selectedBrand.siSupportGuide : selectedBrand.supportGuide}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <a
                href={selectedBrand.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs transition-colors"
              >
                <span>Visit {selectedBrand.name} Developer Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
