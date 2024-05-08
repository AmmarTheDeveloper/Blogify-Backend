const comment = require( '../../models/comment' )
const { ObjectId } = require( 'mongodb' )

async function allComment ( req, res ) {
    let { id } = req.params
    try {
        const comments = await comment.find( { blogId: new ObjectId( id ) } ).populate( "createdBy" )
        res.status( 200 ).json( { status: "success", comments } )
    } catch ( error ) {
        res.status( 500 ).json( { status: "error" } )
    }
}

module.exports = { allComment }