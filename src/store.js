import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducers';//Vai pegar os reducers

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'cart'] //os reducers que serao mantidos na tela.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer);
let persistor = persistStore(store);

export { store, persistor };