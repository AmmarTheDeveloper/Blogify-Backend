const { getCache } = require( "../../services/redis" )


const verifyOTP = async ( req, res ) => {

    try {
        let { email, otp } = req.body

        if ( !email || !otp ) return res.status( 404 ).json( { status: "error", message: "OTP or email not found." } )
        let storedOTP = await getCache( `otp:${ email }` )

        if ( isExpired( storedOTP ) ) return res.status( 403 ).json( { status: "error", message: "OTP has been expired." } )
        if ( !isValid( storedOTP, otp ) ) return res.status( 400 ).json( { status: "error", message: "invalid OTP." } )
        req.session.email = email
        req.session.save()
        return res.status( 200 ).json( { status: "success", message: "OTP verification successfull!" } )

    } catch ( error ) {
        return res.status( 500 ).json( { status: "error", message: "Internal server error." } )
    }
}

function isExpired ( storedOTP ) {

    let expiryTime = storedOTP?.expiryTime
    return !storedOTP || new Date( expiryTime ) < new Date()
}

function isValid ( storedOTP, otp ) {
    return parseInt( storedOTP.otp ) === parseInt( otp );
}

module.exports = { verifyOTP }