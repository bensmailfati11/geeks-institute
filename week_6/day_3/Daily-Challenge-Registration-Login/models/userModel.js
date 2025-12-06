import db from "../config/db.js";

export async function addUser(userData, passwordHash) {
  return await db.transaction(async (trx) => {
    const [userId] = await trx("users").insert(userData);
    await trx("hashpwd").insert({
      username: userData.username,
      password: passwordHash,
    });
    return userId;
  });
}

export async function getUsers() {
  return db("users").select("*");
}

export async function getUserById(id) {
  return db("users").where({ id }).first();
}

export async function getUserByUsername(username) {
  return db("hashpwd").where({ username }).first();
}

export async function updateUser(id, data) {
  return db("users").where({ id }).update(data);
}
