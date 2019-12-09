import React from 'react';
import {View, StyleSheet, Image, Text} from "react-native";
import {Icon} from "react-native-elements";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import { withNavigation } from 'react-navigation';
import {connect} from 'react-redux';
import {getImage} from "../../services/BlogAPI";
import moment from "moment";
import MenuIcon from "../icons/MenuIcon";
import PropTypes from 'prop-types';

export const MAX_HEIGHT = 250;
const MIN_HEIGHT = 30;

class ScreenHeader extends React.Component {

    _toggleSideMenu = () => {
        this.props.navigation.toggleDrawer();
    };

    render() {
        //console.log(this.props.user);
        const {user} = this.props;
        return (
            <View style={styles.main_container}>
                {/*<Image source={require('../../assets/images/image_background.jpg')}/>*/}
                <View>
                    <CustomTouchableOpacity onPress={this._toggleSideMenu}>
                        <Icon name="menuunfold" type="antdesign" color="white"/>
                    </CustomTouchableOpacity>
                </View>
                <View style={styles.details}>
                    <Image
                        source={user.image ? {uri: getImage(user.image, "user")} : require('../../assets/images/user_icon.png')}
                        style={styles.image}
                    />
                    <View style={styles.info}>
                        <Text style={styles.firstText}>{user.fname + ' ' + user.lname}</Text>
                        <Text style={styles.secondText}>{moment().diff(user.birth_date, 'years')} years old, {user.country}</Text>
                    </View>
                    <View style={styles.socialIcons}>
                        <Icon name="twitter" type="antdesign" color="white" size={30}/>
                        <Icon containerStyle={styles.centeredIcon} name="instagram" type="antdesign" color="white" size={30}/>
                        <Icon name="facebook-square" type="antdesign" color="white" size={30}/>
                    </View>
                </View>
                <View>
                    <CustomTouchableOpacity>
                        <Icon name="pencil-outline" type="material-community" color="white"/>
                    </CustomTouchableOpacity>
                </View>
            </View>
        );
    }

}

const mapStateToProps = state => ({
    user: state.userReducer.user,
});

export default connect(mapStateToProps)(withNavigation(ScreenHeader));


MenuIcon.propTypes = {
    label: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    main_container: {
        position: "absolute",
        width: "100%",
        left: 0,
        right: 0,
        top: 0,
        zIndex: 10,
        backgroundColor: "#3dba5f",
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        height: MAX_HEIGHT
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "white",
    },
    firstText: {
        color: "white",
        fontSize: 25,
    },
    secondText: {
        color: "#cae8d2"
    },
    socialIcons: {
        flexDirection: "row"
    },
    details: {
        alignItems: "center",
        alignSelf: "center"
    },
    centeredIcon: {
        marginLeft: 10,
        marginRight: 10
    },
    info: {
        marginTop: 5,
        marginBottom: 15,
        alignItems: "center"
    }
});