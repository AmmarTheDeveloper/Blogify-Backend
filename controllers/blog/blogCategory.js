const Category = require( '../../models/blog-category' )

async function blogCategory ( req, res ) {

    try {
        const categoryList = await Category.find()
        res.status( 200 ).json( { status: "success", categoryList } )
    } catch ( error ) {
        res.status( 500 ).json( { status: "error", message: "Internal Server Error" } )
    }

}

module.exports = { blogCategory }