import React from "react";
import { AsyncStorage, Button, View } from "react-native";

export default function SettingsScreen(props) {
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate("Auth");
  };

  return (
    <View>
      <Button title="Sign Out" onPress={this._signOutAsync} />
    </View>
  );
}

SettingsScreen.navigationOptions = {
  title: "Settings"
};
