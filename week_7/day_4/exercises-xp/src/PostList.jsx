import data from "./posts.json";

function PostList() {
  return (
    <div>
      {data.map((post) => (
        <div key={post.id} style={{ marginBottom: "20px" }}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default PostList;
