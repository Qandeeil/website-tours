import React, { Fragment } from 'react'
import Tours from './Components/Tours/Tours'
import store from './Components/store'
import { Provider } from 'react-redux'

const App = () => {
  return (
    <Fragment>
      <Provider store={store}>
        {<Tours />}
      </Provider>
    </Fragment>
  )
}

export default App