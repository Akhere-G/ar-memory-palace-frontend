import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

const Subheader: any = (props: any) => {
  const { title } = props.options;
  const { canGoBack, goBack } = props.navigation;

  return (
    <View style={styles.Header}>
      {canGoBack() && <IconButton icon="arrow-left" onPress={() => goBack()} />}
      <Text style={styles.Title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Header: {
    alignItems: "center",
    paddingLeft: 10,
    fontSize: 0.75,
    height: 50,
    backgroundColor: "#6af",
    display: "flex",
    flexDirection: "row",
  },
  Title: {
    color: "#f8f8f8",
  },
});

export default Subheader;
