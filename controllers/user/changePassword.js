const user = require( "../../models/user" )
const { createHmac } = require( 'crypto' )
let { ObjectId } = require( 'mongoose' ).Types


const changePassword = async ( req, res ) => {
    try {
        let { id } = req.params
        const { currentPassword, newPassword, confirmPassword } = req.body
        if ( !id || !currentPassword || !newPassword || !confirmPassword || newPassword != confirmPassword )
            return res.status( 400 ).json( { status: "error", message: 'Bad request' } );

        let data = await user.findOne( { _id: new ObjectId( id ) } )
        if ( !data ) return res.status( 400 ).json( { status: "error", message: "User not found" } )
        let salt = data.salt
        let hashedPassword = createHmac( 'sha256', salt ).update( currentPassword ).digest( "hex" )
        if ( data.password != hashedPassword )
            return res.status( 400 ).json( { status: "error", message: "Invalid password" } );

        let newHashedPassword = createHmac( "sha256", salt ).update( newPassword ).digest( "hex" )
        await user.updateOne( { _id: new ObjectId( id ) }, { password: newHashedPassword } )

        return res.status( 200 ).json( { status: "success" } )
    } catch ( error ) {
        return res.status( 500 ).json( { status: "error", message: "Internal server error" } )
    }



}

module.exports = { changePassword }