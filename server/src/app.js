const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const { getDb, connectToDb } = require('./db')

const app = express()
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());


// db connection
let db

connectToDb((err) => {
  if(!err){
    app.listen('3000', () => {
      console.log('app listening on port 3000')
    })
    db = getDb()
  }
})


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


// if it is post request set status 201 send a json object with key: message

// Create a new item
app.post('/item', async (req, res, next) => {
    try {
      const item_data = req.body;
      const result = await db.collection('products').insertOne(item_data);

      if (result.acknowledged === true) {
        res.status(201).json({ message: 'Product created successfully' });
      } else {
        throw new Error('Could not create new document');
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    }
});


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



