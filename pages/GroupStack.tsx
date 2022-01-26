import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Subheader } from "../components/";
import ViewGroups from "./ViewGroups";
import CreateGroup from "./CreateGroup";
import SignIntoGroup from "./SignIntoGroup";

const Stack = createNativeStackNavigator();

const Navigator: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ViewGroups"
        component={ViewGroups}
        options={{ title: "View Groups" }}
      />
      <Stack.Screen
        name="SignIntoGroup"
        component={SignIntoGroup}
        options={{ title: "Sign Into Group" }}
      />

      <Stack.Screen
        name="CreateGroup"
        component={CreateGroup}
        options={{ title: "Create Group" }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
