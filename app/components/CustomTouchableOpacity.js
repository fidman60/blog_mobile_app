import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CustomTouchableOpacity = (props) => {

    const {opacity, onPress, children} = props;
    return (
        <TouchableOpacity
            activeOpacity={opacity ? opacity : 0.7}
            onPress={onPress ? onPress : null}
        >
            {children}
        </TouchableOpacity>
    );

};

export default React.memo(CustomTouchableOpacity);