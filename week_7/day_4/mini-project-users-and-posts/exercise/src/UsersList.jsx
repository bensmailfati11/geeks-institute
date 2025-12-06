import React, { Component } from "react";

class UsersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      loaded: false
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          users: data,
          loaded: true
        });
      });
  }

  render() {
    const { users, loaded } = this.state;

    if (!loaded) {
      return <div style={{ padding: "20px" }}><h3>Loading...</h3></div>;
    }

    return (
      <div style={{ padding: "20px" }}>
        <h2>Users</h2>

        {users.map((user) => (
          <div key={user.id} style={{
            border: "1px solid #ddd",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "6px"
          }}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default UsersList;
