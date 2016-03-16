# Invia
A very hapi route auto-loader

## Usage
Easily manage your HapiJS routes and resources by storing your basic route configurations in a designated *routes* folder.

## Examples

* **[Basic Example](https://github.com/jhyland87/invia/tree/master/examples/basic)** - Just a basic example usage
* **[Advanced Example](https://github.com/jhyland87/invia/tree/master/examples/advanced)** - Something a little more realistic, this is an example of how you can use *Invia* with other plugins to load pretty much everything programmatically, such as the routes, controllers, configuration file and all other HapiJS plugins (via Confidence)

## Under The Hood
There really isn't anything too fancy here. All this does is recursively iterate through the folder containing your routes, and load any of the exported configurations into Hapi as resources, but before doing so, the path to the file containing the resources will be appended to the `path` value in the resources themselves (relative to the *routes* folder)

#### Example
Lets say I create a file at `routes/hello.js, with the following content:

```javascript
module.exports = [{
    method: 'GET',
    path: '/world',
    handler: function( request, reply ){
        return reply('Hello!')
    }
},{
    method: 'POST',
    path: '/world',
    handler: function( request, reply ){
        return reply('Thank you for your details')
    }
}]
```

This will create two resources:

1. *GET*  /hello/world
2. *POST* /hello/world

## Route Folder

By default, *Invia* will look for a folder called `/routes` in the root of you project, but you can change this by defining `routeDir` in the plugin options when loading the plugin. As long as the value is a valid path to an existing folder, it should work fine.

## Root Resource

Since the filename containing the resources is prepended to the route path within the path files, you will need to define which route file you want to use as your root resource, this will skip the modification of the path value in the resources. To do this, just add a `rootResources` value to the plugin options, and specify the file you wish to use (without the `.js` extension), or multiple files in an array.

**Note:** Make sure the value(s) stored in the `rootResources` value are all lowercase, even if the file itself is uppercase

## Debugging

*Invia* utilizes the npm package *[debug](https://www.npmjs.com/package/debug)* to manage the debugging output. If you want to know whats going on behind the scenes, then you will need to set/update the global variable `DEBUG`. The *debug* namespaces for Invia are:

* `DEBUG=invia:error` - Errors only
* `DEBUG=invia:info` - Informational data only
* `DEBUG=invia:debug` - Debugging data only

If you want to display more than one of the above, then just add the desired namespaces to the `DEBUG` variable using space or comma-delimited format. To view all of them, simply use a wildcard

* `DEBUG=invia:error,invia:info` - Errors only
* `DEBUG=invia:*` - All debug content for Invia
* `DEBUG=*` - All output of every library using the *Debug* plugin

## Todo

* Write unit tests (yeah yeah yeah, I know)