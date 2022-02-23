import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Header } from "../components/";
import GroupStack from "./GroupStack";
import NoteStack from "./NoteStack";
import ARpage from "./AR";
import { IconButton } from "react-native-paper";

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
          options={{
            title: "Groups",
            tabBarIcon: ({ focused, color, size }) => (
              <IconButton
                color={focused ? "#48f" : color}
                icon="group"
                size={size}
              ></IconButton>
            ),
          }}
        />
        <Tab.Screen
          name="Notes"
          component={NoteStack}
          options={{
            title: "Notes",
            tabBarIcon: ({ focused, color, size }) => (
              <IconButton
                color={focused ? "#48f" : color}
                icon="note"
                size={size}
              ></IconButton>
            ),
          }}
        />
        <Tab.Screen
          name="AR view"
          component={ARpage}
          options={{
            title: "AR view",
            tabBarIcon: ({ focused, color, size }) => (
              <IconButton
                color={focused ? "#48f" : color}
                icon="camera"
                size={size}
              ></IconButton>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
