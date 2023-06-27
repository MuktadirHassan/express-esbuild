import { build } from "esbuild";

build({
  entryPoints: ["src/server.ts"],
  outfile: "dist/index.js",
  platform: "node",
  minify: false,
  bundle: true,
  sourcemap: true,
  treeShaking: true,
  packages: "external",
}).catch(() => process.exit(1));
