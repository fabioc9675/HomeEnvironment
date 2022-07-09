import React from "react";
import { Text, View } from "react-native";

const url = "https://homemonitoring-web.herokuapp.com";

export default class Home extends React.Component {
  // state variables
  constructor(props) {
    super();
    this.state = {
      data: [],
      typeDat: props.typeDat,
      place: props.place,
    };
  }

  // component mounted ready
  componentDidMount = () => {
    this.getJsonData();
  };

  // load data from API endpoint
  getJsonData = () => {
    fetch(
      `${url}/api/monitoring/place/${this.state.place}/typeDat/${this.state.typeDat}`,
      { method: "GET" }
    )
      .then((res) => res.json())
      .then((dataRes) => {
        this.setState({ data: dataRes });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    return (
      <View>
        <Text>This is my first text</Text>
      </View>
    );
  }
}
