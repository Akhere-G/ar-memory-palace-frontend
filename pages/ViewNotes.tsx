import React, { FC, useEffect } from "react";
import { Text, View, FlatList, Button, StyleSheet } from "react-native";
import { useGetNotes } from "../hooks";
import { Note } from "../types";

const Item: FC<Note> = ({ title, text }) => {
  return (
    <View style={styles.NoteItem}>
      <Text style={styles.Title}>{title}</Text>
      <Text>{text}</Text>
    </View>
  );
};

const ViewNotes = (props: any) => {
  const { notes, loading, error, getNotes } = useGetNotes();
  const { navigation } = props;

  useEffect(() => {
    getNotes();
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

  if (notes.length === 0) {
    return (
      <View style={styles.Main}>
        <Text style={styles.Title}>No notes</Text>
        <View style={styles.Button}>
          <Button
            title="You have no notes... Create a new note?"
            onPress={() => navigation.navigate("CreateNote")}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.Main}>
      <FlatList
        data={notes}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.Button}>
        <Button
          title="Create a new note?"
          onPress={() => navigation.navigate("CreateNote")}
        />
      </View>
    </View>
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
  NoteItem: {
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

export default ViewNotes;
