import React, { useEffect, useState } from "react";
import { axiosInstance } from "./config";

export default function App() {
  const [data, setData] = useState("Hello Fabian!");

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

  return (
    <div className="App">
      <h1>Hello World</h1>
      <p>{data}</p>
    </div>
  );
}
