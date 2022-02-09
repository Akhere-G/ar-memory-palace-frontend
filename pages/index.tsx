import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Header } from "../components/";
import GroupStack from "./GroupStack";
import NoteStack from "./NoteStack";
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
          name="Notes"
          component={NoteStack}
          options={{ title: "Notes" }}
        />
        <Tab.Screen
          name="Groups"
          component={GroupStack}
          options={{ title: "Groups" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
