import React from "react";
import styled from "styled-components";
import { View, Text } from "react-native";
import { ActivityIndicator } from "@ant-design/react-native";

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin-top: 50%;
`;

export default function Loading(props) {
  return (
    <Container>
      <ActivityIndicator text={props.text} />
    </Container>
  );
}
