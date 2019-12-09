import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {getImage} from "../../services/BlogAPI";
import CustomTouchableOpacity from "../CustomTouchableOpacity";

export default class SecondaryPostItem extends React.PureComponent {

    constructor(props){
        super(props);
        this.postImage = {uri: getImage(props.post.id)};
    }

    _onPress = () => {
        const {post, onPress} = this.props;
        onPress(post.id);
    };

    render(){
        const {post} = this.props;
        return (
            <CustomTouchableOpacity
                onPress={this._onPress}
            >
                <View style={styles.item}>
                    <Image
                        style={styles.image}
                        source={this.postImage}
                    />
                    <Text numberOfLines={2} style={styles.title}>{post.title}</Text>
                </View>
            </CustomTouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    item: {
        flex:1,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eec9d6',
    },
    image: {
        width: "100%",
        height: 200
    },
    title: {
        fontFamily: "serif",
        fontWeight: "bold",
        fontSize: 23,
        paddingTop: 5,
        color: "#424040"
    }
});