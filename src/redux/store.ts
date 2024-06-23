import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, 
  persistReducer, 
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import cityInfoReducer from './slices/cityInfoSlice'


const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['cityInfo']
}

const rootReduser = combineReducers({
  cityInfo: cityInfoReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReduser)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export const persistor = persistStore(store)
