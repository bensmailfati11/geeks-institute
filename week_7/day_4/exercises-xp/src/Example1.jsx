import React, { Component } from "react";
import data from "./data.json";

export default class Example1 extends Component {
  render() {
    return (
      <div>
        <h2>Social Medias</h2>
        {data.SocialMedias.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    );
  }
}
