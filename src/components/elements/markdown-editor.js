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

import {
    TuiEditor,
    mdPlantUml,
    mdAbbr,
    mdAnchor,
    mdRegex,
    mdFontAwesome,
    mdMark,
    mdSup,
    mdTocDoneRight,
    mdContainer,
    mdFootnote
} from '../../../bundle/output/markdown-it-bundle.js';

import { default as mdCharts } from 'markdown-it-chart/src/index.js';

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
            <!--<link href="../../../node_modules/tui-editor/dist/tui-editor-contents.css" rel="stylesheet" />-->
            <link href="../../../static/css/markdown-it-style.css" rel="stylesheet" />
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
                .tui-add-icon {
                    background: url(../../../images/editor/add-icon.png);
                    background-size: 14px 14px;
                    background-repeat: no-repeat;
                    background-position: 2px 2px;
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
        this.initToolBar(this.editor);
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

    initToolBar(editor) {
        const name = 'addIcon';
        const className = 'tui-add-icon';
        const toolbar = editor.getUI().getToolbar();
        const iconEventName = 'iconToolbarButtonClicked';


        const toolbarInsertPosition = toolbar.getItems().length - 1;

        editor.eventManager.addEventType(iconEventName);

        toolbar.insertItem(toolbarInsertPosition, {
            type: 'button',
            options: {
                name,
                className,
                event: iconEventName,
                tooltip: 'Insertar icono'
            }
        });

        toolbar.insertItem(toolbarInsertPosition + 1 , {
            type: 'divider'
        });

        const colorSyntaxButtonIndex = toolbar.indexOfItem(name);
        const {$el: $button} = toolbar.getItem(colorSyntaxButtonIndex);

        const popup = editor.getUI().createPopup({
            header: false,
            title: false,
            content: this.getIconsDialogMarkup(),
            className: 'tui-popup-add-icon',
            $target: editor.getUI().getToolbar().$el,
            css: {
                'width': 'auto',
                'position': 'absolute'
            }
        });

        editor.eventManager.listen('focus', () => {
            popup.hide();
        });

        editor.eventManager.listen(iconEventName, () => {
            if (popup.isShow()) {
                popup.hide();
                return;
            }

            const {
                offsetTop,
                offsetLeft
            } = $button.get(0);

            popup.$el.css({
                top: offsetTop + $button.outerHeight(),
                left: offsetLeft
            });

            editor.eventManager.emit('closeAllPopup');
            popup.show();
        });

        editor.eventManager.listen('closeAllPopup', () => {
            popup.hide();
        });

        const icons = this.shadowRoot.querySelectorAll('.icon-group-content div');
        const iconClickCallBack = (event) => {
            editor.insertText(event.target.textContent.trim());
            popup.hide();
        };

        editor.eventManager.listen('removeEditor', () => {
            colorPicker.off('selectColor');
            // TODO: remove events
            popup.remove();
        });

        icons.forEach(function(icon) {
            icon.addEventListener('click', iconClickCallBack);
        });
    }


    updateCharts() {
        const charts = this.shadowRoot.querySelectorAll('.chartjs');

        for(var chart of charts) {
            new Chart(
                chart.getContext('2d'),
                JSON.parse(chart.innerHTML)
            );
        }
    }

    getIconsDialogMarkup() {
        return '<style>'
            + '    .icon-group {padding-top: 6px;padding-bottom: 6px;}'
            + '    .icon-group-header {display: flex;margin-top: 6px;margin-bottom: 8px;color: rgba(55, 53, 47, 0.6);font-size: 11px;line-height: 120%;user-select: none;text-transform: uppercase;letter-spacing: 1px;font-weight: 500;}'
            + '    .icon-group-header-title {white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}'
            + '    .icon-group-content {display: flex;flex-wrap: wrap;align-items: flex-start;background: transparent;padding: 0;margin-bottom: 1px;}'
            + '    .icon-group-content div {cursor: pointer;user-select: none;display: flex;align-items: center;justify-content: center;border-radius: 3px;width: 32px;height: 32px;font-size: 24px;}'
            + '</style>'
            + '<div style="flex-grow: 1; height: 50vh; width: 50vh; overflow-y: scroll;">'
            + '    <div class="icon-group">'
            + '        <div class="icon-group-header"><div class="icon-group-header-title">people</div></div>'
            + '        <div class="icon-group-content">'
            + '            <div>�</div><div>😬</div><div>😁</div><div>😂</div><div>🤣</div><div>😃</div><div>😄</div><div>😅</div><div>😆</div><div>😇</div><div>😉</div><div>😊</div><div>🙂</div><div>🙃</div><div>😋</div><div>😌</div><div>😍</div><div>😘</div><div>😗</div><div>😙</div><div>😚</div><div>😜</div><div>😝</div><div>😛</div><div>🤑</div><div>🤓</div><div>😎</div><div>🤡</div><div>🤠</div><div>🤗</div><div>😏</div><div>😶</div><div>😐</div><div>😑</div><div>😒</div><div>🙄</div><div>🤔</div><div>🤥</div><div>😳</div><div>😞</div><div>😟</div><div>😠</div><div>😡</div><div>😔</div><div>😕</div><div>🙁</div><div>😣</div><div>😖</div><div>😫</div><div>😩</div><div>😤</div><div>😮</div><div>😱</div><div>😨</div><div>😰</div><div>😯</div><div>😦</div><div>😧</div><div>😢</div><div>😥</div><div>🤤</div><div>😪</div><div>😓</div><div>😭</div><div>😵</div><div>😲</div><div>🤐</div><div>🤢</div><div>🤧</div><div>😷</div><div>🤒</div><div>🤕</div><div>😴</div><div>💤</div><div>💩</div><div>😈</div><div>👿</div><div>👹</div><div>👺</div><div>💀</div><div>👻</div><div>👽</div><div>🤖</div><div>😺</div><div>😸</div><div>😹</div><div>😻</div><div>😼</div><div>😽</div><div>🙀</div><div>😿</div><div>😾</div><div>🙌</div><div>👏</div><div>👋</div><div>🤙</div><div>👍</div><div>👎</div><div>👊</div><div>✊</div><div>🤛</div><div>🤜</div><div>✌</div><div>👌</div><div>✋</div><div>🤚</div><div>👐</div><div>💪</div><div>🙏</div><div>🤝</div><div>☝</div><div>👆</div><div>👇</div><div>👈</div><div>👉</div><div>🖕</div><div>🖐</div><div>🤘</div><div>🤞</div><div>🖖</div><div>✍</div><div>🤳</div><div>💅</div><div>👄</div><div>👅</div><div>👂</div><div>👃</div><div>👁</div><div>👀</div><div>👤</div><div>👥</div><div>🗣</div><div>👶</div><div>👦</div><div>👧</div><div>👨</div><div>👩</div><div>👱</div><div>👴</div><div>👵</div><div>👲</div><div>👳</div><div>👮</div><div>👷</div><div>💂</div><div>🕵</div><div>👩&zwj;⚕️</div><div>👨&zwj;⚕️</div><div>👩&zwj;🌾</div><div>👨&zwj;🌾</div><div>👩&zwj;🍳</div><div>👨&zwj;🍳</div><div>👩&zwj;🎓</div><div>👨&zwj;🎓</div><div>👩&zwj;🎤</div><div>👨&zwj;🎤</div><div>👩&zwj;🏫</div><div>👨&zwj;🏫</div><div>👩&zwj;🏭</div><div>👨&zwj;🏭</div><div>👩&zwj;💻</div><div>👨&zwj;💻</div><div>👩&zwj;💼</div><div>👨&zwj;💼</div><div>👩&zwj;🔧</div><div>👨&zwj;🔧</div><div>👩&zwj;🔬</div><div>👨&zwj;🔬</div><div>👩&zwj;🎨</div><div>👨&zwj;🎨</div><div>👩&zwj;🚒</div><div>👨&zwj;🚒</div><div>👩&zwj;🚀</div><div>👨&zwj;🚀</div><div>🤶</div><div>🎅</div><div>👼</div><div>🤰</div><div>👸</div><div>🤴</div><div>👰</div><div>🤵</div><div>🏃</div><div>🚶</div><div>💃</div><div>🕺</div><div>👯</div><div>👫</div><div>👬</div><div>👭</div><div>🙇</div><div>🤦</div><div>🤷</div><div>💁</div><div>🙅</div><div>🙆</div><div>🙋</div><div>🙎</div><div>🙍</div><div>💇</div><div>💆</div><div>💑</div><div>👩&zwj;❤️&zwj;👩</div><div>👨&zwj;❤️&zwj;👨</div><div>💏</div><div>👩&zwj;❤️&zwj;💋&zwj;👩</div><div>👨&zwj;❤️&zwj;💋&zwj;👨</div><div>👪</div><div>👨&zwj;👩&zwj;👧</div><div>👨&zwj;👩&zwj;👧&zwj;👦</div><div>👨&zwj;👩&zwj;👦&zwj;👦</div><div>👨&zwj;👩&zwj;👧&zwj;👧</div><div>👩&zwj;👩&zwj;👦</div><div>👩&zwj;👩&zwj;👧</div><div>👩&zwj;👩&zwj;👧&zwj;👦</div><div>👩&zwj;👩&zwj;👦&zwj;👦</div><div>👩&zwj;👩&zwj;👧&zwj;👧</div><div>👨&zwj;👨&zwj;👦</div><div>👨&zwj;👨&zwj;👧</div><div>👨&zwj;👨&zwj;👧&zwj;👦</div><div>👨&zwj;👨&zwj;👦&zwj;👦</div><div>👨&zwj;👨&zwj;👧&zwj;👧</div><div>👩&zwj;👦</div><div>👩&zwj;👧</div><div>👩&zwj;👧&zwj;👦</div><div>👩&zwj;👦&zwj;👦</div><div>👩&zwj;👧&zwj;👧</div><div>👨&zwj;👦</div><div>👨&zwj;👧</div><div>👨&zwj;👧&zwj;👦</div><div>👨&zwj;👦&zwj;👦</div><div>👨&zwj;👧&zwj;👧</div><div>👚</div><div>👕</div><div>👖</div><div>👔</div><div>👗</div><div>👙</div><div>👘</div><div>💄</div><div>💋</div><div>👣</div><div>👠</div><div>👡</div><div>👢</div><div>👞</div><div>👟</div><div>👒</div><div>🎩</div><div>⛑</div><div>🎓</div><div>👑</div><div>🎒</div><div>👝</div><div>👛</div><div>👜</div><div>💼</div><div>👓</div><div>🕶</div><div>💍</div><div>🌂</div>'
            + '        </div>'
            + '    </div>'
            + '    <div class="icon-group">'
            + '        <div class="icon-group-header"><div class="icon-group-header-title">animals and nature</div></div>'
            + '        <div class="icon-group-content">'
            + '            <div>🐶</div><div>🐱</div><div>🐭</div><div>🐹</div><div>🐰</div><div>🦊</div><div>🐻</div><div>🐼</div><div>🐨</div><div>🐯</div><div>🦁</div><div>🐮</div><div>🐷</div><div>🐽</div><div>🐸</div><div>🦑</div><div>🐙</div><div>🦐</div><div>🐵</div><div>🦍</div><div>🙈</div><div>🙉</div><div>🙊</div><div>🐒</div><div>🐔</div><div>🐧</div><div>🐦</div><div>🐤</div><div>🐣</div><div>🐥</div><div>🦆</div><div>🦅</div><div>🦉</div><div>🦇</div><div>🐺</div><div>🐗</div><div>🐴</div><div>🦄</div><div>🐝</div><div>🐛</div><div>🦋</div><div>🐌</div><div>🐞</div><div>🐜</div><div>🕷</div><div>🦂</div><div>🦀</div><div>🐍</div><div>🦎</div><div>🐢</div><div>🐠</div><div>🐟</div><div>🐡</div><div>🐬</div><div>🦈</div><div>🐳</div><div>🐋</div><div>🐊</div><div>🐆</div><div>🐅</div><div>🐃</div><div>🐂</div><div>🐄</div><div>🦌</div><div>🐪</div><div>🐫</div><div>🐘</div><div>🦏</div><div>🐐</div><div>🐏</div><div>🐑</div><div>🐎</div><div>🐖</div><div>�</div><div>🐁</div><div>🐓</div><div>🦃</div><div>🕊</div><div>🐕</div><div>🐩</div><div>🐈</div><div>🐇</div><div>🐿</div><div>🐾</div><div>🐉</div><div>🐲</div><div>🌵</div><div>🎄</div><div>🌲</div><div>🌳</div><div>🌴</div><div>🌱</div><div>🌿</div><div>☘</div><div>🍀</div><div>🎍</div><div>🎋</div><div>🍃</div><div>🍂</div><div>🍁</div><div>🌾</div><div>🌺</div><div>🌻</div><div>🌹</div><div>🥀</div><div>🌷</div><div>🌼</div><div>🌸</div><div>💐</div><div>🍄</div><div>🌰</div><div>🎃</div><div>🐚</div><div>🕸</div><div>🌎</div><div>🌍</div><div>🌏</div><div>🌕</div><div>🌖</div><div>🌗</div><div>🌘</div><div>🌑</div><div>🌒</div><div>🌓</div><div>🌔</div><div>🌚</div><div>🌝</div><div>🌛</div><div>🌜</div><div>🌞</div><div>🌙</div><div>⭐</div><div>🌟</div><div>💫</div><div>✨</div><div>☄</div><div>️</div><div>🌤</div><div>⛅</div><div>🌥</div><div>🌦</div><div>☁️</div><div>🌧</div><div>⛈</div><div>🌩</div><div>⚡</div><div>🔥</div><div>💥</div><div>❄️</div><div>🌨</div><div>⛄</div><div>☃</div><div>🌬</div><div>💨</div><div>🌪</div><div>🌫</div><div>☂</div><div>☔</div><div>💧</div><div>💦</div><div>🌊</div>'
            + '        </div>'
            + '    </div>'
            + '    <div class="icon-group">'
            + '        <div class="icon-group-header"><div class="icon-group-header-title">food and drink</div></div>'
            + '        <div class="icon-group-content">'
            + '            <div>🍏</div><div>🍎</div><div>🍐</div><div>🍊</div><div>🍋</div><div>🍌</div><div>🍉</div><div>🍇</div><div>🍓</div><div>🍈</div><div>🍒</div><div>🍑</div><div>🍍</div><div>🥝</div><div>🥑</div><div>🍅</div><div>🍆</div><div>🥒</div><div>🥕</div><div>🌶</div><div>🥔</div><div>🌽</div><div>🍠</div><div>🥜</div><div>🍯</div><div>🥐</div><div>🍞</div><div>🥖</div><div>🧀</div><div>🥚</div><div>🥓</div><div>🥞</div><div>🍗</div><div>🍖</div><div>🍤</div><div>🍳</div><div>🍔</div><div>🍟</div><div>🥙</div><div>🌭</div><div>🍕</div><div>🍝</div><div>🌮</div><div>🌯</div><div>🥗</div><div>🥘</div><div>🍜</div><div>🍲</div><div>🍥</div><div>🍣</div><div>🍱</div><div>🍛</div><div>🍙</div><div>🍚</div><div>🍘</div><div>🍢</div><div>🍡</div><div>🍧</div><div>🍨</div><div>🍦</div><div>🍰</div><div>🎂</div><div>🍮</div><div>🍬</div><div>🍭</div><div>🍫</div><div>🍿</div><div>🍩</div><div>🍪</div><div>🥛</div><div>🍺</div><div>🍻</div><div>🥂</div><div>🍷</div><div>🥃</div><div>🍸</div><div>🍹</div><div>🍾</div><div>🍶</div><div>🍵</div><div>☕</div><div>🍼</div><div>🥄</div><div>🍴</div><div>🍽</div>'
            + '        </div>'
            + '    </div>'
            + '    <div class="icon-group">'
            + '        <div class="icon-group-header"><div class="icon-group-header-title">activity</div></div>'
            + '        <div class="icon-group-content">'
            + '            <div>⚽</div><div>🏀</div><div>🏈</div><div>⚾</div><div>🎾</div><div>🏐</div><div>🏉</div><div>🎱</div><div>⛳</div><div>🏌</div><div>🏓</div><div>🏸</div><div>🥅</div><div>🏒</div><div>🏑</div><div>🏏</div><div>🎿</div><div>⛷</div><div>🏂</div><div>🤺</div><div>⛸</div><div>🏹</div><div>🎣</div><div>🥊</div><div>🥋</div><div>🚣</div><div>🏊</div><div>🏄</div><div>🛀</div><div>⛹</div><div>🏋</div><div>🚴</div><div>🚵</div><div>🏇</div><div>🕴</div><div>🏆</div><div>🎽</div><div>🏅</div><div>🎖</div><div>🥇</div><div>🥈</div><div>🥉</div><div>🎗</div><div>🏵</div><div>🎫</div><div>🎟</div><div>🎭</div><div>🎨</div><div>🎪</div><div>🎤</div><div>🎧</div><div>🎼</div><div>🎹</div><div>🥁</div><div>🎷</div><div>🎺</div><div>🎸</div><div>🎻</div><div>🎬</div><div>🎮</div><div>👾</div><div>🎯</div><div>🎲</div><div>🎰</div><div>🎳</div>'
            + '        </div>'
            + '    </div>'
            + '    <div class="icon-group">'
            + '        <div class="icon-group-header"><div class="icon-group-header-title">travel and places</div></div>'
            + '        <div class="icon-group-content">'
            + '            <div>🚗</div><div>🚕</div><div>🚙</div><div>🚌</div><div>🚎</div><div>🏎</div><div>🚓</div><div>🚑</div><div>🚒</div><div>🚐</div><div>🚚</div><div>🚛</div><div>🚜</div><div>🛴</div><div>🏍</div><div>🚲</div><div>🛵</div><div>🚨</div><div>🚔</div><div>🚍</div><div>🚘</div><div>🚖</div><div>🚡</div><div>🚠</div><div>🚟</div><div>🚃</div><div>🚋</div><div>🚝</div><div>🚄</div><div>🚅</div><div>🚈</div><div>🚞</div><div>🚂</div><div>🚆</div><div>🚇</div><div>🚊</div><div>🚉</div><div>🚁</div><div>🛩</div><div>✈️</div><div>🛫</div><div>🛬</div><div>⛵</div><div>🛥</div><div>🚤</div><div>⛴</div><div>🛳</div><div>🚀</div><div>🛰</div><div>💺</div><div>🛶</div><div>⚓</div><div>🚧</div><div>⛽</div><div>🚏</div><div>🚦</div><div>🚥</div><div>🏁</div><div>🚢</div><div>🎡</div><div>🎢</div><div>🎠</div><div>🏗</div><div>🌁</div><div>🗼</div><div>🏭</div><div>⛲</div><div>🎑</div><div>⛰</div><div>🏔</div><div>🗻</div><div>🌋</div><div>🗾</div><div>🏕</div><div>⛺</div><div>🏞</div><div>🛣</div><div>🛤</div><div>🌅</div><div>🌄</div><div>🏜</div><div>🏖</div><div>🏝</div><div>🌇</div><div>🌆</div><div>🏙</div><div>🌃</div><div>🌉</div><div>🌌</div><div>🌠</div><div>🎇</div><div>🎆</div><div>🌈</div><div>🏘</div><div>🏰</div><div>🏯</div><div>🏟</div><div>🗽</div><div>🏠</div><div>🏡</div><div>🏚</div><div>🏢</div><div>🏬</div><div>🏣</div><div>🏤</div><div>🏥</div><div>🏦</div><div>🏨</div><div>🏪</div><div>🏫</div><div>🏩</div><div>💒</div><div>🏛</div><div>⛪</div><div>🕌</div><div>🕍</div><div>🕋</div><div>⛩</div>'
            + '        </div>'
            + '    </div>'
            + '    <div class="icon-group">'
            + '        <div class="icon-group-header"><div class="icon-group-header-title">objects</div></div>'
            + '        <div class="icon-group-content">'
            + '            <div>⌚</div><div>📱</div><div>📲</div><div>💻</div><div>⌨</div><div>🖥</div><div>🖨</div><div>🖱</div><div>🖲</div><div>🕹</div><div>🗜</div><div>💽</div><div>💾</div><div>💿</div><div>📀</div><div>📼</div><div>📷</div><div>📸</div><div>📹</div><div>🎥</div><div>📽</div><div>🎞</div><div>📞</div><div>☎️</div><div>📟</div><div>📠</div><div>📺</div><div>📻</div><div>🎙</div><div>🎚</div><div>🎛</div><div>⏱</div><div>⏲</div><div>⏰</div><div>🕰</div><div>⏳</div><div>⌛</div><div>📡</div><div>🔋</div><div>🔌</div><div>💡</div><div>🔦</div><div>🕯</div><div>🗑</div><div>🛢</div><div>💸</div><div>💵</div><div>💴</div><div>💶</div><div>💷</div><div>💰</div><div>💳</div><div>💎</div><div>⚖</div><div>🔧</div><div>🔨</div><div>⚒</div><div>🛠</div><div>⛏</div><div>🔩</div><div>⚙</div><div>⛓</div><div>🔫</div><div>💣</div><div>🔪</div><div>🗡</div><div>⚔</div><div>🛡</div><div>🚬</div><div>☠</div><div>⚰</div><div>⚱</div><div>🏺</div><div>🔮</div><div>📿</div><div>💈</div><div>⚗</div><div>🔭</div><div>🔬</div><div>🕳</div><div>💊</div><div>💉</div><div>🌡</div><div>🏷</div><div>🔖</div><div>🚽</div><div>🚿</div><div>🛁</div><div>🔑</div><div>🗝</div><div>🛋</div><div>🛌</div><div>🛏</div><div>🚪</div><div>🛎</div><div>🖼</div><div>🗺</div><div>⛱</div><div>🗿</div><div>🛍</div><div>🛒</div><div>🎈</div><div>🎏</div><div>🎀</div><div>🎁</div><div>🎊</div><div>🎉</div><div>🎎</div><div>🎐</div><div>🎌</div><div>🏮</div><div>✉️</div><div>📩</div><div>📨</div><div>📧</div><div>💌</div><div>📮</div><div>📪</div><div>📫</div><div>📬</div><div>📭</div><div>📦</div><div>📯</div><div>📥</div><div>📤</div><div>📜</div><div>📃</div><div>📑</div><div>📊</div><div>📈</div><div>📉</div><div>📄</div><div>📅</div><div>📆</div><div>🗓</div><div>📇</div><div>🗃</div><div>🗳</div><div>🗄</div><div>📋</div><div>🗒</div><div>📁</div><div>📂</div><div>🗂</div><div>🗞</div><div>📰</div><div>📓</div><div>📕</div><div>📗</div><div>📘</div><div>📙</div><div>📔</div><div>📒</div><div>📚</div><div>📖</div><div>🔗</div><div>📎</div><div>🖇</div><div>✂️</div><div>📐</div><div>📏</div><div>📌</div><div>📍</div><div>🚩</div><div>🏳</div><div>🏴</div><div>🏳️&zwj;🌈</div><div>🔐</div><div>🔒</div><div>🔓</div><div>🔏</div><div>🖊</div><div>🖋</div><div>✒️</div><div>📝</div><div>✏️</div><div>🖍</div><div>🖌</div><div>🔍</div><div>🔎</div>'
            + '        </div>'
            + '    </div>'
            + '    <div class="icon-group">'
            + '        <div class="icon-group-header"><div class="icon-group-header-title">symbols</div></div>'
            + '        <div class="icon-group-content">'
            + '            <div>💯</div><div>🔢</div><div>❤️</div><div>💛</div><div>💚</div><div>💙</div><div>💜</div><div>🖤</div><div>💔</div><div>❣</div><div>💕</div><div>💞</div><div>💓</div><div>💗</div><div>💖</div><div>💘</div><div>💝</div><div>💟</div><div>☮</div><div>✝</div><div>☪</div><div>🕉</div><div>☸</div><div>🔯</div><div>🕎</div><div>☯</div><div>☦</div><div>🛐</div><div>⛎</div><div>♈</div><div>♉</div><div>♊</div><div>♋</div><div>♌</div><div>♍</div><div>♎</div><div>♏</div><div>♐</div><div>♑</div><div>♒</div><div>♓</div><div>🆔</div><div>⚛</div><div>🈳</div><div>🈹</div><div>☢</div><div>☣</div><div>📴</div><div>📳</div><div>🈶</div><div>🈚</div><div>🈸</div><div>🈺</div><div>🈷️</div><div>✴️</div><div>🆚</div><div>🉑</div><div>💮</div><div>🉐</div><div>㊙️</div><div>㊗️</div><div>🈴</div><div>🈵</div><div>🈲</div><div>🅰️</div><div>🅱️</div><div>🆎</div><div>🆑</div><div>🅾️</div><div>🆘</div><div>⛔</div><div>📛</div><div>🚫</div><div>❌</div><div>⭕</div><div>🛑</div><div>💢</div><div>♨️</div><div>🚷</div><div>🚯</div><div>🚳</div><div>🚱</div><div>🔞</div><div>📵</div><div>❗</div><div>❕</div><div>❓</div><div>❔</div><div>‼️</div><div>⁉️</div><div>🔅</div><div>🔆</div><div>🔱</div><div>⚜</div><div>〽️</div><div>⚠️</div><div>🚸</div><div>🔰</div><div>♻️</div><div>🈯</div><div>💹</div><div>❇️</div><div>✳️</div><div>❎</div><div>✅</div><div>💠</div><div>�</div><div>➿</div><div>🌐</div><div>Ⓜ️</div><div>🏧</div><div>🈂️</div><div>🛂</div><div>🛃</div><div>🛄</div><div>🛅</div><div>♿</div><div>🚭</div><div>🚾</div><div>🅿️</div><div>🚰</div><div>🚹</div><div>🚺</div><div>🚼</div><div>🚻</div><div>🚮</div><div>🎦</div><div>📶</div><div>🈁</div><div>🆖</div><div>🆗</div><div>🆙</div><div>🆒</div><div>🆕</div><div>🆓</div><div>🔟</div><div>*⃣</div><div>▶️</div><div>⏸</div><div>⏭</div><div>⏹</div><div>⏺</div><div>⏯</div><div>⏮</div><div>⏩</div><div>⏪</div><div>�</div><div>🔁</div><div>🔂</div><div>◀️</div><div>🔼</div><div>🔽</div><div>⏫</div><div>⏬</div><div>➡️</div><div>⬅️</div><div>⬆️</div><div>⬇️</div><div>↗️</div><div>↘️</div><div>↙️</div><div>↖️</div><div>↕️</div><div>↔️</div><div>🔄</div><div>↪️</div><div>↩️</div><div>⤴️</div><div>⤵️</div><div>ℹ️</div><div>🔤</div><div>🔡</div><div>🔠</div><div>🔣</div><div>🎵</div><div>🎶</div><div>〰️</div><div>➰</div><div>✔️</div><div>🔃</div><div>➕</div><div>➖</div><div>➗</div><div>✖️</div><div>💲</div><div>💱</div><div>©️</div><div>®️</div><div>™️</div><div>🔚</div><div>🔙</div><div>🔛</div><div>🔝</div><div>🔜</div><div>☑️</div><div>🔘</div><div>⚪</div><div>⚫</div><div>🔴</div><div>🔵</div><div>🔸</div><div>🔹</div><div>🔶</div><div>🔷</div><div>🔺</div><div>▪️</div><div>▫️</div><div>⬛</div><div>⬜</div><div>🔻</div><div>◼️</div><div>◻️</div><div>◾</div><div>◽</div><div>🔲</div><div>🔳</div><div>🔈</div><div>🔉</div><div>🔊</div><div>🔇</div><div>📣</div><div>📢</div><div>🔔</div><div>🔕</div><div>🃏</div><div>🀄</div><div>♠️</div><div>♣️</div><div>♥️</div><div>♦️</div><div>🎴</div><div>💭</div><div>🗯</div><div>💬</div><div>🗨</div><div>🕐</div><div>🕑</div><div>🕒</div><div>🕓</div><div>🕔</div><div>🕕</div><div>🕖</div><div>🕗</div><div>🕘</div><div>🕙</div><div>🕚</div><div>🕛</div><div>🕜</div><div>🕝</div><div>🕞</div><div>🕟</div><div>🕠</div><div>🕡</div><div>🕢</div><div>🕣</div><div>🕤</div><div>🕥</div><div>🕦</div><div>🕧</div>'
            + '        </div>'
            + '    </div>'
            + '    <div class="icon-group">'
            + '        <div class="icon-group-header"><div class="icon-group-header-title">flags</div></div>'
            + '        <div class="icon-group-content">'
            + '            <div>🇦🇫</div><div>🇦🇽</div><div>🇦🇱</div><div>🇩🇿</div><div>🇦🇸</div><div>🇦🇩</div><div>🇦🇴</div><div>🇦🇮</div><div>🇦🇶</div><div>🇦🇬</div><div>🇦🇷</div><div>🇦🇲</div><div>🇦🇼</div><div>🇦🇺</div><div>🇦🇹</div><div>🇦🇿</div><div>🇧🇸</div><div>🇧🇭</div><div>🇧🇩</div><div>🇧🇧</div><div>🇧🇾</div><div>🇧🇪</div><div>🇧🇿</div><div>🇧🇯</div><div>🇧🇲</div><div>🇧🇹</div><div>🇧🇴</div><div>🇧🇶</div><div>🇧🇦</div><div>🇧🇼</div><div>🇧🇷</div><div>🇮🇴</div><div>🇻🇬</div><div>🇧🇳</div><div>🇧🇬</div><div>🇧🇫</div><div>🇧🇮</div><div>🇨🇻</div><div>🇰🇭</div><div>🇨🇲</div><div>🇨🇦</div><div>🇮🇨</div><div>🇰🇾</div><div>🇨🇫</div><div>🇹🇩</div><div>🇨🇱</div><div>🇨🇳</div><div>🇨🇽</div><div>🇨🇨</div><div>🇨🇴</div><div>🇰🇲</div><div>🇨🇬</div><div>🇨🇩</div><div>🇨🇰</div><div>🇨🇷</div><div>🇭🇷</div><div>🇨🇺</div><div>🇨🇼</div><div>🇨🇾</div><div>🇨🇿</div><div>🇩🇰</div><div>🇩🇯</div><div>🇩🇲</div><div>🇩🇴</div><div>🇪🇨</div><div>🇪🇬</div><div>🇸🇻</div><div>🇬🇶</div><div>🇪🇷</div><div>🇪🇪</div><div>🇪🇹</div><div>🇪🇺</div><div>🇫🇰</div><div>🇫🇴</div><div>🇫🇯</div><div>🇫🇮</div><div>🇫🇷</div><div>🇬🇫</div><div>🇵🇫</div><div>🇹🇫</div><div>🇬🇦</div><div>🇬🇲</div><div>🇬🇪</div><div>🇩🇪</div><div>🇬🇭</div><div>🇬🇮</div><div>🇬🇷</div><div>🇬🇱</div><div>🇬🇩</div><div>🇬🇵</div><div>🇬🇺</div><div>🇬🇹</div><div>🇬🇬</div><div>🇬🇳</div><div>🇬🇼</div><div>🇬🇾</div><div>🇭🇹</div><div>🇭🇳</div><div>🇭🇰</div><div>🇭🇺</div><div>🇮🇸</div><div>🇮🇳</div><div>🇮🇩</div><div>🇮🇷</div><div>🇮🇶</div><div>🇮🇪</div><div>🇮🇲</div><div>🇮🇱</div><div>🇮🇹</div><div>🇨🇮</div><div>🇯🇲</div><div>🇯🇵</div><div>🇯🇪</div><div>🇯🇴</div><div>🇰🇿</div><div>🇰🇪</div><div>🇰🇮</div><div>🇽🇰</div><div>🇰🇼</div><div>🇰🇬</div><div>🇱🇦</div><div>🇱🇻</div><div>🇱🇧</div><div>🇱🇸</div><div>🇱🇷</div><div>🇱🇾</div><div>🇱🇮</div><div>🇱🇹</div><div>🇱🇺</div><div>🇲🇴</div><div>🇲🇰</div><div>🇲🇬</div><div>🇲🇼</div><div>🇲🇾</div><div>🇲🇻</div><div>🇲🇱</div><div>🇲🇹</div><div>🇲🇭</div><div>🇲🇶</div><div>🇲🇷</div><div>🇲🇺</div><div>🇾🇹</div><div>🇲🇽</div><div>🇫🇲</div><div>🇲🇩</div><div>🇲🇨</div><div>🇲🇳</div><div>🇲🇪</div><div>🇲🇸</div><div>🇲🇦</div><div>🇲🇿</div><div>🇲🇲</div><div>🇳🇦</div><div>🇳🇷</div><div>🇳🇵</div><div>🇳🇱</div><div>🇳🇨</div><div>🇳🇿</div><div>🇳🇮</div><div>🇳🇪</div><div>🇳🇬</div><div>🇳🇺</div><div>🇳🇫</div><div>🇲🇵</div><div>🇰🇵</div><div>🇳🇴</div><div>🇴🇲</div><div>🇵🇰</div><div>🇵🇼</div><div>🇵🇸</div><div>🇵🇦</div><div>🇵🇬</div><div>🇵🇾</div><div>🇵🇪</div><div>🇵🇭</div><div>🇵🇳</div><div>🇵🇱</div><div>🇵🇹</div><div>🇵🇷</div><div>🇶🇦</div><div>🇷🇪</div><div>🇷🇴</div><div>🇷🇺</div><div>🇷🇼</div><div>🇧🇱</div><div>🇸🇭</div><div>🇰🇳</div><div>🇱🇨</div><div>🇵🇲</div><div>🇻🇨</div><div>🇼🇸</div><div>🇸🇲</div><div>🇸🇹</div><div>🇸🇦</div><div>🇸🇳</div><div>🇷🇸</div><div>🇸🇨</div><div>🇸🇱</div><div>🇸🇬</div><div>🇸🇽</div><div>🇸🇰</div><div>🇸🇮</div><div>🇸🇧</div><div>🇸🇴</div><div>🇿🇦</div><div>🇬🇸</div><div>🇰🇷</div><div>🇸🇸</div><div>🇪🇸</div><div>🇱🇰</div><div>🇸🇩</div><div>🇸🇷</div><div>🇸🇿</div><div>🇸🇪</div><div>🇨🇭</div><div>🇸🇾</div><div>🇹🇼</div><div>🇹🇯</div><div>🇹🇿</div><div>🇹🇭</div><div>🇹🇱</div><div>🇹🇬</div><div>🇹🇰</div><div>🇹🇴</div><div>🇹🇹</div><div>🇹🇳</div><div>🇹🇷</div><div>🇹🇲</div><div>🇹🇨</div><div>🇹🇻</div><div>🇺🇬</div><div>🇺🇦</div><div>🇦🇪</div><div>🇬🇧</div><div>🇺🇸</div><div>🇻🇮</div><div>🇺🇾</div><div>🇺🇿</div><div>🇻🇺</div><div>🇻🇦</div><div>🇻🇪</div><div>🇻🇳</div><div>🇼🇫</div><div>🇪🇭</div><div>🇾🇪</div><div>🇿🇲</div>'
            + '        </div>'
            + '    </div>'
            + '</div>';
    }
}

window.customElements.define('markdown-editor-element', MarkdownEditorElement);
