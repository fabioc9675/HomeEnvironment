import React from "react";
import { useNavigate } from "react-router";

export default function Home() {
  // URL history
  const navigate = useNavigate();

  // function to handle click
  function HandleClick() {
    // alert("se presiono la etiqueta");

    navigate("/dataQuery");
  }

  return (
    <div>
      <h3 key="1" onClick={HandleClick}>
        Ingrese a los datos
      </h3>
    </div>
  );
}
