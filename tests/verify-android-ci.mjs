import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { copyFileSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const script = fileURLToPath(new URL("./prepare-android-ci.mjs", import.meta.url));

function runWithTemplate(template) {
  const root = mkdtempSync(join(tmpdir(), "zownload-android-ci-"));
  const gradle = join(root, "src-tauri", "gen", "android", "app", "build.gradle.kts");
  const copy = join(root, "tests", "prepare-android-ci.mjs");
  mkdirSync(join(root, "tests"));
  mkdirSync(join(root, "src-tauri", "gen", "android", "app"), { recursive: true });
  copyFileSync(script, copy);
  writeFileSync(gradle, template);
  try {
    const result = spawnSync(process.execPath, [copy], { encoding: "utf8" });
    return { result, contents: readFileSync(gradle, "utf8") };
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

test("sets both generated SDK levels to the installed CI platform", () => {
  const { result, contents } = runWithTemplate("compileSdk = 37\n    targetSdk = 37\nminSdk = 24\n");
  assert.equal(result.status, 0, result.stderr);
  assert.equal(contents, "compileSdk = 35\n    targetSdk = 35\nminSdk = 24\n");
});

test("rejects changed Tauri templates without partially modifying the file", () => {
  const original = "compileSdk = 37\n    targetSdk = 38\n";
  const { result, contents } = runWithTemplate(original);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Expected exactly one generated targetSdk = 37/);
  assert.equal(contents, original);
});

test("rejects duplicate SDK assignments without modifying the file", () => {
  const original = "compileSdk = 37\ncompileSdk = 37\n    targetSdk = 37\n";
  const { result, contents } = runWithTemplate(original);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Expected exactly one generated compileSdk = 37/);
  assert.equal(contents, original);
});

test("CI builds the supported arm64 debug APK and uses maintained Java setup", () => {
  const workflow = readFileSync(fileURLToPath(new URL("../.github/workflows/ci.yml", import.meta.url)), "utf8");
  assert.match(workflow, /uses: actions\/setup-java@v5/);
  assert.match(workflow, /run: pnpm tauri android build --debug --target aarch64 --verbose/);
});
