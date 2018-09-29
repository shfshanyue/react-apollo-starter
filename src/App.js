import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { PING } from '@query';

class App extends Component {
  render() {
    return (
      <div className="App">
        { this.props.ping }
      </div>
    );
  }
}

export default graphql(PING, {
  props ({ data }) {
    return {
      ping: data.ping,
    } 
  }
})(App)
