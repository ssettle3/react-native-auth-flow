import React from "react";
import { TouchableOpacity, Text } from "react-native";

export const Button = props => (
  <TouchableOpacity
    onPress={props.onTap}
    style={{
      backgroundColor: "#1f96f3",
      margin: 20,
      padding: 15,
      alignContent: "center",
      alignItems: "center",
      borderRadius: 5
    }}
  >
    <Text onPress={props.onTap} style={{ color: "#fff", fontSize: 20 }}>
      {props.text}
    </Text>
  </TouchableOpacity>
);
