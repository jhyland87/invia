'use strict'

module.exports = [{
    method: 'GET',
    path: '/',
    config: {
        description: 'List all groups'
    },
    handler: function( request, reply ){
        return reply('Listing groups')
    }
},{
    method: 'GET',
    path: '/{group}',
    config: {
        description: 'Retrieve specific group'
    },
    handler: function( request, reply ){
        return reply('Details of group ' + +encodeURIComponent(request.params.group))
    }
},{
    method: 'POST',
    path: '/',
    config: {
        description: 'Create new group'
    },
    handler: function( request, reply ){
        return reply('Creating a group')
    }
},{
    method: 'PUT',
    path: '/{group}',
    config: {
        description: 'Update existing group'
    },
    handler: function( request, reply ){
        return reply('Updating group ' + +encodeURIComponent(request.params.group))
    }
},{
    method: 'DELETE',
    path: '/',
    config: {
        description: 'Delete existing group'
    },
    handler: function( request, reply ){
        return reply('Deleting group ' + +encodeURIComponent(request.params.group))
    }
}]