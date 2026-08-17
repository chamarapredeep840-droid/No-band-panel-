import React, { useState } from 'react';
import { ANDROID_16_CHANGES, BehaviorChange } from '../data/android16Data';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Code,
  ShieldAlert,
  Sparkles,
  BookOpen,
  Copy,
  Check,
} from 'lucide-react';

interface BehaviorChangesTabProps {
  lang: Language;
}

export const BehaviorChangesTab: React.FC<BehaviorChangesTabProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [selectedChange, setSelectedChange] = useState<BehaviorChange>(ANDROID_16_CHANGES[0]);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div id="behavior-changes-tab" className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Android 16 Behavior Changes &amp; App Migration
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {t.tabAndroid16Features}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Essential architectural updates, 16KB page alignment guidelines, edge-to-edge layout requirements, and predictive back migrations.
          </p>
        </div>

        <a
          href="https://developer.android.com/about/versions/16/behavior-changes-16"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors self-start md:self-auto"
        >
          <span>Official Behavior Changes</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Main interactive grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List of changes */}
        <div className="lg:col-span-5 space-y-3">
          {ANDROID_16_CHANGES.map((change) => {
            const isSelected = selectedChange.id === change.id;
            return (
              <div
                key={change.id}
                onClick={() => setSelectedChange(change)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800 border-emerald-500/80 shadow-md ring-1 ring-emerald-500/30'
                    : 'bg-slate-900 hover:bg-slate-800/80 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                      change.impactLevel === 'high'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : change.impactLevel === 'medium'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}
                  >
                    {change.impactLevel} Impact
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    {change.category}
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm">
                  {lang === 'si' ? change.siTitle : change.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {lang === 'si' ? change.siSummary : change.summary}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono uppercase text-emerald-400 font-semibold tracking-wider">
                  {selectedChange.category} category
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {lang === 'si' ? selectedChange.siTitle : selectedChange.title}
                </h3>
              </div>
              <a
                href={selectedChange.docUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                title="View Official Docs"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
              {lang === 'si' ? selectedChange.siSummary : selectedChange.summary}
            </p>

            {/* Code example */}
            {selectedChange.codeExample && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Code className="w-4 h-4 text-emerald-400" />
                    <span>Implementation &amp; Verification Snippet:</span>
                  </div>
                  <button
                    onClick={() => handleCopy(selectedChange.codeExample!)}
                    className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200"
                  >
                    {copiedCode ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedCode ? t.copied : t.copyCode}</span>
                  </button>
                </div>
                <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
                  <code>{selectedChange.codeExample}</code>
                </pre>
              </div>
            )}

            {/* Remediation Guide */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Action &amp; Migration Step:</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/60">
                {lang === 'si' ? selectedChange.siRemediationGuide : selectedChange.remediationGuide}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">
              Target SDK 36 (Android 16 Baklava)
            </span>
            <a
              href={selectedChange.docUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors"
            >
              <span>Explore Developer Docs</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
