import { createContext } from "react";

interface Context {
    colors: {
        primary:         string;
        secondary:       string;
        text:            string;
        background:      string;
        icon:            string;
    },
    theme: "light" | "dark" | null | undefined;
    setTheme: React.Dispatch<React.SetStateAction<"light" | "dark" | null | undefined>>
}

export const ThemeContext = createContext<Context>({} as Context);