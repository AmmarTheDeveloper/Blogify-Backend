const Blog = require( '../../models/blog' );
const multer = require( "multer" );

async function AddBlog ( req, res ) {

    let { title, body, category } = req.body
    let file = req.file
    if ( !file ) return res.status( 404 ).json( { status: "error", message: "Cover image not found" } );
    try {
        await Blog.create(
            {
                title: title,
                category: category,
                body: body,
                coverImage: `${ req.file.filename }`,
                createdBy: req.user._id
            }
        );
        return res.status( 200 ).json( { status: "success", message: "Blog created successfully." } );
    } catch ( error ) {
        // console.log( error );
        return res.status( 404 ).json( { status: "error", message: "Fill required fields." } );
    }

}

function uploadCoverImage () {

    const storage = multer.diskStorage( {
        destination: function ( req, file, cb ) {
            cb( null, './public/uploads/coverImage/' )
        },
        filename: function ( req, file, cb ) {
            const uniqueSuffix = Date.now() + "-" + file.originalname
            cb( null, file.fieldname + '-' + uniqueSuffix )
        }
    } )

    const upload = multer( { storage: storage } )
    return upload
}

module.exports = {
    AddBlog,
    uploadCoverImage
}