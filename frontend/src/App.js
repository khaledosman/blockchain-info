import React, {lazy, Suspense, memo} from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

const Home = lazy(() => import(/* WebpackChunkName: "Home", webpackPrefetch: true */ './views/Home'))
const BlockDetails = lazy(() => import(/* WebpackChunkName: "BlockDetails", webpackPrefetch: true */ './views/BlockDetails'))

function App () {
  return (
    <div className='App'>
      <Suspense fallback={<h3>Loading...</h3>}>
      <Router>
        <Switch>
          <Route path='/details/:blockHash' component={BlockDetails} />
          <Route path='/' component={Home} />
        </Switch>
      </Router>
      </Suspense>
    </div>
  )
}

export default memo(App)
