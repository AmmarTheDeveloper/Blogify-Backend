const jwt = require( 'jsonwebtoken' );
require( 'dotenv' ).config();


const generateToken = ( user ) => {
    let payload = {
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
        _id: user._id
    };
    let token = jwt.sign( payload, process.env.JWT_SECRET );
    return token;
}

const verifyToken = ( token ) => {
    let payload = jwt.verify( token, process.env.JWT_SECRET );
    return payload;
}

module.exports = {
    generateToken,
    verifyToken
}