import React from 'react';
import {AsyncStorage, StyleSheet, View, Alert} from "react-native";
import {NavigationActions} from 'react-navigation';
import {Avatar, Button, Icon, Text} from "react-native-elements";
import {getImage, uploadUserImage} from "../services/BlogAPI";
import {connect} from 'react-redux';
import {storeUserDataAction, storeUserImageAction} from "../redux/actions/userActions";
import ImagePicker from 'react-native-image-picker';
import {ScrollView} from 'react-native-gesture-handler';
import {TouchableHighlight} from "react-native-gesture-handler";
import {LoginManager} from "react-native-fbsdk";

class SideMenu extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loadingImage: false,
        };
        this.avatarImage = require('../assets/images/user_icon.png');
    }

    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    };

    _signOut = async () => {
        await LoginManager.logOut();
        await AsyncStorage.clear();
        this.navigateToScreen('Auth')();
        this.props.dispatch(storeUserDataAction({
            token: null,
            user: null,
            imageName: null,
        }));
    };

    _onAvatarPress = () => {
        ImagePicker.showImagePicker({
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            title: 'Select Avatar',
        }, this._avatarCallback);
    };

    _avatarCallback = (response) => {
        if (response.error) {
            Alert.alert('ImagePicker Error: ', response.error);
        } else {
            const image = new FormData();
            const {dispatch, token} = this.props;

            image.append("image",{
                uri: response.uri,
                name: response.fileName,
                type: response.type
            });

            uploadUserImage(image,token)
                .then(response => {
                    dispatch(storeUserImageAction(response.data.image));
                })
                .catch(error => {
                    Alert.alert("Sorry, defaultAvatar wasn't uploaded, please try again...")
                });
        }
    };

    _navigateToHome = () => {
        this.navigateToScreen('Home')();
    };

    _navigateToTest = () => {
        this.navigateToScreen('Test')();
    };

    _navigateToMyAccount = () => {
        this.navigateToScreen('MyAccount')();
    };

    render() {
        const {user, imageName} = this.props;
        return (
            <View style={styles.main_container}>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.imageSection}>
                            <Avatar
                                source={imageName ? {uri: getImage(imageName, "user")} : this.avatarImage}
                                showEditButton
                                rounded={true}
                                size="large"
                                onPress={this._onAvatarPress}
                                containerStyle={styles.avatarContainer}
                            />
                            <Text style={styles.userText}>{`@${user.lname}`}</Text>
                        </View>
                        <View>
                            <TouchableHighlight onPress={this._navigateToHome}>
                                <View style={[styles.itemDrawer,styles.itemsSection]}>
                                    <Icon name="home" type="font-awesome" size={30} color="#cccbc9"/>
                                    <Text style={styles.titleItemStyle}>Home</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={this._navigateToMyAccount}>
                                <View style={[styles.itemDrawer,styles.itemsSection]}>
                                    <Icon name="person" type="material" size={30} color="#cccbc9"/>
                                    <Text style={styles.titleItemStyle}>My account</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={this._navigateToTest}>
                                <View style={styles.itemDrawer}>
                                    <Icon name="home" type="font-awesome" size={30} color="#cccbc9"/>
                                    <Text style={styles.titleItemStyle}>Test</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={this._signOut}>
                                <View style={styles.itemDrawer}>
                                    <Icon name="sign-out" type="font-awesome" size={30} color="#cccbc9"/>
                                    <Text style={styles.titleItemStyle}>Logout</Text>
                                </View>
                            </TouchableHighlight>
                            {
                                /* <Button
                                icon={<Icon name="home" type="font-awesome" size={30} color="#cccbc9"/>}
                                title="Home"
                                onPress={this.navigateToScreen('Home')}
                                buttonStyle={styles.itemBtnStyle}
                                titleStyle={styles.titleItemStyle}
                            />
                            <Button
                                icon={<Icon name="home" type="font-awesome" size={30} color="#cccbc9"/>}
                                title="Test"
                                onPress={this.navigateToScreen('Test')}
                                buttonStyle={styles.itemBtnStyle}
                                titleStyle={styles.titleItemStyle}
                            />
                            <Button
                                icon={<Icon name="sign-out" type="font-awesome" size={30} color="#cccbc9"/>}
                                title="Logout"
                                onPress={this._signOut}
                                buttonStyle={styles.itemBtnStyle}
                                titleStyle={styles.titleItemStyle}
                            /> */
                            }
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.8)",
    },
    container: {
    },
    imageSection: {
        marginTop: 30,
        marginBottom: 30,
        height: 130,
        justifyContent: "center",
        alignItems: "center",
    },
    userText: {
        color: "#e8e4e1",
        fontSize: 20
    },
    avatarContainer: {
        marginBottom: 5
    },
    itemsSection: {
        borderTopColor: "#7d6e67",
        borderTopWidth: 1,
    },
    itemBtnStyle: {
        backgroundColor: "transparent",
        padding: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        borderBottomColor: "#7d6e67",
        borderBottomWidth: 1,
    },
    titleItemStyle: {
        color: "#e8e4e1",
        fontSize: 20,
        marginLeft: 10
    },
    itemDrawer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderBottomColor: "#7d6e67",
        borderBottomWidth: 1,
    }
});

const mapStateToProps = state => ({
    token: state.userReducer.token,
    user: state.userReducer.user,
    imageName: state.userReducer.user.image
});

export default connect(mapStateToProps)(SideMenu);