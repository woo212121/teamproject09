/**
 * @file customer-controller.js manages all customer functionality.
 * @module server/customer
 * @version 2.0.0
 */
const db = require('../db');
const pool = db.pool;
const tableController = require('../controllers/table-controller');

/**
 * Function to add a new customer to the database.
 * A table is also automatically assigned to the customer when they register.
 * 
 * @param {string} customerName The name of the new customer.
 * @param {string} customerAllergies The allergies the new customer has.
 * @returns {json} The CustomerId and tableNumber.
 */
async function addCustomer(customerName, customerAllergies) { // Function to add a new customer to the database
    let client;
    try {
        console.log('Connecting to database');
        client = await pool.connect();
        console.log('Connected to the database');
        const result = await client.query('INSERT INTO customer (customer_name, customer_allergies) VALUES ($1, $2) RETURNING customer_id', [customerName, customerAllergies]);
        const customerId = result.rows[0].customer_id;
        console.log(customerId);
        console.log('Customer added to table');
        tableNumber = await tableController.assignToTable(customerId);
        return {customerId, tableNumber};
      } catch (error) {
        throw new Error(`Error submitting help request: ${error.message}`);
      } finally {
        if (client) {
          console.log('client released');
          client.release();
        }
      }
};

module.exports = {addCustomer}