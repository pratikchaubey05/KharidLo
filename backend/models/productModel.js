// * Defining schema and model for product collection in mongoDB

import mongoose from "mongoose" ;

// reviewSchema is defined and used for review property in below product schema
const reviewSchema = mongoose.Schema({
    name : {type: String, required: true},
    rating : {type: Number, required: true},
    comment : {type: String, required: true}
},{
    timestamps: true
});

// schema for collection is being defined
const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // Here ref tells mongoose which model to use for population. all _id we store here must be a document _id from the User model.(adds relationship between User and Product)
        ref: "User"
    },

    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default:0
    },
    price: {
        type: Number,
        required: true,
        default:0
    },
    countInStock: {
        type: Number,
        required: true,
        default:0
    }

},{
    timestamps: true
});

// compiling the model based on above schema
const Product = mongoose.model("Product", productSchema);

export default Product ;