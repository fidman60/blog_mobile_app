import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const LoadingView = (props) => {

    return (
        <View style={styles.main_container}>
            <ActivityIndicator size="large" color="#c54b89"/>
        </View>
    )

};

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.5)",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        zIndex: 10,
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        height: "100%"
    }
});

export default React.memo(LoadingView);