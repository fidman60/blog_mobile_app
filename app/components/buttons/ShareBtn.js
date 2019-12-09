import React from 'react';
import {Icon} from "react-native-elements";
import {defaultColor} from "../../config/appearanceConfig";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import {StyleSheet} from 'react-native';

const ShareBtn = ({disabled, onShare}) => {

    return (
        <CustomTouchableOpacity
            activeOpacity={0.3}
        >
            <Icon
                name='share'
                type='material'
                color={defaultColor}
                size={15}
                underlayColor="transparent"
                containerStyle={styles.container}
                iconStyle={styles.icon}
                disabled={disabled}
                onPress={onShare}
            />
        </CustomTouchableOpacity>
    );

};

export default ShareBtn;

const styles = StyleSheet.create({
    container : {
        backgroundColor: "transparent",
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        borderColor: defaultColor,
        borderWidth: 2,
        marginRight: 15,
    },
    icon: {
        marginLeft: -2,
    }
});