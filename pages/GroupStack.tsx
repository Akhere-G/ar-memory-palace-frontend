import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Subheader } from "../components/";
import ViewGroups from "./ViewGroups";
import AddGroup from "./AddGroup";

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
        name="AddGroup"
        component={AddGroup}
        options={{ title: "Add Group" }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
