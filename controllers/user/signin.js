const User = require( '../../models/user' )

const signin = async ( req, res ) => {
    let { email, password } = req.body;
    try {
        let token = await User.matchPasswordAndGenerateToken( email, password );
        return res.status( 200 ).json( { status: "success", message: "User  signed in successfully.", token: token } );
    } catch ( error ) {
        return res.status( 401 ).json( { status: "error", message: "Invalid email or password." } );
    }
}

module.exports = {
    signin
}