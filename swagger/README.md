# Express.js with Swagger/OpenAPI Documentation Demo

A simple REST API built with Express.js that demonstrates how to implement and use Swagger/OpenAPI documentation.

## What This Project Demonstrates

- **Express.js** - Fast, minimalist web framework for Node.js
- **Swagger/OpenAPI** - Industry-standard API documentation
- **RESTful API Design** - CRUD operations (Create, Read, Update, Delete)
- **JSDoc Comments** - How to document API endpoints in code

## Project Structure

```
express-swagger-demo/
├── package.json          # Project dependencies
├── server.js            # Main application file
└── README.md            # This file
```

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## Installation

1. Install dependencies:

```bash
npm install
```

## Running the Application

Start the server:

```bash
npm start
```

The server will start on `http://localhost:3000`

## Accessing the API Documentation

Once the server is running, open your browser and navigate to:

```
http://localhost:3000/api-docs
```

This will display the interactive Swagger UI where you can:
- View all available endpoints
- See request/response schemas
- Test API endpoints directly from the browser
- Download the OpenAPI specification

## API Endpoints

### Health Check
- `GET /` - Welcome message and documentation link

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get a specific student by ID
- `POST /api/students` - Create a new student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student

## Testing the API

### Using Swagger UI (Recommended for beginners)

1. Go to `http://localhost:3000/api-docs`
2. Click on any endpoint to expand it
3. Click the "Try it out" button
4. Fill in the required parameters
5. Click "Execute" to see the response

### Using cURL (Command Line)

Get all students:
```bash
curl http://localhost:3000/api/students
```

Get a specific student:
```bash
curl http://localhost:3000/api/students/1
```

Create a new student:
```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Williams","email":"alice@example.com","grade":"A"}'
```

Update a student:
```bash
curl -X PUT http://localhost:3000/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"John Updated","grade":"A+"}'
```

Delete a student:
```bash
curl -X DELETE http://localhost:3000/api/students/1
```

### Using Postman or Thunder Client

Import the OpenAPI specification from:
```
http://localhost:3000/api-docs.json
```

## Understanding the Code

### Swagger Configuration

The Swagger configuration is defined in `server.js`:

```javascript
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Student Management API',
      version: '1.0.0',
      description: 'A simple Express API with Swagger documentation'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./server.js']
};
```

### API Documentation with JSDoc

Each endpoint is documented using JSDoc comments with Swagger annotations:

```javascript
/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students
 *     responses:
 *       200:
 *         description: List of students
 */
app.get('/api/students', (req, res) => {
  res.json(students);
});
```

### Schema Definitions

Reusable schemas are defined in the components section:

```javascript
/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 */
```

## Learning Points

1. **OpenAPI Specification**: Industry standard for describing REST APIs
2. **Swagger UI**: Interactive documentation that allows testing
3. **JSDoc Comments**: Documentation is written directly in the code
4. **Auto-generated Docs**: Documentation updates automatically when code changes
5. **Schema Validation**: Define data structures once, reuse everywhere

## Key Dependencies

- **express**: Web framework for building the API
- **swagger-jsdoc**: Converts JSDoc comments to OpenAPI spec
- **swagger-ui-express**: Serves the Swagger UI interface
- **cors**: Enables Cross-Origin Resource Sharing

## Common Tasks

### Adding a New Endpoint

1. Write the Express route handler
2. Add JSDoc Swagger annotations above it
3. Restart the server
4. Check the documentation at `/api-docs`

### Modifying Schema

1. Update the schema in the `components/schemas` section
2. The changes will reflect in all endpoints using that schema

## Tips for Students

- Start by exploring the Swagger UI at `/api-docs`
- Try the "Try it out" feature to test endpoints
- Look at the JSDoc comments in `server.js` to understand the documentation syntax
- Modify the code and see how documentation updates
- Use the browser's Network tab to see actual HTTP requests/responses

## Next Steps

To extend this project, you could:
- Add input validation (using joi or express-validator)
- Connect to a real database (MongoDB, PostgreSQL)
- Add authentication (JWT tokens)
- Implement pagination and filtering
- Add more complex data relationships
- Add request/response logging middleware

## Resources

- [Swagger Documentation](https://swagger.io/docs/)
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [swagger-jsdoc Documentation](https://github.com/Surnet/swagger-jsdoc)

