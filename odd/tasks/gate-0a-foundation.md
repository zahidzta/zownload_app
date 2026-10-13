# Gate 0A — Recreate the executable foundation
Branch: unavailable (workspace is not a Git repository); delivery: local working tree, no commits; test runner: pnpm/Vitest, cargo, Gradle where available.
Objective: recreate the first implementable roadmap stage from PROJECT.md and docs/gates/gate-0a.md without implementing download production behavior.

## Specs

1. **S1 — Gate 0A scope and preview**
   - The user selected: “Recrear Gate 0A completo (Recomendado)”.
   - Implement the Gate 0A scaffold and visual preview: React + TypeScript + Vite + Tauri 2, Tailwind CSS, Zustand, shared contracts, header, URL card, mp3/mp4 controls, empty Queue/History cards, responsive mobile layout, and English/Spanish infrastructure.
   - The preview must not call Tauri, execute yt-dlp, download files, or persist settings; Convert only displays the mock-preview notice.

2. **S2 — Contract and foundation evidence**
   - Preserve `shared/contract.ts` and `src-tauri/src/contract.rs` as authoritative contract files and prove their required serialized shapes with focused tests/fixtures.
   - Add the Gate 0A documentation, toolchain evidence, repository guidance, legal notice template, and CI skeleton required by PROJECT.md.

3. **S3 — Android skeleton**
   - Add the Tauri Android skeleton with pinned configuration when the local toolchain permits it; do not implement Android download behavior, Kotlin engine logic, or foreground-service business logic.
   - Record any environment limitation honestly and leave the corresponding checklist item pending.

4. **S4 — Verification and boundaries**
   - Run the applicable frontend, Rust, Android, design-reference, and configuration checks.
   - Do not begin Gate 0B, Gate 0C, real engine integration, SQLite, production queue/history, or release packaging.
   - Do not create commits unless the owner explicitly requests them.

## Tasks

- G0A-1 — S1-S4 — inline — pin/document available toolchains and establish the scaffold — done — no commit
- G0A-2 — S1-S2 — inline — implement desktop shell, preview, Tailwind/Zustand and contract fixtures — done — no commit
- G0A-3 — S2 — inline — add policy/legal/CI/evidence documentation and design-path validation — done — no commit
- G0A-4 — S3 — inline — initialize Android skeleton if available and document deviations — done with Windows symlink fallback — no commit
- G0A-5 — S4 — inline — run checks, reconcile evidence, and close the Gate 0A report — done locally; owner acceptance and hosted CI pending — no commit

## Log

L1 — User request (verbatim): “Lee y entiende el archivo PROJECT.md. Implementa una primera etapa del sistema. Si se tiene alguna duda pregunta antes de implementar. Al finalizar mustra un resumen de lo que se realizó y muestra un prompt para continuar con la siguiente etapa”

L2 — Clarification (verbatim): “Recrear Gate 0A completo (Recomendado)”

L3 — Initial evidence: PROJECT.md identifies Gate 0A as the first implementation stage. The current workspace had no React/Vite/Tauri scaffold despite docs/gates/gate-0a.md describing one as already implemented. The workspace is not a Git repository, so clean-checkout and hosted-CI execution cannot be claimed locally.

L4 — Route decision: work inline. No writer delegation trigger is active; no commits are authorized by the existing project constraint.

L5 — Implementation evidence: recreated the React/Vite/Tauri shell, Tailwind/Zustand preview, bilingual dictionaries, contract fixtures, policy/legal/CI files, and Android skeleton. Frontend tests 6 passed, frontend typecheck/build passed, Rust tests 3 passed, Rust check passed, desktop Tauri debug build passed, design references 9/9 passed, and the Vite smoke server returned HTTP 200.

L6 — Android evidence: `pnpm tauri android init` passed; the official Android build reached Rust compilation but Windows denied the generated `.so` symlink because Developer Mode is unavailable. Copying the built `aarch64-linux-android` library into `jniLibs/arm64-v8a` and running `assembleArm64Debug -x rustBuildArm64Debug` passed; the APK contains `lib/arm64-v8a/libzownload_lib.so`. Hosted CI and literal clean-checkout verification remain pending because the workspace has no Git commits.

L7 — Closure: Gate 0A is locally implemented and verified. The owner must review/accept the preview and later run the CI workflow from a Git push before Gate 0A is formally closed.

Risk: item 5 (the Tauri/toolchain, Android skeleton, and CI foundation affect build and delivery environments; hosted CI remains unexecuted).

L8 — CI correction: added the `rustfmt` component to the pinned Rust toolchain, stopped `setup-android` from installing the obsolete default `tools` package by passing the required SDK packages explicitly, and installed all Android Rust targets in the Android job. Preflight YAML formatting passed with Prettier 3.6.2; hosted execution remains pending.

L9 — User-reported hosted failures (2026-10-12): Android SDK setup could not find `platforms;android-37`; the Rust job could not find Tauri's `../dist` during `cargo test`. The generated Android project is excluded by `.gitignore`, so a fresh CI checkout has no Gradle project either. Corrections: the Rust job installs/builds the frontend first; Android installs available SDK 35, initializes the generated project, and changes its generated compile/target SDK from 37 to 35 via a fail-closed CI-only script. Two focused script probes, six frontend tests, frontend build, and three Rust contract tests passed locally; hosted jobs must be rerun to establish Gate 0A CI success. No commits or pushes in this correction.

L10 — Independent verification found that duplicate SDK assignments were not rejected by the original CI alignment script. One bounded correction now checks that each expected SDK assignment occurs exactly once before writing. Recheck in an external scratch copy observed rejection with an unchanged SHA-256 and successful rewrite of both normal assignments; all three focused script probes passed. `pnpm test:run` (6 frontend tests), `pnpm build`, `cargo fmt --check`, `cargo test` (3 tests), and `cargo check` passed locally. RDD was explicitly off at global scope; no native review was started. Hosted CI remains unverified.

L11 — User-reported Android failure (2026-10-12): hosted task `:app:checkUniversalDebugAarMetadata` failed, with an adjacent `PluginHandle.kt:159:22` Kotlin warning. Local Gradle evidence shows that line is a warning and local arm64 APK build previously passed. PROJECT.md v1 supports only arm64; CI defaulted to universal. Narrowed Rust target and Tauri Android debug build to aarch64, requested verbose build diagnostics, and migrated Android Java setup to actions/setup-java@v5. Generated Gradle pins and Tauri versions remain unchanged: no evidence supports downgrading Kotlin/AGP or a nonexistent CLI 2.12.3. New CI command regression test observed RED before change, then GREEN. Hosted run remains the only proof of final Android success; request the full AAR metadata failure block if arm64 still fails.

L12 — Independent verification in a fresh external scratch copy reproduced the regression RED on baseline (3 passed/1 failed) and GREEN after the change (4 passed); confirmed Tauri CLI 2.12.2 accepts `--target aarch64 --verbose`, Android init generates SDK 37, the CI SDK alignment produces SDK 35, and rejected templates leave their SHA-256 unchanged. No change-caused blocker was found. This is not a hosted Android build pass; Gate 0A CI remains pending.
