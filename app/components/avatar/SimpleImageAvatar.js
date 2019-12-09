import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {getImage} from "../../services/BlogAPI";
import {Image} from "react-native-elements";

export default class SimpleImageAvatar extends React.PureComponent {

    constructor(props){
        super(props);
        this.defaultAvatar = require('../../assets/images/user_icon.png');
    }

    render(){
        const {userImage} = this.props;
        return (
            <Image
                source={userImage ? {uri: getImage(userImage, "user")} : this.defaultAvatar}
                style={styles.image}
                PlaceholderContent={<ActivityIndicator />}
            />
        )
    }

}

const styles = StyleSheet.create({
    image: {
        width: 45,
        height: 45,
    },
});