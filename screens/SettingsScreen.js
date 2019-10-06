import React from "react";
import { AsyncStorage, View } from "react-native";
import { Button } from "../components/Button";

export default function SettingsScreen(props) {
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate("SignIn");
  };

  return (
    <View>
      <Button text="Sign Out" onTap={this._signOutAsync} />
    </View>
  );
}

SettingsScreen.navigationOptions = {
  title: "Settings"
};
