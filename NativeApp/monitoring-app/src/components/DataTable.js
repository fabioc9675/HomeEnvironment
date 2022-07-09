import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

let colors = ["rgb(39,42,46)", "rgb(30,33,37)"];

export default function DataTable(props) {
  const { data } = props;

  return (
    <View>
      <View>
        <FlatList
          data={data}
          keyExtractor={({ index }) => index}
          ListHeaderComponent={() => {
            return (
              <View style={styles.table}>
                <Text style={styles.text}>Fecha</Text>
                <Text style={styles.text}>Temp</Text>
                <Text style={styles.text}>Humedad</Text>
                <Text style={styles.text}>Distancia</Text>
                <Text style={styles.text}>Personas</Text>
              </View>
            );
          }}
          renderItem={({ item, index }) => {
            return (
              <View
                style={[
                  styles.listWrapper,
                  {
                    backgroundColor: colors[index % colors.length],
                  },
                ]}
              >
                <Text style={styles.row}>{item.hour}</Text>
                <Text style={styles.row}>{item.temp_env}</Text>
                <Text style={styles.row}>{item.mois_env}</Text>
                <Text style={styles.row}>{item.distance[0]}</Text>
                <Text style={styles.row}>{item.nPerson}</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  text: {
    flex: 1,
    backgroundColor: "rgb(30,33,37)",
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: "white",
    fontWeight: "bold",
  },
  listWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderBottomWidth: 1,
  },
  row: {
    flex: 1,
    fontSize: 13,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: "white",
  },
});
