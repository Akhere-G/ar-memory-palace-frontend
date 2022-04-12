import React, { FC, useEffect } from "react";
import { Text, View, ScrollView, FlatList, Button } from "react-native";
import styles from "../styles";
import { useFetchGroups } from "../hooks";
import { Group } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setGroups } from "../slices/GroupSlice";
import { NoGroups } from "../components";

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
    return <NoGroups navigate={navigation.navigate} />;
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

export default ViewGroups;
