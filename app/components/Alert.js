import React from 'react';
import {StyleSheet, Text, View} from "react-native";

const Alert = (props) => {
    let backgroundColor;

    switch (props.status) {
        case "success":
            backgroundColor = "red";
            break;
        case "info":
            backgroundColor = "#2088c9";
            break;
        default:
            backgroundColor = "red";
    }

    return (
        <View style={props.addPadding ? styles.addPadding : {}}>
            <View style={[styles.container, {backgroundColor: backgroundColor}]}>
                <Text style={styles.text}>{props.text}</Text>
            </View>
        </View>

    )
};

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    addPadding: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    container: {
        padding: 10,
    },
    text: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
    }
});

export default React.memo(Alert);