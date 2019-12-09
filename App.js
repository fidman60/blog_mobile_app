/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Root from "./Root";
import {persistor, store} from './app/redux/store/configureStore';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Search from "./app/components/Search";

export default class App extends React.Component{

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Root/>
                    <Search/>
                </PersistGate>
            </Provider>
        );
    }

};
