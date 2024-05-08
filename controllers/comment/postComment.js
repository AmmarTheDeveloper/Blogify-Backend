const comment = require( '../../models/comment' )
const { ObjectId } = require( 'mongodb' )

async function postComment ( req, res ) {
    try {
        let data = req.body
        await comment.create( {
            comment: data.comment,
            createdBy: new ObjectId( req.user._id ),
            blogId: new ObjectId( data.blogId )
        } )
        res.status( 200 ).json( { status: "success" } )
    } catch ( error ) {
        res.status( 500 ).json( { status: "error" } )
    }
}

module.exports = { postComment }