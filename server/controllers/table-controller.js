/**
 * @file Manages all table functionality.
 * @version 1.1.0
 */
const db = require('../db');
const pool = db.pool;

async function showTables() {
    let client;
    try {
        client = await pool.connect();
        const query = 'SELECT * FROM tables';
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error getting tables from database:', error);
    } finally {
        if (client) {
            client.release(); // Release the client back to the pool
        }
    }
}

//view all tables that are assigned to specific waiter
async function showAssigned(staffId) {
    let client;
    try {
        client = await pool.connect();
        const query = 'SELECT * FROM tables WHERE staff_id = $1';
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        if (client) {
            client.release(); //Release the client back to the pool
        }
    }
};

//customer is given a table
async function assignToTable(customerId) {
    let client;
    try {
        client = await pool.connect(); // Establish Connection

        // Find a free table
        const freeTableQuery = 'SELECT table_number FROM tables WHERE customer_id IS NULL LIMIT 1';
        const freeTableResult = await client.query(freeTableQuery);
        const freeTableId = freeTableResult.rows[0].table_number;
        console.log('table number');
        console.log(freeTableId);
        // Assign the customer to the free table
        const assignCustomerQuery = 'UPDATE tables SET customer_id = $1 WHERE table_number = $2';
        await client.query(assignCustomerQuery, [customerId, freeTableId]);
        return freeTableId;
    } catch (error) {
        console.error('Error assigning customer and waiter:', error);
    } finally {
        client.release(); // Release the client back to the pool
    }
};

async function assignWaiterToTable() {
    let client;
    try {
        client = await pool.connect(); // Establish Connection

        // Find occupied tables without assigned waiters
        const occupiedTablesQuery = 'SELECT table_number, customer_id FROM tables WHERE customer_id IS NOT NULL AND staff_id IS NULL';
        const occupiedTablesResult = await client.query(occupiedTablesQuery);
        
        // For each occupied table without a waiter, assign a waiter
        for (const row of occupiedTablesResult.rows) {
            const tableNumber = row.table_number;
            const customerId = row.customer_id;

            // Find an available waiter
            const availableWaiterQuery = 'SELECT staff_id FROM staff WHERE staff_type = 1 AND staff_id NOT IN (SELECT staff_id FROM tables WHERE staff_id IS NOT NULL)';
            const availableWaiterResult = await client.query(availableWaiterQuery);
            if (availableWaiterResult.rows.length > 0) {
                const waiterId = availableWaiterResult.rows[0].staff_id;

                // Assign the waiter to the table
                const assignWaiterQuery = 'UPDATE tables SET staff_id = $1 WHERE table_number = $2';
                await client.query(assignWaiterQuery, [waiterId, tableNumber]);

                // Return all tables after successful assignment
                return showTables();
            } else {
                console.log('No available waiters.');
            }
        }
    } catch (error) {
        console.error('Error assigning waiter to table:', error);
    } finally {
        client.release(); // Release the client back to the pool
    }
}

module.exports = { showTables, showAssigned, assignToTable, assignWaiterToTable }