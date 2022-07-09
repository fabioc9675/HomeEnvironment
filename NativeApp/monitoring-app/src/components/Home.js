import React, { useState } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DataTable from "./DataTable";
import moment from "moment";

const url = "https://homemonitoring-web.herokuapp.com";

export default function Home(props) {
  // state variables
  const { place, typeDat } = props;
  const [data, setData] = useState([]);

  function handlePress() {
    getJsonData();
  }

  // load data from API endpoint
  function getJsonData() {
    fetch(`${url}/api/monitoring/place/${place}/typeDat/${typeDat}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        res.json().then((dataRes) => {
          for (var i = 0; i < dataRes.length; i++) {
            dataRes[i].index = i;
            dataRes[i].hour = moment(new Date(dataRes[i].createdAt)).format(
              "lll"
            );
          }

          setData(dataRes);
          console.log(data);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <View style={{ width: "100%", height: "70%" }}>
      <DataTable data={data} />
      <Button onPress={handlePress} title="Cargar"></Button>
    </View>
  );
}
