import React, { useContext } from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { HomeScreen } from "../screens/HomeScreen";
import { DetailsScreen } from "../screens/DetailsScreen";
import { Pokemon } from "../types/pokemons";
import { ThemeContext } from "../theme/ThemeContext";
import { Species } from "../types/species";
import { Evolution } from "../types/evolutions";
import { SearchScreen } from "../screens/SearchScreen";

interface DetailsScreenProps {
    pokemon:         Pokemon;
    species:         Species;
    evolution:       Evolution[];
    backgroundColor: string;
}

export type NavigatorParams = {
    home:    undefined;
    details: DetailsScreenProps;
    search:  undefined;
}

const Stack = createStackNavigator<NavigatorParams>();

export const MainNavigator = () => {

    const { colors } = useContext(ThemeContext);

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            cardStyle: {
                backgroundColor: colors.background
            },
        }}>
            <Stack.Group screenOptions={{
                ...TransitionPresets.SlideFromRightIOS
            }}>
                <Stack.Screen name="home" component={HomeScreen} />
                <Stack.Screen name="details" component={DetailsScreen} />
            </Stack.Group>
            <Stack.Group screenOptions={{
                presentation: "modal",
                gestureEnabled: false
            }}>
                <Stack.Screen name="search" component={SearchScreen} />
            </Stack.Group>
        </Stack.Navigator>
    );

};