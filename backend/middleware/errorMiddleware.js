// Error handler. Comes from server.js

//Error Handler for 404: This should be last non-error-handler, due to which we assume that no other routes matched.
const notFound = (req, res, next)=>{
    res.status(404);
    const error = new Error(`Not Found-${req.originalUrl}`);
    next(error);
}

// Error Handler: This should be the last middleware and takes 4 args
const errorHandler = (err, req, res, next)=>{
    const statusCode = res.statusCode === 200? 500: res.statusCode ;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production"?null:err.stack
    });
}


export {notFound, errorHandler} ;