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


// @Desc   Get order by Id
// @route  GET /api/orders/:id
// @access Private

const getOrderById = asynchandler(async (req, res) => {
    // Populate() is being used to get data from another collection
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if(order){
        res.json(order);
    }else{
        res.status(404);
        throw new Error("Order Not Found!");
    }

});

// @Desc   Update order to paid
// @route  PUT /api/orders/:id/pay
// @access Private

const updateOrderToPaid = asynchandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    }else{
        res.status(404);
        throw new Error("Order Not Found!");
    }

});


// @Desc   Update order to our for delivery
// @route  PUT /api/orders/:id/deliver
// @access Private/Admin

const updateOrderToDelivered = asynchandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if(order){
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    }else{
        res.status(404);
        throw new Error("Order Not Found!");
    }

});



// @Desc   Get logged-in user orders
// @route  GET /api/orders/myorders
// @access Private

const getMyOrders = asynchandler(async (req, res) => {
    const orders = await Order.find({user: req.user._id});

    res.json(orders);

});


// @Desc   Get all orders
// @route  GET /api/orders
// @access Private/Admin

const getOrders = asynchandler(async (req, res) => {
    const orders = await Order.find({}).populate("user", "id name");

    res.json(orders);

});


export {addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered} ;