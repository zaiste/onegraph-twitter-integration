import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';

import OneGraphApolloClient from 'onegraph-apollo-client';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import AuthTwitter from './AuthTwitter';
import Config from './Config';

const client = new OneGraphApolloClient({
  appId: Config.appId 
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthTwitter>
      <App/>
    </AuthTwitter>
  </ApolloProvider>,
  document.getElementById('root')
);

registerServiceWorker();
