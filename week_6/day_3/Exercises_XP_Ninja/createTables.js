// Create database tables using Knex
import db from './server/config/db.js';

const createTables = async () => {
  try {
    console.log('Creating database tables...\n');

    // Create questions table
    const questionsExists = await db.schema.hasTable('questions');
    if (!questionsExists) {
      await db.schema.createTable('questions', (table) => {
        table.increments('id').primary();
        table.text('question').notNullable();
        table.integer('correct_answer').notNullable();
        table.timestamp('created_at').defaultTo(db.fn.now());
      });
      console.log('✓ Questions table created');
    } else {
      console.log('✓ Questions table already exists');
    }

    // Create options table
    const optionsExists = await db.schema.hasTable('options');
    if (!optionsExists) {
      await db.schema.createTable('options', (table) => {
        table.increments('id').primary();
        table.text('option').notNullable();
        table.timestamp('created_at').defaultTo(db.fn.now());
      });
      console.log('✓ Options table created');
    } else {
      console.log('✓ Options table already exists');
    }

    // Create questions_options junction table
    const junctionExists = await db.schema.hasTable('questions_options');
    if (!junctionExists) {
      await db.schema.createTable('questions_options', (table) => {
        table.integer('question_id').unsigned().references('id').inTable('questions').onDelete('CASCADE');
        table.integer('option_id').unsigned().references('id').inTable('options').onDelete('CASCADE');
        table.primary(['question_id', 'option_id']);
      });
      console.log('✓ Questions_options junction table created');
    } else {
      console.log('✓ Questions_options table already exists');
    }

    // Insert sample data if tables are empty
    const optionsCount = await db('options').count('id as count').first();
    
    if (parseInt(optionsCount.count) === 0) {
      console.log('\nInserting sample data...\n');

      // Insert options
      const optionIds = await db('options').insert([
        { option: 'JavaScript' },
        { option: 'Python' },
        { option: 'Java' },
        { option: 'C++' },
        { option: 'HTML' },
        { option: 'CSS' },
        { option: 'React' },
        { option: 'Angular' },
        { option: 'HTTP' },
        { option: 'HTTPS' },
        { option: 'FTP' },
        { option: 'SMTP' },
        { option: 'The Document Object Model' },
        { option: 'Data Object Model' },
        { option: 'Digital Optimization Method' },
        { option: 'Document Optimization Module' },
        { option: 'True' },
        { option: 'False' }
      ]).returning('id');

      console.log('✓ Options inserted');

      // Insert questions
      const questionIds = await db('questions').insert([
        { question: 'What does HTML stand for?', correct_answer: 5 },
        { question: 'Which programming language is primarily used for web development?', correct_answer: 1 },
        { question: 'What is the purpose of CSS?', correct_answer: 6 },
        { question: 'Which of the following is a JavaScript framework?', correct_answer: 7 },
        { question: 'What protocol is used for secure web browsing?', correct_answer: 10 },
        { question: 'Is JavaScript the same as Java?', correct_answer: 18 }
      ]).returning('id');

      console.log('✓ Questions inserted');

      // Link questions with options
      await db('questions_options').insert([
        // Question 1
        { question_id: 1, option_id: 5 },
        { question_id: 1, option_id: 1 },
        { question_id: 1, option_id: 2 },
        { question_id: 1, option_id: 6 },
        // Question 2
        { question_id: 2, option_id: 1 },
        { question_id: 2, option_id: 2 },
        { question_id: 2, option_id: 3 },
        { question_id: 2, option_id: 4 },
        // Question 3
        { question_id: 3, option_id: 6 },
        { question_id: 3, option_id: 5 },
        { question_id: 3, option_id: 1 },
        { question_id: 3, option_id: 2 },
        // Question 4
        { question_id: 4, option_id: 7 },
        { question_id: 4, option_id: 2 },
        { question_id: 4, option_id: 3 },
        { question_id: 4, option_id: 5 },
        // Question 5
        { question_id: 5, option_id: 10 },
        { question_id: 5, option_id: 9 },
        { question_id: 5, option_id: 11 },
        { question_id: 5, option_id: 12 },
        // Question 6
        { question_id: 6, option_id: 18 },
        { question_id: 6, option_id: 17 }
      ]);

      console.log('✓ Questions linked with options');
      console.log('\n✓ Sample data inserted successfully');
    } else {
      console.log('\n✓ Sample data already exists');
    }

    // Display summary
    const questions = await db('questions').count('id as count').first();
    const options = await db('options').count('id as count').first();
    
    console.log('\n=== Database Summary ===');
    console.log(`Total Questions: ${questions.count}`);
    console.log(`Total Options: ${options.count}`);
    console.log('========================\n');

  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    await db.destroy();
  }
};

createTables();
