// Database configuration using Knex
import knex from 'knex';

const db = knex({
  client: 'better-sqlite3',
  connection: {
    filename: './quiz_db.sqlite'
  },
  useNullAsDefault: true
});

export default db;
