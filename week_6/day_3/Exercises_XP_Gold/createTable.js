// Create tasks table using Knex
import db from './server/config/db.js';

const createTable = async () => {
  try {
    // Check if table exists
    const exists = await db.schema.hasTable('tasks');
    
    if (exists) {
      console.log('Table "tasks" already exists');
      return;
    }

    // Create tasks table
    await db.schema.createTable('tasks', (table) => {
      table.increments('id').primary();
      table.string('title', 255).notNullable();
      table.boolean('completed').defaultTo(false);
      table.timestamp('created_at').defaultTo(db.fn.now());
      table.timestamp('updated_at').defaultTo(db.fn.now());
    });

    console.log('Table "tasks" created successfully');

    // Insert sample data
    await db('tasks').insert([
      { title: 'Complete Node.js exercises', completed: false },
      { title: 'Learn Express framework', completed: false },
      { title: 'Practice SQL queries', completed: true },
      { title: 'Build a REST API', completed: false }
    ]);

    console.log('Sample data inserted successfully');

    // Display all tasks
    const tasks = await db('tasks').select('*');
    console.log('\nAll tasks:');
    console.table(tasks);

  } catch (error) {
    console.error('Error creating table:', error);
  } finally {
    // Close database connection
    await db.destroy();
  }
};

createTable();
