import React, { useContext } from "react";
import { View, StyleSheet, useWindowDimensions, Pressable, Animated } from "react-native";
import { NavigationState, SceneRendererProps } from "react-native-tab-view";
import { ThemeContext } from "../theme/ThemeContext";
import { DetailsDataContext } from "../context/DetailsDataContext";

type Props = SceneRendererProps & {
    navigationState: NavigationState<{
        key: string;
        title: string;
    }>;
}

const INDICATOR_PADDING = 12;

export const TabBar = ({ jumpTo, navigationState, position }: Props) => {

    const { colors, theme } = useContext(ThemeContext);
    const { backgroundColor } = useContext(DetailsDataContext);

    const { width } = useWindowDimensions();

    const inputRange = navigationState.routes.map((_, i) => i);

    const containerExtraStyles = {
        backgroundColor: colors.background,
        borderColor: theme === "light" ? "rgba(0, 0, 0, .1)" : "rgba(255, 255, 255, .1)"
    };

    const indicatorExtraStyles = {
        width: width/navigationState.routes.length-INDICATOR_PADDING*2,
        backgroundColor: backgroundColor
    };
    
    const indicatorAnimatedStyles = {
        transform: [
            { translateX: position.interpolate({
                inputRange,
                outputRange: inputRange.map(inputIndex => inputIndex*(width/navigationState.routes.length)+INDICATOR_PADDING)
            }) }
        ]
    };

    const TabBarItem = ({ title, id, index }: { title: string, id: string, index: number }) => {

        const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex =>
                inputIndex === index ? 1 : 0.4
            ),
        });

        return (
            <Pressable style={styles.tabItem} onPress={() => jumpTo(id)}>
                <Animated.Text maxFontSizeMultiplier={1.5} style={[styles.text, { color: colors.text, opacity }]}>
                    { title }
                </Animated.Text>
            </Pressable>
        );
    };

    return (
        <View style={[styles.container, containerExtraStyles]}>
            {
                navigationState.routes.map((route, i) => (
                    <TabBarItem
                        title={route.title}
                        id={route.key}
                        index={i}
                        key={route.key}
                    />
                ))
            }
            <Animated.View style={[styles.indicator, indicatorExtraStyles, indicatorAnimatedStyles]} />
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderBottomWidth: 1,
    },
    text: {
        fontWeight: "bold",
        fontSize: 16
    },
    tabItem: {
        paddingBottom: 20,
        flex: 1,
        alignItems: "center"
    },
    indicator: {
        position: "absolute",
        height: 3,
        bottom: -2,
        borderRadius: 999,
    }
});