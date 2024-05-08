const Blog = require( '../../models/blog' );

async function UserBlog ( req, res ) {
    try {
        const blogs = await Blog.find( { createdBy: req.user._id } ).populate( "createdBy" );
        return res.status( 200 ).json( { status: "success", data: blogs } );
    } catch ( error ) {
        return res.status( 500 ).json( { status: "error", message: "Internal server error" } );
    }
}

module.exports = {
    UserBlog
}