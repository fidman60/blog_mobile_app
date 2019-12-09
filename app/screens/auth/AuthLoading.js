import React from "react";
import {AsyncStorage} from 'react-native';
import LoadingView from "../../components/LoadingView";
import {connect} from 'react-redux';
import {storeUserDataAction} from "../../redux/actions/userActions";
import {getUser} from "../../services/BlogAPI";

class AuthLoading extends React.PureComponent {

    constructor(){
        super();
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const userDataJson = await AsyncStorage.getItem('userData');
        const userData = JSON.parse(userDataJson);
        let nextUserData = null;

        if (userData){
            // get user by his token
            getUser(userData.token)
                .then(response => {
                    const user = response.data;
                    console.log(user);
                    nextUserData = {user: user, token: userData.token};
                    this.props.dispatch(storeUserDataAction(nextUserData));
                    this.props.navigation.navigate('App');
                })
                .catch(error => {
                    this.props.navigation.navigate('Auth');
                });
        } else {
            this.props.navigation.navigate('Auth');
        }
    };

    render() {
        return (
            <LoadingView/>
        );
    }

}

const mapStateToProps = state => ({token: state.userReducer.token, user: state.userReducer.user});

export default connect(mapStateToProps)(AuthLoading);