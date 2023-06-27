# Express-Typescript Boilerplate

## Description

This is a boilerplate for `express` api's that can be used to quickly start a new project.

## Tools and Technologies

- Express
- Typescript
- Prisma
- ESbuild

## Getting Started

Clone the repository and install the dependencies

```bash
git clone
cd express-typescript-boilerplate
yarn install
```

# Caveats and Gotchas

- typescript is used for type checking only. It is not used to transpile the code. For production builds, `esbuild` is used to transpile the code.
- esbuild currently supports only few of the tsconfig options.
- ```mjs
    buildOptions: {
        format: 'esm' | 'cjs' | 'iife', // Typescript module option is not supported
        target: 'node', // Typescript target option is not supported
    }
  ```
- typescript `paths`, `baseUrl` doesn't seem to work right now. [Learn More](https://esbuild.github.io/content-types/#no-type-system)

- `--enable-source-maps` option needs to be passed to `node` to enable source maps.

- Run `tsc` separately to check for type errors.

## Good to know

- package.json `type:module` must be used for typescript `module: 'esnext'` to work. Default is `commonjs`.
