from flask import Flask, jsonify, request
from werkzeug.exceptions import HTTPException
import os

app = Flask(__name__)

# Initial data
students = [
    {"id": 1, "name": "John Doe", "email": "john.doe@example.com", "age": 20, "gender": "male"},
    {"id": 2, "name": "Jane Doe", "email": "jane.doe@example.com", "age": 21, "gender": "female"},
    {"id": 3, "name": "Jim Doe", "email": "jim.doe@example.com", "age": 22, "gender": "male"},
    {"id": 4, "name": "Jill Doe", "email": "jill.doe@example.com", "age": 23, "gender": "female"},
    {"id": 5, "name": "Jack Doe", "email": "jack.doe@example.com", "age": 24, "gender": "male"}
]

def find_student(student_id):
    """Find student by ID or return None"""
    return next((s for s in students if s['id'] == student_id), None)

def validate_student_data(data, is_update=False):
    """Validate student data with proper checks"""
    if not data:
        return False, "No data provided"
    
    # Required fields for creation
    if not is_update:
        required = ['name', 'email', 'age', 'gender']
        missing = [f for f in required if f not in data]
        if missing:
            return False, f"Missing fields: {', '.join(missing)}"
    
    # Field validation
    if 'name' in data and (not data['name'] or not isinstance(data['name'], str)):
        return False, "Name must be non-empty string"
    
    if 'email' in data:
        if not isinstance(data['email'], str) or '@' not in data['email']:
            return False, "Valid email required"
        # Check duplicate (for creation and update)
        if any(s['email'] == data['email'] and (is_update or s['id'] != data.get('id')) for s in students):
            return False, "Email already exists"
    
    if 'age' in data:
        if not isinstance(data['age'], int) or data['age'] < 1 or data['age'] > 150:
            return False, "Age must be integer between 1-150"
    
    if 'gender' in data and data['gender'] not in ['male', 'female', 'other']:
        return False, "Gender must be male, female, or other"
    
    return True, ""

@app.route('/students', methods=['GET'])
def get_students():
    """Get all students with pagination"""
    try:
        page = request.args.get('page', 1, type=int)
        limit = request.args.get('limit', 10, type=int)
        
        page = max(1, page)
        limit = max(1, min(limit, 100))  # Limit to 100 max
        
        start = (page - 1) * limit
        end = start + limit
        
        return jsonify({
            "students": students[start:end],
            "page": page,
            "limit": limit
        })
    except Exception as e:
        return jsonify({"error": "An error occurred", "message": str(e)}), 500

@app.route('/students/<int:student_id>', methods=['GET'])
def get_student(student_id):
    """Get specific student by ID - returns null if not found"""
    student = find_student(student_id)
    return jsonify(student)  # Returns null if not found

@app.route('/students', methods=['POST'])
def create_student():
    """Create new student"""
    try:
        data = request.get_json()
        
        is_valid, error = validate_student_data(data, is_update=False)
        if not is_valid:
            return jsonify({"error": "Validation failed", "message": error}), 400
        
        new_id = max([s['id'] for s in students], default=0) + 1
        student = {
            "id": new_id,
            "name": data['name'],
            "email": data['email'],
            "age": data['age'],
            "gender": data['gender']
        }
        
        students.append(student)
        return jsonify(student), 201
        
    except Exception as e:
        return jsonify({"error": "An error occurred", "message": str(e)}), 500

@app.route('/students/<int:student_id>', methods=['PUT'])
def update_student(student_id):
    """Update existing student"""
    try:
        student = find_student(student_id)
        if not student:
            return jsonify({"error": "Not found"}), 404
        
        data = request.get_json()
        is_valid, error = validate_student_data(data, is_update=True)
        if not is_valid:
            return jsonify({"error": "Validation failed", "message": error}), 400
        
        # Update allowed fields
        for field in ['name', 'email', 'age', 'gender']:
            if field in data:
                student[field] = data[field]
        
        return jsonify(student)
        
    except Exception as e:
        return jsonify({"error": "An error occurred", "message": str(e)}), 500

@app.route('/students/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    """Delete student"""
    student = find_student(student_id)
    if not student:
        return jsonify({"error": "Not found"}), 404
    
    students.remove(student)
    return jsonify(student)

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Not found"}), 404

@app.errorhandler(Exception)
def handle_exception(e):
    if isinstance(e, HTTPException):
        return jsonify({"error": "An error occurred", "message": e.description}), e.code
    return jsonify({"error": "An error occurred", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)