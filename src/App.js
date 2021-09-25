import { Switch, Route, NavLink } from 'react-router-dom'

import ExperimentPage from './pages/ExperimentPage';
import ResultsPage from './pages/ResultsPage';
import InfoPage from './pages/InfoPage';
import HomePage from './pages/HomePage';

import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" exact activeClassName="active" to='/'>
            The Algorithm Knows Best
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" exact activeClassName="active" to="/home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact activeClassName="active" to="/stream">
                  Participate
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact activeClassName="active" to="/results">
                  Results
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact activeClassName="active" to="/info">
                  Info
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
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
    </div>
  );
}



export default App;
