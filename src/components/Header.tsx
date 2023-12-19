import { StackScreenProps } from "@react-navigation/stack";
import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions, LayoutRectangle, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigatorParams } from "../navigation/MainNavigator";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import { DetailsDataContext } from "../context/DetailsDataContext";
import { DetailsAnimationContext } from "../context/DetailsAnimationContext";
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from "react-native-reanimated";

type ScreenProps = StackScreenProps<NavigatorParams, "details">;

export const Header = () => {

    const navigator = useNavigation<ScreenProps["navigation"]>();
    const { height } = useWindowDimensions();

    const { pokemon } = useContext(DetailsDataContext);
    const { translationY } = useContext(DetailsAnimationContext);

    const [textDimensions, setTextDimensions] = useState<LayoutRectangle | null>(null);

    const handleBack = () => {

        navigator.goBack();

    };

    const fontScale = Dimensions.get("window").fontScale;

    const nameAnimatedStyles = useAnimatedStyle(() => {
        
        let styles = {};

        if(textDimensions) {
            styles = {
                transform: [
                    {
                        scale: interpolate(
                            translationY.value,
                            [-height*.35, 0],
                            [.8, 1],
                            Extrapolation.CLAMP
                        )
                    },
                    {
                        translateY: interpolate(
                            translationY.value,
                            [-height*.35, 0],
                            [-textDimensions.height-(26*Math.max(Math.abs(fontScale-1), 1)), 0],
                            Extrapolation.CLAMP
                        )
                    },
                    {
                        translateX: interpolate(
                            translationY.value,
                            [-height*.35, 0],
                            [35, 0],
                            Extrapolation.CLAMP
                        )
                    }
                ]
            };
        }

        return styles;

    }, [textDimensions]);

    const opacityAnimatedStyles = useAnimatedStyle(() => ({
        opacity: interpolate(
            translationY.value,
            [-height*.2, 0],
            [0, 1],
            Extrapolation.CLAMP
        )
    }));

    return (
        <View style={styles.container}>
            <RectButton onPress={handleBack} style={styles.backButton}>
                <Icon style={styles.backIcon} name="arrow-back-outline" size={30} color={"white"} />
            </RectButton>
            <View style={styles.titleContainer}>
                <Animated.Text numberOfLines={1} maxFontSizeMultiplier={1.3} onLayout={e => setTextDimensions(e.nativeEvent.layout)} style={[styles.title, styles.text, nameAnimatedStyles]}>
                    { pokemon.name }
                </Animated.Text>
                <Animated.Text maxFontSizeMultiplier={1.3} style={[styles.text, styles.idText, opacityAnimatedStyles]}>
                    #{ pokemon.id }
                </Animated.Text>
            </View>
            <Animated.View style={[styles.pillsContainer, opacityAnimatedStyles]}>
                {
                    pokemon.types.map(type => (
                        <View key={type.type.name} style={styles.typePill}>
                            <Text maxFontSizeMultiplier={1.2} style={[styles.pillText, styles.text]}>{ type.type.name }</Text>
                        </View>
                    ))
                }
            </Animated.View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        gap: 10
    },
    text: {
        textTransform: "capitalize",
        color: "#E0E0E0",
        textShadowColor: "black",
        textShadowOffset: {
            width: -1,
            height: 1
        },
        textShadowRadius: 1
    },
    backIcon: {
        textShadowColor: "black",
        textShadowOffset: {
            width: -1,
            height: 2
        },
        textShadowRadius: 1
    },
    backButton: {
        height: 50,
        width: 50,
        backgroundColor: "transparent",
        borderRadius: 999,
        justifyContent: "center",
        alignItems: "center"
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        gap: 20
    },
    title: {
        fontSize: 35,
        fontWeight: "bold",
        flex: 1
    },
    pillsContainer: {
        flexDirection: "row",
        gap: 10,
        paddingHorizontal: 17,
        marginTop: -5
    },
    typePill: {
        backgroundColor: "rgba(255, 255, 255, .2)",
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, .1)"
    },
    pillText: {
        textTransform: "capitalize",
    },
    idText: {
        fontSize: 18,
        fontWeight: "bold"
    }
});