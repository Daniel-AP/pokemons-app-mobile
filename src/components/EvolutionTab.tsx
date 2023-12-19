import React, { useContext, useEffect, useState } from "react";
import { Text, ScrollView, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Image from "react-native-fast-image";
import { DetailsDataContext } from "../context/DetailsDataContext";
import { ThemeContext } from "../theme/ThemeContext";
import { PokemonDetailsResponse } from "../types/pokemons";
import { GestureDetector } from "react-native-gesture-handler";
import { useGesture } from "../hooks/useGesture";

export const EvolutionTab = () => {

    const { colors } = useContext(ThemeContext);
    const { evolution } = useContext(DetailsDataContext);

    const [imagesUri, setImagesUri] = useState<(string | undefined)[]>([]);
    const { gesture } = useGesture();

    useEffect(() => {

        const fetchUris = async() => {

            try {

                const uris = await Promise.all(evolution.map(c => (
                    async() => {

                        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${c.species.name}`);
                        const data = await resp.json() as PokemonDetailsResponse;
                        const uri = data.sprites.other?.["official-artwork"].front_default;

                        return uri;

                    }
                )()));

                setImagesUri(uris);
                
            } catch (error) {

                return;
                
            }

        };

        fetchUris();

    }, []);

    return (
        <GestureDetector gesture={gesture}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}
            >
                {
                    evolution.map((c, i) => (
                        <React.Fragment key={c.species.name}>
                            <View style={styles.subcontainer}>
                                <Image
                                    style={styles.img}
                                    source={{
                                        uri: imagesUri.at(i)
                                    }}
                                />
                                <Text style={[styles.label, { color: colors.text }]}>{ c.species.name }</Text>
                            </View>
                            {
                                i !== evolution.length-1
                                    ? (
                                        <Icon name="arrow-down-outline" size={30} color={colors.icon} />
                                    )
                                    : null
                            }
            
                        </React.Fragment>
                    ))
                }
            </ScrollView>
        </GestureDetector>
    );

};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        gap: 20,
        paddingVertical: 30
    },
    subcontainer: {
        gap: 10
    },
    img: {
        height: 125,
        width: 125
    },
    label: {
        textTransform: "capitalize",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center"
    },
});