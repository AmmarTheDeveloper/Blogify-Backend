const mongoose = require( 'mongoose' )
const { Schema, model } = mongoose

const CommentSchema = new Schema( {
    blogId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "blog"
    },
    comment: {
        required: true,
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
}, { timestamps: true } )

const CommentModel = model( 'comment', CommentSchema )
module.exports = CommentModel