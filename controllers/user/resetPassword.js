const user = require( '../../models/user' )
const { createHmac } = require( "crypto" )

const resetPassword = async ( req, res ) => {
    try {
        let { password } = req.body
        let { email } = req.session
        console.log( email, password )
        if ( !password || !email )
            return res.status( 404 ).json( { status: "error", message: "Email or password are not provided." } )
        let data = await user.findOne( { email: email } )
        if ( !data ) return res.status( 404 ).json( { status: "error", message: "User not found." } )
        let hashedPassword = createHmac( "sha256", data.salt ).update( password ).digest( "hex" )
        await user.updateOne( { email }, { $set: { password: hashedPassword } } )
        return res.status( 200 ).json( { status: "success", message: "Password reset successfully." } )
    } catch ( error ) {
        return res.status( 500 ).json( { status: "error", message: "Internal server error." } )
    }

}

module.exports = { resetPassword }