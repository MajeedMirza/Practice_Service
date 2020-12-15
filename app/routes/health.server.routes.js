'use strict';

let express = require('express')
let router = express.Router()

const health = require('../controllers/health.server.controller');

router.get('/health', function(req, res){
    try {
        res.json(health.getHealth());
    } catch (error) {
        console.log(err)
        res.status(500).send({
            status: 'Unable to get health of service.'
        });
        return;
    }
})

module.exports = router