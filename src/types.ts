export type Language = 'en' | 'si';

export interface NinjaRule {
  id: string;
  name: string;
  command: string;
  description?: string;
  depfile?: string;
  deps?: string;
}

export interface NinjaBuildTarget {
  id: string;
  output: string;
  rule: string;
  inputs: string;
  isPhony?: boolean;
}

export interface NdkNinjaConfig {
  abiFilters: string[];
  sourceFileListPath: string;
  configureScript: string;
  customArguments: string[];
  selectedTargets: string[];
  enable16KbPageSize: boolean;
  minSdkVersion: number;
  targetSdkVersion: number;
  ndkVersion: string;
  rules: NinjaRule[];
  targets: NinjaBuildTarget[];
}

export interface PixelDevice {
  id: string;
  name: string;
  codeName: string;
  chipset: string;
  ram: string;
  supportType: 'stable' | 'beta' | 'developer-preview';
  factoryImageUrl: string;
  otaUrl: string;
  flashToolId: string;
}

export interface PartnerBrand {
  id: string;
  name: string;
  logoText: string;
  accentColor: string;
  models: string[];
  portalUrl: string;
  supportGuide: string;
  siSupportGuide: string;
}

export interface EmulatorStep {
  stepNumber: number;
  title: string;
  siTitle: string;
  description: string;
  siDescription: string;
  actionHint: string;
  siActionHint: string;
  badge?: string;
}
