import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import SQLiteStorage from '../services/SQLiteStorage'

import rootReducer from './index'

const persistConfig = {
  key: 'main',
  storage: SQLiteStorage({ database: 'temp/sqliteStorage.db' }),
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk))
  let persistor = persistStore(store)
  
  return { store, persistor }
}
