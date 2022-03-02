import React from "react";
import ReactDOM from "react-dom";
import JediClassComponent from "./JediClassComponent";
import JediFunctionComponent from "./JediFunctionComponent";

const title = "Your awesome React app";

ReactDOM.render(
  <div>
    <JediClassComponent />
    <JediFunctionComponent />
  </div>,
  document.getElementById("app")
);
