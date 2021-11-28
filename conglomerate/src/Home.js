import React, { useState, useEffect } from 'react';
import logo from './logo.png'
import { Button, Typography } from '@mui/material';
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
  } from '@mui/material/styles';
import { makeStyles } from '@material-ui/styles';
import './App.css'

const useStyles = makeStyles((t) => ({
    box: {
        margin : 10,
        backgroundColor:'#152D35 !important',
    },

}));

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function Home() {
    const classes = useStyles();
    const [count, setCount] = useState(0);
    return (
        <div className="container">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <ThemeProvider theme={theme}>
                    <Typography variant='h1'gutterBottom="true">
                        Conglomerate
                    </Typography>
                </ThemeProvider>
                <Button 
                    variant='contained' 
                    size='large' 
                    className={classes.box}
                    href='/login' >
                        Login/Sign-Up
                </Button>
            </header>
        </div>
    );
}
