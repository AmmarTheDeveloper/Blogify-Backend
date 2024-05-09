const { Redis } = require( 'ioredis' )
const redis = new Redis( process.env.REDIS_URL );


redis.on( "connect", () => {
    console.log( "connected successfully" )
} )


redis.on( 'error', ( err ) => {
    console.error( 'Error connecting to Redis:', err );
} );

async function setCache ( key, value ) {
    try {
        await redis.set( key, JSON.stringify( value ) );
    } catch ( error ) {
        throw error;
    }
}

async function getCache ( key ) {
    try {
        let data = await redis.get( key )
        return JSON.parse( data );
    } catch ( error ) {
        throw error;
    }
}

module.exports = { setCache, getCache }