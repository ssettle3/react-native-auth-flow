import React from "react";
import { AsyncStorage, View, Text, TouchableOpacity } from "react-native";
import { Button } from "../components/Button";
import Input from "../components/Input";

export default class SignUpScreen extends React.Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    error: ""
  };

  static navigationOptions = {
    title: "Sign Up"
  };

  updateValue = (value, key) => {
    this.setState({ [key]: value }, () => this.doPasswordsMatch());
  };

  doPasswordsMatch = () => {
    const match = this.state.password === this.state.confirmPassword;

    if (!match) {
      this.setState({
        error: "Passwords do not match"
      });
    } else {
      this.setState({
        error: ""
      });
    }

    return match;
  };

  isDisabled = () => {
    return (
      !this.state.email ||
      !this.state.password ||
      !this.state.confirmPassword ||
      (this.state.password &&
        this.state.confirmPassword &&
        this.state.password !== this.state.confirmPassword)
    );
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
        <Input
          onChangeText={text => this.updateValue(text, "email")}
          placeholder="Email Address"
        />
        <Input
          onChangeText={text => this.updateValue(text, "password")}
          placeholder="Password"
          secureTextEntry={true}
        />
        <Input
          onChangeText={text => this.updateValue(text, "confirmPassword")}
          placeholder="Confirm Password"
          secureTextEntry={true}
        />
        <View style={{ marginTop: 10, alignItems: "center" }}>
          <Text style={{ color: "red" }}>{this.state.error}</Text>
        </View>
        <View style={{ marginTop: 100 }}>
          <Button
            text="Sign Up"
            onTap={this._signUpAsync}
            disabled={this.isDisabled()}
          />
        </View>
        <TouchableOpacity
          style={{
            alignItems: "center",
            alignContent: "center"
          }}
          onPress={this.goToSignIn}
        >
          <Text style={{ color: "#1f96f3" }}>
            Already have an account? Sign In
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  goToSignIn = () => {
    this.props.navigation.navigate("SignIn");
  };

  _signUpAsync = async e => {
    // Make your request your DB here for ensuring user exists
    await AsyncStorage.setItem("userToken", "abc");
    this.props.navigation.navigate("Main");
  };
}
