import React from 'react'
import { Animated, Easing, StyleSheet } from 'react-native'

export default class EnShrinkLarge extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            size: new Animated.Value(1)
        };
    }

    componentDidUpdate() {
        this._runAnimation();
    }

    _runAnimation(){
        Animated.sequence([
            Animated.timing(this.state.size, {
                toValue: 1.3,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: true
            }),
            Animated.timing(this.state.size, {
                toValue: 1,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ]).start();
    }

    render() {
        return (
            <Animated.Image
                style={[styles.image, {
                    transform: [{scale: this.state.size}]
                }]}
                source={this.props.source}
            />
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: 25,
        height: 25
    }
});