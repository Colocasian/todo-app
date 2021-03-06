/* LoginPage.tsx -- login page
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

/* Page template from:
   https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in

   Written by Rishvic Pushpakaran. */

import React from "react";
import { Formik, FormikProps, Form, Field, FieldProps } from "formik";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import deepOrange from "@material-ui/core/colors/deepOrange";
import deepPurple from "@material-ui/core/colors/deepPurple";
import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme,
  ThemeProvider,
} from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";

import FooterCopyright from "./components/FooterCopyright";
import { AuthToken } from "./models/AuthModels";
import LoginForm from "./schemas/LoginForm";
import loginUser from "./services/loginUser";
import { getSessionTheme } from "./utils/themeUtils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    errorBox: {
      marginTop: theme.spacing(3),
    },
  })
);

type LocationState = {
  from: string;
};

type MyStatusType = {
  error: any | null;
};

function LoginPage() {
  const location = useLocation<LocationState | undefined>();
  const history = useHistory();
  const { from } = location.state || { from: null };

  const themePref = getSessionTheme();
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: themePref,
          primary: themePref === "light" ? deepOrange : deepPurple,
        },
      }),
    [themePref]
  );

  const classes = useStyles();

  const initialValues: AuthToken = { username: "", password: "" };
  const initialStatus: MyStatusType = { error: null };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Formik
            initialValues={initialValues}
            initialStatus={initialStatus}
            validationSchema={LoginForm}
            onSubmit={(values, { setSubmitting, setStatus }) => {
              loginUser(values)
                .then(() => {
                  setStatus({ error: null });
                  setSubmitting(false);
                  from ? history.replace(from) : history.push("/todo");
                })
                .catch((err) => {
                  setStatus({ error: err });
                  setSubmitting(false);
                });
            }}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ status, isSubmitting }: FormikProps<AuthToken>) => (
              <Form className={classes.form}>
                <Field id="username" name="username">
                  {({ field, meta }: FieldProps) => (
                    <TextField
                      autoComplete="username"
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      label="Username"
                      autoFocus
                      error={Boolean(meta.error) && meta.touched}
                      helperText={meta.touched && meta.error}
                      {...field}
                      disabled={isSubmitting}
                    />
                  )}
                </Field>
                <Field id="password" type="password" name="password">
                  {({ field, meta }: FieldProps) => (
                    <TextField
                      autoComplete="current-password"
                      type="password"
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      label="Password"
                      error={Boolean(meta.error) && meta.touched}
                      helperText={meta.touched && meta.error}
                      {...field}
                      disabled={isSubmitting}
                    />
                  )}
                </Field>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  {isSubmitting ? (
                    <CircularProgress color="inherit" size="1.5rem" />
                  ) : (
                    "Sign In"
                  )}
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link
                      component={RouterLink}
                      to="/signup"
                      variant="body2"
                      color="secondary"
                    >
                      Don't have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>
                {status.error && (
                  <Grid container justify="center">
                    <Grid item>
                      <Typography
                        variant="subtitle2"
                        color="error"
                        className={classes.errorBox}
                      >
                        {status.error["message"] || "Login Failed"}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
              </Form>
            )}
          </Formik>
        </div>
        <Box mt={8}>
          <FooterCopyright />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default LoginPage;
