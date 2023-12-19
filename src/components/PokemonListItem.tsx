/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useRef, useContext, useEffect, memo } from "react";
import { View, Text, StyleSheet, Image as NativeImage, useWindowDimensions } from "react-native";
import Image from "react-native-fast-image";
import { PokemonReference } from "../types/pokemons";
import { ThemeContext } from "../theme/ThemeContext";
import { usePokemonDetails } from "../hooks/usePokemonDetails";
import { useFade } from "../hooks/useFade";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { getColors } from "react-native-image-colors";
import { AndroidImageColors } from "react-native-image-colors/build/types";
import { useColor } from "../hooks/useColor";
import { RectButton } from "react-native-gesture-handler";
import { StackScreenProps } from "@react-navigation/stack";
import { NavigatorParams } from "../navigation/MainNavigator";
import { useNavigation } from "@react-navigation/native";

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton);

interface Props {
    data: PokemonReference & { index: number }
}

type ScreenProps = StackScreenProps<NavigatorParams, "home">;

export const PokemonListItem = memo(({ data }: Props) => {

    const whitePokeball = useRef(require("../../assets/pokebola-blanca.png")).current;

    const navigator = useNavigation<ScreenProps["navigation"]>();

    const { colors } = useContext(ThemeContext);
    const { pokemon, species, evolution, loading } = usePokemonDetails(data.url);

    const { opacity: imgOpacity, fadeIn: fadeImgIn } = useFade();
    const { opacity: itemOpacity, fadeIn: fadeItemIn } = useFade();
    const { opacity: idOpacity, fadeIn: fadeIdIn } = useFade();
    
    const { color: backgroundColor, transitionColor } = useColor(colors.secondary);
    const { width } = useWindowDimensions();

    const idAnimatedStyles = useAnimatedStyle(() => ({
        opacity: idOpacity.value
    }));

    const imgAnimatedStyles = useAnimatedStyle(() => ({
        opacity: imgOpacity.value
    }));

    const containerAnimatedStyles = useAnimatedStyle(() => ({
        backgroundColor: backgroundColor.value,
        opacity: itemOpacity.value,

    }));

    const placeholderImgUri = NativeImage.resolveAssetSource(whitePokeball).uri;

    const handlePress = () => {

        if(pokemon && species && evolution) navigator.navigate("details", {
            pokemon,
            species,
            evolution,
            backgroundColor: backgroundColor.value
        });

    };

    useEffect(() => {

        const fetchImageColor = async() => {

            
            const pokemonImgUri = pokemon?.sprites.other?.["official-artwork"].front_default;
            
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const imgColors = await getColors(pokemonImgUri!, {
                fallback: colors.secondary,
                cache: true,
                key: pokemonImgUri
            }) as AndroidImageColors;

            transitionColor(imgColors.dominant);

        };

        if(!loading) {

            fetchImageColor();
            fadeImgIn();
            fadeIdIn();

        }

    }, [loading]);

    useEffect(() => {

        fadeItemIn(); 

    }, []);


    return (
        <AnimatedRectButton onPress={handlePress} style={[styles.container, containerAnimatedStyles, { maxWidth: width/2-30 }]}>
            <Animated.View style={[styles.container, { maxWidth: "auto" }]}>
                <View style={[styles.imageContainer, { overflow: "hidden" }]}>
                    <Image
                        style={styles.placeholder}
                        source={{
                            uri: placeholderImgUri
                        }}
                    />
                </View>
                {
                    !loading
                        ? (
                            <Animated.View style={[styles.imageContainer, imgAnimatedStyles]}>
                                <Image
                                    style={styles.img}
                                    source={{
                                        uri: pokemon?.sprites.other?.["official-artwork"].front_default
                                    }}
                                />
                            </Animated.View>
                        )
                        : null
                }
                <Text maxFontSizeMultiplier={1.5} style={styles.title}>{ data.name }</Text>
                <Animated.Text maxFontSizeMultiplier={1.5} style={[styles.subtitle, idAnimatedStyles]}>#{ pokemon?.id }</Animated.Text>
            </Animated.View>
        </AnimatedRectButton>
    );

});

const styles = StyleSheet.create({
    container: {
        height: 125,
        flex: 1,
        borderRadius: 15,
    },
    imageContainer: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 15
    },
    placeholder: {
        width: 100,
        height: 100,
        opacity: .1,
        position: "absolute",
        bottom: -25,
        right: -25,
        transform: [
            { rotate: "180deg" }
        ]
    },
    img: {
        width: 115,
        height: 115,
        position: "absolute",
        bottom: -10,
        right: -20
    },
    title: {
        marginTop: 20,
        marginLeft: 10,
        fontWeight: "bold",
        fontSize: 18,
        textTransform: "capitalize",
        color: "#E0E0E0",
        textShadowColor: "black",
        textShadowOffset: {
            width: -1,
            height: 1
        },
        textShadowRadius: 1
    },
    subtitle: {
        marginLeft: 10,
        fontWeight: "bold",
        color: "#D0D0D0",
        textShadowColor: "black",
        textShadowOffset: {
            width: -1,
            height: 1
        },
        textShadowRadius: 1
    }
});