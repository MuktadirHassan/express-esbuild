## Description

This is a boilerplate for getting started with an Express server using Typescript, Prisma, Kysely and ESbuild. It provides a basic setup to quickly kickstart your Express-based projects.

## Tools and Technologies

- Express: A popular web framework for Node.js.
- Typescript: A superset of JavaScript that adds static typing.
- ESbuild: A fast JavaScript bundler and minifier.
- Kysely: A SQL query builder for Typescript.
- Prisma: An open-source database toolkit for TypeScript and Node.js. Used for migrations and type generation for Kyseley. Don't need to use Prisma Client for this boilerplate.

## Usage

1. Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/MuktadirHassan/express-esbuild.git>
cd express-esbuild
```

Install the project dependencies:

```bash
yarn install
```

Start the development server:

```bash
yarn dev
```

For production, build the project using ESbuild:

```bash
yarn build
```

Start the production server:

```bash
yarn start
```

## Caveats and Gotchas

- Typescript is used for type checking only and not for transpiling the code. For production builds, esbuild is used for transpilation.
- Some of the tsconfig options are not supported by esbuild. Current supported build options are:

```mjs
  buildOptions: {
    format: 'esm' | 'cjs' | 'iife', // Typescript module option is not supported
    target: 'node', // Typescript target option is not supported
  }
```

- Typescript paths and baseUrl do not seem to work with esbuild. Follow ➡️ [https://esbuild.github.io/content-types/#no-type-system](https://esbuild.github.io/content-types/#no-type-system)

- We need sourcemaps for debugging. esbuild does not generate sourcemaps by default. We need to explicitly set the sourcemap option to true. Follow ➡️ [https://esbuild.github.io/api/#sourcemap](https://esbuild.github.io/api/#sourcemap). To enable sourcemaps in node, we need to set the `--enable-source-maps` flag.

- Using `tsc` separately to check for type errors.

## Good to know

In the package.json, set "type": "module" to enable module: 'esnext' for TypeScript to work. The default is `commonjs` and it ignores the module option in tsconfig.json.

## Roadmap

This boilerplate aims to be lightweight, and additional features will be kept to a minimum. Feel free to fork and add your own features.

Planned improvements:

- Improved documentation
- Add a logger
- Dockerize the app (High priority)

Things that won't be added to this boilerplate:

- Authentication

## License

Copyright (c) 2023 Muktadir Hassan

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
