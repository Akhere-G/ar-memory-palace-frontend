import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, Button } from "react-native";
import { Camera } from "expo-camera";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { NoGroups, NoteList } from "../components";
import { useGetLocation, useGetNotes } from "../hooks";
import { getCloseNotes } from "../utils";
import { setNotes } from "../slices/NoteSlice";
import { Note } from "../types";
import styles from "../styles";

const MIN_DISTANCE = 10;

const ARpage = (props: any) => {
  const { navigation } = props;
  const [hasPermission, setHasPermission] = useState(false);
  const notes = useSelector((state: RootState) => state.note.notes);
  const groups = useSelector((state: RootState) => state.group.groups);
  const dispatch = useDispatch();
  const {
    getLocation,
    location,
    error: locationError,
    loading: locationLoading,
  } = useGetLocation();
  const { error: notesError, getNotes, loading: notesLoading } = useGetNotes();

  useFocusEffect(
    useCallback(() => {
      const fetchNotes = async () => {
        const response = await getNotes();
        if (response) {
          const { notes } = response;
          dispatch(setNotes(notes));
        }
      };
      fetchNotes();
    }, [groups])
  );

  useEffect(() => {
    setInterval(async () => {
      if (!locationLoading && !notesLoading) {
        await getLocation();
      }
    }, 1000);

    const requestPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    requestPermissions();
  }, []);

  (window as any).notes = notes;
  (window as any).groups = groups;

  if (hasPermission === false) {
    return <Text style={styles.Title}>No access to camera</Text>;
  }

  if (locationError || notesError) {
    return <Text style={styles.Title}>Error. Could not get notes</Text>;
  }

  if (notesLoading) {
    return <Text style={styles.Title}>Loading...</Text>;
  }

  if (!groups.length) {
    return (
      <View style={styles.Main}>
        <NoGroups navigate={navigation.navigate} />
      </View>
    );
  }

  if (!notes.length) {
    return (
      <View style={styles.Main}>
        <Text style={styles.Title}>No notes available</Text>
        <Button
          title="You have no notes... Create a new note?"
          onPress={() => navigation.navigate("Notes", { screen: "CreateNote" })}
        />
      </View>
    );
  }

  const lat = Number(location?.latitude) || 0;
  const lon = Number(location?.longitude) || 0;

  const filteredNotes = getCloseNotes(notes, lat, lon, MIN_DISTANCE);

  if (!filteredNotes) {
    return (
      <View>
        <Text style={styles.Text}>
          You're not close enough to a note to view it! Get within 10m of a note
          to see it.
        </Text>
      </View>
    );
  }

  const editNote = (note: Note) => {
    const groupToken =
      groups.find((group) => group.id === note.groupId)?.token || "";

    navigation.navigate("UpdateNote", {
      note,
      groupToken,
    });
  };
  const deleteNote = (note: Note) => {
    navigation.navigate("DeleteNote", {
      note,
      groupToken: groups.find((group) => group.id === note.groupId)?.token,
    });
  };

  return (
    <View style={styles.CameraContainer}>
      <Camera style={styles.Camera} type={Camera.Constants.Type.back}>
        {filteredNotes && (
          <View style={styles.NoteContainer}>
            <NoteList
              notes={filteredNotes}
              groups={groups}
              editNote={editNote}
              deleteNote={deleteNote}
            />
          </View>
        )}
      </Camera>
    </View>
  );
};

export default ARpage;
