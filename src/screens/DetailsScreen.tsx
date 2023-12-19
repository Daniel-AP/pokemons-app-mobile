/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useRef, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { View, StyleSheet, Image as NativeImage } from "react-native";
import Image from "react-native-fast-image";
import { NavigatorParams } from "../navigation/MainNavigator";
import { Header } from "../components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Content } from "../components/Content";
import { DetailsDataContext } from "../context/DetailsDataContext";
import { DetailsAnimationContext } from "../context/DetailsAnimationContext";
import { useSharedValue } from "react-native-reanimated";

type ScreenProps = StackScreenProps<NavigatorParams, "details">;

export const DetailsScreen = ({ route }: ScreenProps) => {

    const whitePokeball = useRef(require("../../assets/pokebola-blanca.png")).current;
    const uri = NativeImage.resolveAssetSource(whitePokeball).uri;
    
    const { top } = useSafeAreaInsets();
    const { pokemon, species, evolution, backgroundColor } = route.params;

    const dataContextValue = useRef({
        pokemon,
        species,
        evolution,
        backgroundColor
    }).current;

    const translationY = useSharedValue(0);
    const [expanded, setExpanded] = useState(false);
    const [index, setIndex] = useState(0);

    const animationContext = {
        translationY,
        expanded,
        tabBarIndex: index,
        setTabBarIndex: setIndex,
        setExpanded
    };

    return (
        <DetailsDataContext.Provider value={dataContextValue}>
            <DetailsAnimationContext.Provider value={animationContext}>
                <View style={[styles.container, { backgroundColor, paddingTop: top+10 }]}>
                    <Header />
                    <Image
                        style={styles.img}
                        source={{
                            uri
                        }}
                    />
                    <Content />
                </View>
            </DetailsAnimationContext.Provider>
        </DetailsDataContext.Provider>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    img: {
        width: 250,
        height: 250,
        opacity: .2,
        position: "absolute",
        top: -75,
        right: -75
    },
});