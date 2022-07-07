import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router";
import { axiosInstance } from "../config/config";
import DataTable from "./DataTable";
import moment from "moment";

export default function Query(props) {
  // component props
  const { place, typeDat } = props;

  // Hooks of data
  const [data, setData] = useState("Hello Fabian!");
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
    // create the socket in the client
    const socket = io(axiosInstance.getUri(), { transports: ["websocket"] });
    // initialization of socket io in the client side
    socket.on("notify", (message) => {
      console.log(message);
      loadDataFromDB();
    });

    loadDataFromDB();
  }, []);

  function loadDataFromDB() {
    axiosInstance
      .get(`/api/monitoring/place/${place}/typeDat/${typeDat}`)
      .then((res) => {
        console.log(res.data);
        setData(JSON.stringify(res.data));
        // fill data array with the data
        var dataM = res.data;
        for (var i = 0; i < dataM.length; i++) {
          dataM[i].hour = moment(new Date(dataM[i].createdAt)).format("lll");
        }
        setMonitorObj(dataM);
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
      <h1 onClick={HandleClick}>Hello World</h1>
      <DataTable data={monitorObj} />
    </div>
  );
}
