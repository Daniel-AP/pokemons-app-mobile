import React, { useContext, memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { interpolate, interpolateColor, useAnimatedStyle } from "react-native-reanimated";
import { ThemeContext } from "../theme/ThemeContext";

interface Props {
    value:    number;
}

export const StatBar = memo(({ value }: Props) => {

    const { colors } = useContext(ThemeContext);

    const barAnimatedStyles = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(value, [0, 180], ["#FF0000", "#00FF00"]),
        width: interpolate(value, [0, 180], [0, 100], "clamp")
    }));

    return (
        <View style={styles.container}>
            <Text style={[styles.text, { color: colors.text }]}>{ value }</Text>
            <View style={styles.barContainer}>
                <Animated.View style={[styles.bar, barAnimatedStyles]} />
            </View>
        </View>
    );

});

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        flex: 1
    },
    text: {
        fontWeight: "600",
        fontSize: 16
    },
    barContainer: {
        flex: 1,
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
    },
    bar: {
        height: 7,
        borderRadius: 999
    }
});