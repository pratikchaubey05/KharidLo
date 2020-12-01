// * Defining schema and model for order collection in mongoDB

import mongoose from "mongoose" ;


// schema for collection is being defined
const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // Here ref tells mongoose which model to use for population. all _id we store here must be a document _id from the User model.(adds relationship between User and order)
        ref: "User"
    },
    orderItems: [
        {
            name: {type: String, required: true},
            qty: {type: Number, required: true},
            image: {type: String, required: true},
            price: {type: Number, required: true},
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Product"
            }
        }
    ],
    shippingAddress: {
        address: {type: String, required: true},
        city: {type: String, required: true},
        pincode: {type: String, required: true},
        country: {type: String, required: true},
    },
    paymentMethod:{
        type: String,
        required: true
    },
    paymentResult:{
        id: {type: String},
        status: {type: String},
        update_time: {type: String},
        email_address: {type: String}
    },
    taxPrice:{
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice:{
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice:{
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid:{
        type: Boolean,
        required: true,
        default: false
    },
    paidAt:{
        type: Date
    },
    isDelivered:{
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt:{
        type: Date
    }

},{
    timestamps: true
});

// compiling the model based on above schema
const Order = mongoose.model("Order", orderSchema);

export default Order ;