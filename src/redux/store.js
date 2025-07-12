import {combineReducers, configureStore}  from "@reduxjs/toolkit"
import userSlice from "./user.slice"
import apartmentSlice from "./apartment.slice"
import agreementSlice from "./agreemented.slice"
import announcementSlice from "./announcement.slice"

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'


  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

  const rootReducer = combineReducers({
    user : userSlice ,
    apartment : apartmentSlice ,
    agreement: agreementSlice ,
    announcement : announcementSlice
  })
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })

export default store