import React, { FC, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Button,
  StyleSheet,
} from "react-native";
import { useFetchGroups } from "../hooks";
import { Group } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setGroups } from "../slices/GroupSlice";
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
  const { loading, error, fetchGroups } = useFetchGroups();
  const { navigation } = props;

  const dispatch = useDispatch();
  const { groups } = useSelector((state: RootState) => state.group);

  useEffect(() => {
    const getGroupsFromStorage = async () => {
      const response = await fetchGroups();
      if (response) {
        const { groups } = response;
        dispatch(setGroups(groups));
      }
    };
    getGroupsFromStorage();
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
      <View style={styles.ScrollList}>
        <FlatList
          data={groups}
          renderItem={({ item }) => <Item {...item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
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
  ScrollList: {
    paddingBottom: 10,
    maxHeight: "85%",
  },
  Main: {
    padding: 10,
    paddingBottom: 40,
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
    padding: 10,
    paddingBottom: 0,
  },
});

export default ViewGroups;
