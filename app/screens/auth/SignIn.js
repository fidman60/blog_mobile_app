import React from "react";
import {Alert as Alerto, AsyncStorage, StyleSheet, View} from 'react-native';
import {Button, CheckBox, Icon, Input, Text} from "react-native-elements";
import Alert from "../../components/Alert";
import LoadingView from "../../components/LoadingView";
import {getUser, loginUser, socialLogin} from "../../services/BlogAPI";
import {connect} from 'react-redux';
import {storeUserDataAction} from "../../redux/actions/userActions";
import {ScrollView} from "react-native-gesture-handler";
import FBLoginButton from "../../components/buttons/FBLoginButton";
import {DEFAULT_LOGIN, FB_LOGIN} from "../../config/global";

class SignIn extends React.PureComponent {

    constructor(props){
        super(props);
        this.state = {
            submitting: false,
            unknownError: false,
            invalidLogin: false,
            email: "",
            password: "",
            remember: false,
        };
    }

    _onLogin = () => {
        const {email, password} = this.state;

        this.setState({
            submitting: true,
            unknownError: false,
            invalidLogin: false,
        });

        const data = {
            email: email,
            password: password
        };

        return loginUser(data)
            .then(response => {
                const userData = {...response.data.success, login_type: DEFAULT_LOGIN};
                this._login(userData);
            })
            .catch(error => {
                if (error.response.status === 401) {
                    this.setState({
                        submitting: false,
                        invalidLogin: true,
                    });
                    return;
                }

                this.setState({
                    submitting: false,
                    unknownError: true,
                });
            });
    };

    _onFbLogin = (token) => {

        this.setState({
            submitting: true,
            unknownError: false,
            invalidLogin: false,
        });

        socialLogin(token)
            .then(response => {
                const accessToken = response.data.access_token;
                getUser(accessToken)
                    .then(response => {
                        const user = response.data;
                        const userData = {user, token: accessToken, login_type: FB_LOGIN};
                        this._login(userData);
                    })
                    .catch(error => {
                        Alerto.alert("Cannot login, something went wrong ...")
                        this.setState({
                            submitting: false,
                        });
                    });
            })
            .catch(error => {
                this.setState({
                    submitting: false,
                });
                Alerto.alert("Cannot login please try again");
            });
    };

    _login = (userData) => {
        this.props.dispatch(storeUserDataAction(userData));
        this._signInAsync(JSON.stringify(userData));
    };

    _signInAsync = async (userData) => {
        await AsyncStorage.setItem('userData', userData);
        this.props.navigation.navigate('App');
    };

    _changeEmail = (value) => this.setState({email: value});

    _changePassword = (value) => this.setState({password: value});

    _changeRememberMe = () => this.setState({
        remember: !this.state.remember
    });

    _onSignUp = () => {this.props.navigation.navigate("SignUp")};

    render() {

        const {unknownError, invalidLogin, submitting, email, password, remember} = this.state;

        return (
            <View style={styles.main_container} >
                {submitting && <LoadingView/>}
                <ScrollView style={styles.main_container}>
                    <View style={styles.screen}>
                        <Text style={styles.title}>LOGIN</Text>
                        <View style={styles.form}>
                            {unknownError && <Alert addPadding={true} text={"Sorry, something went wrong"} status="error"/>}
                            {invalidLogin && <Alert addPadding={true} text={"Sorry, email or password are invalid"} status="error"/>}
                            <View style={styles.formInputs}>
                                <Input
                                    placeholder="Email"
                                    leftIcon={<Icon name='mail' type='material' color="#a8a8a8" size={25} />}
                                    errorStyle={styles.error}
                                    inputContainerStyle={styles.inputContainer}
                                    containerStyle={styles.containerInput}
                                    inputStyle={styles.input}
                                    value={email}
                                    onChangeText={this._changeEmail}
                                />
                                <Input
                                    placeholder="Password"
                                    leftIcon={<Icon name='lock' type='material' color="#a8a8a8" size={25} />}
                                    errorStyle={styles.error}
                                    inputContainerStyle={styles.inputContainer}
                                    inputStyle={styles.input}
                                    value={password}
                                    onChangeText={this._changePassword}
                                    secureTextEntry={true}
                                />
                                <CheckBox
                                    left
                                    activeOpacity={1}
                                    title='Remember me'
                                    iconType='material'
                                    checkedIcon='check-box'
                                    uncheckedIcon='check-box-outline-blank'
                                    checkedColor='#a2a2a2'
                                    checked={remember}
                                    textStyle={styles.textCheckbox}
                                    containerStyle={styles.checkboxContainer}
                                    onPress={this._changeRememberMe}
                                />
                            </View>
                            <Button
                                title="Login"
                                disabled={false}
                                disabledStyle={styles.disabledLoginBtn}
                                buttonStyle={styles.loginBtn}
                                containerStyle={styles.containerLoginBtn}
                                onPress={this._onLogin}
                            />
                            <View style={styles.orView}>
                                <Text style={styles.orText}>Or login with</Text>
                            </View>
                            <View style={styles.connectWithSection}>
                                <View style={styles.connectWithView}>
                                    <FBLoginButton onPress={this._onFbLogin}/>
                                    {/*<LoginButton
                                            publishPermissions={["email"]}
                                            onLoginFinished={
                                                (error, result) => {
                                                    if (error) {
                                                        alert("Login failed with error: " + error.message);
                                                    } else if (result.isCancelled) {
                                                        alert("Login was cancelled");
                                                    } else {
                                                        alert("Login was successful with permissions: " + result.grantedPermissions)
                                                    }
                                                }
                                            }
                                            onLogoutFinished={() => alert("User logged out")}
                                        />*/}
                                    {/*<Button
                                        title="Facebook"
                                        disabled={false}
                                        titleStyle={styles.socialBtnTitle}
                                        disabledTitleStyle={styles.disabledSocialBtnTitle}
                                        disabledStyle={styles.disabledSocialBtn}
                                        buttonStyle={styles.socialBtn}
                                        containerStyle={styles.connectWithBtnContainer}
                                        icon={<Icon name="facebook" type="font-awesome" color="#446094" size={18} iconStyle={styles.fbIcon}/>}
                                    />*/}
                                </View>
                                <View style={styles.connectWithView}>
                                    <Button
                                        title={"Google"}
                                        disabled={submitting}
                                        titleStyle={styles.socialBtnTitle}
                                        disabledTitleStyle={styles.disabledSocialBtnTitle}
                                        disabledStyle={styles.disabledSocialBtn}
                                        buttonStyle={styles.socialBtn}
                                        containerStyle={styles.connectWithBtnContainer}
                                        icon={<Icon name="google" type="font-awesome" color="orange" size={18} iconStyle={styles.googleIcon}/>}
                                    />
                                </View>
                            </View>
                            <View style={styles.signUpTxtView}>
                                <Text style={styles.signUpTxt}>Not a memeber? <Text onPress={this._onSignUp} accessibilityRole="link" style={styles.signUpLink}>Sign up now</Text></Text>
                            </View>
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
    },
    title: {
        marginTop: 20,
        fontFamily: "feather",
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center"
    },
    form: {
        marginTop: 40,
    },
    error: {
        color: "red"
    },
    inputContainer: {
        backgroundColor: "#f6dae7"
    },
    input: {
        color: "black",
        paddingLeft: 10
    },
    textCheckbox: {
        color: "#a2a2a2"
    },
    checkboxContainer: {
        padding: 0,
        borderWidth: 0
    },
    loginBtn: {
        padding: 15,
        backgroundColor: "#c34c89"
    },
    disabledLoginBtn: {
        backgroundColor: "#b47595",
        opacity: 1
    },
    containerLoginBtn: {
        padding: 10
    },
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
    screen: {
        padding: 20
    },
    formInputs: {
        marginBottom: 20
    },
    orView: {
        padding: 30
    },
    orText: {
        textAlign: "center",
        color: "#a2a2a2"
    },
    fbIcon: {
        marginRight: 5
    },
    connectWithSection: {
        flexDirection: "row"
    },
    connectWithView: {
        flex: 1
    },
    connectWithBtnContainer: {
        paddingLeft: 10,
        paddingRight: 3
    },
    googleIcon: {
        marginRight: 5
    },
    signUpLink: {
        textDecorationLine: "underline"
    },
    signUpTxtView: {
        marginTop: 30
    },
    signUpTxt: {
        textAlign: "center"
    },
    containerInput: {
        marginBottom: 15
    }
});

const mapStateToProps = state => ({token: state.userReducer.token, user: state.userReducer.user});

export default connect(mapStateToProps)(SignIn);