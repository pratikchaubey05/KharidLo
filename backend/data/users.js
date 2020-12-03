// sample user data for mongodb

import bcrypt from "bcryptjs" ;


const users = [
    {
        name: "Admin User",
        email: "admin@xyz.com",
        // normally we do this asynchronsily but here as we are just importing this data therefore we are using following way
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true
    },
    {
        name: "ram",
        email: "ram@xyz.com",
        password: bcrypt.hashSync("123456", 10)
    },
    {
        name: "sham",
        email: "sham@xyz.com",
        password: bcrypt.hashSync("123456", 10)
    },
]


export default users ;