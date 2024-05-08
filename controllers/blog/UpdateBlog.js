const Blog = require( '../../models/blog' )
const { ObjectId } = require( 'mongodb' )
const multer = require( 'multer' )


const UpdateBlog = async ( req, res ) => {
    let { id } = req.params
    let { title, category, body } = req.body

    try {
        await Blog.updateOne( { _id: new ObjectId( id ) }, { title, category, description: body } )
        res.status( 200 ).json( { status: "success" } )
    } catch ( error ) {
        res.status( 500 ).json( { status: "error" } )
    }
}


function updateCoverImage () {

    const storage = multer.diskStorage( {
        destination: function ( req, file, cb ) {
            cb( null, './public/uploads/coverImage/' )
        },
        filename: async function ( req, file, cb ) {
            let id = req.params.id
            let blog = await Blog.findOne( { _id: new ObjectId( id ) } )
            cb( null, blog.coverImage )
        }
    } )

    const upload = multer( { storage: storage } )
    return upload
}

module.exports = { UpdateBlog, updateCoverImage }