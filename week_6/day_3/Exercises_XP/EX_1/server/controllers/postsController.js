import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} from "../models/postModel.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  }catch (err) {
  console.error("SERVER ERROR:", err);
  res.status(500).json({ error: "Server error" });
}
  
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await getPostById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

export const createNewPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const [newPost] = await createPost({ title, content });
    res.status(201).json(newPost);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

export const updateExistingPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const [updated] = await updatePost(id, { title, content });
    if (!updated) return res.status(404).json({ message: "Post not found" });
    res.json(updated);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteExistingPost = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deletePost(id);
    if (!deleted) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted successfully" });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};
