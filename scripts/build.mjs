import { spawnSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const behaviorsDir = join(root, "behaviors");
const compilerDir = join(root, "node_modules", "desynced-tools", "dist");
const checkOnly = process.argv.includes("--check");

function findSources(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findSources(path));
    } else if (entry.isFile() && /\.(js|ts)$/.test(entry.name)) {
      files.push(path);
    }
  }
  return files.sort();
}

function run(command, args) {
  const result = spawnSync(process.execPath, [command, ...args], {
    cwd: root,
    stdio: "inherit"
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

const sources = findSources(behaviorsDir);
if (!sources.length) {
  console.error("No behavior source files found under behaviors/");
  process.exit(1);
}

// Node checks regular JavaScript syntax; TS files are checked by js2ds during build.
for (const source of sources) {
  if (source.endsWith(".js")) {
    run("--check", [source]);
  }
}
if (checkOnly) {
  console.log("Checked JavaScript syntax in " + sources.length + " source file(s).");
  process.exit(0);
}

const js2ds = join(compilerDir, "js2ds.js");
const dsAs = join(compilerDir, "as.js");
if (!existsSync(js2ds) || !existsSync(dsAs)) {
  console.error("Compiler not installed. Run: npm install");
  process.exit(1);
}

for (const source of sources) {
  const label = relative(root, source);
  console.log("Compiling " + label);
  run(js2ds, [source]);
  run(dsAs, [source + ".asm"]);
  console.log("Created " + label + ".asm.txt");
}
