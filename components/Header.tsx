import React, { FC } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";

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
    padding: 10,
    paddingTop: 30,
    fontSize: 12,
    backgroundColor: "#cdf",
  },
});

export default Header;
