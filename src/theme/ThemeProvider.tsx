import { useState, useEffect, PropsWithChildren } from "react";
import { ThemeContext } from "./ThemeContext";
import { useColorScheme } from "react-native";

export const ThemeProvider = ({ children }: PropsWithChildren) => {

    const colorScheme = useColorScheme();
    const [theme, setTheme] = useState(colorScheme);

    const value = {
        colors: {
            primary: theme === "light" ? "#7E6AD2" : "#483D8B",
            secondary: theme === "light" ? "#707070" : "#202020",
            background: theme === "light" ? "#FFFFFF" : "#121212",
            text: theme === "light" ? "#000000" : "#E0E0E0",
            icon: theme === "light" ? "#000000" : "#E0E0E0"
        },
        theme,
        setTheme
    };

    useEffect(() => {

        setTheme(colorScheme);

    }, [colorScheme]);

    return (
        <ThemeContext.Provider value={value}>
            { children }
        </ThemeContext.Provider>
    );

};