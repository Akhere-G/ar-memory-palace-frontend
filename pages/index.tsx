import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateGroup from "./CreateGroup";
import CreateNote from "./CreateNote";

const Stack = createNativeStackNavigator();

const Navigator: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CreateGroup" component={CreateGroup} />
        <Stack.Screen name="CreateNote" component={CreateNote} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
