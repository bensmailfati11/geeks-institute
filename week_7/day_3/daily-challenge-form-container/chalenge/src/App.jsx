import React from "react";
import "./App.css";
import FormComponent from "./FormComponent";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      destination: "",
      nutsFree: false,
      lactoseFree: false,
      vegan: false,
    };
  }

  handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    this.setState({
      [name]: type === "checkbox" ? checked : value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams(this.state).toString();
    window.location.search = params; 
  };

  render() {
    return (
      <div>
        <FormComponent
          data={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default App;
