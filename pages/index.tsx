import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ViewGroups from "./ViewGroups";
import ViewNotes from "./ViewNotes";

const Tab = createBottomTabNavigator();

const Navigator: FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="ViewGroups"
          component={ViewGroups}
          options={{ title: "View Groups" }}
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
