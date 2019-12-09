import React from 'react';
import {Icon} from "react-native-elements";
import {TouchableHighlight} from "react-native-gesture-handler";
import {StyleSheet} from 'react-native';
import {HEADER_HEIGHT} from "../post_detals/PostDetailsHeader";


// pure component
export default class DownCommentsTouchable extends React.Component {

    shouldComponentUpdate() {
        return false;
    }

    render() {
        const {onPress} = this.props;
        return (
            <TouchableHighlight
                style={styles.touchableDown}
                underlayColor="#f5f0f0"
                onPress={onPress}
            >
                <Icon name="down" type="antdesign" color="grey"/>
            </TouchableHighlight>
        );
    }

}

const styles = StyleSheet.create({
    touchableDown: {
        height: HEADER_HEIGHT,
        justifyContent: "center"
    }
});