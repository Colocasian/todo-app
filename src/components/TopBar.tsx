/* TopBar.tsx -- main top bar for the app
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

import React from "react";
import { useHistory } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Grow from "@material-ui/core/Grow";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

import PopupState, { bindPopper, bindToggle } from "material-ui-popup-state";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import GitHubIcon from "@material-ui/icons/GitHub";
import MenuIcon from "@material-ui/icons/Menu";
import TodoIcon from "./TodoIcon";

import logoutUser from "../services/logoutUser";

type TopBarClasses = {
  appBar?: string;
  menuButton?: string;
  popup?: string;
};

type TopBarProps = {
  menuTrigger?: () => void;
  themeTrigger?: () => void;
  classes?: TopBarClasses;
};

function TopBar(props: TopBarProps) {
  const { menuTrigger, themeTrigger, classes } = props;
  const theme = useTheme();
  const history = useHistory();

  return (
    <AppBar
      color="inherit"
      position="fixed"
      className={classes ? classes.appBar : undefined}
    >
      <Toolbar>
        {menuTrigger && (
          <Box mr={1}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={menuTrigger}
              className={classes ? classes.menuButton : undefined}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        )}
        <Box mr={1}>
          <TodoIcon />
        </Box>
        <Box flexGrow={1}>
          <Typography variant="h6">ToDo App</Typography>
        </Box>
        <Box>
          <Tooltip title="GitHub Repo">
            <IconButton
              color="inherit"
              aria-label="source code"
              href="https://github.com/oretachi-no-org/todo-app"
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
        </Box>
        {themeTrigger && (
          <Box ml={1}>
            <Tooltip title="Toggle light/dark theme">
              <IconButton
                color="inherit"
                aria-label="toggle theme"
                onClick={themeTrigger}
              >
                {theme.palette.type === "light" ? (
                  <Brightness4Icon />
                ) : (
                  <Brightness7Icon />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        )}
        <Box>
          <PopupState variant="popper" popupId="account-menu">
            {(popupState) => (
              <>
                <IconButton
                  color="inherit"
                  aria-label="account more"
                  {...bindToggle(popupState)}
                >
                  <AccountCircleIcon />
                </IconButton>
                <Popper
                  {...bindPopper(popupState)}
                  transition
                  className={classes ? classes.popup : undefined}
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom",
                      }}
                    >
                      <Paper>
                        <MenuList id="account-more-list">
                          <MenuItem
                            onClick={() => {
                              logoutUser()
                                .then(() => {
                                  popupState.close();
                                  history.push("/login");
                                })
                                .catch((err) =>
                                  console.error("Logout Failed:", err)
                                );
                            }}
                          >
                            Logout
                          </MenuItem>
                        </MenuList>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </>
            )}
          </PopupState>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
