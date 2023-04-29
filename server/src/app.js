const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const { makeExecutableSchema } = require('@graphql-tools/schema')
const { MongoClient, ObjectId } = require('mongodb')
const { graphqlHTTP } = require('express-graphql')

const app = express()
app.use(bodyParser.json())
app.use(cors())

let uri = 'mongodb+srv://ee547aws:xLDJpNwFpog46AxR@cluster547.achom4n.mongodb.net/?retryWrites=true&w=majority'
let config = {
    opt: {
        useUnifiedTopology: true
    }
}
let client = new MongoClient(uri, config.opt);

const typeDefs = `type Query {
    player(pid: ID!): Player
  }
  
  type Mutation {
    playerCreate(
      playerInput: PlayerCreateInput
    ): Player
  }

  input PlayerCreateInput {
    fname:                     String!
    lname:                     String
  }
  
  type Player {
    fname:                  String
    lname:                  String
  }`;

const resolvers = {
    Query: {
        player: async (_, {pid}, context) => {
            return context.loaders.player.load(pid)
        }
    },
    Mutation: {
        playerCreate: async (_, {playerInput:{fname, lname}}, context) => {
            let player = {
                fname:fname,
                lname:lname
            }
            let result = await context.db.collection('player').insertOne(player)
            return result;
        }
    }
}

const schema = makeExecutableSchema({
    resolvers,
    resolverValidationOptions: {
        requireResolversForAllFields: 'ignore',
        requireResolversToMatchSchema: 'ignore'
    },
    typeDefs
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

app.use('/graphql', graphqlHTTP(async (req, res) => {
    let db = client.db('ee547_project')
    console.log(db);
    return {
        schema,
        graphiql: true,
        context: {
            db: db
        }
    };
}));

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

(async () => {
    let PORT = process.env.PORT;
    if(!PORT) {
        PORT = 8081;
    }
    app.listen(PORT);
    console.log(`Server started on port ${PORT}`);
})();

