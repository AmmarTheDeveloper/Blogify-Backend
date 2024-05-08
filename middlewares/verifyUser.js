const { verifyToken } = require( "../services/jwt" );

const verifyUser = ( req, res, next ) => {

    try {
        let token = req.headers[ 'authorization' ].split( " " )[ 1 ];
        if ( !token ) return res.status( 404 ).json( { status: "error", message: "Token not fo und." } );
        let payload = verifyToken( token );
        req.user = payload;
        next();
    } catch ( error ) {
        console.log( error )
        return res.status( 401 ).json( { status: "error", message: "Invalid token" } );
    }

}

module.exports = {
    verifyUser
}