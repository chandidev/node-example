npm init -y
npm install express typescript

# Install Express and TypeScript
npm install express typescript

# Install development dependencies
npm install --save-dev @types/express @types/node ts-node nodemon

npx tsc --init //runs tsc without installing globally or locally. 

## tsconfig.json options
tsconfig.json moudle property determines output module type
    "module": "nodenext", or "esnest" will keep import and export statements as they are

    "module": "commonjs" will translate imports to require functions

    moduleResolution: "nodenext" will tell how to resolve for import statements

    verbatimModuleSyntax is a compiler option in your tsconfig.json file that provides a strict guarantee: the import and export statements in your TypeScript code will be emitted as-is in the final JavaScript output, without any transformations.

     moduleResolution: "nodenext" is to accurately model the behavior of modern Node.js, which is designed to handle both ECMAScript Modules (ESM) and older CommonJS (CJS) modules. it honours .cjs and .mjs for commonjs and esm modules

## how does ts compiler find types
The compiler's lookup process is as follows:

Check the package.json: The compiler first looks inside the library's package.json file for a special field named types or typings. This field contains a relative path to the main type definition file for that package.

Look for a well-known name: If the types field isn't found, the compiler then looks for a file with a common name at the root of the package, such as index.d.ts.

Check the @types organization: If neither of the above works, the compiler looks for a separate package on npm with the same name, but in the @types organization. For example, if you're importing express, it will automatically look for @types/express.

for user defined types for old libraries specify them in the include property. this searches those definitions in the /types subdirectories.


{
  "compilerOptions": {
    // ...
  },
  "include": ["src/**/*", "types/**/*"]
}