// Database configuration using Knex
import knex from 'knex';

const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'your_password', // Change this to your PostgreSQL password
    database: 'todo_db'
  }
});

export default db;
