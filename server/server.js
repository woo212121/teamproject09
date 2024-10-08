/**
 * @file server.js is the core script of the API. Starts server and manages ports and routes.
 * @module server
 * @version 1.2.4
 */


//initializing dependencies and constants needed for the api.
const express = require('express')
const pool = require('./db')
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 9000
const app = express()
const staffRoute = require('./routes/staff-routes')
const menuRoute = require('./routes/menu-routes')
const orderRoute = require('./routes/order-routes')
const helpRoute = require('./routes/help-routes')
const tableRoute = require('./routes/table-routes')
const paymentRoute = require('./routes/payment-routes')
const customerRoute = require('./routes/customer-routes')

//middleware
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

/**
 * @function Staff login endpoints
 */
app.use('/signin', staffRoute)
app.use('/signin/create-account', staffRoute)

/**
 * @function Menu endpoints
 */
app.use('/menu', menuRoute)
app.use('/menu/filter-allergens', menuRoute)
//app.use('/menu/filter-calories', menuRoute)
app.use('/menu/create-item', menuRoute)
app.use('/menu/delete-item', menuRoute)

/**
 * @function Order endpoints
 */
app.use('/order/cancel-order', orderRoute)
app.use('/order', orderRoute)
app.use('order/mark-status', orderRoute)
app.use('/order/get-delivered', orderRoute)
app.use('/order/get-pending-orders', orderRoute)
app.use('/order/fetch-all', orderRoute)
app.use('/order/customer-order', orderRoute)
app.use('/order/status', orderRoute)

/**
 * @function Help endpoints
 */
app.use('/help', helpRoute)
app.use('/help/retrieve', helpRoute)
app.use('/help/resolve', helpRoute)

/**
 * @function Table endpoints
 */
app.use('/table', tableRoute)//see all tables
app.use('/table/view-assigned', tableRoute)//see all tables assigned to a specific staff member
app.use('/table/assign', tableRoute)//assigns staff and customer to a table
app.use('/table/assign-waiter', tableRoute)//assign a waiter to a table that is occupied but has no waiter yet
app.use('/table/clear', tableRoute)//clear a table once done to let new customers to be assigned
app.use('table/status', tableRoute)

/**
 * @function Payment endpoints
 */
app.use('/payment', paymentRoute)
app.use('/payment/get-info', paymentRoute)

/**
 * @function Customer endpoints
 */
app.use('/customer', customerRoute)

/**
 * @function initializes server
 * Listens for connections on port 9000 and
 * initializes http server if found.
 */
app.listen(port, function (err) {
  if (err) console.log(err)
  console.log(`Server listening on Port: ${port}`)
})
