import React from "react";
import { AsyncStorage, View, Text, TouchableOpacity } from "react-native";
import { Button } from "../components/Button";
import Input from "../components/Input";

export default class SignInScreen extends React.Component {
  state = {
    email: "",
    password: ""
  };

  static navigationOptions = {
    title: "Sign In"
  };

  updateValue = (value, key) => {
    this.setState({ [key]: value });
  };

  isDisabled = () => !this.state.email || !this.state.password;

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
        <Input
          onChangeText={text => this.updateValue(text, "email")}
          placeholder="Email Address"
        />
        <Input
          onChangeText={text => this.updateValue(text, "password")}
          placeholder="Password"
          secureTextEntry={true}
        />
        <View style={{ marginTop: 100 }}>
          <Button
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

  _signInAsync = async e => {
    // Make your request your DB here for ensuring user exists
    await AsyncStorage.setItem("userToken", "abc");
    this.props.navigation.navigate("Main");
  };
}
