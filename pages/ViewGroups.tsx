import React, { FC, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Button,
  StyleSheet,
} from "react-native";
import { useGetGroups } from "../hooks";
import { Group } from "../types";

const Item: FC<Group> = ({ name, category, summary }) => {
  return (
    <View style={styles.GroupItem}>
      <Text style={styles.Title}>{name}</Text>
      <Text>{category}</Text>
      <Text>{summary}</Text>
    </View>
  );
};

const ViewGroups = (props: any) => {
  const { groups, loading, error, getGroups } = useGetGroups();
  const { navigation } = props;

  useEffect(() => {
    getGroups();
  }, []);

  if (loading) {
    return (
      <View style={styles.Main}>
        <Text style={styles.Title}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.Main}>
        <Text style={styles.Title}>Error... {error}</Text>
      </View>
    );
  }

  if (groups.length === 0) {
    return (
      <View style={styles.Main}>
        <Text style={styles.Title}>No groups</Text>
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
    <ScrollView style={styles.Main}>
      <FlatList
        data={groups}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.Button}>
        <Button
          title="Create a new group?"
          onPress={() => navigation.navigate("CreateGroup")}
        />
      </View>
      <View style={styles.Button}>
        <Button
          title="sign into a new group?"
          onPress={() => navigation.navigate("SignIntoGroup")}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  Main: {
    padding: 10,
  },
  Title: {
    paddingBottom: 10,
    fontSize: 20,
  },
  GroupItem: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderColor: "#aaa",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    backgroundColor: "white",
    padding: 10,
  },
  Button: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default ViewGroups;
