import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import createHistory from "history/createBrowserHistory"
import { message } from 'antd';

import 'antd/dist/antd.less';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const history = createHistory()

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  fetch (uri, options) {
    const body = JSON.parse(options.body)
    // 方便调试
    return fetch(`${uri}?query=${body.operationName || ''}`, options) 
  },
  onError ({ response, graphQLErrors }) {
    if (graphQLErrors) {
      const { message: msg, httpStatus } = graphQLErrors[0]
      message.error(msg)
      if (httpStatus === 401) {
        localStorage.clear('token')
        history.push('/')
      } else {
      }
    }
  },
  request (operation) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    })
  }
});

ReactDOM.render((
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
), document.getElementById('root'));

registerServiceWorker();
