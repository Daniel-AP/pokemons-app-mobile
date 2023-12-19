import { useContext, useMemo } from "react";
import { Gesture } from "react-native-gesture-handler";
import { DetailsAnimationContext } from "../context/DetailsAnimationContext";
import { Extrapolation, interpolate, runOnJS, withTiming } from "react-native-reanimated";
import { useWindowDimensions } from "react-native";

export const useGesture = () => {

    const { translationY, expanded, setExpanded } = useContext(DetailsAnimationContext);

    const { height } = useWindowDimensions();

    const gesture = useMemo(() => (

        Gesture.Pan()
            .onChange(e => {
                translationY.value += e.changeY;
            })
            .onFinalize(e => {
                if(translationY.value <= -75 || e.velocityY <= -500 || Math.abs(e.velocityX) >= 250) {
                    runOnJS(setExpanded)(true);
                    translationY.value = withTiming(-height*.35, {
                        duration: interpolate(e.velocityY, [-1500, -50], [50, 300], Extrapolation.CLAMP)
                    });
                } else {
                    runOnJS(setExpanded)(false);
                    translationY.value = withTiming(0, { duration: 200 });
                }
            })
            .enabled(!expanded)

    ), [expanded]);

    return { gesture };

};