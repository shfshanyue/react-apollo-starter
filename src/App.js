import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';

import Login from './pages/Login'

import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <header>
            <div className="container app-container">
              <div className="title">React Apollo Starter Kit</div>
              <div className="app-list">
                <div className="app-item"><Link to="/">Home</Link></div>
                <div className="app-item"><Link to="/login">Login</Link></div>
              </div>
            </div>
          </header>

          <Route path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
