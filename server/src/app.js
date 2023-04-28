const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

// GET /ping
app.get('/ping', (req, res, next) => {
    try {
        res.writeHead(204);
        res.end();
    }
    catch(err) {
        next(err);
    }
});

app.get('/status',(req,res)=> {
    res.status(200).send({"message":"hello,world!"})
})

// Create a new user
app.post('/user', async (req, res, next) => {
    try {
        // Extract user info

        // Write to database

        const result = true;
        if(result)
        {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write("test POST /user");
            res.end();
        }
        else
        {
            // TODO: what should respond if create failed but not becasue of the input params
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end();
        }
    }
    catch(err) {
        next(err);
    }
});

// Modify the given user
app.post('/user/:uid', async (req, res, next) => {
    try {
        const uid = req.params.uid;
        
        // Extract update info

        // Write to database

        const result = true;
        if(result)
        {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write("test POST /user/:uid");
            res.end();
        }
        else
        {
            // TODO: what should respond if create failed but not becasue of the input params
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end();
        }
    }
    catch(err) {
        next(err);
    }
});

// Create a new item
app.post('/item', async (req, res, next) => {
    try {
        // Extract update info

        // Write to database

        const result = true;
        if(result)
        {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write("test POST /item");
            res.end();
        }
        else
        {
            // TODO: what should respond if create failed but not becasue of the input params
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end();
        }
    }
    catch(err) {
        next(err);
    }
});

// Modify the given item
app.post('/item/:pid', async (req, res, next) => {
    try {
        const pid = req.params.pid;
        
        // Extract update info

        // Write to database

        const result = true;
        if(result)
        {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write("test POST /item/:pid");
            res.end();
        }
        else
        {
            // TODO: what should respond if create failed but not becasue of the input params
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end();
        }
    }
    catch(err) {
        next(err);
    }
});

// Get all items
app.get('/items', async (req, res, next) => {
    try {
        // Maybe get filter info?

        // Get info from database

        const result = true;
        if(result)
        {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write("test GET /items");
            res.end();
        }
        else
        {
            // TODO: what should respond if create failed but not becasue of the input params
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end();
        }
    }
    catch(err) {
        next(err);
    }
});

// Get a specific item
app.get('/item/:pid', async (req, res, next) => {
    try {
        const pid = req.params.pid;

        // Get info from database

        const result = true;
        if(result)
        {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write("test GET /items/:pid");
            res.end();
        }
        else
        {
            // TODO: what should respond if create failed but not becasue of the input params
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end();
        }
    }
    catch(err) {
        next(err);
    }
});

// Handle all error paths
app.use((err, req, res, next) => {
    console.log(err);
    if(err.httpStatusCode === 404) {
        res.writeHead(404);
        res.end();
    }
});

app.listen(process.env.PORT || 8081);

