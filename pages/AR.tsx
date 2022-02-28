import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { SingleNote } from "../components";
import { useGetLocation, useGetNotes } from "../hooks";
import { areTheseCoordsClose } from "../utils";
import { setNotes } from "../slices/NoteSlice";

const MIN_DISTANCE = 10;

const ARpage = () => {
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

  if (locationLoading || notesLoading) {
    return <Text>Loading...</Text>;
  }

  const lat1 = Number(location?.latitude) || 0;
  const lon1 = Number(location?.longitude) || 0;

  const lon2 = notes[0].longitude;
  const lat2 = notes[0].latitude;

  return (
    <View style={styles.Container}>
      <Camera style={styles.Camera} type={Camera.Constants.Type.back}>
        {areTheseCoordsClose(lat1, lon1, lat2, lon2, MIN_DISTANCE) && (
          <View style={styles.NoteContainer}>
            <SingleNote {...notes[0]} />
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
