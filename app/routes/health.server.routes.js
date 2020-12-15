'use strict';
let prom = require('../../config/prometheus').prom
let express = require('express')
let router = express.Router()

const health = require('../controllers/health.server.controller');

router.get('/health', function(req, res){
    try {
        res.set('Content-Type', prom.register.contentType)
        res.end(prom.register.metrics())
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'Unable to get health of service.'
        });
    }
})

module.exports = router