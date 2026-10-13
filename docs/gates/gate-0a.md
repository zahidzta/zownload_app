# Gate 0A — Fundación visual ejecutable

**Estado:** implementación local recreada; cierre formal pendiente de aceptación del owner y ejecución de CI
**Etapa:** primera etapa implementable del roadmap  
**Objetivo:** tener una base reproducible que abra una previsualización visual
del producto y permita validar que la dirección técnica y visual es correcta,
sin conectar todavía descargas reales.

## Por qué esta es la primera etapa

`PROJECT.md` establece que el trabajo debe comenzar por Gate 0A: una base
reproducible antes de los experimentos de yt-dlp, Android o la lógica de
descarga. Para que el avance sea visible, esta etapa incluye una **preview del
shell**, no una funcionalidad de producción. La preview muestra la dirección
visual confirmada por `docs/design/`:

- header con marca, idioma y configuración;
- tarjeta de URL y selección mp3/mp4;
- tarjetas vacías de Queue y History;
- adaptación a una sola columna en anchos pequeños;
- infraestructura mínima de inglés/español.

La preview no llama a Tauri, no ejecuta yt-dlp, no descarga archivos y no
persiste configuraciones. El botón Convert únicamente deja claro que el motor
mock todavía no está conectado.

## Alcance implementado

- Scaffold React + TypeScript + Vite para Tauri 2.
- Tailwind CSS mediante su plugin oficial de Vite.
- Zustand para el estado local de la preview.
- `src-tauri/src/lib.rs` como entry point Tauri y carga del contrato Rust.
- Tipos compartidos importados por la preview desde `shared/contract.ts`.
- Configuración de ventana, CSP de desarrollo y scripts de build.
- Evidencia documental: toolchain, licencia MIT, plantilla de avisos y guía
  del repositorio.

## Fuera de alcance

- yt-dlp, ffmpeg, QuickJS y cualquier proceso externo.
- SQLite, historial real, queue real o eventos Tauri.
- Android, plugin Kotlin y foreground service.
- Gate 0B (prueba CLI/licencias), Gate 0C (spike Android) y CI de releases.

## Criterios de verificación

- [x] `pnpm install --frozen-lockfile` funciona con el lockfile generado.
- [x] `pnpm build` genera `dist/` y valida TypeScript.
- [x] `cargo test` valida el contrato Rust y la fixture compartida.
- [x] `cargo check` compila el entry point Tauri en Windows.
- [x] `pnpm tauri build --debug` construye `src-tauri/target/debug/zownload.exe`
      con el frontend integrado.
- [x] `pnpm dev` sirve la preview y respondió HTTP 200; el layout usa una
      columna en anchos pequeños.
- [x] Las nueve rutas de imágenes indexadas en `docs/design/README.md` siguen
      existiendo (`pnpm check:design`).
- [x] El SDK de Android está instalado y `pnpm tauri android init` genera el
      skeleton; el APK `arm64-v8a` compila con la desviación Windows documentada
      de copiar el `.so` en vez de crear el symlink.
- [ ] La CI reproduce las verificaciones (el último intento encontró bloqueos
      en el SDK Android 37 y en el `dist/` faltante del job Rust; la corrección
      local requiere una nueva ejecución hospedada).

## Escenario manual de esta etapa

1. Ejecutar `pnpm install` y `pnpm dev`.
2. Confirmar header, URL card, mp3/mp4, Queue y History.
3. Reducir la ventana: las tarjetas pasan a una columna sin scroll horizontal.
4. Pulsar `EN/ES`: los textos cambian inmediatamente y vuelven a cambiar al
   pulsar el mismo botón.
5. Abrir Settings y confirmar que el panel se puede cerrar.
6. Pulsar Convert: se muestra el aviso de preview y no se inicia ningún
   proceso ni cambia la cola.

## Evidencia

| Evidencia | Ubicación | Estado |
|---|---|---|
| Versiones y comandos | `docs/toolchain.md` | registrado |
| Preview visual | `src/App.tsx`, `src/index.css` | implementada |
| Contrato TS | `shared/contract.ts` | existente e integrado por tipos |
| Contrato Rust | `src-tauri/src/contract.rs` | existente y cargado por el crate |
| Fixtures de contrato | `tests/contract-fixtures.json`, `tests/contract-fixtures.test.ts` | verificados en TS/Rust |
| Diseño indexado | `docs/design/README.md` + `docs/design/` | preservado |
| Política/legal/CI | `AGENTS.md`, `opencode.json`, `LICENSE`, `THIRD_PARTY_NOTICES.md`, `.github/workflows/ci.yml` | implementado |
| Build frontend | salida de `pnpm build` | verificado |
| Build Rust | salida de `cargo test` / `cargo check` | verificado |

## Criterio de cierre

El owner revisa la preview y confirma que la dirección visual es correcta.
También debe ejecutarse la CI en el primer push; hasta entonces la verificación
de checkout limpio y CI queda pendiente. Después se continúa con **Gate 0B —
prueba real de CLI y licencias**, no con la lógica de descarga dentro de la UI.
