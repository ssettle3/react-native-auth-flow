import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import WorkoutsScreen from "../screens/WorkoutsScreen";
import NewWorkoutScreen from "../screens/NewWorkoutScreen";
import ProfileScreen from "../screens/ProfileScreen";
import WorkoutScreen from "../screens/WorkoutScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: "Dashboard",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-today" : "md-today"}
    />
  )
};

HomeStack.path = "";

const WorkoutsStack = createStackNavigator(
  {
    Workouts: WorkoutsScreen,
    NewWorkout: NewWorkoutScreen,
    Workout: WorkoutScreen
  },
  config
);

WorkoutsStack.navigationOptions = {
  tabBarLabel: "My Workouts",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-fitness" : "md-fitness"}
    />
  )
};

WorkoutsStack.path = "";

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-contact" : "md-contact"}
    />
  )
};

ProfileStack.path = "";

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  WorkoutsStack,
  ProfileStack
});

tabNavigator.path = "";

export default tabNavigator;
