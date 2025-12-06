import React, { Component } from "react";
import data from "./data.json";

export default class Example3 extends Component {
  render() {
    return (
      <div>
        <h2>Experiences</h2>
        {data.Experiences.map((exp, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <p>Company: {exp.company}</p>
            <p>Years: {exp.years}</p>
          </div>
        ))}
      </div>
    );
  }
}
