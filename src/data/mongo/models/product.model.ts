import mongoose from "mongoose";

const productSchema = new mongoose.Schema( {
    name:           {
        type:     String,
        required: [ true, 'Name is required' ]
    },
    available: {
        type:    Boolean,
        default: false
    },
    price: {
        type:    Number,
        default: 0
    },
    descriptions:           {
        type:     String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
} );

export const ProductModel = mongoose.model( 'Product', productSchema );
