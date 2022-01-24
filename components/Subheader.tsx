import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Subheader: any = (props: any) => {
  const { title } = props.options;
  return (
    <View style={styles.Header}>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Header: {
    justifyContent: "center",
    paddingLeft: 10,
    fontSize: 0.75,
    height: 50,
    backgroundColor: "#bce",
  },
});

export default Subheader;
