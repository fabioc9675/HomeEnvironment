// parameters to initialize the chart

export const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Gráfica de datos - Multi Axis",
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

export const dataInit = {
  labels: [1, 2],
  datasets: [
    {
      fill: true,
      label: "Dataset 1",
      data: [10, 20],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.3)",
      yAxisID: "y",
    },
    {
      fill: true,
      label: "Dataset 2",
      data: [15, -4],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5",
      yAxisID: "y1",
    },
  ],
};
