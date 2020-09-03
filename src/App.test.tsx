/* App.test.tsx -- testing main app
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

import React from "react";
import { createShallow } from "@material-ui/core/test-utils";
import App from "./App";

describe("<App />", () => {
  let shallow: typeof import("enzyme").shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it("renders learn react link", () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toHaveTextContent(/learn react/i);
  });
});
