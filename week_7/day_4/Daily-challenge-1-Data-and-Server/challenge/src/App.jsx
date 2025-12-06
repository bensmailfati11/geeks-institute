import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backendMessage: "",
      inputValue: "",
      responseMessage: ""
    };
  }

  async componentDidMount() {
    const res = await fetch("http://localhost:5000/api/hello");
    const text = await res.text();
    this.setState({ backendMessage: text });
  }

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault(); 
    const res = await fetch("http://localhost:5000/api/world", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ input: this.state.inputValue })
    });

    const text = await res.text();
    this.setState({ responseMessage: text });
  };

  render() {
    return (
      <div style={{ padding: "40px" }}>
        <h1>{this.state.backendMessage}</h1>

        <h3>Post to Server:</h3>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>

        <p>{this.state.responseMessage}</p>
      </div>
    );
  }
}

export default App;
