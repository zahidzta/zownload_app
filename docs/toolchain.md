# Gate 0A toolchain

This file records the reproducible foundation selected for Gate 0A. Versions
are exact where the package manager or generated project supports exact pins.
The hosted CI workflow is present but cannot be executed until the workspace is
published to a Git remote.

## Local versions observed on 2026-10-12

| Tool | Version / pin | Evidence command |
|---|---|---|
| Node.js | 24.14.0 | `node --version` |
| pnpm | 12.3.4 | `pnpm --version` |
| Rust | 1.99.0 | `rustc --version` |
| Cargo | 1.99.0 | `cargo --version` |
| Tauri CLI | 2.12.2 | `pnpm tauri --version` |
| `@tauri-apps/api` | 2.12.3 | `package.json` / `pnpm-lock.yaml` |
| Tauri Rust crate | 2.12.3 | `src-tauri/Cargo.toml` / `Cargo.lock` |
| Tauri build crate | 2.7.2 | `src-tauri/Cargo.toml` / `Cargo.lock` |
| TypeScript | 7.0.2 | `package.json` / `pnpm-lock.yaml` |
| Vite | 8.3.4 | `package.json` / `pnpm-lock.yaml` |
| React / React DOM | 19.3.0 | `package.json` / `pnpm-lock.yaml` |
| Tailwind CSS / Vite plugin | 4.3.3 | `package.json` / `pnpm-lock.yaml` |
| Zustand | 5.0.15 | `package.json` / `pnpm-lock.yaml` |
| Java used by Gradle | JetBrains Runtime 21.0.10 | `src-tauri/gen/android/gradlew.bat --version` |
| Gradle wrapper | 9.6.1 | `src-tauri/gen/android/gradle/wrapper/gradle-wrapper.properties` |
| Android command-line tools | 19.0 | `sdkmanager --version` |
| Android compile/target SDK | 37 | `src-tauri/gen/android/app/build.gradle.kts` |
| Android min SDK | 24 | `src-tauri/gen/android/app/build.gradle.kts` |
| Android NDK | 27.2.12479018 | installed SDK directory and Tauri output |
| Android ABI | `arm64-v8a` | debug APK output |

## Setup commands

```powershell
corepack enable
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test:run
pnpm build
cargo test --manifest-path src-tauri/Cargo.toml
cargo check --manifest-path src-tauri/Cargo.toml
pnpm tauri build --debug
```

For the local Android build, set `ANDROID_HOME` and `ANDROID_SDK_ROOT` to the
installed SDK, use the Android Studio JBR as `JAVA_HOME`, and run:

```powershell
pnpm tauri android init
pnpm tauri android build --debug
```

On this Windows machine the official Android command reaches Rust compilation
but cannot create the generated `.so` symlink without Windows Developer Mode.
The verified local fallback copies the built Rust library into
`src-tauri/gen/android/app/src/main/jniLibs/arm64-v8a/` and runs:

```powershell
cd src-tauri/gen/android
./gradlew.bat assembleArm64Debug -x rustBuildArm64Debug
```

This fallback is a Gate 0A environment deviation, not production Android
engine behavior. The generated debug APK was inspected to contain
`lib/arm64-v8a/libzownload_lib.so`.

## Minimum platform baseline

- Windows desktop: Windows 10 1803 or newer.
- macOS desktop: macOS 10.15 or newer.
- Android: API 24 minimum, API 37 compile/target, `arm64-v8a` in v1.
- Linux: distribution matrix remains the Stage 4A acceptance concern.

These baselines must be rechecked against the hosted runners and device matrix
before release packaging.
