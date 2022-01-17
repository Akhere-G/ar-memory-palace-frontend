import React, { FC } from "react";
import { Text, View, FlatList } from "react-native";
import { useViewGroups } from "../hooks";
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

const ViewGroups = () => {
  const { groups, loading, error } = useViewGroups();

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
