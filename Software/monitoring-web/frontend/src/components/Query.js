import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { axiosInstance } from "../config/config";

export default function Query() {
  const [data, setData] = useState("Hello Fabian!");

  // URL history
  const navigate = useNavigate();

  // it is to do something when application load
  useEffect(() => {
    loadDataFromDB();
  }, []);

  function loadDataFromDB() {
    axiosInstance
      .get("/api/monitoring/")
      .then((res) => {
        console.log(res.data);
        setData(JSON.stringify(res.data));
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
      <p>{data}</p>
    </div>
  );
}
