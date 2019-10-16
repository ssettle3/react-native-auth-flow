import React, { useEffect, useState } from "react";
import { AsyncStorage, View, Text, Button } from "react-native";
import styled from "styled-components";
import { CustomButton } from "../components/Button";

const Container = styled.View`
  padding: 15px;
`;

const ProfilePictureWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const ProfilePicture = styled.View`
  height: 150px;
  width: 150px;
  justify-content: center;
  align-items: center;
  background-color: #1f96f3;
  border-radius: 100px;
`;

const Details = styled.View`
  margin-top: 50px;
`;

const Actions = styled.View``;

const Detail = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

const Label = styled.Text`
  margin-right: 10px;
  color: lightgray;
`;

export default function ProfileScreen(props) {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      const userData = await AsyncStorage.getItem("currentUser");
      const user = JSON.parse(userData);

      return user;
    };

    getUser().then(data => {
      setCurrentUser(data);
    });
  });

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate("SignIn");
  };

  return (
    <Container>
      {currentUser ? (
        <View>
          <ProfilePictureWrapper>
            <ProfilePicture>
              <Text style={{ fontSize: 70, color: "#fff" }}>SS</Text>
            </ProfilePicture>
          </ProfilePictureWrapper>

          <Details>
            <Text>INFO</Text>
            <Detail>
              <Label>Username</Label>
              <Text>{currentUser.username}</Text>
            </Detail>
            <Detail>
              <Label>First Name</Label>
              <Text>{currentUser.username}</Text>
            </Detail>
            <Detail>
              <Label>Last Name</Label>
              <Text>{currentUser.username}</Text>
            </Detail>
            <Detail>
              <Label>Height</Label>
              <Text>{currentUser.username}</Text>
            </Detail>
            <Detail>
              <Label>Weight</Label>
              <Text>{currentUser.username}</Text>
            </Detail>
            <Detail>
              <Label>Email Address</Label>
              <Text>{currentUser.username}</Text>
            </Detail>
          </Details>

          <Actions>
            <Text>EXTRA</Text>
            <CustomButton text="Sign Out" onTap={this._signOutAsync} />
          </Actions>
        </View>
      ) : (
        <View>
          <Text>Loading</Text>
        </View>
      )}
    </Container>
  );
}

ProfileScreen.navigationOptions = {
  title: "Profile",
  headerRight: (
    <Button onPress={() => alert("This is a button!")} title="Edit" />
  )
};
