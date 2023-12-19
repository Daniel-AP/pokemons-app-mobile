import React, { useContext, isValidElement, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ThemeContext } from "../theme/ThemeContext";

interface Props {
    headers: string[];
    data:    (string | number | undefined | React.ReactNode)[];
}

export const Table = ({ headers, data }: Props) => {

    const { colors } = useContext(ThemeContext);

    const Header = ({ content }: { content: string }) => (
        <Text maxFontSizeMultiplier={1.5} style={[styles.text, styles.header, { color: colors.text }]}>
            { content }
        </Text>
    );

    const Record = useMemo(() => ({ content }: { content: string | number | undefined | React.ReactNode }) => {

        return isValidElement(content) ? content : (
            <Text numberOfLines={1} ellipsizeMode="tail" maxFontSizeMultiplier={1.5} style={[styles.text, { color: colors.text }]}>
                { content }
            </Text>
        );
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.subcontainer}>
                {
                    headers.map(header => (
                        <Header key={header} content={header} />
                    ))
                }
            </View>
            <View style={[styles.subcontainer, { flex: 1 }]}>
                {
                    data.map((record, i) => (
                        <Record key={i.toString()} content={record} />
                    ))
                }
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 65,
        overflow: "hidden"
    },
    subcontainer: {
        gap: 18,
    },
    text: {
        fontWeight: "600",
        fontSize: 16
    },
    header: {
        opacity: .4
    }
});