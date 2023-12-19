import { useSharedValue, withTiming } from "react-native-reanimated";

export const useFade = () => {

    const opacity = useSharedValue(0);

    const fadeIn = () => {

        opacity.value = withTiming(1);

    };

    return {
        opacity,
        fadeIn
    };

};