'use strict'

const Hapi = require('hapi')
const Glue = require('glue')

const manifest = require( './confidence' )

const options = {
    relativeTo: __dirname
}

Glue.compose(manifest, options, function( err, server ){
    if (err) throw err

    server.start(function(){
        console.log( '# Server Started: ', server.info.uri )
    })
})