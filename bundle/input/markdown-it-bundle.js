/*
 * @file markdown-it-bundle.js
 *
 * @brief Markdown editor related javascript bundle input file
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

/* tui-editor */
import { default as TuiEditor } from 'tui-editor/dist/tui-editor-Editor-all.js';
import 'highlight.js';
import 'chart.js';

/* markdown-it */
import mdTaskLists    from 'markdown-it-task-lists/index.js';
import mdPlantUml     from 'markdown-it-plantuml/index.js';
import mdAbbr         from 'markdown-it-abbr/index.js';
import mdAnchor       from 'markdown-it-anchor/dist/markdownItAnchor.js';
import mdRegex        from 'markdown-it-regexp/index.js';
import mdMark         from 'markdown-it-mark/index.js';
import mdSup          from 'markdown-it-sup/index.js';
import mdTocDoneRight from 'markdown-it-toc-done-right/dist/markdownItTocDoneRight.js';
import mdContainer    from 'markdown-it-container/index.js';
import mdFootnote     from 'markdown-it-footnote/index.js';
import mdPdf          from 'markdown-it-pdf/index.js';
import mdVideo        from 'markdown-it-video/index.js';
import mdCenter       from 'markdown-it-center-text/index.js';
//import mdImSize  from 'markdown-it-imsize/lib/index.js';

export {
    TuiEditor,
    mdPlantUml,
    mdAbbr,
    mdAnchor,
    mdRegex,
    mdMark,
    mdSup,
    mdTocDoneRight,
    mdContainer,
    mdFootnote,
    mdPdf,
    mdVideo,
    mdCenter
};
