import React, { useState } from "react";
import { AsyncStorage, View, TextInput, Text } from "react-native";
import { Button } from "../components/Button";

export default class SignInScreen extends React.Component {
  state = {
    email: "",
    password: ""
  };

  static navigationOptions = {
    title: "Sign In"
  };

  render() {
    return (
      <View
        style={{
          flexDirection: "column",
          height: "100%",
          paddingTop: 50
        }}
      >
        <View style={{ alignItems: "center", marginBottom: 50 }}>
          <Text style={{ fontSize: 40 }}>App Name</Text>
        </View>
        <TextInput
          style={{
            fontSize: 20,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: "lightgray",
            padding: 10,
            marginTop: 5,
            height: 60
          }}
          placeholder="Email Address"
        />
        <TextInput
          style={{
            fontSize: 20,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: "lightgray",
            padding: 10,
            marginTop: 5,
            height: 60
          }}
          placeholder="Password"
          secureTextEntry={true}
        />
        <View style={{ marginTop: 100 }}>
          <Button text="Sign In" onTap={this._signInAsync} />
        </View>
      </View>
    );
  }

  _signInAsync = async e => {
    // Make your request your DB here for ensuring user exists
    await AsyncStorage.setItem("userToken", "abc");
    this.props.navigation.navigate("Main");
  };
}
