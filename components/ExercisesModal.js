import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { View, Text, Modal, TouchableHighlight } from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";

import { CustomButton } from "../components/Button";

export const ExerciseModal = ({ exerciseList, visible, close, save }) => {
  const [filteredExerciseList, setFilteredExerciseList] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const fullExerciseList = exerciseList.map((ex, index) => ({
    id: index + 1,
    name: ex
  }));

  useEffect(() => {
    setFilteredExerciseList(fullExerciseList);
  }, [exerciseList]);

  return (
    <Modal
      transparent={false}
      animationType="slide"
      visible={visible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={{ marginTop: 100 }}>
        <TouchableHighlight
          style={{ alignContent: "flex-end" }}
          onPress={() => {
            setSelectedItems([]);
            close();
          }}
        >
          <Text>Hide Modal</Text>
        </TouchableHighlight>

        <SearchableDropdown
          multi={true}
          selectedItems={selectedItems}
          onItemSelect={item => {
            const items = selectedItems;
            items.push(item);
            setSelectedItems(items);
            setFilteredExerciseList(fullExerciseList);
          }}
          containerStyle={{
            padding: 5,
            height: 600,
            margin: 10
          }}
          onRemoveItem={(item, index) => {
            const items = selectedItems.filter(i => i.id !== item.id);
            setSelectedItems(items);
          }}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            borderColor: "#bbb",
            borderBottomWidth: 1
          }}
          itemTextStyle={{ color: "#222" }}
          itemsContainerStyle={{ maxHeight: 500 }}
          items={filteredExerciseList}
          defaultIndex={2}
          chip={true}
          resetValue={true}
          textInputProps={{
            placeholder: "Search exercises",
            underlineColorAndroid: "transparent",
            style: {
              padding: 12,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5
            },
            onTextChange: text => {
              const list = fullExerciseList.filter(item =>
                item.name.toLowerCase().includes(text.toLowerCase())
              );
              setFilteredExerciseList(list);
            }
          }}
          listProps={{
            nestedScrollEnabled: true
          }}
        />
        <CustomButton
          text="Save"
          disabled={selectedItems.length === 0}
          onTap={() => save(selectedItems)}
        />
      </View>
    </Modal>
  );
};
