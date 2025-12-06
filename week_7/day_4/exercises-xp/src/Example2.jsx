import React, { Component } from "react";
import data from "./data.json";

export default class Example2 extends Component {
  render() {
    return (
      <div>
        <h2>Skills</h2>
        <p>Frontend: {data.Skills.frontend.join(", ")}</p>
        <p>Backend: {data.Skills.backend.join(", ")}</p>
      </div>
    );
  }
}
