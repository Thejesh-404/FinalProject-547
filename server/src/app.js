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

const visionClient = new vision.ImageAnnotatorClient({
    keyFilename: 'apikey.json'
});

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

app.post('/image/validate', async (req, res, next) => {
    try {
        const item = req.body;
        if(item.image) {
            const image = (item.image.split(','))[1];

            const request = {
                image: {content: image}
            };

            const [result] = await visionClient.objectLocalization(request);
            const objects = result.localizedObjectAnnotations;
            let maxScore = 0;
            let maxName = '';
            for (let i = 0; i < objects.length; i++) {
            if (objects[i].score > maxScore) {
                maxScore = objects[i].score;
                maxName = objects[i].name;
                }
            }
            const maxObject = {name: maxName, score: maxScore};
            console.log(maxObject);
            console.log("detection complete");
            res.status(200).json(maxObject);
        }
        else {
            res.status(200).json({ message: 'Did not find an image' });
        }
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ error: `/image validation failed` });
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
app.post('/user/:email', async (req, res, next) => {
    try {
        const email = req.params.email;
        
        // Extract update info
        const update_info = req.body;

        // Write to database
        const selector = {
            "email" : email
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



        const result = await db.collection('products').findOneAndUpdate(selector, info);

        if(result.value)
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
        
        const item_status = req.query.sold_items;
        let selector;

        // if query parameter sold_items=true(return all sold items)
        //                    sold_items=false(return un sold items)
        //if not provided anything return all
        if (item_status==='true' || item_status==='false'){
            selector = (item_status==='true') ? {isSold:true}  : {isSold:false}
        }else if(item_status==='*'){
            selector = {}
        }


        // Get info from database
        // TODO: handle empty collection later
        const result = await db.collection('products').find(selector).toArray();
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
        console.error(err);
        res.status(500).json({ error: 'GET /items failed' });
    }
});



// Get items by user email
app.get('/items/:email', async (req, res, next) => {
    try {

        const email = req.params.email;
        const item_status = req.query.sold_items;
        let selector;

        // if query parameter sold_items=true(return all sold items)
        //                    sold_items=false(return un sold items)
        //if not provided anything return all
        if (item_status==='true' || item_status==='false'){
            selector = (item_status==='true') ? {owner: email,isSold:true}  : {owner: email,isSold:false}
        }else if(item_status==='*'){
            selector = {}
        }


        // Get info from database
        // TODO: handle empty collection later
        const result = await db.collection('products').find(selector).toArray();
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
        console.error(err);
        res.status(500).json({ error: 'GET /items failed' });
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
        console.error(err);
        res.status(500).json({ error: 'GET /item/:pid failed' });
    }
});

// Get User by email id
app.get('/user/:email', async (req, res, next) => {
    try {
        const email = req.params.email;

        // Get info from database
        const selector = {
            "email" : email
        };

        const result = await db.collection('users').findOne(selector);


        if(result)
        {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(result));
            res.end();
        }
        else
        {
            console.error(`User Does Not exist: ${email}`);
            res.status(200).send(null)
        }
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ error: 'GET /user/:email failed' });
    }
});

// Delete Product by product id
app.delete('/item/:pid', async (req, res, next) => {
    try {
        const pid = req.params.pid;

        const selector = {
            "_id" : new ObjectId(pid)
        };
        const result = await db.collection('products').deleteOne(selector);
        if(result.deletedCount === 1)
        {
            res.status(200).json({ message: "delete success" });
        }
        else 
        {
            
            res.status(400).json({ error: `unable to delete ${req.params.pid}` });
        }
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ error: 'DELETE /item/:pid failed' });
    }
});

// Delete user by email id
app.delete('/user/:email', async (req, res, next) => {
    try {
        const email = req.params.email;

        const selector = {
            "email" : email
        };
        const result = await db.collection('users').deleteOne(selector);
        if(result.deletedCount === 1)
        {
            res.status(200).json({ message: "delete success" });
        }
        else 
        {
            
            res.status(400).json({ error: `unable to delete ${req.params.email}` });
        }
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ error: 'DELETE /user/:email failed' });
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



