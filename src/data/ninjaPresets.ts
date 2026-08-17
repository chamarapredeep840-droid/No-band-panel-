import { NdkNinjaConfig } from '../types';

export const DEFAULT_NINJA_CONFIG: NdkNinjaConfig = {
  abiFilters: ['arm64-v8a', 'x86_64', 'armeabi-v7a', 'x86'],
  sourceFileListPath: 'source-file-list.txt',
  configureScript: 'configure-ninja',
  customArguments: [
    '${ndk.moduleMakeFile}',
    '--variant=${ndk.variantName}',
    '--abi=Android-${ndk.abi}',
    '--configuration-dir=${ndk.configurationDir}',
    '--ndk-version=${ndk.moduleNdkVersion}',
    '--min-sdk-version=${ndk.minSdkVersion}',
  ],
  selectedTargets: ['curl'],
  enable16KbPageSize: true,
  minSdkVersion: 24,
  targetSdkVersion: 36,
  ndkVersion: '27.1.12297006',
  rules: [
    {
      id: 'rule-compile',
      name: 'COMPILE',
      command: '${ndk_clang} -target ${target_triple} -fPIC -O2 -Wall $in -c -o $out',
      description: 'Compiling C/C++ source $in -> $out',
    },
    {
      id: 'rule-link',
      name: 'LINK',
      command: '${ndk_clang} -target ${target_triple} -shared -Wl,-soname,$out -Wl,-z,max-page-size=16384 $in -o $out -llog -landroid',
      description: 'Linking shared library $out with 16KB alignment',
    },
    {
      id: 'rule-msbuild-curl',
      name: 'MBSUILD_CURL',
      command: '/path/to/msbuild {flags to build curl with MSBuild}',
      description: 'Building custom external libcurl dependency via MSBuild passthrough',
    },
  ],
  targets: [
    {
      id: 'target-1',
      output: 'source.o',
      rule: 'COMPILE',
      inputs: 'source.cpp',
    },
    {
      id: 'target-2',
      output: 'libnative-lib.so',
      rule: 'LINK',
      inputs: 'source.o',
    },
    {
      id: 'target-3',
      output: 'curl',
      rule: 'phony',
      inputs: 'libnative-lib.so',
      isPhony: true,
    },
    {
      id: 'target-4',
      output: 'curl.passthrough',
      rule: 'MBSUILD_CURL',
      inputs: '',
    },
  ],
};

export const NINJA_PRESETS: { id: string; name: string; siName: string; desc: string; siDesc: string; config: NdkNinjaConfig }[] = [
  {
    id: 'foo-bar-multi-lib',
    name: 'Dual Library Pipeline (libfoo.so + libbar.so -> all)',
    siName: 'ද්විත්ව Library Pipeline (libfoo.so + libbar.so -> all)',
    desc: 'Compiles foo.cpp & bar.cpp with NDK clang and links into libfoo.so & libbar.so with phony target all.',
    siDesc: 'foo.cpp සහ bar.cpp වෙන වෙනම compile කර libfoo.so සහ libbar.so ලෙස link කරන phony all සහිත සැකසුම.',
    config: {
      ...DEFAULT_NINJA_CONFIG,
      abiFilters: ['x86', 'arm64-v8a'],
      selectedTargets: ['all'],
      rules: [
        {
          id: 'rule-compile',
          name: 'COMPILE',
          command: '/path/to/ndk/clang $in -o $out -target ${target_triple} -fPIC -O2',
          description: 'Compiling C source $in',
        },
        {
          id: 'rule-link',
          name: 'LINK',
          command: '/path/to/ndk/clang $in -o $out -shared -Wl,-z,max-page-size=16384',
          description: 'Linking shared library $out',
        },
      ],
      targets: [
        { id: 't-foo-o', output: 'foo.o', rule: 'COMPILE', inputs: 'foo.cpp' },
        { id: 't-bar-o', output: 'bar.o', rule: 'COMPILE', inputs: 'bar.cpp' },
        { id: 't-libfoo', output: 'libfoo.so', rule: 'LINK', inputs: 'foo.o' },
        { id: 't-libbar', output: 'libbar.so', rule: 'LINK', inputs: 'bar.o' },
        { id: 't-all', output: 'all', rule: 'phony', inputs: 'libfoo.so libbar.so', isPhony: true },
      ],
    },
  },
  {
    id: 'user-curl-msbuild',
    name: 'CURL + MSBuild Passthrough (Prompt Exact)',
    siName: 'CURL + MSBuild Passthrough (මූලික සැකසුම)',
    desc: 'The exact custom Ninja build config with MSBuild CURL passthrough and experimentalProperties integration.',
    siDesc: 'MSBuild CURL passthrough සහ experimentalProperties සහිත නිවැරදි Ninja සැකසුම.',
    config: {
      ...DEFAULT_NINJA_CONFIG,
      abiFilters: ['x86', 'arm64-v8a'],
      selectedTargets: ['curl'],
    },
  },
  {
    id: 'android-16-16kb',
    name: 'Android 16 16KB Page-Aligned Native Lib',
    siName: 'Android 16 සඳහා 16KB Page-Aligned Native Lib',
    desc: 'Strict 16KB page size compliance (-Wl,-z,max-page-size=16384) with arm64-v8a and x86_64 for Android 15 & 16.',
    siDesc: 'Android 15 සහ 16 සඳහා අනිවාර්ය 16KB page alignment ධජ සහ multi-ABI Clang නීති සහිත සැකසුම.',
    config: {
      ...DEFAULT_NINJA_CONFIG,
      abiFilters: ['arm64-v8a', 'x86_64'],
      enable16KbPageSize: true,
      minSdkVersion: 26,
      targetSdkVersion: 36,
      rules: [
        {
          id: 'rule-clang-cxx',
          name: 'CXX_COMPILE',
          command: '${ndk_clangxx} -target aarch64-linux-android${min_sdk} -fPIC -O3 -std=c++20 -Wall $in -c -o $out',
          description: 'Compiling C++20 $in',
        },
        {
          id: 'rule-clang-link-16kb',
          name: 'LINK_SHARED_16KB',
          command: '${ndk_clangxx} -target aarch64-linux-android${min_sdk} -shared -Wl,-z,max-page-size=16384 -Wl,-z,relro -Wl,-z,now $in -o $out -llog -landroid -lGLESv3',
          description: 'Linking 16KB Page Aligned $out',
        },
      ],
      targets: [
        { id: 't1', output: 'engine_core.o', rule: 'CXX_COMPILE', inputs: 'src/engine_core.cpp' },
        { id: 't2', output: 'graphics_renderer.o', rule: 'CXX_COMPILE', inputs: 'src/graphics_renderer.cpp' },
        { id: 't3', output: 'libengine.so', rule: 'LINK_SHARED_16KB', inputs: 'engine_core.o graphics_renderer.o' },
        { id: 't4', output: 'engine', rule: 'phony', inputs: 'libengine.so', isPhony: true },
      ],
      selectedTargets: ['engine'],
    },
  },
  {
    id: 'rust-cargo-passthrough',
    name: 'Rust Cargo + C FFI Bridge Ninja Setup',
    siName: 'Rust Cargo + C FFI Ninja පාලම් සැකසුම',
    desc: 'Call cargo build --target aarch64-linux-android alongside Clang C-bindings in a single Ninja pipeline.',
    siDesc: 'Rust Cargo build එකක් සහ Clang C-bindings එකම Ninja pipeline එකක් හරහා ධාවනය කිරීමේ සැකසුම.',
    config: {
      ...DEFAULT_NINJA_CONFIG,
      abiFilters: ['arm64-v8a', 'armeabi-v7a', 'x86_64'],
      rules: [
        {
          id: 'rule-cargo',
          name: 'CARGO_BUILD',
          command: 'cargo build --target aarch64-linux-android --release --manifest-path $in',
          description: 'Compiling Rust crate with Cargo',
        },
        {
          id: 'rule-c-wrapper',
          name: 'LINK_FFI',
          command: '${ndk_clang} -shared -Wl,-z,max-page-size=16384 -Ltarget/aarch64-linux-android/release -lrust_core $in -o $out',
          description: 'Linking FFI shared library',
        },
      ],
      targets: [
        { id: 'rt1', output: 'target/aarch64-linux-android/release/librust_core.a', rule: 'CARGO_BUILD', inputs: 'Cargo.toml' },
        { id: 'rt2', output: 'libnative_rust_bridge.so', rule: 'LINK_FFI', inputs: 'src/bridge.c target/aarch64-linux-android/release/librust_core.a' },
        { id: 'rt3', output: 'rust_bridge', rule: 'phony', inputs: 'libnative_rust_bridge.so', isPhony: true },
      ],
      selectedTargets: ['rust_bridge'],
    },
  },
];

export function generateBuildNinja(config: NdkNinjaConfig): string {
  const lines: string[] = [];
  lines.push('# Generated by Android 16 & NDK Ninja Studio');
  lines.push('# Android NDK Version: ' + config.ndkVersion);
  lines.push('# Target SDK Version: ' + config.targetSdkVersion);
  lines.push('');
  lines.push('ninja_required_version = 1.10');
  lines.push('');
  lines.push('# --- Toolchain Variables ---');
  lines.push('ndk_root = /path/to/ndk');
  lines.push('ndk_clang = $ndk_root/toolchains/llvm/prebuilt/linux-x86_64/bin/clang');
  lines.push('ndk_clangxx = $ndk_root/toolchains/llvm/prebuilt/linux-x86_64/bin/clang++');
  lines.push('target_triple = aarch64-linux-android' + config.minSdkVersion);
  if (config.enable16KbPageSize) {
    lines.push('page_align_flags = -Wl,-z,max-page-size=16384');
  }
  lines.push('');
  lines.push('# --- Build Rules ---');
  config.rules.forEach((rule) => {
    lines.push(`rule ${rule.name}`);
    lines.push(`   command = ${rule.command}`);
    if (rule.description) {
      lines.push(`   description = ${rule.description}`);
    }
    if (rule.depfile) {
      lines.push(`   depfile = ${rule.depfile}`);
    }
    if (rule.deps) {
      lines.push(`   deps = ${rule.deps}`);
    }
    lines.push('');
  });

  lines.push('# --- Build Targets ---');
  config.targets.forEach((target) => {
    if (target.isPhony || target.rule.toLowerCase() === 'phony') {
      lines.push(`build ${target.output} : phony ${target.inputs}`);
    } else {
      lines.push(`build ${target.output} : ${target.rule} ${target.inputs}`);
    }
  });

  lines.push('');
  lines.push('# --- Default Execution Target ---');
  const defaultTargets = config.selectedTargets.length > 0 ? config.selectedTargets.join(' ') : 'all';
  lines.push(`default ${defaultTargets}`);

  return lines.join('\n');
}

export function generateGradleKts(config: NdkNinjaConfig): string {
  const abiList = config.abiFilters.map((abi) => `"${abi}"`).join(', ');
  const targetsList = config.selectedTargets.map((t) => `"${t}"`).join(', ');
  const argsList = config.customArguments.map((arg) => `        "${arg}"`).join(',\n');

  return `// build.gradle.kts (Module: app)
plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
}

android {
    namespace = "com.example.android16.ninja"
    compileSdk = ${config.targetSdkVersion}

    defaultConfig {
        applicationId = "com.example.android16.ninja"
        minSdk = ${config.minSdkVersion}
        targetSdk = ${config.targetSdkVersion}
        versionCode = 1
        versionName = "1.0"

        externalNativeBuild {
            // Android Gradle Plugin Ninja Experimental Configuration
            experimentalProperties["ninja.abiFilters"] = listOf(${abiList})
            experimentalProperties["ninja.targets"] = listOf(${targetsList})
            experimentalProperties["ninja.path"] = "${config.sourceFileListPath}"
            experimentalProperties["ninja.configure"] = "${config.configureScript}"
            experimentalProperties["ninja.arguments"] = listOf(
${argsList}
            )
        }

        ndk {
            abiFilters += listOf(${abiList})
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    
    ndkVersion = "${config.ndkVersion}"
}`;
}

export function generateGradleGroovy(config: NdkNinjaConfig): string {
  const abiList = config.abiFilters.map((abi) => `"${abi}"`).join(', ');
  const targetsList = config.selectedTargets.map((t) => `"${t}"`).join(', ');
  const argsList = config.customArguments.map((arg) => `            "${arg}"`).join(',\n');

  return `// build.gradle (Module: app)
plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
}

android {
    namespace 'com.example.android16.ninja'
    compileSdk ${config.targetSdkVersion}

    defaultConfig {
        applicationId "com.example.android16.ninja"
        minSdkVersion ${config.minSdkVersion}
        targetSdkVersion ${config.targetSdkVersion}
        versionCode 1
        versionName "1.0"

        externalNativeBuild {
            // Ninja integration via AGP experimental properties
            experimentalProperties["ninja.abiFilters"] = [ ${abiList} ]
            experimentalProperties["ninja.targets"] = [ ${targetsList} ]
            experimentalProperties["ninja.path"] = "${config.sourceFileListPath}"
            experimentalProperties["ninja.configure"] = "${config.configureScript}"
            experimentalProperties["ninja.arguments"] = [
${argsList}
            ]
        }

        ndk {
            abiFilters ${abiList}
        }
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }

    ndkVersion "${config.ndkVersion}"
}`;
}

export function generateSourceFileList(config: NdkNinjaConfig): string {
  const files: string[] = [];
  config.targets.forEach((t) => {
    if (t.inputs) {
      t.inputs.split(/\s+/).forEach((f) => {
        if (f && !f.endsWith('.o') && !f.endsWith('.a') && !f.endsWith('.so')) {
          files.push(f);
        }
      });
    }
  });
  const uniqueFiles = Array.from(new Set(files));
  if (uniqueFiles.length === 0) {
    uniqueFiles.push('source.cpp', 'include/common.h');
  }
  return uniqueFiles.join('\n');
}

export function generateConfigureScript(config: NdkNinjaConfig): string {
  return `#!/usr/bin/env bash
# configure-ninja script called by Android Gradle Plugin
set -euo pipefail

MAKEFILE="$1"
shift

echo "[configure-ninja] Generating build.ninja from $MAKEFILE with arguments: $@"

# Parse arguments passed by AGP
while [[ $# -gt 0 ]]; do
  case $1 in
    --variant=*)
      VARIANT="\${1#*=}"
      shift
      ;;
    --abi=*)
      ABI="\${1#*=}"
      shift
      ;;
    --configuration-dir=*)
      CONFIG_DIR="\${1#*=}"
      shift
      ;;
    --ndk-version=*)
      NDK_VERSION="\${1#*=}"
      shift
      ;;
    --min-sdk-version=*)
      MIN_SDK="\${1#*=}"
      shift
      ;;
    *)
      echo "Unknown option $1"
      shift
      ;;
  esac
done

echo "[configure-ninja] Target ABI: \${ABI:-unknown}, Variant: \${VARIANT:-debug}"
mkdir -p "\${CONFIG_DIR:-.}"

# Ensure output directory has build.ninja
cp build.ninja "\${CONFIG_DIR:-.}/build.ninja" || true
echo "[configure-ninja] Ninja build configured successfully!"
`;
}
