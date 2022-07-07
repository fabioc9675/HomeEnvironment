import React from "react";
import { Table } from "react-bootstrap";

export default function DataTable(props) {
  // definition of props to use in the component
  const { data } = props;
  return (
    <div className="container">
      <h4>Tabla de datos</h4>
      <div className="grey lighten-5">
        <Table responsive striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Temp. Amb.</th>
              <th>Hum. Amb.</th>
              <th>Ruido Amb.</th>
              <th>Distancia</th>
              <th>personas</th>
            </tr>
          </thead>
          <tbody>
            {data.map((monitorObj) => {
              return (
                <tr key={monitorObj._id}>
                  <td>{monitorObj.hour} </td>
                  <td>{monitorObj.temp_env} ºC</td>
                  <td>{monitorObj.mois_env} %</td>
                  <td>{monitorObj.noise_env}</td>
                  <td>{monitorObj.distance[0]} cm</td>
                  <td>{monitorObj.nPerson}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
