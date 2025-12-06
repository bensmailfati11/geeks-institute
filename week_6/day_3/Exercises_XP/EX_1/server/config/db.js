import knex from "knex";

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres", 
    port: 5433,
    password: "noha", 
    database: "postBlogDb"
  }
});

export default db;
