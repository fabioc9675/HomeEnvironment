import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { options, dataInit } from "./ChartInit";

// Register the Chart Object
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function DataChart(props) {
  // definition of props to use in the component
  const { data } = props;
  const [dataChart, setDataChart] = useState(dataInit);

  // options of the chart component

  useEffect(() => {
    // creation of data temporal array
    const label = [];
    const d1 = [];
    const d2 = [];

    for (let i = 0; i < data.length; i++) {
      label.push(i);
      d1.push(data[i].temp_env);
      d2.push(data[i].distance[0]);
    }

    const dataSet = {
      labels: label,
      datasets: [
        {
          fill: true,
          label: "Temperatura",
          data: d1,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          yAxisID: "y",
        },
        {
          fill: true,
          label: "Distancia",
          data: d2,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5",
          yAxisID: "y1",
        },
      ],
    };

    // add the data to the chart object
    setDataChart(dataSet);
  }, [data]);

  return (
    <div className="container">
      <h4>Gráfica de los datos</h4>
      <div className="grey lighten-3">
        <Line options={options} data={dataChart} />
      </div>
    </div>
  );
}
