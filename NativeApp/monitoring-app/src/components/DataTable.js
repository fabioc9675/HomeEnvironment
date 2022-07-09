import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default class DataTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first: "DataTable",
      data: props.data,
    };

    console.log(this.state.data);
  }
  render() {
    return (
      <View>
        <ScrollView>
          <View key="1" style={styles.table}>
            <Text style={styles.text}>Hora</Text>
            <Text style={styles.text}>Temp</Text>
            <Text style={styles.text}>Humedad</Text>
            <Text style={styles.text}>Personas</Text>
          </View>
          {this.state.data.map((monitor) => {
            return (
              <View key={monitor._id} style={styles.table}>
                <Text style={styles.text}>{monitor.hour}</Text>
                <Text style={styles.text}>{monitor.temp_env}</Text>
                <Text style={styles.text}>{monitor.mois_env}</Text>
                <Text style={styles.text}>{monitor.nPerson}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  table: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    backgroundColor: "#CDCDCD",
    fontSize: 16,
    paddingRight: 10,
    paddingLeft: 10,
  },
});
