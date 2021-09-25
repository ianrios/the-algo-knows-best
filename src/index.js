import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import './index.css';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCfamOVapRF9P5gwzV7DPooq-pIZ6kZUtQ",
  authDomain: "the-algorithm-knows-best.firebaseapp.com",
  projectId: "the-algorithm-knows-best",
  storageBucket: "the-algorithm-knows-best.appspot.com",
  messagingSenderId: "862963374311",
  appId: "1:862963374311:web:ba0bd274a9427b6048aa42",
  measurementId: "G-HYV0XF3JF1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
  , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
