import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { SingleNote } from "../components";
import { useGetLocation } from "../hooks";
import { areTheseCoordsClose } from "../utils";
const MIN_DISTANCE = 10;

const ARpage = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const notes = useSelector((state: RootState) => state.note.notes);
  const { getLocation, location, loading } = useGetLocation();

  useEffect(() => {
    setInterval(async () => {
      if (!loading) {
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
