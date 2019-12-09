import {createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import userReducer from '../reducers/userReducer';
import favoriteReducer from '../reducers/favoriteReducer';
import viewedReducer from '../reducers/viewedReducer';
import searchReducer from '../reducers/searchReducer';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: [
        'viewedReducer',
    ],
    blacklist: [
        'favoriteReducer',
        'userReducer',
        'searchReducer'
    ],
};

const store = createStore(persistReducer(persistConfig,combineReducers({
    userReducer, favoriteReducer, viewedReducer, searchReducer
})));

const persistor = persistStore(store);

export {store, persistor};