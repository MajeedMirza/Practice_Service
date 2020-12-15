'use strict';

const Message = require('../models/message.model');
const _ = require('lodash');

const model = Message

function isPalindrome(message) {
    let halfLen = Math.floor(message.length/2)
    for(let i=0; i < (halfLen); ++i){
        if(message[i] !== message[message.length - i - 1]){
            return false
        }
    }
    return true
}

exports.getMessages = function () {
    return model.find()
};

exports.getSingleMessage = function (id) {
    return model.findById(id)
};

exports.postMessage = function (createMessage) {
    // Nothing is technically a palindrome, therefore default to true
    createMessage.isPalindrome = true 
    if(createMessage.hasOwnProperty('text')){
        createMessage.isPalindrome = isPalindrome(String(createMessage.text))
    }
    return model.insert(createMessage)
}

exports.deleteMessage = function (id) {
    return model.remove(id)
};