import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mainReducer from './reducers/mainReducer';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['main','dietPlan'],
};

const reducers = combineReducers({
main : mainReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const Store = configureStore({
  reducer: {
    root: persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export const persistor = persistStore(Store);