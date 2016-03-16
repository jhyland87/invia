'use strict'

const Controllers = require('../../../controllers')

module.exports = [{
    method: 'GET',
    path: '/',
    config: Controllers.Foo.foo
},{
    method: 'GET',
    path: '/bar',
    config: Controllers.Foo.bar
}]