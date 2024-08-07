const express = require( 'express' );
const app = express();
const mongoose = require( 'mongoose' )
const usersRouter = require( './routes/users' )
const blogsRouter = require( "./routes/blogs" )
const cors = require( 'cors' );
const session = require( 'express-session' )
const MongoStore = require( 'connect-mongo' );
require( 'dotenv' ).config();
const redisService = require( './services/redis' )

const PORT = process.env.PORT || 5000;

mongoose.connect( process.env.DB_CONNECTION )
    .then( () => console.log( "db connected successfully", ) );

app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) )
app.use( express.static( __dirname + "/public" ) );
app.use( cors( {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: [ "GET", "POST", "PUT", "DELETE" ]
} ) );
app.set( "trust proxy", 1 ); // trust first proxy
app.use( session( {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    proxy: true,
    name: 'BlogifyCookie',
    store: MongoStore.create( {
        client: mongoose.connection.getClient()
    } ),
    cookie: {
        secure: true,
        httpOnly: true,
        sameSite: 'none'
    }

} ) )

app.use( "/users", usersRouter );
app.use( "/blogs", blogsRouter );

app.listen( PORT, '0.0.0.0', () => {
    console.log( `server is running on port ${ PORT }` );
} );
