import { createContext } from "react";
import { SharedValue } from "react-native-reanimated";

interface Context {
    translationY:                SharedValue<number>;
    expanded:                    boolean;
    tabBarIndex:                 number;
    setTabBarIndex:              React.Dispatch<React.SetStateAction<number>>;
    setExpanded:                 React.Dispatch<React.SetStateAction<boolean>>;
}

export const DetailsAnimationContext = createContext<Context>({} as Context);