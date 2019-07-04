import resolve from 'rollup-plugin-node-resolve';
import common from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
/*
 * For node builtins resolution
 *
 * From node-resolve:
 *   This plugin won't resolve any builtins (e.g. fs). If you need to resolve builtins you can install
 *     local modules and set preferBuiltins to false, or install a plugin like rollup-plugin-node-builtins
 *     which provides stubbed versions of these methods
 */
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
//import sass from 'rollup-plugin-sass';
//import less from 'rollup-plugin-less';
//import lessModules from 'rollup-plugin-less-modules';
//import postcss from 'rollup-plugin-postcss';

export default  [{
    input: 'bundle/input/markdown-it-bundle.js',
    output: {
        file: 'bundle/output/markdown-it-bundle.js',
        format: 'esm'
    },
    plugins: [
        common(),
        resolve(),
        json(),
        globals(),
        builtins()
    ]
}];

