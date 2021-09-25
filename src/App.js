import React from 'react'
import { Switch, Route } from 'react-router-dom'

import ExperimentPage from './pages/ExperimentPage';
import ResultsPage from './pages/ResultsPage';
import InfoPage from './pages/InfoPage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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
      <Footer />
    </div>
  );
}

export default App
