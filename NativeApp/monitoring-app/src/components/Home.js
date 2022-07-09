import React from "react";
import { Text, View } from "react-native";
import DataTable from "./DataTable";
import moment from "moment";

const url = "https://homemonitoring-web.herokuapp.com";

export default class Home extends React.Component {
  // state variables
  constructor(props) {
    super();
    this.state = {
      data: [{ _id: 1, hour: "0", temp_env: 0, mois_env: 0, nPerson: 0 }],
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
      { method: "GET", headers: { "Content-Type": "application/json" } }
    )
      .then((res) => res.json())
      .then((dataRes) => {
        for (var i = 0; i < dataRes.length; i++) {
          dataRes[i].hour = moment(new Date(dataRes[i].createdAt)).format(
            "lll"
          );
        }

        this.setState({ data: dataRes });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    return (
      <View style={{ width: "100%" }}>
        <DataTable data={this.state.data} />
      </View>
    );
  }
}
