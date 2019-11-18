import axios from "axios";
import { AsyncStorage } from "react-native";
import { API_URL } from "react-native-dotenv";

const refreshJwtUrl = "auth/refresh";

const headers = async () => {
  const token = await AsyncStorage.getItem("userToken");

  return {
    Authorization: `Bearer ${token}`
  };
};

export const executeRequest = async (method, url, params) => {
  try {
    if (method === "get" || "delete") {
      return await axios[method](API_URL + url, {
        headers: await headers()
      });
    } else {
      return await axios[method](API_URL + url, params, {
        headers: await headers()
      });
    }
  } catch (err) {
    err.response.status === 401
      ? await refreshJwtToken()
      : alert("An error has occured");
  }
};

const refreshJwtToken = async () => {
  const userData = await AsyncStorage.getItem("currentUser");
  const user = JSON.parse(userData);

  try {
    return await axios.post(
      API_URL + refreshJwtUrl,
      { user_id: user.id },
      {
        headers: await headers()
      }
    );
  } catch (err) {
    alert("An error has occured while trying to reauthenticate");
  }
};
