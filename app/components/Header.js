import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Text} from "react-native-elements";
import CustomTouchableOpacity from "./CustomTouchableOpacity";
import {connect} from "react-redux";
import {chargeModal, toggleModalAction} from "../redux/actions/searchAction";

export const HEADER_HEIGHT = 45;

// implement shouldUpdateComponent manually
class Header extends React.Component {

    shouldComponentUpdate() {
        return false;
    }

    _toggleDrawer = () => {
        this.props.navigation.toggleDrawer();
    };

    _toggleSearch = () => {
        this.props.dispatch(toggleModalAction());
    };

    componentDidMount() {
        const {dispatch, navigation} = this.props;
        dispatch(chargeModal(navigation));
    }

    render() {
        return (
            <View style={styles.main_container}>
                <CustomTouchableOpacity>
                    <Icon
                        name='list'
                        type='font-awesome'
                        color='#656363'
                        size={25}
                        onPress={this._toggleDrawer}
                    />
                </CustomTouchableOpacity>

                <CustomTouchableOpacity>
                    <Text style={styles.title}>FIDMAN PRO</Text>
                </CustomTouchableOpacity>

                <CustomTouchableOpacity>
                    <Icon
                        name='search'
                        type='material'
                        color='#656363'
                        size={25}
                        onPress={this._toggleSearch}
                    />
                </CustomTouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    main_container: {
        height: HEADER_HEIGHT,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#ededed',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'visible'
    },
    title: {
        fontFamily: 'serif',
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    }
});

const mapStateToProps = state => ({
    visible: state.searchReducer.visible,
    charged: state.searchReducer.charged
});

export default connect(mapStateToProps)(Header);