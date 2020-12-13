const Datastore = require('nedb')
const db = new Datastore()

class Message {
	constructor() {
		db.ensureIndex({ fieldName: 'text', unique: true }, function (err) {
			if (err)
				console.log(err)
		})
	}

	find() {
		return db.find({})
	}

	findById(id) {
		return db.findOne({ _id: id })
	}

	save(id, update) {
		return db.update({ _id: id }, update, {})
	}

	remove(id) {
		return new Promise(function(resolve, reject) {
			return db.remove({ _id: id }, function ( err, removed ) {
				if (err) 
					reject(err)
				resolve(removed)
			})
		})
	}

	insert(data) {
		return new Promise(function(resolve, reject) {
			return db.insert(data, (err, newDoc) => {
				if (err)
					reject(err)
				resolve(newDoc)
			})
		})
	}
}

module.exports = Message;