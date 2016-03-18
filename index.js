'use strict'

const path    = require('path')
const fs      = require('fs')
const _       = require('lodash')
const appRoot = require('app-root-path')
const debug   = require('debug')

const appTitle = 'invia'

const say = {
    info:  debug(`${appTitle}:info`),
    debug: debug(`${appTitle}:debug`),
    error: debug(`${appTitle}:error`)
}

module.exports = function( plugin, options, next ){
    // Set defaults
    let routeResourceCfg = []
    let routeDir = './routes/'
    // Route file stats
    const routeStats = {
        processed: 0,
        skipped: 0
    }

    if( ! _.isEmpty( options ) ){
        // If a root resource was defined in the options, then set it so it can be processed. The root path will
        // not have the file name prepended to the routes `path` value
        if( _.isString( options.rootResources ) )
            routeResourceCfg = [ options.rootResources ]
        else if( _.isArray( options.rootResources ) )
            routeResourceCfg = options.rootResources

        // Check if a route directory was defined
        if( _.isString( options.routeDir ) )
            routeDir = options.routeDir
    }

    routeDir = appRoot.resolve( routeDir )

    say.info("%s route directory: %s", _.upperFirst( appTitle ), routeDir )

    try {
        // Check that its a valid path
        const routeDirStats = fs.lstatSync( routeDir )

        if ( ! routeDirStats.isDirectory())
            return next( 'It does not look like '+routeDirStats+' is a directory - verify that the path exists, and it is a directory' )
    }
    catch (e) {
        return next( e )
    }

    const routes = []

    ;(function loadRoutes( filename ) {
        let routeResources
        let routeName
        let stats     = fs.lstatSync( filename )
        let routePath  = _.replace( filename, '//', '/' )

        if ( stats.isDirectory() ) {
            fs.readdirSync( filename ).map( function( child ) {
                return loadRoutes( filename + '/' + child )
            } )
        }
        else {
            let relativePath = _.replace( filename, routeDir, '' )

            let jsMatch = relativePath.match( /^\/(.*)\.js/ )

            if( ! _.isEmpty( jsMatch ) ) {
                routeName = _.toLower( jsMatch[ 1 ] )

                say.debug( "Processing resource '%s' (file: %s)", routeName, filename )

                if( _.isUndefined( routes[ routeName ] ) ) {
                    routeResources = require( routePath )

                    // If this route name matches the root route name, then skip the path modification
                    if( _.includes( routeResourceCfg, routeName ) ) {
                        say.info( "Skipping resource path modifications for resource '%s', as it is defined in the rootResources configuration", routeName )
                    }
                    else {
                        // Prepend the path and file name to the routes
                        _.map( routeResources, function( r ) {
                            let newRoute = _.replace( `/${routeName}${r.path}`, '//', '/' )

                            // Strip off the last /
                            newRoute = newRoute.replace(/\/$/, "")

                            say.debug( "Updating path %s to %s", r.path, newRoute )

                            return r.path = newRoute
                        } )
                    }

                    plugin.route( routeResources )

                    routes.push( routeName )

                    routeStats.processed++
                }
                else {
                    // Shouldn't really get here, but it helps me sleep at night
                    say.debug( "Route '%s' was already loaded - ignoring this", relativePath )

                    routeStats.skipped++
                }
            }
            else {
                say.debug( "Regex match for '%s' failed, probably because it isn't a .js file - skipping", relativePath )

                routeStats.skipped++
            }
        }
    })( routeDir )

    say.info('Total of %s route files processed via Invia, and %s ignored', routeStats.processed, routeStats.skipped)

    next()
}

module.exports.attributes = {
    multiple: true,
    pkg: require('./package.json')
}