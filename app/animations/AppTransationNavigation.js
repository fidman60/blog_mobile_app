import {Animated, Easing} from "react-native";

export const transitionAppConfig = {
    duration: 300,
    easing: Easing.bounce,
    timing: Animated.timing,
    useNativeDriver: true,
};

export const transitionApp = sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index; // the index of the current screen
    const width = layout.initWidth; // the width of the current screen
    const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
        extrapolate: "clamp" // clamp so it doesn't go beyond the outputRange. Without this, you'll see a few black portions in the screen while navigating
    });
    const rotate = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: ["90deg","0deg"],
        extrapolate: "clamp",
    });
    const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.5, thisSceneIndex],
        outputRange: [0, 0.2, 1],
        extrapolate: "clamp"
    });
    return { opacity, transform: [{rotate}, {translateX}] };
};