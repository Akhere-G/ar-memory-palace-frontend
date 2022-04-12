import { View, Text, Button } from "react-native";
import React, { FC } from "react";
import styles from "../styles";

interface NoGroups {
  navigate: (name: string) => void;
  onNotePage?: boolean;
}

const NoGroups: FC<NoGroups> = ({ navigate, onNotePage }) => {
  return (
    <View style={styles.Main}>
      <Text style={styles.Title}>
        No groups.{" "}
        {onNotePage ? "You need to have a group to create a note" : ""}
      </Text>
      <View style={styles.Button}>
        <Button
          title="You have no groups... Create a new group?"
          onPress={() => navigate("CreateGroup")}
        />
      </View>
      <View style={styles.Button}>
        <Button
          title="You have no groups... sign into a new group?"
          onPress={() => navigate("SignIntoGroup")}
        />
      </View>
    </View>
  );
};

export default NoGroups;
