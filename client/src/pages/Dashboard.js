import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:9000/order/fetch-all');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

   // Function to format date and time
   const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString(); // Adjust toLocaleString parameters for custom formatting
  };

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="header-stats">
        <div className="stat-item">Total Orders: {orders.length}</div>
      </div>

      <div>
        <Helmet>
          <title>Oaxaca | Dashboard</title>
        </Helmet>
      </div>

      <div className="order-status">
        <h2>Order Information</h2>
        <div className="order-status-table">
          <div className="order-status-header-item">Order ID</div>
          <div className="order-status-header-item">Waiter</div>
          <div className="order-status-header-item">Time</div>
          <div className="order-status-header-item">Items</div>
          <div className="order-status-header-item">Price</div>
          <div className="order-status-header-item">Order Status</div>
        </div>
        <div className="order-status-content">
          {orders.map(order => (
            <div key={order.order_id} className="order-status-row">
              <div>{order.order_id}</div>
              <div>{order.staff_name}</div>
              <div>{formatDateTime(order.order_time)}</div> {/* Format date and time here */}
              {/*convert array of items to string*/}
              <div>
                {order.items.map(item => (
                  <div key={item.dish_id}>
                    {item.dish_name} x {item.quantity}
                  </div>
                ))}
              </div>
              <div>{order.totalOrderPrice}</div> {/* Display totalOrderPrice */}
              <div>{order.order_status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
