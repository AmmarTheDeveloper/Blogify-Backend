const user = require( '../../models/user' )
require( 'dotenv' ).config()
const { sendEmail } = require( './sendEmail' )
const { otpGen } = require( 'otp-gen-agent' );
const { setCache, getCache } = require( '../../services/redis' )

const OTP_EXPIRY_TIME = 60


const ForgetPassword = async ( req, res ) => {
    try {

        let { email } = req.body
        if ( !email ) res.status( 400 ).json( { status: "error", message: "Bad request" } )

        let existingUser = await user.findOne( { email: email } )
        if ( !existingUser ) return res.status( 404 ).json( { status: "error", message: "User not found." } );

        let existingOTP = await getCache( `otp:${ email }` )
        if ( isValidOTP( existingOTP ) ) {
            return res.status( 200 ).json( { status: "success", message: "OTP already has been sent." } )
        }

        let otp = await generateOTP();
        let otpDataObj = {
            otp: otp,
            expiryTime: new Date( Date.now() + ( OTP_EXPIRY_TIME * 1000 ) ),
            email
        }

        await setCache( `otp:${ email }`, otpDataObj )

        let html = `<h1 style="text-align:center;margin-block:20px;font-size:35px;">Forget Password OTP </h1>
        <p style="font-size:25px;text-align:center;">Your OTP for password reset is: <b>${ otp }</b></p>`

        sendEmail( {
            email: email,
            subject: "Forget Password",
            html: html
        } )

        res.status( 200 ).json( { status: "success", message: "OTP sent on email successfully." } )
    } catch ( error ) {
        res.status( 500 ).json( { status: "error", message: "Internal server error." } )
    }

}

async function generateOTP () {
    const otp = await otpGen();
    return otp;
}

function isValidOTP ( otpObj ) {
    let expiryTime = otpObj?.expiryTime
    let isValid = expiryTime && new Date( expiryTime ) > new Date();
    return isValid;
}

module.exports = { ForgetPassword }