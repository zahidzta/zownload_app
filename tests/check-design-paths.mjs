import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const readme = readFileSync(resolve(root, "docs/design/README.md"), "utf8");
const paths = [...readme.matchAll(/\]\(([^)]+\.(?:png|jpg|jpeg|webp))\)/g)].map((match) => match[1]);
const missing = paths.filter((path) => !existsSync(resolve(root, "docs/design", path)));

if (missing.length > 0) {
  console.error(`Missing design references (${missing.length}):\n${missing.join("\n")}`);
  process.exit(1);
}

console.log(`Design references present: ${paths.length}/${paths.length}`);
