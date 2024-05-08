const Blog = require( '../../models/blog' )

const DeleteBlog = async ( req, res ) => {
    let blogId = req.params.blogId
    try {
        await Blog.deleteOne( { _id: blogId } );
        res.status( 200 ).json( { status: "success" } )
    } catch ( error ) {
        res.status( 500 ).json( { status: "error" } )
    }
}

module.exports = { DeleteBlog }