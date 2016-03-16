'use strict'

const Confidence = require( 'confidence' )

// Load the confidence.json content into our store
const store = new Confidence.Store(  )

// Load the configuration file into the confidence store
store.load( require( './confidence.json' ) )

// Generate a GUID for the client (on first visit)
const criteria = Confidence.id.criteria( Confidence.id.generate() )

// Check if the id is valid (generated according to the even distribution randomness rules)
if (criteria === null) {
    console.log('Bad id')
    process.exit(1)
}

criteria.env = 'dev'

module.exports = store.get('/', criteria)