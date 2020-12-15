'use strict';

let express = require('express')
let router = express.Router()

const message = require('../controllers/message.server.controller');

router.get('/messages', function(req, res){
    message.getMessages()    
    .then(function(messages){
        res.json(messages);
    })
    .catch(function handleError(err) {
        console.log(err)
        res.status(500).send({
            message: 'Database error finding messages.'
        });
        return;
    })
})

router.post('/messages/', function(req, res){
    message.postMessage(req.body)
    .then(function (message) {
        if (!message) {
            res.status(500).send({
                message: 'Database error saving new message.'
            });
        }
        res.json(message.ops[0]);
    })
    .catch(function (err) {
        res.status(400).send("A document already exists with the same text");
    });
})

router.get('/messages/:id', function(req, res){
    message.getSingleMessage(req.params.id)
    .then(function(message){
        if(!message){
            res.status(404).send({
                message: 'Message not found'
            });
            return
        }
        res.json(message);
    })
    .catch(function handleError(err) {
        console.log(err)
        res.status(500).send({
            message: 'Database error finding messages.'
        });
        return;
    })
})
router.delete('/messages/:id', function(req, res){
    message.deleteMessage(req.params.id)
    .then(function (message) {
        if (message.deletedCount === 0){
            res.status(404).send({
                message: 'Message not found'
            });
            return
        }
        res.json({
            message: 'The message has been removed.'
        });
    }).catch(function (err) {
        console.log(err)
        res.status(500).send({
            message: 'Database error deleting message.'
        });
    });
})

module.exports = router