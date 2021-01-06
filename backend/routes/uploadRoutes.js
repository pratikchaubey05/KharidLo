// Desc: Route to upload a file. Multer config and validation

import express from "express";
// This is used to get extension of the file
import path from "path";
import multer from "multer";

const router = express.Router();

//Initialising and config storage engine
const storage = multer.diskStorage({
    destination(req, file, cb){
        // null: as there are no errors and where we want to upload
        cb(null, "uploads/");  
    },
    filename(req, file, cb){
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }

})

function checkFileType (file, cb){
    // using regexpression
    const filetypes = /jpg|jpeg|png/  ;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Every file has a mimetype
    const mimetype = filetypes.test(file.mimetype);
    if(extname && mimetype){
        return cb(null, true) ;
    }else{
        return cb("images only!");
    }
}


// This is the middleware we are going to pass to our route
const upload = multer({
    storage,
    //This filters and allows only specific type of files
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
})
// api /upload
router.post("/", upload.single("image"), (req, res) => {
    res.send(`/${req.file.path}`)
}) ;

export default router ;