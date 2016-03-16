'use strict'

module.exports.listGroups = {
    description: 'List all groups',
    tags: ['api'],
    handler: ( request, reply ) => {
        reply('List all groups')
    }
}

module.exports.getGroup = {
    description: 'Retrieve specific group',
    tags: ['api'],
    handler: function( request, reply ){
        return reply('Details of group ' + +encodeURIComponent(request.params.group))
    }
}

module.exports.createGroup = {
    description: 'Create new group',
    tags: ['api'],
    handler: function( request, reply ){
        return reply('Creating a group')
    }
}

module.exports.updateGroup = {
    description: 'Update existing group',
    tags: ['api'],
    handler: function( request, reply ){
        return reply('Updating group ' + +encodeURIComponent(request.params.group))
    }
}

module.exports.deleteGroup = {
    description: 'Delete existing group',
    tags: ['api'],
    handler: function( request, reply ){
        return reply('Deleting group ' + +encodeURIComponent(request.params.group))
    }
}
