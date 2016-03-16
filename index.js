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
    let rootResource
    let routeDir = './routes/'
    // Route file stats
    const stats = {
        processed: 0,
        skipped: 0
    }

    if( ! _.isEmpty( options ) ){
        // If a root resource was defined in the options, then set it so it can be processed. The root path will
        // not have the file name prepended to the routes `path` value
        if( _.isString( options.rootResource ) )
            rootResource = options.rootResource

        // Check if a route directory was defined
        if( _.isString( options.routeDir ) )
            routeDir = options.routeDir
    }

    routeDir = appRoot.resolve( routeDir )

    say.info('%s route directory: %s', _.upperFirst( appTitle ), routeDir )

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

                say.info( 'Processing resource %s (file: %s)', routeName, filename )

                if( _.isUndefined( routes[ routeName ] ) ) {
                    routeResources = require( routePath )

                    // If this route name matches the root route name, then skip the path modification
                    if( routeName === rootResource ) {
                        say.info( 'Skipping resource path modifications for resource %s, as it is defined as the rootResource', routeName )
                    }
                    else {
                        // Prepend the path and file name to the routes
                        _.map( routeResources, function( r ) {
                            let newRoute = _.replace( `/${routeName}${r.path}`, '//', '/' )

                            say.debug( 'Updating path %s to %s', r.path, newRoute )

                            return r.path = newRoute
                        } )
                    }

                    plugin.route( routeResources )

                    routes.push( routeName )

                    stats.processed++
                }
                else {
                    // Shouldn't really get here, but it helps me sleep at night
                    say.debug( 'Route %s was already loaded - ignoring this', relativePath )

                    stats.skipped++
                }
            }
            else {
                say.debug( 'Regex match for %s failed, probably because it isn\'t a .js file - skipping', relativePath )

                stats.skipped++
            }
        }
    })( routeDir )

    say.info('Total of %n route files processed via Invia, and %n ignored', stats.processed, stats.skipped)

    next()
}

module.exports.attributes = {
    multiple: true,
    pkg: require('./package.json')
}