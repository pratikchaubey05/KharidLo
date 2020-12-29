// Desc: Generating json web token. using jsonwebtoken package

import jwt from "jsonwebtoken" ;

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: "30d"} ) ;
}

export default generateToken ;