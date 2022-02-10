import React, { FC } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";

const Header: any = (props: any) => {
  const { title } = props.options;
  return (
    <SafeAreaView>
      <View style={styles.Header}>
        <Text style={styles.Title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Header: {
    padding: 10,
    paddingTop: 40,
    fontSize: 12,
    backgroundColor: "#48f",
  },
  Title: {
    color: "#f8f8f8",
  },
});

export default Header;
