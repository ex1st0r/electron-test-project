import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import SQLiteStorage from '../services/SQLiteStorage'

import rootReducer from './index'
// console.log('storage', storage)

// const MyStorage = {
//   getItem: (key) => {
//     console.log('getItem', key)
//     return storage.getItem(key)
//   },
//   removeItem: (key) => {
//     console.log('removeItem', key)
//     return storage.removeItem(key)
//   },
//   setItem: (key, item) => {
//     console.log('setItem', key, item)
//     return storage.setItem(key, item)
//   },
//
// }
const persistConfig = {
  key: 'main',
  storage: SQLiteStorage(),
  // storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk))
  let persistor = persistStore(store)
  
  return { store, persistor }
}

setTimeout(() => {
  const st = SQLiteStorage({
    name: 'newconnect',
    type: 'sqlite',
    synchronize: true,
    logging: true,
    logger: 'simple-console',
    database: 'database.sqlite',
  })

  st.removeItem('persist:main')
}, 5000)
