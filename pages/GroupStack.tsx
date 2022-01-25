import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Subheader } from "../components/";
import ViewGroups from "./ViewGroups";
import CreateGroup from "./CreateGroup";

const Stack = createNativeStackNavigator();

const Navigator: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <Subheader {...props} />,
      }}
    >
      <Stack.Screen
        name="ViewGroups"
        component={ViewGroups}
        options={{ title: "View Groups" }}
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
