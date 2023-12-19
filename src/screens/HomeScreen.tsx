/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useContext, useRef, useState, useEffect } from "react";
import { StyleSheet, Image, View, StatusBar, ActivityIndicator, Text } from "react-native";
import { ThemeContext } from "../theme/ThemeContext";
import { usePokemons } from "../hooks/usePokemons";
import { PokemonList } from "../components/PokemonList";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useFade } from "../hooks/useFade";
import { SearchBar } from "../components/SearchBar";

export const HomeScreen = () => {

    const blackPokeball = useRef(require("../../assets/pokebola.png")).current;
    const whitePokeball = useRef(require("../../assets/pokebola-blanca.png")).current;

    const { theme, colors } = useContext(ThemeContext);
    const [page, setPage] = useState(1);
    const { pokemons, loading, more } = usePokemons(page);
    const { opacity, fadeIn } = useFade();

    const uri = Image.resolveAssetSource(theme === "light" ? blackPokeball : whitePokeball).uri;

    const animatedStyles = useAnimatedStyle(() => ({
        opacity: opacity.value
    }));

    const Header = () => (
        <>
            <Text style={[styles.title, { color: colors.text }]}>
                Pokemons
            </Text>
            <SearchBar />
        </>
    );

    useEffect(() => {

        if(!loading) fadeIn();

    }, [loading]);

    if(loading) return (
        <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
            <ActivityIndicator color={colors.primary} size={"large"} />
        </View>
    );

    return (
        <Animated.View style={[styles.container, { backgroundColor: colors.background }, animatedStyles]}>
            <StatusBar barStyle={theme === "light" ? "dark-content" : "light-content"} backgroundColor={"transparent"} translucent />
            <Image
                style={styles.image}
                source={{
                    uri
                }}
            />
            <PokemonList
                pokemons={pokemons}
                more={more}
                nextPage={() => setPage(p => p+1)}
                header={<Header />}
            />
        </Animated.View>
    );

};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flex: 1,
    },
    image: {
        width: 250,
        height: 250,
        opacity: .1,
        position: "absolute",
        top: -75,
        right: -75
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 15,
    }
});