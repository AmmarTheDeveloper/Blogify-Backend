const comment = require( '../../models/comment' )
const { ObjectId } = require( 'mongodb' )

async function removeComment ( req, res ) {
    let { id } = req.params
    try {
        let isValidUser = await comment.findOne( { _id: new ObjectId( id ), createdBy: new ObjectId( req.user._id ) } )
        if ( !isValidUser ) {
            return res.status( 401 ).json( { status: "error", message: "Unauthorized user" } )
        }
        await comment.deleteOne( { _id: new ObjectId( id ) } )
        return res.status( 200 ).json( { status: "success", message: "Comment deleted successfully!" } )
    } catch ( error ) {
        return res.status( 500 ).json( { status: "error", message: "Internal server error" } )
    }
}

module.exports = { removeComment }