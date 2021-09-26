import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'
import { DatabaseProvider } from './utilities/DatabaseContext'
import history from './utilities/history'
import ScrollToTop from './components/ScrollToTop'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <DatabaseProvider>
      <Router
      // history={history}
      >
        <ScrollToTop />
        <App />
      </Router>
    </DatabaseProvider>
  </React.StrictMode>
  , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
