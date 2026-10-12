# Zownload repository guidance

- Read `PROJECT.md` before changing architecture, contracts, behavior, or scope.
- Work in the current Gate or Stage only; do not begin a later roadmap gate without owner acceptance.
- Keep `shared/contract.ts` and `src-tauri/src/contract.rs` synchronized. JSON crossing the UI/Rust boundary uses camelCase.
- The UI must not know which engine implementation runs. Rust owns persistence and download behavior in later stages.
- Use React + TypeScript + Vite, Tailwind utility classes only, Zustand, and handcrafted accessible components. Do not add a component library.
- Keep Rust explicit and simple; explain non-obvious Rust/Tauri code for contributors who are learning Rust.
- UI copy belongs in `shared/i18n/en.json` and `shared/i18n/es.json`.
- Do not add yt-dlp, ffmpeg, QuickJS, SQLite, real downloads, or Android engine logic during Gate 0A.
- Never commit, publish, or run destructive Git operations unless the owner explicitly requests it.
