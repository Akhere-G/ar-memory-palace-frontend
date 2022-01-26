import React, { FC } from "react";
import { Text, View, FlatList, Button, StyleSheet } from "react-native";
import { useFetchGroups } from "../hooks";
import { Group } from "../types";

const Item: FC<Group> = ({ name, category, summary }) => {
  return (
    <View>
      <Text>{name}</Text>
      <Text>{category}</Text>
      <Text>{summary}</Text>
    </View>
  );
};

const ViewGroups = (props: any) => {
  const { groups, loading, error } = useFetchGroups();
  const { navigation } = props;

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error... {error}</Text>
      </View>
    );
  }

  if (groups.length === 0) {
    return (
      <View>
        <Text>No groups</Text>
        <View style={styles.Button}>
          <Button
            title="You have no groups... Create a new group?"
            onPress={() => navigation.navigate("CreateGroup")}
          />
        </View>
        <View style={styles.Button}>
          <Button
            title="You have no groups... sign into a new group?"
            onPress={() => navigation.navigate("SignIntoGroup")}
          />
        </View>
      </View>
    );
  }

  return (
    <View>
      <Text>View Groups</Text>
      <FlatList
        data={groups}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  Button: {
    paddingTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "60%",
  },
});

export default ViewGroups;
