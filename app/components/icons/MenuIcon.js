import React from 'react';
import {StyleSheet, Animated, Easing} from 'react-native';
import {Icon, Text} from "react-native-elements";
import {TouchableWithoutFeedback} from "react-native-gesture-handler";
import PropTypes from 'prop-types';


export default class MenuIcon extends React.Component {

    constructor(props){
        super(props);

        this._scale = new Animated.Value(1);
    }

    render() {
        return (
            <TouchableWithoutFeedback>
                <Icon
                    containerStyle={styles.icon}
                    name="list-alt" type="font-awesome" size={60} color="#636664"
                />
            </TouchableWithoutFeedback>
        );
    }

}

const styles = StyleSheet.create({
    icon: {
        borderWidth: 1,
        borderColor: "#636664",
        padding: 10,
        width: 130,
        height: 130,
        borderRadius: 75,
        justifyContent: "center",
        alignItems: "center"
    }
});

MenuIcon.propTypes = {
    label: PropTypes.string.isRequired,
};