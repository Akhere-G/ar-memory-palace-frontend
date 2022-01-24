import React, { FC } from "react";
import { Text, View, FlatList, Button } from "react-native";
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
        <Button
          title="You have no groups... Add a group?"
          onPress={() => navigation.navigate("AddGroup")}
        />
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

export default ViewGroups;
