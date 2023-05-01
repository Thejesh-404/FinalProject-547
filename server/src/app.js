const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const { getDb, connectToDb } = require('./db')
const { ObjectId } = require('mongodb')

const app = express()
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

const vision = require('@google-cloud/vision');
const visionClient = new vision.ImageAnnotatorClient();

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
app.get('/image/validate', async (req, res, next) => {
    try {
        const image_data = req.body;

        // TODO: testing pid
        const pid = "644f976a40779b993b17f36d";
        const selector = {
            "_id" : new ObjectId(pid)
        };
        const item = await db.collection('products').findOne(selector);
        const image = (item.image.split(','))[1];

        const request = {
            image: {content: image}
        };

        
        const [result] = await visionClient.objectLocalization(request);
        const objects = result.localizedObjectAnnotations;
        objects.forEach(object => {
            console.log(`Name: ${object.name}`);
            console.log(`Confidence: ${object.score}`);
            const vertices = object.boundingPoly.normalizedVertices;
            vertices.forEach(v => console.log(`x: ${v.x}, y:${v.y}`));
        });
        console.log(request.image);
        require("fs").writeFile("out.png", request.image.content, 'base64', function(err) {
            console.log(err);
        });
        console.log(result);
        res.status(200).json({message: "success"});
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

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
        const user_data = req.body;

        // Write to database
        const result = await db.collection('users').insertOne(user_data);

        if(result.acknowledged === true)
        {
            res.status(201).json({ message: 'User created successfully' });
        }
        else
        {
            throw new Error('Could not create new document');
        }
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ error: 'POST /user failed' });
    }
});

// Modify the given user
app.post('/user/:uid', async (req, res, next) => {
    try {
        const uid = req.params.uid;
        
        // Extract update info
        const update_info = req.body;

        // Write to database
        const selector = {
            "_id" : new ObjectId(uid)
        };
        const info = {
            $set: update_info
        };

        const result = await this.db.collection('users').updateOne(selector, info);
        if(result.matchedCount === 1)
        {
            res.status(201).json({ message: 'User updated successfully' });
        }
        else
        {
            throw new Error(`Could not update user ${uid}`);
        }
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ error: 'POST /user/:uid failed' });
    }
});


// Modify the given item
app.post('/item/:pid', async (req, res, next) => {
    try {
        const pid = req.params.pid;
        
        // Extract update info
        const update_info = req.body;

        // Write to database
        const selector = {
            "_id" : new ObjectId(pid)
        };
        const info = {
            $set: update_info
        };

        const result = await this.db.collection('products').updateOne(selector, info);
        if(result.matchedCount === 1)
        {
            res.status(201).json({ message: 'Product updated successfully' });
        }
        else
        {
            throw new Error(`Could not update user ${pid}`);
        }
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ error: 'POST /item/:pid failed' });
    }
});

// Get all items
app.get('/items', async (req, res, next) => {
    try {
        // Maybe get filter info?

        // Get info from database
        // TODO: handle empty collection later
        const result = await db.collection('products').find().toArray();
        if(result)
        {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(result));
            res.end();
        }
        else
        {
            // TODO: what should respond if create failed but not becasue of the input params
            res.writeHead(404, { 'Content-Type': 'application/json' });
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
        const selector = {
            "_id" : new ObjectId(pid)
        };
        const result = await db.collection('products').findOne(selector);

        if(result)
        {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(result));
            res.end();
        }
        else
        {
            console.error(`Could not get item ${pid}`);
            res.writeHead(404, { 'Content-Type': 'application/json' });
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



