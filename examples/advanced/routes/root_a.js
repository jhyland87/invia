'use strict'

const Controllers = require('../controllers')

module.exports = [{
    method: 'GET',
    path: '/',
    config: Controllers.Root.rootResourceGet
}]