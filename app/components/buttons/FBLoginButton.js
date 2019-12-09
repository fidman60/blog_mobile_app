import React, { Component } from 'react';
import { StyleSheet} from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import {Button, Icon} from "react-native-elements";

export default class FBLoginButton extends Component {

    _onLoginPress = () => {
        const {onPress} = this.props;
        LoginManager.logInWithPermissions(['public_profile']).then(
            function(result) {
                if (result.isCancelled) {
                    alert('Login was cancelled');
                } else {
                    AccessToken.getCurrentAccessToken().then(data => {
                        onPress(data.accessToken);
                    });
                }
            },
            function(error) {
                alert('Login failed ' + error);
            }
        );
    };

    render() {
        return (
            <Button
                title="Facebook"
                disabled={false}
                titleStyle={styles.socialBtnTitle}
                disabledTitleStyle={styles.disabledSocialBtnTitle}
                disabledStyle={styles.disabledSocialBtn}
                buttonStyle={styles.socialBtn}
                containerStyle={styles.connectWithBtnContainer}
                icon={<Icon name="facebook" type="font-awesome" color="#446094" size={18} iconStyle={styles.fbIcon}/>}
                onPress={this._onLoginPress}
            />
        );
    }
};

const styles = StyleSheet.create({
    socialBtnTitle: {
        color: "#446094"
    },
    disabledSocialBtn: {
        backgroundColor: "white",
        borderColor: "grey"
    },
    disabledSocialBtnTitle: {
        color: "grey"
    },
    socialBtn: {
        padding: 10,
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#446094"
    },
    connectWithBtnContainer: {
        paddingLeft: 10,
        paddingRight: 3
    },
    fbIcon: {
        marginRight: 5
    },
});

module.exports = FBLoginButton;