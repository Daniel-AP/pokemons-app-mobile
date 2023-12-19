import React, { useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ThemeContext } from "../theme/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { NavigatorParams } from "../navigation/MainNavigator";

type ScreenProps = StackScreenProps<NavigatorParams, "search">;

export const SearchBar = () => {

    const { colors, theme } = useContext(ThemeContext);
    const navigator = useNavigation<ScreenProps["navigation"]>();

    return (
        <Pressable onPress={() => navigator.navigate("search")}>
            <View role="searchbox" style={[styles.container, { backgroundColor: colors.background, borderColor: theme === "light" ? "rgba(0, 0, 0, .1)" : "rgba(255, 255, 255, .1)" }]}>
                <Text style={{color: theme === "light" ? "#999999" : "#CCCCCC"}}>Search by name or ID...</Text>
                <Icon name="search-outline" size={20} color={colors.icon} />
            </View>
        </Pressable>
    );

};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        borderRadius: 999,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        elevation: 3,
        height: 40,
        borderWidth: 1
    }
});