import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { ApolloClient, InMemoryCache, gql, ApolloProvider, HttpLink } from '@apollo/client'
import * as serviceWorker from './serviceWorker'
// TODO enable APQs
// import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries'

/* @ts-ignore */
// const linkChain = createPersistedQueryLink(undefined)
//   .concat(new HttpLink({ uri: `http://${process.env.REACT_APP_BACKEND_URL}/graphql` }))

serviceWorker.register()

const client = new ApolloClient({
  // link: linkChain,
  uri: `http://${process.env.REACT_APP_BACKEND_URL}/graphql`,
  cache: new InMemoryCache()
})

client
  .query({
    query: gql`
      query randomNumber {
        randomNumber
      }
    `
  })
  .then(result => console.log(result))

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
