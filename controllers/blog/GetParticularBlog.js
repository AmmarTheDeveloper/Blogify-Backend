const Blog = require( '../../models/blog' );

async function GetParticularBlog ( req, res ) {
    try {
        let { id } = req.params;
        const blogs = await Blog.findById( id ).populate( "createdBy" );
        if ( !blogs ) {
            return res.status( 404 ).json( { status: "error", message: "Blog not found" } );
        }
        return res.status( 200 ).json( { status: "success", data: blogs } );
    } catch ( error ) {
        return res.status( 500 ).json( { status: "error", message: "Internal server error" } );
    }
}

module.exports = {
    GetParticularBlog
}