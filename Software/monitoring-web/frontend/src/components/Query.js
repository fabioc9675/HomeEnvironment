import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router";
import { axiosInstance } from "../config/config";
import DataTable from "./DataTable";
import moment from "moment";
import { Card, Container, Navbar } from "react-bootstrap";
import * as tf from "@tensorflow/tfjs";

// Model and metadata URL
const url = {
  model: axiosInstance.getUri() + "api/model/temperature",
};

export default function Query(props) {
  // component props
  const { place, typeDat, title } = props;

  // Hooks of data
  const [model, setModel] = useState();
  const [data, setData] = useState("Hello Fabian!");
  const [tempC, setTempC] = useState(0);
  const [tempF, setTempF] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [distanceC, setDistanceC] = useState(0);
  const [monitorObj, setMonitorObj] = useState([
    {
      _id: 1,
      hour: 0,
      temp_env: 0,
      mois_env: 0,
      distance: 0,
      nPerson: 0,
    },
  ]);

  // URL history
  const navigate = useNavigate();

  // it is to do something when application load
  useEffect(() => {
    // load tensorflow model
    tf.ready().then(() => {
      loadModel(url);
    });

    // create the socket in the client
    const socket = io(axiosInstance.getUri(), { transports: ["websocket"] });
    // initialization of socket io in the client side
    socket.on("notify", (message) => {
      console.log(message);
      loadDataFromDB();
    });

    // loadDataFromDB();
  }, []);

  // wait for load model
  useEffect(() => {
    loadDataFromDB();
  }, [model]);

  // Load Model
  async function loadModel(url) {
    try {
      const tfmod = await tf.loadLayersModel(url.model);
      await setModel(tfmod);
      console.log("model loaded");
    } catch (err) {
      console.log(err);
    }
  }

  // make a regression with the model
  function makeRegression(temp) {
    if (model != null) {
      const tensor = tf.tensor1d([temp]);
      const prediction = model.predict(tensor).dataSync();
      console.log(prediction);
      return Math.round(prediction);
    }
    return 0;
  }

  function loadDataFromDB() {
    axiosInstance
      .get(`/api/monitoring/place/${place}/typeDat/${typeDat}`)
      .then((res) => {
        console.log(res.data);
        setData(JSON.stringify(res.data));
        // fill data array with the data
        var dataM = res.data;
        for (var i = 0; i < dataM.length; i++) {
          // make a regression of temp with tensorflow model
          dataM[i].temp_far = makeRegression(dataM[i].temp_env);
          dataM[i].hour = moment(new Date(dataM[i].createdAt)).format("lll");
        }
        setMonitorObj(dataM);
        setTempC(dataM.slice(-1)[0].temp_env + " ºC");
        setHumidity(dataM.slice(-1)[0].mois_env + " %");
        setDistanceC(dataM.slice(-1)[0].distance[0] + " cm");
      })
      .catch((err) => console.error(err));
  }

  // function to handle click
  function HandleClick() {
    // alert("se presiono la etiqueta");

    navigate("/");
  }

  return (
    <div className="App">
      <Navbar bg="light">
        <Container>
          <Navbar.Brand onClick={HandleClick}>Home Monitoring</Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="p-3 ">
        <h3 className="header" onClick={HandleClick}>
          {title}
        </h3>
        <Container className="p-5 mb-4 bg-light rounded-3">
          <div className="d-flex flex-row">
            <Card style={{ width: "30%" }}>
              <Card.Header>Temperatura</Card.Header>
              <Card.Body>
                <Card.Text>{tempC}</Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: "30%" }}>
              <Card.Header>Humedad</Card.Header>
              <Card.Body>
                <Card.Text>{humidity}</Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: "30%" }}>
              <Card.Header>Distancia</Card.Header>
              <Card.Body>
                <Card.Text>{distanceC}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Container>
        <DataTable data={monitorObj} />
      </Container>
    </div>
  );
}
