import React, { useContext } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import Animated, { useAnimatedStyle, interpolate, Extrapolation, runOnJS, withTiming } from "react-native-reanimated";
import Image from "react-native-fast-image";
import { ThemeContext } from "../theme/ThemeContext";
import { Tabs } from "./Tabs";
import { DetailsDataContext } from "../context/DetailsDataContext";
import { DetailsAnimationContext } from "../context/DetailsAnimationContext";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export const Content = () => {

    const { pokemon } = useContext(DetailsDataContext);
    const { colors, theme } = useContext(ThemeContext);
    const { translationY, expanded, setExpanded } = useContext(DetailsAnimationContext);

    const { height } = useWindowDimensions();

    const heightAnimatedStyles = useAnimatedStyle(() => ({
        transform: [
            {
                translateY: interpolate(
                    translationY.value,
                    [-height*.35, 0],
                    [-height*.35, 0],
                    Extrapolation.CLAMP
                )+height*.35
            }
        ],
    }));

    const imgAnimatedStyles = useAnimatedStyle(() => ({
        opacity: interpolate(
            translationY.value,
            [-height*.2, 0],
            [0, 1],
            Extrapolation.CLAMP
        )
    }));

    const contentDrawerAnimatedStyles = useAnimatedStyle(() => ({
        opacity: interpolate(
            translationY.value,
            [-height*.2, 0],
            [1, 0],
            Extrapolation.CLAMP
        )
    }));
    
    const uri = pokemon.sprites.other?.["official-artwork"].front_default;

    const panDown = Gesture.Pan()
        .onChange(e => {
            translationY.value += e.changeY;
        })
        .onFinalize(e => {
            if(translationY.value >= (-height*.35+75) || e.velocityY >= 250) {
                runOnJS(setExpanded)(false);
                translationY.value = withTiming(0, {
                    duration: interpolate(e.velocityY, [0, 1500], [300, 50], Extrapolation.CLAMP)
                });
            }
            else {
                runOnJS(setExpanded)(true);
                translationY.value = withTiming(-height*.35, { duration: 200 });
            }
        })
        .enabled(expanded);

    return (
        <Animated.View style={[styles.container, heightAnimatedStyles, { backgroundColor: colors.background }]}>
            <Animated.View style={imgAnimatedStyles}>
                <Image
                    style={styles.img}
                    source={{
                        uri
                    }}
                />
            </Animated.View>
            <GestureDetector gesture={panDown}>
                <Animated.View
                    style={[
                        styles.drawerContainer,
                        contentDrawerAnimatedStyles,
                    ]}
                >
                    <View style={[styles.drawer, { backgroundColor: theme === "light" ? "rgba(0, 0, 0, .1)" : "rgba(255, 255, 255, .1)" }]} />
                </Animated.View>
            </GestureDetector>
            <Tabs />
        </Animated.View>
    );

};

const styles = StyleSheet.create({
    container: {
        height: "90%",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 50,
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, .1)",
        marginHorizontal: -1,
        marginBottom: -1,
    },
    img: {
        width: 225,
        height: 225,
        position: "absolute",
        top: -225,
        left: "50%",
        transform: [
            { translateX: -115 }
        ]
    },
    drawerContainer: {
        position: "absolute",
        alignItems: "center",
        width: "85%",
        height: 40,
        left: "7.5%",
    },
    drawer: {
        marginTop: 13,
        height: 4,
        width: "27%",
        borderRadius: 999
    }
});