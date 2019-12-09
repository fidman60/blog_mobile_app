import React from 'react';
import {Icon} from "react-native-elements";
import CustomTouchableOpacity from "../CustomTouchableOpacity";

// pure component
export default class BackBtn extends React.Component {

    shouldComponentUpdate() {
        return false;
    }

    _back = () => this.props.navigation.goBack();

    render(){
        return (
            <CustomTouchableOpacity
                activeOpacity={.3}
            >
                <Icon
                    name='chevron-left'
                    type='material'
                    color='#595b5a'
                    size={50}
                    onPress={this._back}
                />
            </CustomTouchableOpacity>
        );
    }
};