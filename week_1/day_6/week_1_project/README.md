# Flask CRUD API Assessment — Student Records



## Project Structure


```
week_1_project/
├── main.py
├── requirements.txt
├── pyproject.toml
├── test-api.rest
└── README.md
```

## Requirements

- Python 3.10+
- Flask >= 3.1.2
- python-dotenv >= 1.1.1

## Setup Instructions

You can set up this project using either uv or traditional pip.

### Option A: Using uv

1. Install uv if you don’t have it:
   - Windows (PowerShell): `iwr https://astral.sh/uv/install.ps1 -UseBasicParsing | iex`
   - Other platforms: see https://docs.astral.sh/uv/
2. Create and activate a virtual environment:
   - `uv venv`
   - Windows PowerShell: `.\.venv\Scripts\Activate.ps1`
3. Install dependencies from pyproject:
   - `uv sync`
4. Run the application:
   - `uv run python main.py`

### Option B: Using pip

1. Create and activate a virtual environment (Windows PowerShell):
   - `python -m venv .venv`
   - `.\.venv\Scripts\Activate.ps1`
2. Install dependencies:
   - `pip install -r requirements.txt`
3. Run the application:
   - `python main.py`

The app runs in debug mode on port 5001.

## API Endpoints

Base URL: `http://localhost:5001`

- GET `/students`
  - Query params: `page` (default 1), `limit` (default 10)
  - Response: `{ "students": [...], "page": <int>, "limit": <int> }`

- GET `/students/{id}`
  - Response: Student object or `null` if not found (status 200)

- POST `/students`
  - Body (JSON): `{ "name": str, "email": str, "age": int, "gender": str }`
  - Response: Created student with assigned `id` (status 201)

- PUT `/students/{id}`
  - Body (JSON): Any subset of `{ "name", "email", "age", "gender" }`
  - Response: Updated student (status 200) or `{ "error": "Not found" }` (status 404)

- DELETE `/students/{id}`
  - Response: Deleted student (status 200) or `{ "error": "Not found" }` (status 404)

## Error Handling

- Global 404 handler returns:
  ```json
  { "error": "Not found" }
  ```
- Global exception handler returns:
  ```json
  { "error": "An error occurred", "message": "Error details" }
  ```

## Testing the API

Use the included `test-api.rest` with the VS Code REST Client extension or a similar REST tool. Examples include:

- GET all students and with pagination
- GET a specific student
- POST a new student
- PUT update an existing student
- DELETE a student

Run the tests by opening `test-api.rest` and sending each request, or replicate them with curl/Postman.

## Notes

- Data is stored in-memory; restarting the server resets the data.
- The code includes simple validation for required fields on POST.
- Follow PEP 8 conventions and meaningful naming throughout the code.
