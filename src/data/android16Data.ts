import { PixelDevice, PartnerBrand, EmulatorStep } from '../types';

export const PIXEL_DEVICES: PixelDevice[] = [
  {
    id: 'pixel-9-pro-fold',
    name: 'Pixel 9 Pro Fold',
    codeName: 'comet',
    chipset: 'Google Tensor G4',
    ram: '16 GB',
    supportType: 'beta',
    factoryImageUrl: 'https://developers.google.com/android/images#comet',
    otaUrl: 'https://developers.google.com/android/ota#comet',
    flashToolId: 'comet',
  },
  {
    id: 'pixel-9-pro-xl',
    name: 'Pixel 9 Pro XL',
    codeName: 'komodo',
    chipset: 'Google Tensor G4',
    ram: '16 GB',
    supportType: 'beta',
    factoryImageUrl: 'https://developers.google.com/android/images#komodo',
    otaUrl: 'https://developers.google.com/android/ota#komodo',
    flashToolId: 'komodo',
  },
  {
    id: 'pixel-9-pro',
    name: 'Pixel 9 Pro',
    codeName: 'caiman',
    chipset: 'Google Tensor G4',
    ram: '16 GB',
    supportType: 'beta',
    factoryImageUrl: 'https://developers.google.com/android/images#caiman',
    otaUrl: 'https://developers.google.com/android/ota#caiman',
    flashToolId: 'caiman',
  },
  {
    id: 'pixel-9',
    name: 'Pixel 9',
    codeName: 'tokay',
    chipset: 'Google Tensor G4',
    ram: '12 GB',
    supportType: 'beta',
    factoryImageUrl: 'https://developers.google.com/android/images#tokay',
    otaUrl: 'https://developers.google.com/android/ota#tokay',
    flashToolId: 'tokay',
  },
  {
    id: 'pixel-9a',
    name: 'Pixel 9a',
    codeName: 'tegu',
    chipset: 'Google Tensor G4',
    ram: '8 GB',
    supportType: 'beta',
    factoryImageUrl: 'https://developers.google.com/android/images#tegu',
    otaUrl: 'https://developers.google.com/android/ota#tegu',
    flashToolId: 'tegu',
  },
  {
    id: 'pixel-8-pro',
    name: 'Pixel 8 Pro',
    codeName: 'husky',
    chipset: 'Google Tensor G3',
    ram: '12 GB',
    supportType: 'beta',
    factoryImageUrl: 'https://developers.google.com/android/images#husky',
    otaUrl: 'https://developers.google.com/android/ota#husky',
    flashToolId: 'husky',
  },
  {
    id: 'pixel-8',
    name: 'Pixel 8',
    codeName: 'shiba',
    chipset: 'Google Tensor G3',
    ram: '8 GB',
    supportType: 'beta',
    factoryImageUrl: 'https://developers.google.com/android/images#shiba',
    otaUrl: 'https://developers.google.com/android/ota#shiba',
    flashToolId: 'shiba',
  },
  {
    id: 'pixel-8a',
    name: 'Pixel 8a',
    codeName: 'akita',
    chipset: 'Google Tensor G3',
    ram: '8 GB',
    supportType: 'beta',
    factoryImageUrl: 'https://developers.google.com/android/images#akita',
    otaUrl: 'https://developers.google.com/android/ota#akita',
    flashToolId: 'akita',
  },
  {
    id: 'pixel-fold',
    name: 'Pixel Fold',
    codeName: 'felix',
    chipset: 'Google Tensor G2',
    ram: '12 GB',
    supportType: 'beta',
    factoryImageUrl: 'https://developers.google.com/android/images#felix',
    otaUrl: 'https://developers.google.com/android/ota#felix',
    flashToolId: 'felix',
  },
  {
    id: 'pixel-tablet',
    name: 'Pixel Tablet',
    codeName: 'tangorpro',
    chipset: 'Google Tensor G2',
    ram: '8 GB',
    supportType: 'beta',
    factoryImageUrl: 'https://developers.google.com/android/images#tangorpro',
    otaUrl: 'https://developers.google.com/android/ota#tangorpro',
    flashToolId: 'tangorpro',
  },
  {
    id: 'pixel-7-pro',
    name: 'Pixel 7 Pro',
    codeName: 'cheetah',
    chipset: 'Google Tensor G2',
    ram: '12 GB',
    supportType: 'beta',
    factoryImageUrl: 'https://developers.google.com/android/images#cheetah',
    otaUrl: 'https://developers.google.com/android/ota#cheetah',
    flashToolId: 'cheetah',
  },
  {
    id: 'pixel-7',
    name: 'Pixel 7',
    codeName: 'panther',
    chipset: 'Google Tensor G2',
    ram: '8 GB',
    supportType: 'beta',
    factoryImageUrl: 'https://developers.google.com/android/images#panther',
    otaUrl: 'https://developers.google.com/android/ota#panther',
    flashToolId: 'panther',
  },
  {
    id: 'pixel-7a',
    name: 'Pixel 7a',
    codeName: 'lynx',
    chipset: 'Google Tensor G2',
    ram: '8 GB',
    supportType: 'beta',
    factoryImageUrl: 'https://developers.google.com/android/images#lynx',
    otaUrl: 'https://developers.google.com/android/ota#lynx',
    flashToolId: 'lynx',
  },
  {
    id: 'pixel-6-pro',
    name: 'Pixel 6 Pro',
    codeName: 'raven',
    chipset: 'Google Tensor',
    ram: '12 GB',
    supportType: 'beta',
    factoryImageUrl: 'https://developers.google.com/android/images#raven',
    otaUrl: 'https://developers.google.com/android/ota#raven',
    flashToolId: 'raven',
  },
  {
    id: 'pixel-6',
    name: 'Pixel 6',
    codeName: 'oriole',
    chipset: 'Google Tensor',
    ram: '8 GB',
    supportType: 'beta',
    factoryImageUrl: 'https://developers.google.com/android/images#oriole',
    otaUrl: 'https://developers.google.com/android/ota#oriole',
    flashToolId: 'oriole',
  },
  {
    id: 'pixel-6a',
    name: 'Pixel 6a',
    codeName: 'bluejay',
    chipset: 'Google Tensor',
    ram: '6 GB',
    supportType: 'beta',
    factoryImageUrl: 'https://developers.google.com/android/images#bluejay',
    otaUrl: 'https://developers.google.com/android/ota#bluejay',
    flashToolId: 'bluejay',
  },
];

export const PARTNER_BRANDS: PartnerBrand[] = [
  {
    id: 'oneplus',
    name: 'OnePlus',
    logoText: '1+',
    accentColor: '#EB0029',
    models: ['OnePlus 13', 'OnePlus 12', 'OnePlus Open'],
    portalUrl: 'https://developer.android.com/about/versions/16/devices',
    supportGuide: 'Download the vendor-specific OxygenOS Android 16 Beta zip package, place into internal storage root, and trigger local upgrade via Developer Options.',
    siSupportGuide: 'OxygenOS Android 16 Beta zip පැකේජය ඩවුන්ලෝඩ් කර internal storage root එකට දමා Developer Options හරහා local upgrade ක්‍රියාත්මක කරන්න.',
  },
  {
    id: 'xiaomi',
    name: 'Xiaomi',
    logoText: 'MI',
    accentColor: '#FF6900',
    models: ['Xiaomi 15', 'Xiaomi 14', 'Xiaomi 14 Pro'],
    portalUrl: 'https://developer.android.com/about/versions/16/devices',
    supportGuide: 'Unlock bootloader via Mi Community account, boot to Fastboot mode, and execute the Xiaomi Flash Tool script for Android 16 Beta ROM.',
    siSupportGuide: 'Mi Community ගිණුම හරහා bootloader අගුළු හැර, Fastboot mode වෙත ගොස් Xiaomi Flash Tool මඟින් Android 16 Beta ROM එක flash කරන්න.',
  },
  {
    id: 'oppo',
    name: 'OPPO',
    logoText: 'OPPO',
    accentColor: '#008B47',
    models: ['Find X8', 'Find X8 Pro', 'Find N3'],
    portalUrl: 'https://developer.android.com/about/versions/16/devices',
    supportGuide: 'Apply for the ColorOS 16 Developer Preview in Settings > System update > Trial version, then follow OTA installation instructions.',
    siSupportGuide: 'Settings > System update > Trial version වෙත ගොස් ColorOS 16 Developer Preview සඳහා අයදුම් කර OTA මඟින් ස්ථාපනය කරන්න.',
  },
  {
    id: 'vivo',
    name: 'vivo',
    logoText: 'vivo',
    accentColor: '#415FFF',
    models: ['X200 Pro', 'X100 Pro', 'X Fold3 Pro'],
    portalUrl: 'https://developer.android.com/about/versions/16/devices',
    supportGuide: 'Install the vivo Developer Tool package, backup all user partitions, and flash the Funtouch OS 16 Beta build.',
    siSupportGuide: 'vivo Developer Tool පැකේජය ස්ථාපනය කර, දත්ත backup කර Funtouch OS 16 Beta build එක flash කරන්න.',
  },
  {
    id: 'realme',
    name: 'realme',
    logoText: 'realme',
    accentColor: '#FFC915',
    models: ['realme GT 7 Pro', 'realme GT 6'],
    portalUrl: 'https://developer.android.com/about/versions/16/devices',
    supportGuide: 'Join the realme UI 6.0 Android 16 Early Access program in Developer Options > Local update.',
    siSupportGuide: 'Developer Options > Local update හරහා realme UI 6.0 Android 16 Early Access වැඩසටහනට සම්බන්ධ වන්න.',
  },
  {
    id: 'honor',
    name: 'HONOR',
    logoText: 'HONOR',
    accentColor: '#0055FE',
    models: ['Magic7 Pro', 'Magic6 Pro', 'Magic V3'],
    portalUrl: 'https://developer.android.com/about/versions/16/devices',
    supportGuide: 'Download the MagicOS 9 Beta software package through the HONOR Developer portal and flash using Suite.',
    siSupportGuide: 'HONOR Developer portal හරහා MagicOS 9 Beta පැකේජය ලබාගෙන HONOR Suite මඟින් flash කරන්න.',
  },
  {
    id: 'iqoo',
    name: 'iQOO',
    logoText: 'iQOO',
    accentColor: '#FFAE00',
    models: ['iQOO 13', 'iQOO 12', 'iQOO Neo 10'],
    portalUrl: 'https://developer.android.com/about/versions/16/devices',
    supportGuide: 'Download the Android 16 Beta firmware image and flash via recovery mode or fastboot script.',
    siSupportGuide: 'Android 16 Beta firmware image එක බාගත කර recovery mode හෝ fastboot script මඟින් flash කරන්න.',
  },
  {
    id: 'lenovo',
    name: 'Lenovo',
    logoText: 'Lenovo',
    accentColor: '#E2231A',
    models: ['Tab Extreme', 'Legion Y700 (2024)'],
    portalUrl: 'https://developer.android.com/about/versions/16/devices',
    supportGuide: 'Flash the Android 16 Developer Preview tablet image using Lenovo Rescue and Smart Assistant (LMSA).',
    siSupportGuide: 'Lenovo Rescue and Smart Assistant (LMSA) භාවිතයෙන් Android 16 ටැබ්ලට් image එක flash කරන්න.',
  },
];

export const PHONE_EMULATOR_STEPS: EmulatorStep[] = [
  {
    stepNumber: 1,
    title: 'Install Android Studio Meerkat',
    siTitle: 'Android Studio Meerkat ස්ථාපනය කරන්න',
    description: 'Ensure you are running Android Studio Meerkat | 2024.3.1 or higher for complete Android 16 SDK & Baklava system image compatibility.',
    siDescription: 'Android 16 SDK සහ Baklava system image සහය සඳහා Android Studio Meerkat | 2024.3.1 හෝ ඊට ඉහළ සංස්කරණයක් ධාවනය කර ඇති බව තහවුරු කරගන්න.',
    actionHint: 'Download from developer.android.com/studio',
    siActionHint: 'developer.android.com/studio වෙතින් ලබාගන්න',
    badge: 'IDE Setup',
  },
  {
    stepNumber: 2,
    title: 'Open SDK Manager & Update Emulator',
    siTitle: 'SDK Manager විවෘත කර Emulator එක යාවත්කාලීන කරන්න',
    description: 'Go to Tools > SDK Manager > SDK Tools tab. Check "Android Emulator" and ensure the latest version is checked and installed.',
    siDescription: 'Tools > SDK Manager > SDK Tools tab වෙත යන්න. "Android Emulator" තෝරා නවතම සංස්කරණය ස්ථාපනය කරන්න.',
    actionHint: 'Tools > SDK Manager > SDK Tools',
    siActionHint: 'Tools > SDK Manager > SDK Tools',
    badge: 'SDK Tools',
  },
  {
    stepNumber: 3,
    title: 'Launch Device Manager & Create Virtual Device',
    siTitle: 'Device Manager වෙතින් නව Virtual Device එකක් සාදන්න',
    description: 'Click Tools > Device Manager. In the panel, click the "+" (Add a new device) button and select "Create Virtual Device".',
    siDescription: 'Tools > Device Manager ක්ලික් කරන්න. Panel එකේ "+" (Add a new device) බොත්තම ක්ලික් කර "Create Virtual Device" තෝරන්න.',
    actionHint: 'Tools > Device Manager > Create Virtual Device',
    siActionHint: 'Tools > Device Manager > Create Virtual Device',
    badge: 'AVD Wizard',
  },
  {
    stepNumber: 4,
    title: 'Select Supported Pixel Profile (Phone Tab)',
    siTitle: 'Pixel Device Profile එකක් තෝරන්න (Phone Tab)',
    description: 'In the Phone Category tab, select a device profile such as Pixel 9 Pro, Pixel 8, or Pixel 7, then click Next.',
    siDescription: 'Phone Category tab එකෙන් Pixel 9 Pro, Pixel 8, හෝ Pixel 7 වැනි device profile එකක් තෝරා Next ක්ලික් කරන්න.',
    actionHint: 'Category: Phone -> Pixel 9 Pro -> Next',
    siActionHint: 'Category: Phone -> Pixel 9 Pro -> Next',
    badge: 'Hardware Profile',
  },
  {
    stepNumber: 5,
    title: 'Download "Baklava" (Android 16) System Image',
    siTitle: '"Baklava" (Android 16) System Image එක බාගත කරන්න',
    description: 'Locate the Android 16 system image named "Baklava". Click the Download icon next to the release name. Once finished, select Baklava and click Next.',
    siDescription: '"Baklava" නමින් ඇති Android 16 system image එක සොයා ඩවුන්ලෝඩ් අයිකනය ක්ලික් කරන්න. නිම වූ පසු එය තෝරා Next ක්ලික් කරන්න.',
    actionHint: 'Release Name: Baklava (API VanillaIceCream / 16) -> Download',
    siActionHint: 'Release Name: Baklava -> Download',
    badge: 'System Image',
  },
  {
    stepNumber: 6,
    title: 'Finalize & Launch Virtual Device',
    siTitle: 'සැකසුම් සම්පූර්ණ කර Device එක Start කරන්න',
    description: 'Configure RAM, graphics acceleration (Hardware - GLES 2.0 recommended), verify 16KB page alignment settings, click Finish, and click the Start (Play) button in Device Manager.',
    siDescription: 'RAM, graphics acceleration සකසා Finish ක්ලික් කර Device Manager එකෙන් Start (Play) බොත්තම ඔබන්න.',
    actionHint: 'Device Manager -> Click Start (▶) icon',
    siActionHint: 'Device Manager -> Start (▶) ක්ලික් කරන්න',
    badge: 'Launch',
  },
];

export const TABLET_EMULATOR_STEPS: EmulatorStep[] = [
  {
    stepNumber: 1,
    title: 'Install Android Studio Meerkat 2024.3.1+',
    siTitle: 'Android Studio Meerkat 2024.3.1+ ස්ථාපනය කරන්න',
    description: 'Ensure Android Studio Meerkat is ready with Android 16 SDK tools.',
    siDescription: 'Android 16 SDK මෙවලම් සමඟ Android Studio Meerkat සූදානම් කරගන්න.',
    actionHint: 'Tools > SDK Manager',
    siActionHint: 'Tools > SDK Manager',
    badge: 'IDE',
  },
  {
    stepNumber: 2,
    title: 'Select Tablet or Foldable Device Profile',
    siTitle: 'Tablet හෝ Foldable Device Profile එකක් තෝරන්න',
    description: 'In Create Virtual Device: Select Tablet Category -> "Pixel Tablet" (10.95" 2560x1600), or select Phone Category -> "Pixel Fold" / "Pixel 9 Pro Fold".',
    siDescription: 'Tablet Category -> "Pixel Tablet" හෝ Phone Category -> "Pixel Fold" තෝරාගන්න.',
    actionHint: 'Category: Tablet -> Pixel Tablet or Pixel Fold',
    siActionHint: 'Category: Tablet -> Pixel Tablet හෝ Pixel Fold',
    badge: 'Large Screen',
  },
  {
    stepNumber: 3,
    title: 'Select "Baklava" Image & Configure Multi-Window',
    siTitle: '"Baklava" Image තෝරා Multi-Window සකසන්න',
    description: 'Download the Baklava system image. In Advanced Settings, enable Multi-Window support and set Display Density appropriately for large canvas validation.',
    siDescription: 'Baklava image එක බාගත කර Advanced Settings වලින් Multi-Window සහ විශාල තිර විභේදනය සකසන්න.',
    actionHint: 'Advanced -> Enable Multi-Display & Multi-Window',
    siActionHint: 'Advanced -> Multi-Window සහය සක්‍රිය කරන්න',
    badge: 'Multi-Window',
  },
  {
    stepNumber: 4,
    title: 'Start Emulator & Test Adaptive Layouts',
    siTitle: 'Emulator එක ක්‍රියාත්මක කර Adaptive Layouts පරීක්ෂා කරන්න',
    description: 'Launch the tablet virtual device. Test Jetpack Compose Adaptive Scaffold, NavigationRail, and dual-pane sliding layouts for Android 16.',
    siDescription: 'Tablet virtual device එක ධාවනය කර Android 16 සඳහා Adaptive Scaffold, NavigationRail පරීක්ෂා කරන්න.',
    actionHint: 'Test NavigationRail, Split Screen, and Taskbar',
    siActionHint: 'NavigationRail, Split Screen පරීක්ෂා කරන්න',
    badge: 'Run & Test',
  },
];

export const RESIZABLE_EMULATOR_FEATURES = {
  title: 'Resizable Emulator Configuration',
  siTitle: 'ප්‍රමාණය වෙනස් කළ හැකි (Resizable) Emulator සැකසුම',
  description: 'The Resizable device definition allows real-time switching between Phone, Foldable (Folded / Unfolded), and Tablet modes during app execution in Android 16.',
  siDescription: 'Resizable device සැකසුම මඟින් Android 16 ධාවනය වන අතරතුර Phone, Foldable (නැමුණු/දිගහැරුණු), සහ Tablet මාදිලි අතර එක ක්ලික් එකකින් මාරු විය හැක.',
  modes: [
    { name: 'Phone Mode', icon: 'Smartphone', resolution: '1080 x 2400', ratio: '20:9', dpi: '420 dpi' },
    { name: 'Foldable (Folded)', icon: 'Layers', resolution: '1080 x 2092', ratio: '17.4:9', dpi: '420 dpi' },
    { name: 'Foldable (Unfolded)', icon: 'Maximize2', resolution: '2208 x 1840', ratio: '6:5', dpi: '380 dpi' },
    { name: 'Tablet Mode', icon: 'Tablet', resolution: '2560 x 1600', ratio: '16:10', dpi: '320 dpi' },
  ],
};

export interface BehaviorChange {
  id: string;
  category: 'core' | 'native' | 'ui' | 'privacy';
  title: string;
  siTitle: string;
  summary: string;
  siSummary: string;
  impactLevel: 'high' | 'medium' | 'info';
  codeExample?: string;
  remediationGuide: string;
  siRemediationGuide: string;
  docUrl: string;
}

export const ANDROID_16_CHANGES: BehaviorChange[] = [
  {
    id: '16kb-alignment',
    category: 'native',
    title: '16 KB Page Size Alignment for Native C/C++ Code',
    siTitle: 'Native C/C++ සඳහා 16 KB Page Size අනුකූලතාව',
    summary: 'Android 15 and 16 introduce support for 16 KB page sizes. All native shared libraries (.so) must be compiled with 16KB alignment or the app will crash at launch on 16KB devices.',
    siSummary: 'Android 15/16 16 KB page sizes හඳුන්වා දෙයි. සියලුම native (.so) libraries 16KB alignment සහිතව compile කළ යුතුය, නැතහොත් 16KB උපාංගවල app එක crash වේ.',
    impactLevel: 'high',
    codeExample: `# Clang Linker flag for 16KB page alignment in Ninja / CMake:
-Wl,-z,max-page-size=16384

# Verify using Android NDK llvm-objdump:
$NDK/toolchains/llvm/prebuilt/linux-x86_64/bin/llvm-objdump -p libfoo.so | grep LOAD`,
    remediationGuide: 'Update your Ninja LINK rules, CMake scripts, and AGP build to pass -Wl,-z,max-page-size=16384. Test in Android Studio on the 16 KB ARM64/x86_64 system image.',
    siRemediationGuide: 'Ninja LINK නීති වලට -Wl,-z,max-page-size=16384 එක් කරන්න. Android Studio හි 16 KB system image එක මත පරීක්ෂා කරන්න.',
    docUrl: 'https://developer.android.com/guide/practices/page-sizes',
  },
  {
    id: 'edge-to-edge',
    category: 'ui',
    title: 'Default Edge-to-Edge Layout Enforcement',
    siTitle: 'ස්වයංක්‍රීය Edge-to-Edge Layout බලාත්මක කිරීම',
    summary: 'Apps targeting Android 16 display edge-to-edge by default. System bars (status bar and navigation bar) are transparent or translucent, and apps must handle WindowInsets explicitly.',
    siSummary: 'Android 16 ඉලක්ක කරන apps ස්වයංක්‍රීයව Edge-to-Edge ලෙස ක්‍රියා කරයි. WindowInsets නිවැරදිව කළමනාකරණය කළ යුතුය.',
    impactLevel: 'high',
    codeExample: `// Kotlin Jetpack Compose
Scaffold(
    contentWindowInsets = WindowInsets.safeDrawing
) { innerPadding ->
    Box(modifier = Modifier.padding(innerPadding)) {
        // App Content
    }
}`,
    remediationGuide: 'Use WindowCompat.setDecorFitsSystemWindows(window, false) or Jetpack Compose Scaffold with WindowInsets.safeDrawing to avoid overlap with gesture navigation.',
    siRemediationGuide: 'Gesture navigation සමඟ ගැටීම් වැළැක්වීමට WindowInsets.safeDrawing භාවිතා කරන්න.',
    docUrl: 'https://developer.android.com/about/versions/16/behavior-changes-16#edge-to-edge',
  },
  {
    id: 'predictive-back',
    category: 'ui',
    title: 'Predictive Back System Animations & Transitions',
    siTitle: 'Predictive Back පද්ධති සජීවීකරණ (Animations)',
    summary: 'Predictive back animations show the user a preview of the destination before completing the back swipe gesture. Custom back handling must migrate to OnBackInvokedCallback.',
    siSummary: 'පසුපසට යාමේදී (Back swipe) පරිශීලකයාට ඊළඟ තිරය පූර්වදර්ශනය වේ. පැරණි onBackPressed ක්‍රම OnBackInvokedCallback වෙත මාරු කරන්න.',
    impactLevel: 'medium',
    codeExample: `// Enable in AndroidManifest.xml:
<application
    android:enableOnBackInvokedCallback="true" ... >

// In Activity or Fragment:
onBackInvokedDispatcher.registerOnBackInvokedCallback(
    OnBackInvokedDispatcher.PRIORITY_DEFAULT
) {
    // Custom back handling logic
}`,
    remediationGuide: 'Set android:enableOnBackInvokedCallback="true" in AndroidManifest.xml and migrate away from deprecated onBackPressed().',
    siRemediationGuide: 'AndroidManifest.xml හි android:enableOnBackInvokedCallback="true" යොදන්න.',
    docUrl: 'https://developer.android.com/guide/navigation/custom-back/predictive-back-gesture',
  },
  {
    id: 'embedded-photo-picker',
    category: 'ui',
    title: 'Embedded Photo Picker UI Components',
    siTitle: 'Embedded Photo Picker අතුරුමුහුණත් උපාංග',
    summary: 'Android 16 allows embedding the photo picker directly into app surfaces as a composable or view, instead of launching an external system dialog.',
    siSummary: 'Android 16 මඟින් වෙනම system dialog එකක් වෙනුවට app එක තුළම Photo Picker එක embed කිරීමට ඉඩ සලසයි.',
    impactLevel: 'medium',
    codeExample: `// Embedded PhotoPicker in Android 16
val photoPickerSession = rememberEmbeddedPhotoPicker()
EmbeddedPhotoPickerView(
    session = photoPickerSession,
    modifier = Modifier.fillMaxWidth().height(300.dp)
)`,
    remediationGuide: 'Adopt the new Android 16 Photo Picker APIs for frictionless media selection without requesting broad storage permissions.',
    siRemediationGuide: 'Storage permissions ඉල්ලීමෙන් තොරව නව Photo Picker API භාවිතා කරන්න.',
    docUrl: 'https://developer.android.com/training/data-storage/shared/photopicker',
  },
  {
    id: 'health-medical-records',
    category: 'privacy',
    title: 'Health Connect & FHIR Medical Records API',
    siTitle: 'Health Connect සහ FHIR වෛද්‍ය වාර්තා API',
    summary: 'Android 16 introduces developer APIs to access Electronic Health Records (EHR) using the HL7 FHIR standard format with granular user consent.',
    siSummary: 'Android 16 මඟින් HL7 FHIR ප්‍රමිතියෙන් යුතු වෛද්‍ය වාර්තා (EHR) පරිශීලක අනුමැතිය ඇතිව ආරක්ෂිතව ලබාගැනීමේ පහසුකම සපයයි.',
    impactLevel: 'info',
    codeExample: `val healthConnectClient = HealthConnectClient.getOrCreate(context)
val response = healthConnectClient.readMedicalRecords(
    MedicalRecordRequest(type = ImmunizationRecord::class)
)`,
    remediationGuide: 'Request granular READ_MEDICAL_DATA permissions and parse structured FHIR JSON responses.',
    siRemediationGuide: 'READ_MEDICAL_DATA අවසර ලබාගෙන FHIR JSON දත්ත භාවිතා කරන්න.',
    docUrl: 'https://developer.android.com/health-and-fitness/guides/health-connect',
  },
];

