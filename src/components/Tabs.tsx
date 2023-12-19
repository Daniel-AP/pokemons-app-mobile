import React, { useContext } from "react";
import { useWindowDimensions } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import { AboutTab } from "./AboutTab";
import { StatsTab } from "./StatsTab";
import { EvolutionTab } from "./EvolutionTab";
import { TabBar } from "./TabBar";
import { DetailsAnimationContext } from "../context/DetailsAnimationContext";

export const tabRoutes = [
    { key: "about", title: "About" },
    { key: "stats", title: "Stats" },
    { key: "evolution", title: "Evolution" },
];

const renderScene = SceneMap({
    about:     AboutTab,
    stats:     StatsTab,
    evolution: EvolutionTab
});

export const Tabs = () => {

    const { tabBarIndex, setTabBarIndex } = useContext(DetailsAnimationContext);
    const { width } = useWindowDimensions();

    return (
        <TabView
            renderTabBar={props => <TabBar {...props} />}
            navigationState={{ index: tabBarIndex, routes: tabRoutes }}
            renderScene={renderScene}
            sceneContainerStyle={{
                paddingLeft: 20,
            }}
            initialLayout={{ width }}
            onIndexChange={setTabBarIndex}
        />
    );

};