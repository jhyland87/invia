'use strict'

module.exports.rootResourceGet = {
    description: 'Root resource (using GET method)',
    tags: ['api'],
    handler: function( request, reply ){
        return reply('Getting the root..')
    }
}

module.exports.rootResourcePost = {
    description: 'Root resource (using POST method)',
    tags: ['api'],
    handler: function( request, reply ){
        return reply('Posting to the root..')
    }
}

module.exports.getOtherRoot = {
    description: 'Other resource in the Root',
    tags: ['api'],
    handler: function( request, reply ){
        return reply('Some other resource in the root')
    }
}

