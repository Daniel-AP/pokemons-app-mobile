import React, { useContext, useCallback } from "react";
import { FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { PokemonReference } from "../types/pokemons";
import { PokemonListItem } from "./PokemonListItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "../theme/ThemeContext";

interface Props {
    pokemons: PokemonReference[];
    nextPage: () => void;
    more:     boolean;
    header?:  React.ComponentType<any> | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined;
}

export const PokemonList = ({ pokemons, nextPage, more, header }: Props) => {

    const { top } = useSafeAreaInsets();
    const { colors } = useContext(ThemeContext);

    const handleEndReached = useCallback(async() => {

        if(more) nextPage();

    }, [more]);

    const Footer = () => {
        return more
            ? (
                <ActivityIndicator animating={more} style={styles.loading} size={"large"} color={colors.primary} />
            ): null;
    };

    return (
        <FlatList
            removeClippedSubviews
            columnWrapperStyle={{gap: 20 }}
            contentContainerStyle={[styles.container, { paddingTop: top+20 }]}
            data={pokemons}
            numColumns={2}
            renderItem={({ item, index }) => <PokemonListItem data={{...item, index}} />}
            ListHeaderComponent={header}
            ListFooterComponent={<Footer />}
            keyExtractor={(item) => item.url}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.2}
            getItemLayout={(_, index) => ({
                length: 125,
                offset: 125*index,
                index
            })}
            extraData={more}
        />
    );

};

const styles = StyleSheet.create({
    container: {
        gap: 15,
        paddingHorizontal: 20,
    },
    loading: {
        marginVertical: 20
    }
});