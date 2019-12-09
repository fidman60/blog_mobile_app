import {Animated, Easing} from "react-native";

export const transitionAuthConfig = {
    duration: 300,
    easing: Easing.ease,
    timing: Animated.timing,
    useNativeDriver: true,
};

export const transitionAuth = sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index; // the index of the current screen
    const height = layout.initHeight;
    const translateY = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [height, 0],
        extrapolate: "clamp"
    });
    const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [0, 1],
        extrapolate: "clamp"
    });
    return {transform: [{translateY}], opacity};
};