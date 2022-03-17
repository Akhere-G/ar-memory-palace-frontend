import { Text, View } from "react-native";
import { useGetLocation } from "../hooks";
import React from "react";
import { render } from "@testing-library/react-native";

describe("testing useGetLocation", () => {
  const TestComponent = () => {
    const { error, hasPermissions, loading, location } = useGetLocation();
    return (
      <View>
        <Text>error: {error}</Text>
        <Text>hasPermission: {hasPermissions ? "true" : " false"}</Text>
        <Text>loading: {loading ? "true" : " false"}</Text>
        <Text>latitude: {location?.latitude}</Text>
        <Text>longitude: {location?.longitude}</Text>
      </View>
    );
  };

  beforeEach(() => {});

  afterEach(() => {});

  it("returns correct values when called", () => {
    const { getByText } = render(<TestComponent />);
    expect(getByText("error:")).toBeDefined();
    expect(getByText("loading: false")).toBeDefined();
    expect(getByText("hasPermission: false")).toBeDefined();
    expect(getByText("latitude:")).toBeDefined();
    expect(getByText("longitude:")).toBeDefined();
  });
});
