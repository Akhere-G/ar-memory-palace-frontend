import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Subheader } from "../components";
import ViewNotes from "./ViewNotes";
import CreateNote from "./CreateNote";

const Stack = createNativeStackNavigator();

const Navigator: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <Subheader {...props} />,
      }}
    >
      <Stack.Screen
        name="ViewNotes"
        component={ViewNotes}
        options={{ title: "View Notes" }}
      />

      <Stack.Screen
        name="CreateNote"
        component={CreateNote}
        options={{ title: "Create Note" }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
