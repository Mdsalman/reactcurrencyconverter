import React from "react";
import ReactDOM from "react-dom";
import Converter from "./Converter";

import "./styles.css";

function App() {
  return (
    <div className=".container-fluid">
      <Converter></Converter>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
