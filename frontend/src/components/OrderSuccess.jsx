import React from 'react';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const handleNewOrder = () => {
    window.location.href = '/Payment';
  };

  return (
    <div className="payment-container">
      <div className="success-card">
        <div className="success-icon">
          <svg 
            width="80" 
            height="80" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        
        <h1>Order Placed Successfully!</h1>
        
        <p className="thank-you-message">
          Thank you for your purchase. Your order has been confirmed and will be processed shortly.
        </p>
        
        <p className="details-message">
          You will receive a confirmation email with your order details and tracking information.
        </p>
        
        <button className="new-order-button" onClick={handleNewOrder}>
          Place New Order
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
