const mongoLayer = require('../../config/mongo')
let messages
mongoLayer.getConnection().then(function(db){
	messages = db.collection("messages")
	messages.createIndex("text", { unique: true })
})

module.exports.find = async function() {
	return await messages.find({}).toArray()
}

module.exports.findById = async function(id) {
	return await messages.findOne({ _id: mongoLayer.getObjectID(id) })
}

module.exports.remove = async function(id) {
	console.log(id)
	return await messages.deleteOne({ _id: mongoLayer.getObjectID(id) })
}

module.exports.insert = async function(data) {
	return await messages.insertOne(data)
}