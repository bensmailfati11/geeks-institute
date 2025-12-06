import React from "react";

class FavoriteColor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { favoriteColor: "red" };
  }

  shouldComponentUpdate() {
    console.log("shouldComponentUpdate");
    return true;
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ favoriteColor: "yellow" });
    }, 2000);
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("in getSnapshotBeforeUpdate");
    return null;
  }

  componentDidUpdate() {
    console.log("after update");
  }

  changeToBlue = () => {
    this.setState({ favoriteColor: "blue" });
  };

  render() {
    return (
      <>
        <h1>My favorite color is {this.state.favoriteColor}</h1>
        <button onClick={this.changeToBlue}>Change to blue</button>
      </>
    );
  }
}

export default FavoriteColor;
