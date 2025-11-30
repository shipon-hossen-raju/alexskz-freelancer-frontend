import {combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './auth/userSlice'
import chatReducer from './slices/messageSlice'
import bookingReducer from './slices/bookingSlice'
import storage from 'redux-persist/lib/storage'
import { baseApi } from './api/baseApi'

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import { createTransform } from 'redux-persist';


// Transform: inbound (to storage) => remove initialRole
const removeInitialRoleTransform = createTransform(
 
  (inboundState, key) => {
    if (!inboundState) return inboundState;
    const { initialRole, ...rest } = inboundState;
    return rest;
  },
 
  (outboundState, key) => {
    
    return { initialRole: null, ...outboundState };
  },
  { whitelist: ['user', 'booking'] } 
);

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    transforms: [removeInitialRoleTransform],
    blacklist: [baseApi.reducerPath, 'chat'],
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
    user: userReducer,
    chat: chatReducer,
    booking: bookingReducer,
    [baseApi.reducerPath]: baseApi.reducer,
}))

export const store = configureStore({
  reducer: persistedReducer,
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
})

export const persistor = persistStore(store)