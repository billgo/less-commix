import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import cleanup from 'rollup-plugin-cleanup';
import noderesolve from 'rollup-plugin-node-resolve';
import localresolve from 'rollup-plugin-local-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import autoNamedExports from 'rollup-plugin-auto-named-exports';
import filesize from 'rollup-plugin-filesize';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy-glob';
import pkg from './package.json';

export default [
  {
    input: 'source/index.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'es',
      },
    ],
    plugins: [
      peerDepsExternal({
        includeDependencies: false,
      }),
      babel({ runtimeHelpers: true }),
      localresolve(),
      noderesolve(),
      commonjs(),
      autoNamedExports(),
      minify(),
      terser(),
      filesize(),
      copy([{ files: 'source/**/*.{less,scss}', dest: 'lib' }], { verbose: true, watch: false }),
      cleanup(),
    ],
  },
];
