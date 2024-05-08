const { Router } = require( 'express' );
const router = Router();
const { verifyUser } = require( '../middlewares/verifyUser' );
const { AddBlog, uploadCoverImage } = require( '../controllers/blog/AddBlog' );
const { GetBlog } = require( '../controllers/blog/GetBlog' );
const { GetParticularBlog } = require( '../controllers/blog/GetParticularBlog' );
const { UserBlog } = require( '../controllers/blog/UserBlog' );
const { blogCategory } = require( '../controllers/blog/blogCategory' );
const { DeleteBlog } = require( '../controllers/blog/DeleteBlog' );
const { UpdateBlog, updateCoverImage } = require( '../controllers/blog/UpdateBlog' );
const commentRouter = require( './comment' )

//blog category api
router.get( '/blogCategory', verifyUser, blogCategory );
//particular user all blogs api
router.get( '/u', verifyUser, UserBlog );
//all blogs api
router.get( '/getblog', GetBlog );
//particular blog api
router.get( '/getblog/:id', GetParticularBlog );
//creating blog api
router.post( '/addblog', verifyUser, uploadCoverImage().single( "coverImage" ), AddBlog );
//deleting blog api
router.delete( '/delete-blog/:blogId', verifyUser, DeleteBlog )
//updating blog api
router.put( '/update-blog/:id', verifyUser, updateCoverImage().single( "coverImage" ), UpdateBlog )

router.use( commentRouter )

module.exports = router;