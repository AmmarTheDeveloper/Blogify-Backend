const { verifyToken } = require( "../../services/jwt" );

const verifyUser = ( req, res ) => {
    try {
        let token = req.headers[ 'authorization' ].split( " " )[ 1 ];
        if ( !token ) return res.status( 404 ).json( { status: "error", message: "Invalid token" } );
        let payload = verifyToken( token );
        return res.status( 200 ).json( { status: "success", message: "User is verified", payload } );
    } catch ( error ) {
        return res.status( 404 ).json( { status: "error", message: "Invalid token" } );
    }
}

module.exports = {
    verifyUser
}