# KharidLo

KharidLo is a full fledged simple E-Commerce web-Application which is developed from scratch using MERN Stack.
The WebApp offers all the necessary working functionality which is necessary in an E-Commerce website with a simplistic UI design and easily understandable elements it provides a seamless operability experience. Ofcourse it has space and areas for improvement as it is a project in progress.
(Mongoose is used as ODM).

## Demo
Visit: https://kharidlo.herokuapp.com/

## Features
* Product Details (With reviews and ratings features)
* Popular products carousel on Homepage
* Full featured shopping cart 
* Product pagination
* Product search feature
* Place Order/ Checkout process (Include Add Address, Add Payment Mode, Review Order)
* User profile with orders and Update Profile
* PayPal / credit card integration for payment
### Admin Pages
* Admin product management
* Admin user management
* Admin Order details page
* Mark orders as delivered option
### To Add sample data
* Database seeder (products & users)

... And  Many more!

## Getting Started

### ES Modules in Node
I have used ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.
Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error.You can also install and setup Babel if you would like

### Env Variable
Install dotenv package and create a .env file in the root dir. of your project and add the following.

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
```
### Install dependencies (Frontend & Backend)
```
npm install
cd frontend
npm install
```
### Running App
```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```
### Seed Database
```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

## THANK YOU!!!
