import React, { FC } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import {} from "@react-navigation/bottom-tabs";

const Header: any = (props: any) => {
  // console.log(props);
  const { title } = props.options;
  return (
    <SafeAreaView>
      <View style={styles.Header}>
        <Text>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Header: {
    justifyContent: "center",
    padding: 10,
    paddingTop: 30,
    fontSize: 12,
    backgroundColor: "#cdf",
  },
});

export default Header;
