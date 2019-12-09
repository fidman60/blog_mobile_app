import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk';

const {width} = Dimensions.get("window");

export default class Test extends React.Component{

    render() {
        return (
            <View style={styles.main_container}>
                <LoginButton
                    onLoginFinished={
                        (error, result) => {
                            if (error) {
                                console.log("login has error: " + result.error);
                            } else if (result.isCancelled) {
                                console.log("login is cancelled.");
                            } else {
                                AccessToken.getCurrentAccessToken().then(
                                    (data) => {
                                        console.log(data.accessToken.toString())
                                    }
                                )
                            }
                        }
                    }
                    onLogoutFinished={() => console.log("logout.")}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    greenSquare: {
        backgroundColor: "green",
        width: 200,
        height: 200,
        justifyContent: "center",
        alignItems: "center"
    },
    redSquare: {
        backgroundColor: "red",
        width: 100,
        height: 100,
    }
});