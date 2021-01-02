// Main desc: Functionality to place an order received from frontend
//Dedicated controllers to handle the functionality. This has been done to make code cleaner

// desc: As mongoose returns promise and to Handle exception/error we want to avoid writting try and catch. hence this.
import asynchandler from "express-async-handler" ;
import Order from "../models/orderModel.js" ;

// @Desc   Create new order
// @route  POST /api/orders
// @access Private

const addOrderItems = asynchandler(async (req, res) => {
    const {orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body ;

    if(orderItems && orderItems.length ===0){
        res.status(400); //bad request
        throw new Error("No Order items");
        return ;
    }else{
        const order = new Order({
            orderItems,
            user: req.user._id, 
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});

export {addOrderItems} ;