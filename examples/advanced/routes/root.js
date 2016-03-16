'use strict'

const Controllers = require('../controllers')

module.exports = [{
    method: 'GET',
    path: '/',
    config: Controllers.Root.rootResource
},{
    method: 'GET',
    path: '/hello-world',
    config: Controllers.Root.helloWorld
}]