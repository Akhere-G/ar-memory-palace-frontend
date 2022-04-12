import { StyleSheet } from "react-native";

export default StyleSheet.create({
  Header: {
    padding: 10,
    paddingTop: 20,
    fontSize: 12,
    backgroundColor: "#48f",
  },
  Subheader: {
    alignItems: "center",
    paddingLeft: 10,
    fontSize: 0.75,
    height: 40,
    backgroundColor: "#6af",
    display: "flex",
    flexDirection: "row",
  },
  HeaderTitle: {
    color: "#f8f8f8",
  },
  ScrollList: {
    paddingBottom: 10,
    maxHeight: "85%",
  },
  Main: {
    padding: 10,
    paddingBottom: 40,
  },
  Title: {
    paddingBottom: 10,
    fontSize: 20,
  },
  GroupItem: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderColor: "#aaa",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    backgroundColor: "white",
    padding: 10,
  },
  Button: {
    padding: 10,
    paddingBottom: 0,
  },
  Error: {
    backgroundColor: "#fdd",
    color: "#600",
    padding: 3,
  },
  Success: {
    backgroundColor: "#dfd",
    color: "#060",
    padding: 3,
  },
  Form: {
    padding: 10,
  },
  FormGroup: {
    paddingBottom: 10,
  },
  Input: {
    borderColor: "#aaa",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: "solid",
    padding: 2.5,
  },
});
