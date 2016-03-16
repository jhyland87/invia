'use strict'

const Actin = require('actin')

const AutoLoader = new Actin()

const Controllers = AutoLoader.controllersSync({
    capitalize: true,
    extension: '.js',
    folderName: './controllers',
    ignoreFiles: [],
    onLoadSync: controllers => controllers,
    pattern: '*'
})

module.exports = Controllers