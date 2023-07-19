# Express-Typescript Boilerplate

## Description

Biolerplate for getting started with a express server using typescript, prisma and esbuild.

## Tools and Technologies

- Express
- Typescript
- ESbuild
- Prisma

## Usage

Clone the repository and install the dependencies

```bash
git clone
cd express-typescript-boilerplate
yarn install
yarn dev # for development
yarn build # for production
yarn start # for production
```

# Caveats and Gotchas

- typescript is used for type checking only. It is not used to transpile the code. For production builds, `esbuild` is used to transpile the code.
- `esbuild` currently supports only few of the tsconfig options.
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

## Roadmap

This will be a light weight boilerplate. I won't be adding too much features to it. Feel free to fork and add your own features.

For now, I am thinking about:

1. Improving documentation
2. Add a logger
3. Dockerize the app (High priority)

Things I won't be adding:

1. Authentication
