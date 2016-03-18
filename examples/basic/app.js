'use strict'

const Hapi = require( 'hapi' )
const Glue = require( 'glue' )

const internals = {
    manifest: {
        connections: [{
            port: 8000,
            labels: ['api']
        }],
        registrations: [{
            plugin: {
                register: 'blipp',
                options: {
                    showStart: true
                }
            }
        }, {
            plugin: {
                register: '../../',
                options: {
                    rootResource: 'root',
                    routeDir: './examples/basic/routes'
                }
            }
        }]
    }
}

Glue.compose( internals.manifest, { relativeTo: __dirname }, ( err, server ) => {
    if( err )
        return console.error('# ERROR:', err )

    server.start( () => console.log( '# Server Started: ', server.info.uri ))
})