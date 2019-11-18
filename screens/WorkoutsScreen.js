import React from "react";
import styled from "styled-components";
import axios from "axios";
import {
  ScrollView,
  View,
  Text,
  AsyncStorage,
  TouchableOpacity
} from "react-native";

import { List, SwipeAction } from "@ant-design/react-native";

import Loading from "../components/Loading";
import { executeRequest } from "../services/ApiService";

const Container = styled.ScrollView`
  flex: 1;
  padding-top: 15;
  background-color: #fff;
`;

import { Ionicons } from "@expo/vector-icons";

export default class WorkoutsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workouts: [],
      loading: true
    };
  }

  componentDidMount() {
    const getWorkouts = async () => {
      const response = await executeRequest("get", "api/workouts");
      this.setState({
        workouts: response.data,
        loading: false
      });
    };

    getWorkouts();

    this.props.navigation.setParams({
      createWorkout: this.createWorkout
    });
  }

  createWorkout = async params => {
    const response = await executeRequest("post", "api/workouts", params);
    const currentWorkouts = this.state.workouts;

    currentWorkouts.push(response.data);
    this.setState({
      workouts: currentWorkouts
    });
  };

  deleteWorkout = async id => {
    await executeRequest("delete", `api/workouts/${id}`);

    const currentWorkouts = this.state.workouts;
    const updatedWorkouts = currentWorkouts.filter(w => w.id !== id);

    this.setState({
      workouts: updatedWorkouts
    });
  };

  render() {
    const { navigation } = this.props;
    const { workouts, loading } = this.state;
    const deleteButton = workout => [
      {
        text: (
          <Ionicons
            style={{ color: "white", padding: 10 }}
            size={25}
            onPress={() => {
              this.deleteWorkout(workout.id);
            }}
            name="ios-trash"
          />
        ),
        onPress: () => console.log("delete"),
        style: { backgroundColor: "red" }
      }
    ];

    return (
      <Container>
        {loading && <Loading text="Loading Workouts" />}
        {!loading && workouts.length > 0 && (
          <View>
            <List>
              {workouts.map(workout => (
                <SwipeAction
                  key={workout.id}
                  autoClose
                  style={{ backgroundColor: "transparent" }}
                  right={deleteButton(workout)}
                  onOpen={() => console.log("open")}
                  onClose={() => console.log("close")}
                >
                  <List.Item
                    onPress={() => {
                      navigation.navigate("Workout", {
                        workout: workout
                      });
                    }}
                  >
                    {workout.name}
                  </List.Item>
                </SwipeAction>
              ))}
            </List>
          </View>
        )}
        {!loading && workouts.length === 0 && (
          <View>
            <Text>No Workouts Yet!</Text>
          </View>
        )}
      </Container>
    );
  }

  static navigationOptions = ({ navigation }) => ({
    title: "My Workouts",
    headerRight: (
      <TouchableOpacity>
        <Ionicons
          style={{ paddingRight: 10 }}
          size={35}
          onPress={() =>
            navigation.navigate("NewWorkout", {
              createWorkout: navigation.getParam("createWorkout")
            })
          }
          name="ios-add"
        />
      </TouchableOpacity>
    )
  });
}
