import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Subheader } from "../components";
import ViewNotes from "./ViewNotes";
import CreateNote from "./CreateNote";
import UpdateNote from "./UpdateNote";
import DeleteNote from "./DeleteNote";

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
      <Stack.Screen
        name="UpdateNote"
        component={UpdateNote}
        options={{ title: "Update Note" }}
      />
      <Stack.Screen
        name="DeleteNote"
        component={DeleteNote}
        options={{ title: "Delete Note" }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
