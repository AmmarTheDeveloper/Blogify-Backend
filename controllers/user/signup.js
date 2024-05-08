const User = require( "../../models/user" );


const signup = async ( req, res ) => {
    let { name, email, password } = req.body;
    try {
        await User.create( {
            name: name,
            email: email,
            password: password
        } )
        res.status( 200 ).json( { status: "success", message: "Signedup successfully." } );
    } catch ( error ) {
        // console.log( "error occured while signingup", error );
        res.status( 404 ).json( { status: "error", message: "Invalid input or email already exist" } )
    }

}

module.exports = {
    signup
}