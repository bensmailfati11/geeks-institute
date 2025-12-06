import db from "../config/db.js";

export const getAllPosts = () => db("posts").select("*");

export const getPostById = (id) => db("posts").where({ id }).first();

export const createPost = (post) => db("posts").insert(post).returning("*");

export const updatePost = (id, post) =>
  db("posts").where({ id }).update(post).returning("*");

export const deletePost = (id) => db("posts").where({ id }).del();
