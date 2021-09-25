import React, { useEffect } from 'react'
import { Switch, Route, NavLink, Link } from 'react-router-dom'

import ExperimentPage from './pages/ExperimentPage';
import ResultsPage from './pages/ResultsPage';
import InfoPage from './pages/InfoPage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';

import './App.css';

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container flex-fill mt-body">
        <Switch>
          <Route path="/info">
            <InfoPage />
          </Route>
          <Route path="/stream">
            <ExperimentPage />
          </Route>
          <Route path="/results">
            <ResultsPage />
          </Route>
          <Route path={['/', '/home', "*"]}>
            <HomePage />
          </Route>
        </Switch>
      </div>

      <footer className="footer mt-auto py-3 bg-light">
        <div className="container">
          Site created using react{" - "}<a href="https://github.com/ianrios/the-algo-knows-best" target="_blank" rel="noreferrer" className="text-muted">GitHub</a>
        </div>
      </footer>
    </div>
  );
}



export default App;
