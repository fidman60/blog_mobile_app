import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Image, Text} from "react-native-elements";
import {getImage} from "../services/BlogAPI";
import {defaultColor} from "../config/appearanceConfig";
import ImageAvatar from "./avatar/ImageAvatar";

const ProfilePicture = ({lname,userImage}) => {

    return (
        <View style={styles.main_container}>
            <View style={styles.imageSection}>
                <ImageAvatar userImage={userImage}/>
            </View>
            <Text style={styles.text}>{lname.toUpperCase()}</Text>
        </View>
    );

};

const styles = StyleSheet.create({
    main_container: {
        flexDirection: "row",
        alignItems: "center"
    },
    text: {
        fontFamily: "Arial, sans-serif",
        fontWeight: "bold",
        color: defaultColor,
        fontSize: 20
    },
    imageSection: {
        marginRight: 10
    }
});

export default ProfilePicture;