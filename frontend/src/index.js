import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client'
import * as serviceWorker from './serviceWorker'
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries'
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';
import { sha256 } from 'crypto-hash';

serviceWorker.register()

const linkChain = createPersistedQueryLink({sha256, useGETForHashedQueries: true})
  .concat(new HttpLink({ uri: `http://${process.env.REACT_APP_BACKEND_URL}/graphql` }))
const cache = new InMemoryCache()

persistCache({
  cache,
  storage: new LocalStorageWrapper(window.localStorage),
}).then(() => {

  
  const client = new ApolloClient({
    link: linkChain,
    // uri: `http://${process.env.REACT_APP_BACKEND_URL}/graphql`,
    cache
  })
  return client
})
.then(client => {
  ReactDOM.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
  )
})


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
