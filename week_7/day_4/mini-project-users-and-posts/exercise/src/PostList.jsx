import React, { Component } from "react";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      errorMsg: ""
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ posts: data });
      })
      .catch(() => {
        this.setState({ errorMsg: "Error loading posts" });
      });
  }

  render() {
    const { posts, errorMsg } = this.state;

    return (
      <div style={{ padding: "20px" }}>
        <h2>Posts</h2>

        {errorMsg && <h3>{errorMsg}</h3>}

        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "6px"
            }}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))
        ) : (
          <p>Loading posts...</p>
        )}
      </div>
    );
  }
}

export default PostList;
