import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './css/style.scss';

// Firebase
import { FirebaseAppProvider } from 'reactfire';

const firebaseConfig = {
    apiKey: "AIzaSyD186peFKoxgtKsi2vhrs1OZKc0iQwALlU",
    authDomain: "budget-planner-f5ee3.firebaseapp.com",
    databaseURL: "https://budget-planner-f5ee3.firebaseio.com",
    projectId: "budget-planner-f5ee3",
    storageBucket: "budget-planner-f5ee3.appspot.com",
    messagingSenderId: "541868588347",
    appId: "1:541868588347:web:66a0aa88797504ecec0b1e",
    measurementId: "G-04JWXTDKWW"
};

render((
    <React.StrictMode>
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
            <App />
        </FirebaseAppProvider>
    </React.StrictMode>
), document.getElementById('root'));
