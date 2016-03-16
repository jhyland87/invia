'use strict'

const Controllers = require('../controllers')

module.exports = [{
    method: 'POST',
    path: '/',
    config: Controllers.Root.rootResourcePost
},{
    method: 'GET',
    path: '/other-stuff',
    config: Controllers.Root.getOtherRoot
}]