const { Schema, model } = require( "mongoose" )
const { randomBytes, createHmac } = require( 'crypto' )
const { generateToken } = require( '../services/jwt' );
require( 'dotenv' ).config();

let userSchema = new Schema( {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        // required: true
    },
    profileImage: {
        type: String,
        default: "default.png"
    },
    role: {
        type: String,
        enum: [ 'USER', 'ADMIN' ],
        default: "USER"
    },
}, { timestamps: true } )


userSchema.pre( 'save', function ( next ) {

    let user = this;
    if ( !user.isModified( "password" ) ) return false

    const salt = randomBytes( 16 ).toString();
    this.salt = salt;

    const hashedPassword = createHmac( "sha256", salt )
        .update( user.password )
        .digest( "hex" );

    this.password = hashedPassword;

    next();

} );

userSchema.static( "matchPasswordAndGenerateToken", async ( email, password ) => {
    let data = await User.findOne( { email: email } );
    if ( !data ) throw new Error( "Invalid email or password" );
    let salt = data.salt;
    let hashedPassword = data.password;
    let userProvidedHashedPassword = createHmac( 'sha256', salt )
        .update( password ).digest( "hex" );
    if ( userProvidedHashedPassword == hashedPassword ) {
        //generate token
        let token = generateToken( { _id: data._id, name: data.name, email: data.email, profileImage: data.profileImage, role: data.role } );
        return token;
    }
    //give error password not matched
    throw new Error( "Invalid email or password" );
} )

let User = model( 'user', userSchema );

module.exports = User;