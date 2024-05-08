const Blog = require( '../../models/blog' );


async function GetBlog ( req, res ) {
    try {
        const blogs = await Blog.find( {} ).populate( "createdBy" );
        return res.status( 200 ).json( { status: "success", data: blogs } );
    } catch ( error ) {
        return res.status( 500 ).json( { status: "error", message: "Internal server error" } );
    }
}

module.exports = {
    GetBlog
}