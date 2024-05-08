const multer = require( "multer" );
const user = require( '../../models/user' );
const { ObjectId } = require( "mongoose" ).Types;
const { generateToken } = require( '../../services/jwt' )



const updateProfile = async ( req, res ) => {

    try {

        let { name } = req.body
        let { id } = req.params

        if ( !name || !id ) {
            return res.status( 400 ).json( { status: "error", message: "Bad request" } );
        }

        let updateFields = { name }

        if ( req.isImageUpdated ) {
            updateFields.profileImage = req.file.filename
        }



        let isUserAvailable = await user.findOneAndUpdate( { _id: new ObjectId( id ) }, { $set: updateFields } )

        if ( !isUserAvailable ) return res.status( 404 ).json( { status: "error", message: "User not found." } )

        let data = await user.findOne( { _id: new ObjectId( id ) } )


        let token = generateToken( { _id: data._id, name: data.name, email: data.email, profileImage: data.profileImage, role: data.role } );

        return res.status( 200 ).json( { status: "success", token } )
    } catch ( error ) {
        console.log( error )
        return res.status( 500 ).json( { status: "error", message: 'Internal server error' } )
    }


}


const ProfileMulter = () => {

    const storage = multer.diskStorage( {

        destination: function ( req, file, cb ) {
            cb( null, './public/uploads/profile/' )
        },

        filename: async function ( req, file, cb ) {

            try {
                let id = req.params.id
                let userData = await user.findOne( { _id: new ObjectId( id ) } )

                let filename;

                if ( userData.profileImage == "default.png" ) {
                    const uniqueSuffix = Date.now() + "-" + file.originalname
                    filename = file.fieldname + "-" + uniqueSuffix
                    req.isImageUpdated = true
                } else {
                    filename = userData.profileImage
                    req.isImageUpdated = false
                }
                cb( null, filename )
            } catch ( error ) {
                cb( error )
            }
        }
    } )

    const upload = multer( { storage: storage } )
    return upload

}

module.exports = { ProfileMulter, updateProfile }