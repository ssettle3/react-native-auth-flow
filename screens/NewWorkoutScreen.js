import React, { useState } from "react";
import styled from "styled-components";
import { ScrollView, Text, TextInput } from "react-native";
import { CustomButton } from "../components/Button";

const Container = styled.ScrollView`
  flex: 1;
  padding: 15px;
  background-color: #fff;
`;

export default function NewWorkoutScreen(props) {
  const [workout, setWorkout] = useState({});

  const createWorkout = () => {
    const callback = props.navigation.state.params.createWorkout;
    const params = {
      name: workout
    };
    callback(params);
    props.navigation.goBack();
  };

  return (
    <Container>
      <Text>Name</Text>
      <TextInput
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "lightgray"
        }}
        onChangeText={text => {
          setWorkout(text);
        }}
      />
      <CustomButton
        disabled={!workout.length}
        text="Add"
        onTap={createWorkout}
      />
    </Container>
  );
}

NewWorkoutScreen.navigationOptions = {
  title: "New Workout"
};
