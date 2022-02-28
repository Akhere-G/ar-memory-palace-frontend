import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Camera } from "expo-camera";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { NoteList } from "../components";
import { useGetLocation, useGetNotes } from "../hooks";
import { getCloseNotes } from "../utils";
import { setNotes } from "../slices/NoteSlice";

const MIN_DISTANCE = 10;

const ARpage = (props: any) => {
  const { navigation } = props;
  const [hasPermission, setHasPermission] = useState(false);
  const notes = useSelector((state: RootState) => state.note.notes);
  const {
    getLocation,
    location,
    error: locationError,
    loading: locationLoading,
  } = useGetLocation();
  const { error: notesError, getNotes, loading: notesLoading } = useGetNotes();

  useEffect(() => {
    const fetchNotes = async () => {
      if (!notes) {
        const result = await getNotes();
        if (result) {
          setNotes(result.notes);
        }
      }
    };

    fetchNotes();
  }, []);

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

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (locationError || notesError) {
    return <Text>Error. Could not get notes</Text>;
  }

  if (notesLoading) {
    return <Text>Loading...</Text>;
  }

  if (!notes) {
    return (
      <View>
        <Text style={styles.Text}>No notes available</Text>
        <Button
          title="You have no notes... Create a new note?"
          onPress={() => navigation.navigate("CreateNote")}
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
  return (
    <View style={styles.Container}>
      <Camera style={styles.Camera} type={Camera.Constants.Type.back}>
        {filteredNotes && (
          <View style={styles.NoteContainer}>
            <NoteList notes={filteredNotes} />
          </View>
        )}
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  Camera: {
    flex: 1,
  },
  NoteContainer: {
    paddingTop: "50%",
    paddingHorizontal: 10,
  },
  Text: {
    backgroundColor: "white",
    padding: 5,
  },
});

export default ARpage;
