'use strict'

module.exports = [{
    method: 'GET',
    path: '/',
    config: {
        description: 'Nested resource example'
    },
    handler: function( request, reply ){
        return reply('Foo..')
    }
},{
    method: 'GET',
    path: '/bar',
    config: {
        description: 'Example of a deeply nested resource'
    },
    handler: function( request, reply ){
        return reply('o.O')
    }
}]