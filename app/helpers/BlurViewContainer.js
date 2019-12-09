import React from "react";
import {Dimensions, findNodeHandle, StyleSheet} from "react-native";
import {BlurView} from "@react-native-community/blur";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class BlurViewContainer extends React.PureComponent {

    constructor(props){
        super(props);

        this.state = {
            canBlurInAndroid: false,
        };
        this.nodeHandleRef = null;
        this.viewRef = null;
    }

    _blur = () => {
        const { canBlurInAndroid } = this.state;
        if (canBlurInAndroid) return;
        setTimeout(() => {
            this.nodeHandleRef = findNodeHandle(this.viewRef);
            this.setState({ canBlurInAndroid: true });
        }, 10);
    };

    _onRef = (el) => {
        if (el && el !== this.viewRef) {
            this.viewRef = el;
            this._blur();
        }
    };

    render() {
        const {canBlurInAndroid} = this.state;
        const {children, blur} = this.props;

        return (
            <React.Fragment>
                {React.cloneElement(children, {
                    ...children.props,
                    ref: this._onRef,
                    style: {
                        opacity: blur ? 0.3 : 1,
                    }
                })}
                {blur && canBlurInAndroid && <BlurView
                    blurType="light"
                    blurAmount={1}
                    //overlayColor="#fffffdb0"
                    style={styles.blurView}
                    viewRef={this.nodeHandleRef}
                />}
            </React.Fragment>
        );
    }

}

const styles = StyleSheet.create({
    blurView: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        width: viewportWidth,
        height: viewportHeight
    },
});