'use strict';

const Message = require('../models/message.model');
const _ = require('lodash');

const model = new Message()

function isPalindrome(message) {
    let halfLen = Math.floor(message.length/2)
    for(let i=0; i < (halfLen); ++i){
        if(message[i] !== message[message.length - i - 1]){
            return false
        }
    }
    return true
}

exports.getMessages = function (req, res) {
    model.find({}, {text: 1}).exec(function (err, messages) {
        if (err) {
            res.status(500).send({
                message: 'Database error finding messages.'
            });
            return;
        }
        res.json(messages);
    });
};

exports.getSingleMessage = function (req, res) {
    model.findById(req.params.id, {text: 1})
        .exec(function (err, message) {
            if (!message || err) {
                res.status(404).send({
                    message: 'Message not found'
                });
                return;
            }
            res.json(message);
    });
};

exports.postMessage = function (req, res) {
    let createMessage = req.body
    // Nothing is technically a palindrome, therefore default to true
    createMessage.isPalindrome = true 
    if(createMessage.hasOwnProperty('text')){
        createMessage.isPalindrome = isPalindrome(String(req.body.text))
    }
    model.insert(createMessage).then(function (message) {
        if (!message) {
            res.status(500).send({
                message: 'Database error saving new message.'
            });
        }
        res.json(message);
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
}

exports.deleteMessage = function (req, res) {
    model.remove(req.params.id).then(function (message) {
        if (!message){
            res.status(404).send({
                message: 'Message not found'
            });
            return
        }
        res.json({
            message: 'The message has been removed.'
        });
    }).catch(function (err) {
        res.status(500).send({
            message: 'Database error deleting message.'
        });
    });
};