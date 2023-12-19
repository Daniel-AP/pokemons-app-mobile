import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { MainNavigator } from "./src/navigation/MainNavigator";
import { ThemeProvider } from "./src/theme/ThemeProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useColorScheme } from "react-native";

export const App = () => {

    const appTheme = useColorScheme();

    const navigationtheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: appTheme === "light" ? "#FFFFFF" : "#121212"
        }
    };

    return (
        <NavigationContainer theme={navigationtheme}>
            <GestureHandlerRootView style={{flex: 1}}>
                <ThemeProvider>
                    <MainNavigator />
                </ThemeProvider>
            </GestureHandlerRootView>
        </NavigationContainer>
    );

};