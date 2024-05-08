const { Router } = require( 'express' )
const router = Router()
const { allComment } = require( '../controllers/comment/allComment' )
const { removeComment } = require( '../controllers/comment/removeComment' )
const { postComment } = require( '../controllers/comment/postComment' )
const { verifyUser } = require( '../middlewares/verifyUser' );

//list all the comments using below api
router.get( '/comment/:id', allComment )

//post or create comment  using below api
router.post( '/post-comment', verifyUser, postComment )

//remove or delete api from below api with the user who is created that comment
router.delete( '/remove-comment/:id', verifyUser, removeComment )

module.exports = router
