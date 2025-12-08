# Exercises XP Gold - Todo List API

Exercise 1: Todo List API with database connection using Express and Knex.

## Project Structure

```
Exercises_XP_Gold/
├── .gitignore
├── package.json
├── server.js                    # Main server file
├── createTable.js              # Script to create database table
├── createTable.sql             # SQL script (alternative method)
└── server/
    ├── config/
    │   └── db.js               # Database configuration
    ├── controllers/
    │   └── todoController.js   # Business logic
    ├── models/
    │   └── todoModel.js        # Database operations
    └── routes/
        └── todoRoutes.js       # API routes
```

## Features

Complete CRUD operations for a Todo List:

- **Create** a new todo: `POST /api/todos`
- **Get all** todos: `GET /api/todos`
- **Get specific** todo: `GET /api/todos/:id`
- **Update** a todo: `PUT /api/todos/:id`
- **Delete** a todo: `DELETE /api/todos/:id`

## Database Schema

### Tasks Table

| Column     | Type         | Constraints              |
|------------|--------------|--------------------------|
| id         | SERIAL       | PRIMARY KEY              |
| title      | VARCHAR(255) | NOT NULL                 |
| completed  | BOOLEAN      | DEFAULT false            |
| created_at | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP|
| updated_at | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP|

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Database

Edit `server/config/db.js` and update with your PostgreSQL credentials:

```javascript
const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'your_password', // Change this
    database: 'todo_db'
  }
});
```

### 3. Create Database

Create the PostgreSQL database:

```sql
CREATE DATABASE todo_db;
```

### 4. Create Table

**Option 1: Using Node.js script (recommended)**
```bash
npm run create-table
```

**Option 2: Using SQL file**
```bash
psql -U postgres -d todo_db -f createTable.sql
```

### 5. Start the Server

```bash
npm start
# Or for development with auto-reload:
npm run dev
```

The server will start on `http://localhost:3000`

## API Endpoints

### 1. Get All Todos

```
GET /api/todos
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Complete Node.js exercises",
      "completed": false,
      "created_at": "2025-12-08T10:00:00.000Z",
      "updated_at": "2025-12-08T10:00:00.000Z"
    }
  ]
}
```

### 2. Get Specific Todo

```
GET /api/todos/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Complete Node.js exercises",
    "completed": false,
    "created_at": "2025-12-08T10:00:00.000Z",
    "updated_at": "2025-12-08T10:00:00.000Z"
  }
}
```

### 3. Create New Todo

```
POST /api/todos
Content-Type: application/json

{
  "title": "New task",
  "completed": false
}
```

**Response:**
```json
{
  "success": true,
  "message": "Todo created successfully",
  "data": {
    "id": 5,
    "title": "New task",
    "completed": false,
    "created_at": "2025-12-08T10:00:00.000Z",
    "updated_at": "2025-12-08T10:00:00.000Z"
  }
}
```

### 4. Update Todo

```
PUT /api/todos/:id
Content-Type: application/json

{
  "title": "Updated task",
  "completed": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Todo updated successfully",
  "data": {
    "id": 1,
    "title": "Updated task",
    "completed": true,
    "created_at": "2025-12-08T10:00:00.000Z",
    "updated_at": "2025-12-08T10:00:00.000Z"
  }
}
```

### 5. Delete Todo

```
DELETE /api/todos/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Todo deleted successfully"
}
```

## Testing with cURL

### Get all todos
```bash
curl http://localhost:3000/api/todos
```

### Get specific todo
```bash
curl http://localhost:3000/api/todos/1
```

### Create new todo
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test todo","completed":false}'
```

### Update todo
```bash
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated todo","completed":true}'
```

### Delete todo
```bash
curl -X DELETE http://localhost:3000/api/todos/1
```

## Testing with Postman

1. Import the collection or create requests manually
2. Set base URL: `http://localhost:3000`
3. Test each endpoint with appropriate methods and data

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid input data
- **404 Not Found**: Todo not found
- **500 Internal Server Error**: Database or server errors

## Technologies Used

- **Express.js**: Web framework
- **Knex.js**: SQL query builder
- **PostgreSQL**: Database
- **Node.js**: Runtime environment

## Notes

- All IDs are auto-incremented integers
- Timestamps are automatically managed
- Input validation is implemented
- Error messages are descriptive
- CORS is not configured (add if needed for frontend)

## License

ISC
