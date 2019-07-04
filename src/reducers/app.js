/*
 * @file app.js
 *
 * @brief App reducers
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

import {
  UPDATE_PAGE,
  UPDATE_OFFLINE,
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR,
  UPDATE_DRAWER_STATE
} from '../actions/app.js';

const INITIAL_STATE = {
  page: '',
  offline: false,
  drawerOpened: false,
  snackbarOpened: false,
};

const app = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return {
        ...state,
        page: action.page
      };
    case UPDATE_OFFLINE:
      return {
        ...state,
        offline: action.offline
      };
    case UPDATE_DRAWER_STATE:
      return {
        ...state,
        drawerOpened: action.opened
      };
    case OPEN_SNACKBAR:
      return {
        ...state,
        snackbarOpened: true
      };
    case CLOSE_SNACKBAR:
      return {
        ...state,
        snackbarOpened: false
      };
    default:
      return state;
  }
};

export default app;
