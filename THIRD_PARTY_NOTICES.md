# Third-party notices

This file is the Gate 0A template for release compliance evidence. It must be
completed with the exact versions, licenses, source URLs, checksums and build
configuration for every redistributed dependency before a public release.

## Direct dependencies

| Dependency | Version | License | Source / notices | Release evidence |
|---|---|---|---|---|
| Tauri | 2.12.3 | MIT / Apache-2.0 | https://github.com/tauri-apps/tauri | Complete before release |
| React | 19.3.0 | MIT | https://github.com/facebook/react | Complete before release |
| Tailwind CSS | 4.3.3 | MIT | https://github.com/tailwindlabs/tailwindcss | Complete before release |
| Zustand | 5.0.15 | MIT | https://github.com/pmndrs/zustand | Complete before release |

## Bundled engines

yt-dlp, ffmpeg and QuickJS are intentionally not bundled or executed in Gate
0A. Their source archives, checksums, license notices and build configuration
will be recorded in the Gate 0B evidence before engine integration.
