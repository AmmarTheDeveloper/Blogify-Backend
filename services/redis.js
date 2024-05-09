const { Redis } = require( 'ioredis' )
const redis = connect_to_redis();

function connect_to_redis () {
    try {
        return new Redis( {
            url: process.env.REDIS_URL
        } );
    } catch ( error ) {
        console.log( error )
    }
}

// redis.on( "connect", () => {
//     console.log( "connected successfully" )
// } )


// redis.on( 'error', ( err ) => {
//     console.error( 'Error connecting to Redis:', err );
// } );

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