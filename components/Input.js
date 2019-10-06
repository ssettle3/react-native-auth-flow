import React from "react";
import { TextInput } from "react-native";

export default function Input(props) {
  return (
    <TextInput
      {...props}
      autoCapitalize="none"
      style={{
        fontSize: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "lightgray",
        padding: 10,
        marginTop: 5,
        height: 60
      }}
    />
  );
}
