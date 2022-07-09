import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./src/components/Home";

import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const getToken = async () => {
  // request the status of the user fopr receive permissions
  const { status } = await Notifications.requestPermissionsAsync();

  console.log(status);

  if (status !== "granted") {
    return;
  }

  let token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token); // ExponentPushToken[fCNPY6CTYJaeQR2yV2Wr6S]

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
};

export default class App extends Component {
  componentDidMount() {
    getToken();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Home Monitoring App</Text>
        <Home place="FABIAN" />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  text: {
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontWeight: "bold",
  },
});
