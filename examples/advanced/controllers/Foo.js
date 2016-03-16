'use strict'

module.exports.foo = {
    description: 'Nested resource example',
    tags: ['api'],
    handler: function( request, reply ){
        return reply('Foo..')
    }
}

module.exports.bar = {
    description: 'Example of a deeply nested resource',
    tags: ['api'],
    handler: function( request, reply ){
        return reply('o.O')
    }
}