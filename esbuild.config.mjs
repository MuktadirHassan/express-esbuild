import { build } from "esbuild";

// Automatically bundle all .ts files in the src/ directory
build({
  entryPoints: ["src/server.ts"],
  outfile: "dist/index.js",
  platform: "node",
  // minify: true,
  bundle: true,
  sourcemap: true,
  treeShaking: true,
  packages: "external",
}).catch(() => process.exit(1));
