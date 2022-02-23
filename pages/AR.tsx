import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { SingleNote } from "../components";

const ARpage = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const notes = useSelector((state: RootState) => state.note.notes);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    requestPermissions();
  }, []);

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.Container}>
      <Camera style={styles.Camera} type={Camera.Constants.Type.back}>
        <View style={styles.NoteContainer}>
          <SingleNote {...notes[0]} />
        </View>
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
  Text: {},
});

export default ARpage;
