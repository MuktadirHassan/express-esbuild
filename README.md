# express-esbuild

If `module` option in tsconfig.json is not set to `CommonJS` in tsconfig.json, we cannot import `@prisma/client` in config.ts. It throws error and says `moduleResolution` should be set to `nodenext`

But, `moduleResolution: nodenext` changes the import behavior and we need to specify file extension in import statement. So, we need to set `moduleResolution: node` and `module: CommonJS` in tsconfig.json. But, this project is using ESM and `type:module` is set in the package.json. So, we cannot run the project by compiling with tsc.
So we handle the build with esbuild that outputs esm and run the project with node.

### Issues:

- Path doesn't work
