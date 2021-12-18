import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ViewGroup from "./ViewGroup";
import ViewNote from "./ViewNote";

const Tab = createBottomTabNavigator();

const Navigator: FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="ViewGroup"
          component={ViewGroup}
          options={{ title: "View Group" }}
        />
        <Tab.Screen
          name="ViewNote"
          component={ViewNote}
          options={{ title: "View Note" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
