import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";

import { CustomButton } from "../components/Button";
import Input from "../components/Input";
import { ExerciseModal } from "../components/ExercisesModal";

import { executeRequest } from "../services/ApiService";

export default function WorkoutScreen(props) {
  const [exerciseList, setExerciseList] = useState();
  const [loading, setLoading] = useState(true);
  const [addingExercise, setAddingExercise] = useState(false);
  const workout = props.navigation.state.params.workout;

  const fetchExerciseList = async () => {
    const response = await executeRequest("get", "api/exercises");

    setExerciseList(response.data);
    setLoading(false);
  };

  const closeModal = () => setAddingExercise(false);

  useEffect(() => {
    if (!exerciseList) {
      fetchExerciseList();
    }
  }, [exerciseList]);

  const saveExercises = exercises => {
    workout.exercises = exercises;
    closeModal();
  };

  return (
    <View>
      {loading && (
        <View>
          <Text>Loading</Text>
        </View>
      )}

      {!loading && (
        <View>
          <Text>{workout.name}</Text>
          {!workout.exercises.length && (
            <View>
              <Text>No exercises</Text>
              <CustomButton
                text="Add Exercise"
                onTap={() => setAddingExercise(true)}
              />
            </View>
          )}

          <ExerciseModal
            exerciseList={exerciseList}
            visible={addingExercise}
            close={closeModal}
            save={saveExercises}
          />
        </View>
      )}
    </View>
  );
}
