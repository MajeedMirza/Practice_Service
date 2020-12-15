const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const config = require('./config')
let db = null

module.exports.connect = async function() {
    const client =  await MongoClient.connect(config.db, config.dbOptions);
    db = client.db("Q")
    console.log("Connected to Mongo")
}

module.exports.getConnection = async function() {
    if (db === null){
        await this.connect()
    }
    return db
}

module.exports.getObjectID = function(id){
    try {
        return new ObjectId(id)
    } catch (error) {
        console.log("Invalid Mongo ID")
        return null
    }
}