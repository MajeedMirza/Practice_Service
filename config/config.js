'use strict';

/**
 * Module dependencies.
 */
const _ = require('lodash'),
	glob = require('glob')

/**
 * Load app configurations
 */
module.exports = _.extend( {
	app: {
		title: 'nodejs-service-skeleton',
		description: 'The basics to get a RESTful API working.',
		keywords: 'NeDB, Express, Node.js'
	},
	db: `mongodb+srv://${process.env.MONGO_USER || require('./env/development').MONGO_USER}:${process.env.MONGO_PASS || 
			require('./env/development').MONGO_PASS}@cluster0.3godg.mongodb.net/Q?retryWrites=true&w=majority`,
	dbOptions: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	ip: process.env.IP || '127.0.0.1',
	port: process.env.PORT || 9091
});
