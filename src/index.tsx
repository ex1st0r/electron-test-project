import React from 'react'
import { render } from 'react-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

import { App } from './components'
import configureStore from './store/configureStore'

const { store, persistor } = configureStore()

let root = document.createElement('div')
root.id = 'root'
document.body.appendChild( root )

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
