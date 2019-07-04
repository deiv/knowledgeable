/*
 * @file my-view.js
 *
 * @brief Main view
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

import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

import '../elements/markdown-editor.js';

// These are the shared styles needed by this element.
import { SharedStyles } from '../shared-styles.js';

class MyView extends PageViewElement {
  static get styles() {
    return [
      SharedStyles
    ];
  }

  render() {
    return html`
        <style>
            #editor-container {

            }
        </style>
        <div id="editor-container">
          <markdown-editor-element></markdown-editor-element>
        </div>
    `;
  }
}

window.customElements.define('my-view', MyView);
