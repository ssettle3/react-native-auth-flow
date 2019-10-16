import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const buttonStyle = StyleSheet.create({
  default: {
    backgroundColor: "#1f96f3",
    margin: 20,
    padding: 15,
    alignContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  disabled: {
    backgroundColor: "lightgray",
    margin: 20,
    padding: 15,
    alignContent: "center",
    alignItems: "center",
    borderRadius: 5
  }
});

export const CustomButton = props => (
  <TouchableOpacity
    disabled={props.disabled || false}
    onPress={props.onTap}
    style={props.disabled ? buttonStyle.disabled : buttonStyle.default}
  >
    <Text onPress={props.onTap} style={{ color: "#fff", fontSize: 20 }}>
      {props.text}
    </Text>
  </TouchableOpacity>
);
