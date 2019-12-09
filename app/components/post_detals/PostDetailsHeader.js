import React from 'react';
import {StyleSheet, View} from 'react-native';
import ProfilePicture from "../ProfilePicture";
import ShareBtn from "../buttons/ShareBtn";
import BackBtn from "../buttons/BackBtn";

export const HEADER_HEIGHT = 60;

// pureComponent
export default class PostDetailsHeader extends React.Component {

    shouldComponentUpdate() {
        return false;
    }

    render(){
        const {post, onShare, navigation} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.leftSide}>
                    <BackBtn navigation={navigation}/>
                    <ProfilePicture lname={post.lname} userImage={post.user_image} />
                </View>
                <ShareBtn onShare={onShare}/>
            </View>
        );
    }

};


const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(255,255,255,0.8)",
        height: HEADER_HEIGHT,
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
        zIndex: 1000,
    },
    leftSide: {
        flexDirection: "row"
    }
});