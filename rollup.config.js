import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default {
  external: ['react', 'react-dom'],
  input: 'index.tsx',

  output: {
    exports: 'named',
    file: pkg.main,
    format: 'cjs',
  },

  plugins: [
    json(),
    resolve(),

    commonjs({
      include: ['node_modules/**'],
    }),

    typescript({
      rollupCommonJSResolveHack: true,
      exclude: ['node_modules/**', '**/__tests__/**'],
      clean: true,
    }),
  ],
};
