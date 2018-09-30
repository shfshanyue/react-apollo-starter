import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';

import Login from './pages/Login'
import Todos from './pages/Todos'

import './App.css'

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.token ? (
      <Component {...props}/>
    ) : (
      <div className="container">
        <div>
          You are required to <Link to="/login">Login</Link> !
        </div>
        <div>
          You can show the content without login required on this page, or navigate to the login page instead.ou can display content that with no auth or redirect to /login directly.
        </div>
      </div>
    )
  )}/>
)

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <header>
            <div className="container app-container">
              <div className="title">React Apollo Starter Kit</div>
              <div className="app-list">
                <div className="app-item"><Link to="/">Todos</Link></div>
                <div className="app-item"><Link to="/login">Login</Link></div>
              </div>
            </div>
          </header>

          <Route path="/login" component={Login} />
          <AuthRoute exact={true} path="/" component={Todos} />
        </div>
      </Router>
    );
  }
}

export default App;
