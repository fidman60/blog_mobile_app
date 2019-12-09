import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ScreenHeader, {MAX_HEIGHT} from "../../components/headers/ScreenHeader";
import {Icon, Text} from "react-native-elements";
import MenuIcon from "../../components/icons/MenuIcon";

export default class Menu extends React.Component {

    constructor(props){
        super(props);

        this._scrollY = new Animated.Value(0);
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Animated.ScrollView
                    style={styles.scrollView}
                    scrollEventThrottle={16}
                    onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this._scrollY}}}])}
                >
                    <View style={styles.firstSection}>
                        <Text style={styles.bigText}>102</Text>
                        <Text style={styles.label}>Total published posts</Text>
                    </View>
                    <View style={styles.iconsSection}>
                        <View style={styles.rowIcon}>
                            <MenuIcon label="My posts"/>
                            <MenuIcon label="My posts"/>
                        </View>
                        <View style={styles.rowIcon}>
                            <MenuIcon label="My posts"/>
                            <MenuIcon label="My posts"/>
                        </View>
                        <View style={styles.rowIcon}>
                            <MenuIcon label="My posts"/>
                            <MenuIcon label="My posts"/>
                        </View>
                        <View style={styles.rowIcon}>
                            <MenuIcon label="My posts"/>
                            <MenuIcon label="My posts"/>
                        </View>
                    </View>
                </Animated.ScrollView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: "red"
    },
    firstSection: {
        padding: 10,
        paddingBottom: 15,
        alignItems: "center",
        borderColor: "#becfc3",
        borderBottomWidth: 1
    },
    bigText: {
        fontSize: 40
    },
    label: {
        color: "#636664"
    },
    scrollView: {
        flex: 1,
        paddingTop: MAX_HEIGHT,
    },
    rowIcon: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    iconsSection: {
    }
});