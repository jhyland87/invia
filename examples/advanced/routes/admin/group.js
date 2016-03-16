'use strict'

const Controllers = require('../../controllers')

module.exports = [{
    method: 'GET',
    path: '/',
    config: Controllers.Admin.listGroups
},{
    method: 'GET',
    path: '/{group}',
    config: Controllers.Admin.getGroup
},{
    method: 'POST',
    path: '/',
    config: Controllers.Admin.createGroup
},{
    method: 'PUT',
    path: '/{group}',
    config: Controllers.Admin.updateGroup
},{
    method: 'DELETE',
    path: '/',
    config: Controllers.Admin.deleteGroup
}]