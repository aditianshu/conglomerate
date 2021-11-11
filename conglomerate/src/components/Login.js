import React, { useState, useEffect } from 'react';
import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Grid, Link, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import logo from '../../src/logo.png'
import { makeStyles } from '@material-ui/styles';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { Facebook as FacebookIcon } from '../icons/facebook';
// import { Google as GoogleIcon } from '../icons/google';

const useStyles = makeStyles((t) => ({
    box: {
        backgroundColor:'#345B63 !important',
    },
}));

export default function Login() {
    const classes = useStyles();    
    return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%',
          backgroundColor : '#D4ECDD',
        }}
      >
        <Container maxWidth="sm">
          {/* <NextLink
            href="/"
            passHref
          >
            <Button
              component="a"
            //   startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Dashboard
            </Button>
          </NextLink> */}
          <form 
          //onSubmit={formik.handleSubmit}
          >
            <Box sx={{ my: 3 }}>
                <img src = {logo} height="90px" alt="logo"></img>
            </Box>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Sign in
              </Typography>
            </Box>
            <TextField
             // error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
             // helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
             // onBlur={formik.handleBlur}
             // onChange={formik.handleChange}
              type="email"
             // value={formik.values.email}
              variant="outlined"
            />
            <TextField
              //error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              //helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
             // onBlur={formik.handleBlur}
             // onChange={formik.handleChange}
              type="password"
             // value={formik.values.password}
              variant="outlined"
            />
            <FormControl component="fieldset">
                <RadioGroup row aria-label="gender" name="row-radio-buttons-group" defaultValue="student">
                    <FormControlLabel value="student" control={<Radio />} label="Student" />
                    <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
                </RadioGroup>
            </FormControl>
            <Box sx={{ py: 1 }}>
              <Button
               // disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                className={classes.box}
                href="/dash"
              >
                Sign In Now
              </Button>
            </Box>
            {/* <Box sx={{ py: 2 }}>
                <Button
                  fullWidth
                  color="error"
                //   startIcon={<GoogleIcon />}
                //   onClick={formik.handleSubmit}
                  size="large"
                  variant="contained"
                  className={classes.box}
                >
                  Login with Google
                </Button>
            </Box> */}
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Don&apos;t have an account?
              {' '}
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: 'pointer'
                  }}
                >
                  Sign Up
                </Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

