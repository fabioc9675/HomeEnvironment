import React from "react";
import { useNavigate } from "react-router";

export default function Home() {
  // URL history
  const navigate = useNavigate();

  // function to handle click
  function HandleClick(e) {
    // alert("se presiono la etiqueta");
    // console.log(e.target.id);

    if (e.target.id === "1") {
      navigate("/dataQueryEvent");
    }
    if (e.target.id === "2") {
      navigate("/dataQuerySample");
    }
  }

  return (
    <div>
      <h3 id="1" onClick={(e) => HandleClick(e)}>
        Ingrese a Eventos
      </h3>
      <h3 id="2" onClick={(e) => HandleClick(e)}>
        Ingrese a Muestras
      </h3>
    </div>
  );
}
