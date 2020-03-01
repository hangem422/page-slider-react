import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import cssimport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import svgr from '@svgr/rollup';
import url from 'rollup-plugin-url';

import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
process.env.BABEL_ENV = 'production';

export default {
  input: './lib/index.ts',
  plugins: [
    external(),
    resolve({ extensions }),
    commonjs({ include: 'node_modules/**' }),
    babel({ extensions, include: ['lib/**/*'], runtimeHelpers: true }),
    postcss({ plugins: [cssimport(), autoprefixer()] }),
    url(),
    svgr(),
  ],
  output: [
    {
      file: pkg.module,
      format: 'es',
    },
  ],
};
