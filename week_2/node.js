

// npm install express body-parser


// ====================================================================
// SERVER SETUP: Node.js with Express
// ====================================================================

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Simulate an in-memory database of 'tasks'
let tasks = [
    { id: 1, title: 'Õpi HTTP meetodid', completed: false },
    { id: 2, title: 'Tee REST API ülesanne', completed: true }
];
let nextId = 3;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for client-side fetch (since the client runs on the same process, this is for demonstration)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// --- API Endpoints (Miksroteenuse Marsruudid) ---

// 1. GET: Loe kõik ressursid
app.get('/tasks', (req, res) => {
    console.log(`[SERVER] GET /tasks: Kõik ülesanded tagastatud. Olek: 200 OK`);
    res.status(200).json(tasks);
});

// 2. GET: Loe üks ressurss
app.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (task) {
        console.log(`[SERVER] GET /tasks/${id}: Üks ülesanne leitud. Olek: 200 OK`);
        res.status(200).json(task);
    } else {
        console.log(`[SERVER] GET /tasks/${id}: Ülesannet ei leitud. Olek: 404 NOT FOUND`);
        res.status(404).send({ message: 'Ülesannet ei leitud' });
    }
});

// 3. POST: Loo uus ressurss
app.post('/tasks', (req, res) => {
    const newTask = {
        id: nextId++,
        title: req.body.title || 'Uus ülesanne',
        completed: false
    };

    tasks.push(newTask);
    console.log(`[SERVER] POST /tasks: Uus ülesanne loodud. Olek: 201 CREATED`);
    res.status(201).json(newTask);
});

// 4. PUT: Asenda ressurss tervikuna (Full Update)
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex !== -1) {
        tasks[taskIndex] = {
            id: id,
            title: req.body.title || tasks[taskIndex].title,
            completed: req.body.completed !== undefined ? req.body.completed : tasks[taskIndex].completed
        };
        console.log(`[SERVER] PUT /tasks/${id}: Ülesanne täielikult uuendatud. Olek: 200 OK`);
        res.status(200).json(tasks[taskIndex]);
    } else {
        console.log(`[SERVER] PUT /tasks/${id}: Ülesannet ei leitud. Olek: 404 NOT FOUND`);
        res.status(404).send({ message: 'Uuendatavat ülesannet ei leitud' });
    }
});

// 5. PATCH: Osaline uuendus (Partial Update)
app.patch('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex !== -1) {
        const task = tasks[taskIndex];
        if (req.body.title !== undefined) task.title = req.body.title;
        if (req.body.completed !== undefined) task.completed = req.body.completed;
        
        console.log(`[SERVER] PATCH /tasks/${id}: Ülesanne osaliselt uuendatud. Olek: 200 OK`);
        res.status(200).json(task);
    } else {
        console.log(`[SERVER] PATCH /tasks/${id}: Ülesannet ei leitud. Olek: 404 NOT FOUND`);
        res.status(404).send({ message: 'Uuendatavat ülesannet ei leitud' });
    }
});


// 6. DELETE: Kustuta ressurss
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = tasks.length;
    
    tasks = tasks.filter(t => t.id !== id);

    if (tasks.length < initialLength) {
        console.log(`[SERVER] DELETE /tasks/${id}: Ülesanne kustutatud. Olek: 204 NO CONTENT`);
        // 204 No Content on standard, kui sisu tagasi ei saadeta
        res.status(204).send(); 
    } else {
        console.log(`[SERVER] DELETE /tasks/${id}: Ülesannet ei leitud. Olek: 404 NOT FOUND`);
        res.status(404).send({ message: 'Kustutatavat ülesannet ei leitud' });
    }
});


// Käivita server
const server = app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`SERVER KÄIVITATUD: REST API töötab pordil ${PORT}`);
    console.log(`Kontrolli clientDemo() väljundit.`);
    console.log(`======================================================\n`);
    
    // Käivita kohe klient (fetch) funktsioon, et demonstreerida tööd
    clientDemo(); 
});

