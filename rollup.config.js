import commonjs from '@rollup/plugin-commonjs';
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
    resolve(),

    commonjs({
      include: ['node_modules/**'],

      namedExports: {
        // left-hand side can be an absolute path, a path
        // relative to the current directory, or the name
        // of a module in node_modules
        'node_modules/scheduler/index.js': ['LowPriority', 'unstable_runWithPriority'],
      }
    }),

    typescript({
      rollupCommonJSResolveHack: true,
      exclude: ['node_modules/**', '**/__tests__/**'],
      clean: true,
    }),
  ],
};
