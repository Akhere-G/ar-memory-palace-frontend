import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Header } from "../components/";
import GroupStack from "./GroupStack";
import ViewNotes from "./ViewNotes";

const Tab = createBottomTabNavigator();

const Navigator: FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          header: (props) => <Header {...props} />,
        }}
      >
        <Tab.Screen
          name="Groups"
          component={GroupStack}
          options={{ title: "Groups" }}
        />
        <Tab.Screen
          name="ViewNotes"
          component={ViewNotes}
          options={{ title: "View Notes" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
