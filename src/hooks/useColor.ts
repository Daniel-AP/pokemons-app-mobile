import { useSharedValue, withTiming } from "react-native-reanimated";

export const useColor = (initColor: string) => {

    const color = useSharedValue(initColor);

    const transitionColor = (toValue: string) => {

        color.value = withTiming(toValue);

    };

    return {
        color,
        transitionColor
    };

};