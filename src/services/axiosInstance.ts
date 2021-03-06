/* axiosInstance.ts -- an instance of axios to be used
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

import axios from "axios";
import { getAuthToken, isAuthenticated } from "../utils/authUtils";

export default function axiosInstance() {
  return axios.create({
    baseURL: "/api",
    timeout: 1000,
    headers: isAuthenticated()
      ? { Authorization: `Token ${getAuthToken()}` }
      : undefined,
  });
}
