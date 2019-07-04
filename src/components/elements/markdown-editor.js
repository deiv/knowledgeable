/*
 * @file markdown-editor.js
 *
 * @brief Markdown editor
 * @author David Suárez
 * @date Thu, 04 Jul 19 23:02:15 +0200
 *
 * @license
 *
 * knowledgeable: markdown based content manager
 *
 * Copyright (C) 2019 <David Suárez <david.sephirot@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 */

import { LitElement, html } from 'lit-element';

import { default as TuiEditor } from '../../../generated-bundle/tui-editor-full.js';

import mdTaskLists    from '../../../generated-bundle/markdown-it-task-lists.js';
import mdPlantUml     from '../../../generated-bundle/markdown-it-plantuml.js';
import mdAbbr         from '../../../generated-bundle/markdown-it-abbr.js';
import mdAnchor       from '../../../generated-bundle/markdown-it-anchor.js';
import mdRegex        from '../../../generated-bundle/markdown-it-regexp.js';
import mdFontAwesome  from '../../../generated-bundle/markdown-it-fontawesome.js';
import mdMark         from '../../../generated-bundle/markdown-it-mark.js';
import mdSup          from '../../../generated-bundle/markdown-it-sup.js';
import mdTocDoneRight from '../../../generated-bundle/markdown-it-toc-done-right.js';
import mdContainer    from '../../../generated-bundle/markdown-it-container.js';
import mdFootnote     from '../../../generated-bundle/markdown-it-footnote.js';
//import mdImSize  from '../../../generated-bundle/markdown-it-imsize.js';

import { default as mdCharts } from 'markdown-it-chart/src/index.js';

import '../../../generated-bundle/highlight.js';
import '../../../generated-bundle/chart.js';


export class MarkdownEditorElement extends LitElement {

    static get properties() {
        return {
            text: {
                type: String,
                value: ""
            }
        }
    }

    static get styles() {
        return [
            /*SharedStyles*/
        ];
    }

    constructor() {
        super();


    }

    render() {
        return html`
            <!-- XXX: 
            <link href="node_modules/@fortawesome/fontawesome-free/css/all.css" rel="stylesheet" />-->
            <link href="../../../node_modules/tui-editor/dist/tui-editor.css" rel="stylesheet" />
            <link href="../../../node_modules/tui-editor/dist/tui-editor-contents.css" rel="stylesheet" />
            <link href="../../../node_modules/tui-color-picker/dist/tui-color-picker.css" rel="stylesheet" />
            <link href="../../../node_modules/codemirror/lib/codemirror.css" rel="stylesheet" />
            <link href="../../../node_modules/tui-chart/dist/tui-chart.css" rel="stylesheet" />
            <link href="../../../node_modules/highlight.js/styles/github.css" rel="stylesheet" />
            <link href="../../../node_modules/chart.js/dist/Chart.css" rel="stylesheet" />
            
            <style>
                #container {
                    overflow: hidden;
                    clear: both;
                }
                
                .source {
                    width: 49%;
                    height: 100%;
                    float: left;
                }

                .result-html {
                    width: 49%;
                    height: 100%;
                    float: right;
                    overflow-x: auto;
                    overflow-y: scroll;
                }
            </style>
            
            <div id="editorContainer">
            
            </div>
        `;
    }

    firstUpdated() {
        const editorDiv = this.shadowRoot.getElementById('editorContainer');

        this.editor = new TuiEditor({
            el: editorDiv,
            initialEditType: 'markdown',
            previewStyle: 'vertical',
            height: '88vh',
            language: 'es_ES',
            usageStatistics: false,
            hideModeSwitch: true,
            exts: ['chart', 'scrollSync', 'colorSyntax']/*,
            hooks: {
                previewBeforeHook(content) {
                    console.log(content);
                }
            }*/
        });

        const highlightRenderer = this.editor.convertor.constructor.getMarkdownitHighlightRenderer();
        const itRenderer = this.editor.convertor.constructor.getMarkdownitRenderer();

       // highlightRenderer.use(mdTaskLists);
        highlightRenderer.use(mdAbbr);
        highlightRenderer.use(mdAnchor);
        highlightRenderer.use(mdRegex);
        highlightRenderer.use(mdFontAwesome);
        //highlightRenderer.use(mdImSize);
        highlightRenderer.use(mdMark);
        highlightRenderer.use(mdSup);
        highlightRenderer.use(mdTocDoneRight);
        highlightRenderer.use(mdFootnote);
        highlightRenderer.use(mdCharts);

        highlightRenderer.use( mdPlantUml, {
            imageFormat: 'svg'
        });
        highlightRenderer.use( mdPlantUml, {
            openMarker: '@startditaa',
            closeMarker: '@endditaa',
            diagramName: 'ditaa',
            imageFormat: 'png'
        });
        highlightRenderer.use( mdPlantUml, {
            openMarker: '@startgantt',
            closeMarker: '@endgantt',
            diagramName: 'gantt',
            imageFormat: 'svg'
        });
        highlightRenderer.use( mdPlantUml, {
            openMarker: '@startmindmap',
            closeMarker: '@endmindmap',
            diagramName: 'mindmap',
            imageFormat: 'svg'
        });

        const md = highlightRenderer;

        highlightRenderer.use(mdContainer, 'expander', {
            validate: function(params) {
                return params.trim().match(/^expander\s+(.*)$/);
            },

            render: function (tokens, idx) {
                var m = tokens[idx].info.trim().match(/^expander\s+(.*)$/);

                if (tokens[idx].nesting === 1) {
                    // opening tag
                    return '<details><summary>' + md.utils.escapeHtml(m[1]) + '</summary>\n';

                } else {
                    // closing tag
                    return '</details>\n';
                }
            }
        });


        //itRenderer.use(mdTaskLists);
        itRenderer.use(mdAbbr);
        itRenderer.use(mdAnchor);
        itRenderer.use(mdRegex);
        itRenderer.use(mdFontAwesome);
        //itRenderer.use(mdImSize);
        itRenderer.use(mdMark);
        itRenderer.use(mdSup);
        itRenderer.use(mdTocDoneRight);
        itRenderer.use(mdFootnote);
        itRenderer.use(mdCharts);

        itRenderer.use( mdPlantUml, {
            imageFormat: 'svg'
        });
        itRenderer.use( mdPlantUml, {
            openMarker: '@startditaa',
            closeMarker: '@endditaa',
            diagramName: 'ditaa',
            imageFormat: 'png'
        });
        itRenderer.use( mdPlantUml, {
            openMarker: '@startgantt',
            closeMarker: '@endgantt',
            diagramName: 'gantt',
            imageFormat: 'svg'
        });
        itRenderer.use( mdPlantUml, {
            openMarker: '@startmindmap',
            closeMarker: 'endmindmap',
            diagramName: 'mindmap',
            imageFormat: 'svg'
        });

        const md2 = itRenderer;

        itRenderer.use(mdContainer, 'expander', {
            validate: function(params) {
                return params.trim().match(/^expander\s+(.*)$/);
            },

            render: function (tokens, idx) {
                var m = tokens[idx].info.trim().match(/^expander\s+(.*)$/);

                if (tokens[idx].nesting === 1) {
                    // opening tag
                    return '<details><summary>' + md2.utils.escapeHtml(m[1]) + '</summary>\n';

                } else {
                    // closing tag
                    return '</details>\n';
                }
            }
        });

        this.configurePreviewObserver();
    }

    configurePreviewObserver() {

        const previewElement = this.shadowRoot.querySelector('.tui-editor-contents');
        const _this = this;
        const config = {
            attributes: false,
            subtree: false,
            childList: true
        };

        const callback = function(mutationsList, observer) {
            for(var mutation of mutationsList) {
                if (mutation.type == 'childList') {
                    _this.updateCharts();

                    /* something changed, stop looping */
                    break;
                }
            }
        };

        const observer = new MutationObserver(callback);
        observer.observe(previewElement, config);
    }

    updateCharts() {
        const charts = this.shadowRoot.querySelectorAll('.chartjs');

        for(var i = 0;i < charts.length; i++){
            new Chart(
                charts[i].getContext('2d'),
                JSON.parse(charts[i].innerHTML)
            );
        }
    }
}

window.customElements.define('markdown-editor-element', MarkdownEditorElement);
