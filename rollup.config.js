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
        input: 'node_modules/markdown-it/index.js',
        output: {
            file: 'generated-bundle/markdown-it.js',
            format: 'esm'
        },
        plugins: [
            common(),
            resolve(),
            json()
        ]
    }, {
        input: 'node_modules/markdown-it-task-lists/index.js',
        output: {
            file: 'generated-bundle/markdown-it-task-lists.js',
            format: 'esm'
        },
        plugins: [
            common(),
            resolve(),
            json()
        ]
    }, {
        input: 'node_modules/markdown-it-plantuml/index.js',
        output: {
            file: 'generated-bundle/markdown-it-plantuml.js',
            format: 'esm'
        },
        plugins: [
            resolve(),
            common()
        ]
    }, {
        input: 'node_modules/markdown-it-abbr/index.js',
        output: {
            file: 'generated-bundle/markdown-it-abbr.js',
            format: 'esm'
        },
        plugins: [
            resolve(),
            common()
        ]
    }, {
        input: 'node_modules/markdown-it-anchor/dist/markdownItAnchor.js',
        output: {
            file: 'generated-bundle/markdown-it-anchor.js',
            format: 'esm'
        },
        plugins: [
            resolve(),
            common()
        ]
    }, {
        input: 'node_modules/markdown-it-fontawesome/index.js',
        output: {
            file: 'generated-bundle/markdown-it-fontawesome.js',
            format: 'esm'
        },
        plugins: [
            resolve(),
            common(),
            globals(),
            builtins()
        ]
    }, {
        input: 'node_modules/markdown-it-imsize/lib/index.js',
        output: {
            file: 'generated-bundle/markdown-it-imsize.js',
            format: 'esm'
        },
        plugins: [
            resolve(),
            common(),
            globals(),
            builtins()
        ]
    }, {
        input: 'node_modules/markdown-it-mark/index.js',
        output: {
            file: 'generated-bundle/markdown-it-mark.js',
            format: 'esm'
        },
        plugins: [
            resolve(),
            common()
        ]
    }, {
        input: 'node_modules/markdown-it-sup/index.js',
        output: {
            file: 'generated-bundle/markdown-it-sup.js',
            format: 'esm'
        },
        plugins: [
            resolve(),
            common()
        ]
    }, {
        input: 'node_modules/markdown-it-toc-done-right/dist/markdownItTocDoneRight.js',
        output: {
            file: 'generated-bundle/markdown-it-toc-done-right.js',
            format: 'esm'
        },
        plugins: [
            resolve(),
            common()
        ]
    }, {
        input: 'node_modules/markdown-it-regexp/index.js',
        output: {
            file: 'generated-bundle/markdown-it-regexp.js',
            format: 'esm'
        },
        plugins: [
            resolve(),
            common(),
            globals(),
            builtins()
        ]
    }, {
        input: 'node_modules/markdown-it-container/index.js',
        output: {
            file: 'generated-bundle/markdown-it-container.js',
            format: 'esm'
        },
        plugins: [
            resolve(),
            common()
        ]
    }, {
        input: 'node_modules/markdown-it-footnote/index.js',
        output: {
            file: 'generated-bundle/markdown-it-footnote.js',
            format: 'esm'
        },
        plugins: [
            resolve(),
            common()
        ]
    }, {
        input: 'node_modules/tui-editor/dist/tui-editor-Editor-all.js',
        output: {
            file: 'generated-bundle/tui-editor-full.js',
            format: 'esm'
        },
        plugins: [
            resolve(),
            common(),
            json()
        ]
    }, {
        input: 'node_modules/highlight.js/lib/index.js',
        output: {
            file: 'generated-bundle/highlight.js',
            format: 'esm'
        },
        plugins: [
            resolve(),
            common(),
            json()
        ]
    }, {
        input: 'node_modules/chart.js/dist/Chart.js',
        output: {
            file: 'generated-bundle/chart.js',
            format: 'esm'
        },
        plugins: [
            resolve(),
            common()
        ]
    }
];
