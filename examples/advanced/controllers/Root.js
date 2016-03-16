'use strict'

module.exports.rootResource = {
    description: 'Root resource',
    tags: ['api'],
    handler: function( request, reply ){
        return reply('Welcome!')
    }
}

module.exports.helloWorld = {
    description: 'Hello World resource in root',
    tags: ['api'],
    handler: function( request, reply ){
        return reply('Hello World!')
    }
}