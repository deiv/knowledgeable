/*
 * @file snack-bar.js
 *
 * @brief Snack Bar Element
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

import { LitElement, html, css } from 'lit-element';

class SnackBar extends LitElement {
  static get properties() {
    return {
      active: { type: Boolean }
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
          position: fixed;
          top: 100%;
          left: 0;
          right: 0;
          padding: 12px;
          background-color: var(--app-secondary-color);
          color: white;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          text-align: center;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          transition-property: visibility, transform;
          transition-duration: 0.2s;
          visibility: hidden;
        }

        :host([active]) {
          visibility: visible;
          transform: translate3d(0, -100%, 0);
        }

        @media (min-width: 460px) {
          :host {
            width: 320px;
            margin: auto;
          }
        }
      `
    ];
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}

window.customElements.define('snack-bar', SnackBar);
