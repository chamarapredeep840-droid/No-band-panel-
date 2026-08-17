import React, { useState } from 'react';
import { NdkNinjaConfig, Language, NinjaRule, NinjaBuildTarget } from '../types';
import {
  NINJA_PRESETS,
  generateBuildNinja,
  generateGradleKts,
  generateGradleGroovy,
  generateSourceFileList,
  generateConfigureScript,
} from '../data/ninjaPresets';
import { TRANSLATIONS } from '../data/translations';
import { NinjaDagVisualizer } from './NinjaDagVisualizer';
import { LiveBuildSimulatorModal } from './LiveBuildSimulatorModal';
import {
  Copy,
  Check,
  Plus,
  Trash2,
  Play,
  FileCode,
  Layers,
  Settings,
  ShieldCheck,
  Code2,
  Sparkles,
  Download,
} from 'lucide-react';

interface NinjaConfiguratorProps {
  lang: Language;
  config: NdkNinjaConfig;
  onChangeConfig: (config: NdkNinjaConfig) => void;
}

export const NinjaConfigurator: React.FC<NinjaConfiguratorProps> = ({
  lang,
  config,
  onChangeConfig,
}) => {
  const t = TRANSLATIONS[lang];
  const [activeCodeTab, setActiveCodeTab] = useState<'ninja' | 'kts' | 'groovy' | 'filelist' | 'configure'>('ninja');
  const [copiedTab, setCopiedTab] = useState<string | null>(null);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

  const availableAbis = ['arm64-v8a', 'x86_64', 'x86', 'armeabi-v7a'];

  const toggleAbi = (abi: string) => {
    const updated = config.abiFilters.includes(abi)
      ? config.abiFilters.filter((a) => a !== abi)
      : [...config.abiFilters, abi];
    if (updated.length > 0) {
      onChangeConfig({ ...config, abiFilters: updated });
    }
  };

  const handleSelectPreset = (presetId: string) => {
    const preset = NINJA_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      onChangeConfig({ ...preset.config });
    }
  };

  // Rule operations
  const handleAddRule = () => {
    const newRule: NinjaRule = {
      id: `rule-${Date.now()}`,
      name: `CUSTOM_RULE_${config.rules.length + 1}`,
      command: '${ndk_clang} $in -o $out {custom flags}',
      description: 'Custom compile/link rule',
    };
    onChangeConfig({ ...config, rules: [...config.rules, newRule] });
  };

  const handleUpdateRule = (id: string, field: keyof NinjaRule, value: string) => {
    const updated = config.rules.map((r) => (r.id === id ? { ...r, [field]: value } : r));
    onChangeConfig({ ...config, rules: updated });
  };

  const handleDeleteRule = (id: string) => {
    if (config.rules.length > 1) {
      onChangeConfig({ ...config, rules: config.rules.filter((r) => r.id !== id) });
    }
  };

  // Target operations
  const handleAddTarget = () => {
    const newTarget: NinjaBuildTarget = {
      id: `target-${Date.now()}`,
      output: `libcustom_${config.targets.length + 1}.so`,
      rule: config.rules[0]?.name || 'COMPILE',
      inputs: 'source.o',
    };
    onChangeConfig({ ...config, targets: [...config.targets, newTarget] });
  };

  const handleUpdateTarget = (id: string, field: keyof NinjaBuildTarget, value: any) => {
    const updated = config.targets.map((t) => (t.id === id ? { ...t, [field]: value } : t));
    onChangeConfig({ ...config, targets: updated });
  };

  const handleDeleteTarget = (id: string) => {
    if (config.targets.length > 1) {
      onChangeConfig({ ...config, targets: config.targets.filter((t) => t.id !== id) });
    }
  };

  const toggleTargetSelection = (targetName: string) => {
    const current = [...config.selectedTargets];
    const exists = current.includes(targetName);
    const updated = exists ? current.filter((t) => t !== targetName) : [...current, targetName];
    if (updated.length > 0) {
      onChangeConfig({ ...config, selectedTargets: updated });
    }
  };

  const getCodeContent = () => {
    switch (activeCodeTab) {
      case 'ninja':
        return generateBuildNinja(config);
      case 'kts':
        return generateGradleKts(config);
      case 'groovy':
        return generateGradleGroovy(config);
      case 'filelist':
        return generateSourceFileList(config);
      case 'configure':
        return generateConfigureScript(config);
      default:
        return '';
    }
  };

  const handleCopy = (tabKey: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedTab(tabKey);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const handleDownloadAll = () => {
    const files = [
      { name: 'build.ninja', content: generateBuildNinja(config) },
      { name: 'build.gradle.kts', content: generateGradleKts(config) },
      { name: 'build.gradle', content: generateGradleGroovy(config) },
      { name: config.sourceFileListPath, content: generateSourceFileList(config) },
      { name: config.configureScript, content: generateConfigureScript(config) },
    ];

    files.forEach((file) => {
      const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div id="ninja-configurator" className="space-y-8">
      {/* Top Banner & Presets */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Android Gradle Plugin Ninja Toolchain
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {t.ninjaTitle}
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              {t.ninjaDesc}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              id="simulate-build-btn"
              onClick={() => setIsSimulatorOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-950/40 transition-all hover:scale-105 active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" />
              {t.simulateBuild}
            </button>
            <button
              id="download-all-files-btn"
              onClick={handleDownloadAll}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm border border-slate-600 transition-all hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4" />
              {t.downloadAll}
            </button>
          </div>
        </div>

        {/* Preset Selector */}
        <div className="mt-6 pt-5 border-t border-slate-700/60 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {NINJA_PRESETS.map((preset) => {
            const isMatch =
              config.rules.length === preset.config.rules.length &&
              config.selectedTargets.join(',') === preset.config.selectedTargets.join(',');
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset.id)}
                className={`p-3.5 rounded-xl text-left transition-all border ${
                  isMatch
                    ? 'bg-emerald-950/40 border-emerald-500/60 text-white shadow-md'
                    : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                <div className="text-xs font-semibold mb-1 flex items-center justify-between">
                  <span className="truncate">{lang === 'si' ? preset.siName : preset.name}</span>
                  {isMatch && <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />}
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {lang === 'si' ? preset.siDesc : preset.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* DAG Visualization */}
      <NinjaDagVisualizer
        rules={config.rules}
        targets={config.targets}
        selectedTargets={config.selectedTargets}
        enable16Kb={config.enable16KbPageSize}
      />

      {/* Configuration Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: AGP & Toolchain Settings */}
        <div className="space-y-6">
          {/* ABI Selection */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Settings className="w-4 h-4 text-blue-400" />
              {t.abiSelection}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {availableAbis.map((abi) => {
                const isSelected = config.abiFilters.includes(abi);
                return (
                  <button
                    key={abi}
                    onClick={() => toggleAbi(abi)}
                    className={`px-3 py-2 rounded-lg text-xs font-mono font-medium border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-500 text-blue-300 font-semibold'
                        : 'bg-slate-800/60 border-slate-700/80 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <span>{abi}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-400" />}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              experimentalProperties["ninja.abiFilters"] = [{' '}
              {config.abiFilters.map((a) => `"${a}"`).join(', ')} ]
            </p>
          </div>

          {/* 16KB Page Alignment Compliance Toggle */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  {t.pageAlignment16Kb}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {t.pageAlignmentNotice}
                </p>
              </div>
              <button
                onClick={() =>
                  onChangeConfig({ ...config, enable16KbPageSize: !config.enable16KbPageSize })
                }
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  config.enable16KbPageSize ? 'bg-emerald-600 justify-end' : 'bg-slate-700 justify-start'
                }`}
              >
                <div className="bg-white w-4 h-4 rounded-full shadow-md" />
              </button>
            </div>
          </div>

          {/* AGP File Paths & Script Configuration */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4 text-xs">
            <h3 className="font-semibold text-slate-200 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-purple-400" />
              AGP Ninja Properties
            </h3>

            <div className="space-y-1.5">
              <label className="text-slate-400 block font-mono text-[11px]">
                {t.sourceFileList}
              </label>
              <input
                type="text"
                value={config.sourceFileListPath}
                onChange={(e) => onChangeConfig({ ...config, sourceFileListPath: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 font-mono text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-400 block font-mono text-[11px]">
                {t.configureScript}
              </label>
              <input
                type="text"
                value={config.configureScript}
                onChange={(e) => onChangeConfig({ ...config, configureScript: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 font-mono text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Target SDK Versions */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-400 block text-[11px]">Min SDK Version</label>
                <input
                  type="number"
                  value={config.minSdkVersion}
                  onChange={(e) =>
                    onChangeConfig({ ...config, minSdkVersion: parseInt(e.target.value) || 24 })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 font-mono text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-400 block text-[11px]">Target/Compile SDK</label>
                <input
                  type="number"
                  value={config.targetSdkVersion}
                  onChange={(e) =>
                    onChangeConfig({ ...config, targetSdkVersion: parseInt(e.target.value) || 36 })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 font-mono text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Middle & Right: Rules & Targets Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Rules Editor */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                  <FileCode className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-slate-200 text-sm">{t.rulesSection}</h3>
              </div>
              <button
                onClick={handleAddRule}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                {t.addRule}
              </button>
            </div>

            <div className="space-y-3">
              {config.rules.map((rule) => (
                <div
                  key={rule.id}
                  className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-4 space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-xs font-mono font-bold text-amber-400">rule</span>
                      <input
                        type="text"
                        value={rule.name}
                        onChange={(e) => handleUpdateRule(rule.id, 'name', e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs font-mono font-semibold text-slate-100 max-w-[200px]"
                        placeholder="RULE_NAME"
                      />
                    </div>
                    <button
                      onClick={() => handleDeleteRule(rule.id)}
                      disabled={config.rules.length <= 1}
                      className="text-slate-400 hover:text-red-400 disabled:opacity-30 p-1 transition-colors"
                      title={t.delete}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono">command =</span>
                    <input
                      type="text"
                      value={rule.command}
                      onChange={(e) => handleUpdateRule(rule.id, 'command', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Targets Editor */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-slate-200 text-sm">{t.targetsSection}</h3>
              </div>
              <button
                onClick={handleAddTarget}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                {t.addTarget}
              </button>
            </div>

            {/* Target Items List */}
            <div className="space-y-3">
              {config.targets.map((tgt) => {
                const isSelected = config.selectedTargets.includes(tgt.output);
                return (
                  <div
                    key={tgt.id}
                    className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-4 space-y-2.5"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                      <div className="md:col-span-4 space-y-1">
                        <span className="text-[10px] text-slate-400 font-mono">build output</span>
                        <input
                          type="text"
                          value={tgt.output}
                          onChange={(e) => handleUpdateTarget(tgt.id, 'output', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono font-semibold text-purple-300"
                        />
                      </div>

                      <div className="md:col-span-3 space-y-1">
                        <span className="text-[10px] text-slate-400 font-mono">: rule</span>
                        <select
                          value={tgt.rule}
                          onChange={(e) => {
                            const val = e.target.value;
                            handleUpdateTarget(tgt.id, 'rule', val);
                            if (val === 'phony') {
                              handleUpdateTarget(tgt.id, 'isPhony', true);
                            }
                          }}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-200"
                        >
                          <option value="phony">phony</option>
                          {config.rules.map((r) => (
                            <option key={r.id} value={r.name}>
                              {r.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="md:col-span-4 space-y-1">
                        <span className="text-[10px] text-slate-400 font-mono">inputs</span>
                        <input
                          type="text"
                          value={tgt.inputs}
                          onChange={(e) => handleUpdateTarget(tgt.id, 'inputs', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-200"
                          placeholder="foo.o bar.o"
                        />
                      </div>

                      <div className="md:col-span-1 flex items-center justify-end">
                        <button
                          onClick={() => handleDeleteTarget(tgt.id)}
                          disabled={config.targets.length <= 1}
                          className="text-slate-400 hover:text-red-400 disabled:opacity-30 p-1 transition-colors"
                          title={t.delete}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Quick export checkbox */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-700/50 text-[11px]">
                      <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleTargetSelection(tgt.output)}
                          className="rounded border-slate-600 bg-slate-900 text-emerald-500 focus:ring-0"
                        />
                        <span>Export to <code>experimentalProperties["ninja.targets"]</code></span>
                      </label>
                      {tgt.isPhony && (
                        <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px]">
                          Phony Target
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Generated Code Files Viewer Tabs */}
      <div id="ninja-code-viewer" className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'ninja', label: 'build.ninja', badge: 'Ninja Config' },
              { id: 'kts', label: 'build.gradle.kts', badge: 'Kotlin DSL' },
              { id: 'groovy', label: 'build.gradle', badge: 'Groovy DSL' },
              { id: 'filelist', label: config.sourceFileListPath, badge: 'File List' },
              { id: 'configure', label: config.configureScript, badge: 'Shell Script' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCodeTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-2 ${
                  activeCodeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-sans ${activeCodeTab === tab.id ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-700 text-slate-300'}`}>
                  {tab.badge}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => handleCopy(activeCodeTab, getCodeContent())}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
          >
            {copiedTab === activeCodeTab ? (
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

        {/* Code View Area */}
        <pre className="p-6 font-mono text-xs text-emerald-300 bg-slate-950 overflow-x-auto leading-relaxed max-h-[500px]">
          <code>{getCodeContent()}</code>
        </pre>
      </div>

      {/* Simulator Modal */}
      <LiveBuildSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        config={config}
      />
    </div>
  );
};
