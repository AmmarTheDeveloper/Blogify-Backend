const { signin } = require( '../controllers/user/signin' )
const { signup } = require( '../controllers/user/signup' )
const { Router } = require( 'express' );
const { verifyUser } = require( '../controllers/user/verifyUser' );
const { updateProfile } = require( '../controllers/user/updateProfile' )
const { ProfileMulter } = require( '../controllers/user/updateProfile' )
const { changePassword } = require( '../controllers/user/changePassword' )
const { ForgetPassword } = require( '../controllers/user/forgetPassword' )
const { verifyOTP } = require( '../controllers/user/verifyOTP' )
const { resetPassword } = require( "../controllers/user/resetPassword" )
const router = Router();
const middleware = require( '../middlewares/verifyUser' );


router.post( '/signin', signin );
router.post( '/signup', signup );
router.post( '/verifyUser', verifyUser );
router.put( '/updateProfile/:id', middleware.verifyUser, ProfileMulter().single( 'profileImage' ), updateProfile );
router.put( '/change-password/:id', middleware.verifyUser, changePassword );
//logged out users can access this api
router.post( '/forget-password', ForgetPassword )
router.post( '/verify-otp', verifyOTP )
router.post( '/reset-password', resetPassword )

module.exports = router;