const mongoose = require( 'mongoose' );
const { Schema, model } = mongoose;

const blogSchema = new Schema( {
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
}, { timestamps: true } );

const Blog = model( "blog", blogSchema )

module.exports = Blog