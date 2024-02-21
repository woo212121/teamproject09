/**
 * @file Core script of the api. Starts server and manages ports and routes.
 * @version 1.2.2
 */
//initializing dependencies and constants needed for the api.
const express = require('express');
const pool = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 9000;
const app = express();
const staffRoute = require('./routes/staff-routes');
const menuRoute = require('./routes/menu-routes');
const orderRoute = require('./routes/order-routes');

//middleware
app.use(express.json());
app.use(bodyParser.json())
app.use(cors())

//staff login endpoints
app.use('/signin', staffRoute);
app.use('/signin/create-account', staffRoute);

//menu endpoints
app.use('/menu', menuRoute);
app.use('/menu/filter-allergens',menuRoute);
app.use('/menu/filter-calories', menuRoute);
app.use('/menu/create-item', menuRoute);
app.use('/menu/delete-item', menuRoute);

//order enpoints
app.use('order/cancel-order', orderRoute);
app.use('order', orderRoute);
app.use('order/mark-delivered', orderRoute);

/**
 * Listens for connections on port 9000 and
 * initializes http server if found.
 */
app.listen(port, function (err){
  if (err) console.log(err);
  console.log(`Server listening on Port: ${port}`);
});
