import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './css/style.scss';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { blue, orange, deepPurple } from '@material-ui/core/colors';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: deepPurple
    },
    status: {
        danger: orange
    }
});

render((
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App />
            <ToastContainer closeOnClick />
        </ThemeProvider>
    </React.StrictMode>
), document.getElementById('root'));
