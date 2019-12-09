import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {getImage} from "../../services/BlogAPI";
import {Image} from "react-native-elements";

export default class ImageAvatar extends React.PureComponent {

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
                containerStyle={styles.imageContainer}
                PlaceholderContent={<ActivityIndicator />}
            />
        )
    }

}

const styles = StyleSheet.create({
    imageContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: "hidden"
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 3,
        borderColor: "white",
    },
});