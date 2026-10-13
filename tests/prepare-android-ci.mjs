import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const gradleFile = fileURLToPath(
  new URL("../src-tauri/gen/android/app/build.gradle.kts", import.meta.url),
);
let contents = readFileSync(gradleFile, "utf8");

// Tauri 2.12 generates SDK 37, which is not available to this CI runner.
// Keep the generated project's compile/target SDK aligned with the SDK 36
// packages installed by the workflow; fail rather than silently missing a new template.
const keys = ["compileSdk", "targetSdk"];
for (const key of keys) {
  const assignments = [...contents.matchAll(new RegExp(`^[ \\t]*${key}[ \\t]*=[ \\t]*([^\\r\\n]+)`, "gm"))];
  if (assignments.length !== 1 || assignments[0][1].trim() !== "37") {
    throw new Error(`Expected exactly one generated ${key} = 37 in ${gradleFile}`);
  }
}

for (const key of keys) {
  const pattern = new RegExp(`^([ \\t]*${key}[ \\t]*=[ \\t]*)37([ \\t]*)$`, "m");
  contents = contents.replace(pattern, (_, prefix, suffix) => `${prefix}36${suffix}`);
}

writeFileSync(gradleFile, contents);
console.log("Generated Android compileSdk and targetSdk set to 36 for CI.");
