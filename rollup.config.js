import autoprefixer from 'autoprefixer';
import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import cleanup from 'rollup-plugin-cleanup';
import noderesolve from 'rollup-plugin-node-resolve';
import localresolve from 'rollup-plugin-local-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import autoNamedExports from 'rollup-plugin-auto-named-exports';
import lessimporter from 'rollup-plugin-lessimporter';
import filesize from 'rollup-plugin-filesize';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy-glob';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default [
  {
    input: 'source/index.js',
    output: [
      {
        name: pkg.npmName,
        file: pkg.main,
        format: 'umd',
      },
    ],
    plugins: [
      peerDepsExternal({
        includeDependencies: false,
      }),
      lessimporter(),
      postcss({
        extensions: ['.css', '.scss', '.less'],
        use: ['sass', ['less', { javascriptEnabled: true }]],
        plugins: [autoprefixer()],
        extract: true,
        modules: false,
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
