import React from "react";
import axios from "axios";
import { AsyncStorage, View, Text, TouchableOpacity } from "react-native";

import { CustomButton } from "../components/Button";
import Input from "../components/Input";

export default class SignInScreen extends React.Component {
  state = {
    username: "",
    password: ""
  };

  static navigationOptions = {
    title: "Sign In"
  };

  updateValue = (value, key) => {
    this.setState({ [key]: value });
  };

  isDisabled = () => !this.state.username || !this.state.password;

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
          <Text style={{ fontSize: 40 }}>Op</Text>
        </View>

        <Input
          onChangeText={text => this.updateValue(text, "username")}
          placeholder="Username"
        />

        <Input
          onChangeText={text => this.updateValue(text, "password")}
          placeholder="Password"
          secureTextEntry={true}
        />

        <View style={{ marginTop: 10, alignItems: "center" }}>
          <Text style={{ color: "red" }}>{this.state.error}</Text>
        </View>

        <View style={{ marginTop: 100 }}>
          <CustomButton
            text="Sign In"
            onTap={this._signInAsync}
            disabled={this.isDisabled()}
          />
          <TouchableOpacity
            style={{
              alignItems: "center",
              alignContent: "center"
            }}
            onPress={this.signUp}
          >
            <Text style={{ color: "#1f96f3" }}>
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  signUp = () => {
    this.props.navigation.navigate("SignUp");
  };

  _signInAsync = e => {
    axios
      .post("http://localhost:3000/auth/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        AsyncStorage.setItem("currentUser", JSON.stringify(response.data));
        AsyncStorage.setItem("userToken", response.data.token);
        this.props.navigation.navigate("Main");
      })
      .catch(() => {
        this.setState({ error: "Invalid Username/Password" });
      });
  };
}
