'use strict'

module.exports = [{
    method: 'GET',
    path: '/',
    config: {
        description: 'Root resource'
    },
    handler: function( request, reply ){
        return reply('Welcome!')
    }
},{
    method: 'GET',
    path: '/hello-world',
    config: {
        description: 'Hello World resource in root'
    },
    handler: function( request, reply ){
        return reply('Hello World!')
    }
}]