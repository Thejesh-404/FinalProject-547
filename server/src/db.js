const { MongoClient} = require('mongodb');
const uri = "mongodb+srv://thejeshrao129:J2vXXc4zJd3vtDy4@cluster0.gewemax.mongodb.net/?retryWrites=true&w=majority";

let dbConnection;

const config = {
  "db" : "usc-market-place"
}

module.exports = {
    connectToDb: (cb) => {
      MongoClient.connect(uri)
        .then(client => {
          dbConnection = client.db(config.db)
          return cb()
        })
        .catch(err => {
          console.log(err)
          return cb(err)
        })
    },
    getDb: () => dbConnection
}