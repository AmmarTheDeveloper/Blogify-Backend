const mongoose = require( 'mongoose' )
const { Schema, model } = mongoose

const categorySchema = new Schema( {
    category: { required: true, type: String },
}, { timestamps: true } )

const categoryModel = model( 'category', categorySchema )

module.exports = categoryModel