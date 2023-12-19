import React, { useContext, useMemo, useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import debounce from "lodash.debounce";
import { ThemeContext } from "../theme/ThemeContext";
import { PokemonList } from "../components/PokemonList";
import { usePokemons } from "../hooks/usePokemons";
import { PokemonReference } from "../types/pokemons";

export const SearchScreen = () => {

    const { colors, theme } = useContext(ThemeContext);

    const [results, setResults] = useState<PokemonReference[]>([]);
    const { pokemons } = usePokemons(1, 9999);

    const handleSearch = (q: string) => {

        if(!q) setResults([]);
        if(q.match(/[a-zA-Z]+/)) setResults(pokemons.filter(v => v.name.startsWith(q.toLocaleLowerCase())).slice(0, 20));
        if(q.match(/[0-9]+/)) {

            const r = pokemons.find(v => v.url.split("/").at(6) === q) as PokemonReference;

            if(r) return setResults([r]);

            setResults([]);
        }

    };

    const debouncedHandleSearch = debounce(handleSearch, 500);

    const Header = useMemo(() => () => (
        <View style={[styles.barContainer, { backgroundColor: colors.background, borderColor: theme === "light" ? "rgba(0, 0, 0, .1)" : "rgba(255, 255, 255, .1)" }]}>
            <TextInput
                inputMode="search"
                cursorColor={colors.primary}
                autoFocus
                style={styles.input}
                placeholder="Search by name or ID..."
                placeholderTextColor={theme === "light" ? "#999999" : "#CCCCCC"}
                onChangeText={debouncedHandleSearch}
            />
            <Icon name="search-outline" size={20} color={colors.icon} />
        </View>
    ), [pokemons]);

    return (
        <View style={{flex: 1}}>
            <PokemonList
                pokemons={results}
                more={false}
                nextPage={() => results}
                header={<Header />}
            />
        </View>
    );

};

const styles = StyleSheet.create({
    barContainer: {
        marginBottom: 20,
        borderRadius: 999,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        elevation: 3,
        height: 40,
        borderWidth: 1,
    },
    input: {
        flex: 1,
        padding: 0,
    }
});