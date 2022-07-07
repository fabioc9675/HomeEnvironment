import React from "react";
import Home from "./Home";
import Query from "./Query";

import { HashRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/dataQueryEvent"
              element={<Query place="FABIAN" typeDat="EVENT" />}
            />
            <Route
              exact
              path="/dataQuerySample"
              element={<Query place="FABIAN" typeDat="SAMPLE" />}
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
}
