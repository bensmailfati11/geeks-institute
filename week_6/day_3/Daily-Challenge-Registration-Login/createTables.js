// createTables.js
import db from "./config/db.js";

async function createTables() {
  await db.schema.dropTableIfExists("hashpwd");
  await db.schema.dropTableIfExists("users");

  await db.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("email").unique().notNullable();
    table.string("username").unique().notNullable();
    table.string("first_name");
    table.string("last_name");
  });

  await db.schema.createTable("hashpwd", (table) => {
    table.increments("id").primary();
    table.string("username").notNullable();
    table.string("password").notNullable();
  });

  console.log("✅ Tables created successfully!");
  process.exit(0);
}

createTables();
