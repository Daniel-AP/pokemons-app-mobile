import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ThemeContext } from "../theme/ThemeContext";
import { DetailsDataContext } from "../context/DetailsDataContext";
import { Table } from "./Table";
import { useGesture } from "../hooks/useGesture";
import { GestureDetector } from "react-native-gesture-handler";

export const AboutTab = () => {

    const { colors } = useContext(ThemeContext);
    const { pokemon, species } = useContext(DetailsDataContext);

    const { gesture } = useGesture();

    const GenderRates = () => (
        <View style={styles.genderRateContainer}>
            <View style={{flexDirection: "row", gap: 5, alignItems: "center"}}>
                <Icon name="man" size={20} color={"lightblue"} />
                <Text style={{color: colors.text, fontWeight: "bold"}} maxFontSizeMultiplier={1.5}>{ species.gender_rate >= 0 ? `${100-(100*(species.gender_rate/8))}%` : "-" }</Text>
            </View>
            <View style={{flexDirection: "row", gap: 5, alignItems: "center"}}>
                <Icon name="woman" size={20} color={"lightpink"} />
                <Text style={{color: colors.text, fontWeight: "bold"}} maxFontSizeMultiplier={1.5}>{ species.gender_rate >= 0 ? `${100*(species.gender_rate/8)}%` : "-" }</Text>
            </View>
        </View>
    );

    const characteristicsHeaders = [
        "Species",
        "Height",
        "Weight",
        "Abilities"
    ];

    const characteristicsData = [
        pokemon.species.name,
        `${pokemon.height/10}m`,
        `${pokemon.weight/10}kg`,
        pokemon.abilities.map(v => v.ability.name).join(", ")
    ];

    const breedingHeaders = [
        "Gender rate",
        "Egg groups",
        "Growth rate",
        "Habitat",
        "Shape"
    ];

    const breedingData = [
        <GenderRates />,
        species.egg_groups.map(group => group.name).join(", "),
        species.growth_rate.name,
        species.habitat.name,
        species.shape.name
    ];

    return (
        <GestureDetector gesture={gesture}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}
            >
                <Text maxFontSizeMultiplier={1.3} style={[styles.title, { color: colors.text }]}>
                    Characteristics
                </Text>
                <Table
                    headers={characteristicsHeaders}
                    data={characteristicsData}
                />
                <Text maxFontSizeMultiplier={1.3} style={[styles.title, { color: colors.text }]}>
                    Breeding
                </Text>
                <Table
                    headers={breedingHeaders}
                    data={breedingData}
                />
            </ScrollView>
        </GestureDetector>
    );

};

const styles = StyleSheet.create({
    container: {
        gap: 25,
        paddingVertical: 30,
        paddingRight: 20
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    genderRateContainer: {
        flexDirection: "row",
        gap: 15
    }
});