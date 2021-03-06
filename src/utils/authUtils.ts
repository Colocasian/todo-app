/* authUtils.ts -- utilities to set and access authentication details
   Copyright (C) 2020  Rishvic Pushpakaran

   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU Affero General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU Affero General Public License for more details.

   You should have received a copy of the GNU Affero General Public License
   along with this program.  If not, see <https://www.gnu.org/licenses/>.  */

/* Written by Rishvic Pushpakaran. */

const key = "onTodoAuth";

export function getAuthToken() {
  return localStorage.getItem(key);
}

export function isAuthenticated() {
  return Boolean(getAuthToken());
}

export function setAuthToken(token: string) {
  if (isAuthenticated()) {
    throw new Error("Another user is already logged in");
  } else {
    localStorage.setItem(key, token);
  }
}

export function clearAuthToken() {
  localStorage.removeItem(key);
}
