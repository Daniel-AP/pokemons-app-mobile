/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useContext, useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import { useGesture } from "../hooks/useGesture";
import { Table } from "./Table";
import { DetailsDataContext } from "../context/DetailsDataContext";
import { StatBar } from "./StatBar";

interface Stat {
    value:    number;
}

export const StatsTab = () => {

    const { gesture } = useGesture();
    const { pokemon } = useContext(DetailsDataContext);

    const statsHeaders = useMemo(() => [
        "HP",
        "Attack",
        "Defense",
        "Sp. Attack",
        "Sp. Defense",
        "Speed",
        "Total"
    ], []);

    const statsData: Stat[] = useMemo(() => 
        pokemon.stats.map(stat => ({
            value: stat.base_stat!,
        }))
    ,[]);

    const statBars = useMemo(() => [...statsData.map(stat => <StatBar {...stat} />), pokemon.stats.map(stat => stat.base_stat).reduce((a, b) => a+b, 0)], []);

    return (
        <GestureDetector gesture={gesture}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <Table
                    headers={statsHeaders}
                    data={statBars}
                />
            </ScrollView>
        </GestureDetector>
    );

};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 30,
        paddingRight: 20
    }
});