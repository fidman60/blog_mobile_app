import React from 'react'
import { Animated, Easing } from 'react-native'

export default class MoveText extends React.Component {

    constructor(props){
        super(props);
        this.transX = new Animated.Value(0);
    }

    componentDidMount(): void {
        this._runAnimation();
    }

    _runAnimation(){
        const {titleWidth} = this.props;

        Animated.loop(
            Animated.sequence([
                Animated.timing(this.transX, {
                    toValue: -titleWidth,
                    duration: 8000,
                    easing: Easing.in(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(this.transX, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true
                })
            ])).start();
    }

    render() {
        return (
            <Animated.View style={{transform: [{translateX: this.transX}]}}>
                {this.props.children}
            </Animated.View>
        );
    }
}