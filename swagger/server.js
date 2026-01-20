const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory data store
let students = [
  { id: 1, name: 'John Doe', email: 'john@example.com', grade: 'A' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', grade: 'B+' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', grade: 'A-' }
];

// Swagger/OpenAPI configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Student Management API',
      version: '1.0.0',
      description: 'API for managing students'
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server'
      }
    ],
    tags: [
      {
        name: 'Students',
        description: 'API for students in the system'
      },
      { 
        name: 'Health',
        description: 'API for health check'
      }
    ],
  },
  apis: ['./server.js']
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));


/**
 * @swagger
 * components:
 *  schemas:
 *   Student: 
 *    type: object
 *    required:
 *     - name
 *     - email
 *    properties:
 *     id:
 *      type: integer
 *      description: The auto-generated id of the student
 *     name:
 *      type: string
 *      description: The name of the student
 *     email:
 *      type: string
 *      description: The email of the student
 *      example: john@example.com
 *     grade:
 *      type: string
 *      description: The grade of the student
 *      example: A
 *   Error:
 *    type: object
 *    properties:
 *     message:
 *      type: string
 *      description: Error detailed message
 */






/**
 * @swagger
 * /:
 *  get:
 *   tags: [Health]
 *   summary: Welcome message
 *   responses:
 *    200:  
 *     description: Welcome message
 *     content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            message:
 *              type: string
 *            documentation:
 *              type: string
 */
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Student Management API',
    documentation: `http://localhost:${PORT}/api-docs`
  });
});


/**
 * @swagger
 * /api/students:
 *  get:
 *    tags: [Students]
 *    summary: Retrieve a list of students
 *    responses:
 *     200:
 *      description: A list of students
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: '#/components/schemas/Student'
 *     404:
 *      description: No students found
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Error'
 */
app.get('/api/students', (req, res) => {
  res.json(students);
});

/**
 * @swagger
 * /api/students/{id}:
 *  get:
 *   tags: [Students]
 *   summary: Get a student by ID
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *       type: integer
 *      description: The student ID
 *   responses:
 *    200:
 *     description: Exact student data
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Student'
 *    404:
 *     description: Student not found
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Error'
 */
app.get('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  
  res.json(student);
});

app.post('/api/students', (req, res) => {
  const { name, email, grade } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }
  
  const newStudent = {
    id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
    name,
    email,
    grade: grade || 'N/A'
  };
  
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.put('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  
  const { name, email, grade } = req.body;
  
  if (name) student.name = name;
  if (email) student.email = email;
  if (grade) student.grade = grade;
  
  res.json(student);
});

app.delete('/api/students/:id', (req, res) => {
  const index = students.findIndex(s => s.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }
  
  students.splice(index, 1);
  res.json({ message: 'Student deleted successfully' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});
