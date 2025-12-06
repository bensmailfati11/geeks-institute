import React from "react";
import "./Exercise.css";

class Exercise extends React.Component {
  render() {
    const style_header = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial"
    };

    return (
      <div>
        <h1 style={style_header}>This is a styled H1</h1>

        <p className="para">This is a paragraph</p>

           <a href="https://reactjs.org">React official website</a>

        <form>
          <input type="text" placeholder="Type something" />
          <button>Submit</button>
        </form>

        <img
          src="./public/React-JS.png"
          alt="Placeholder"
        />

        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </div>
    );
  }
}

export default Exercise;
