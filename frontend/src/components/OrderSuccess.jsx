import React from 'react';
import './OrderSuccess.css';

const OrderSuccess = ({ paymentData }) => {
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
        
        {paymentData && typeof paymentData.originalAmount === 'number' && typeof paymentData.finalAmount === 'number' && (
          <div className="payment-summary">
            <h3>Payment Details</h3>
            <div className="summary-breakdown">
              <div className="summary-item">
                <span>Original Amount:</span>
                <span>INR {(paymentData.originalAmount || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              {paymentData.discountApplied && typeof paymentData.discountAmount === 'number' && paymentData.discountAmount > 0 && (
                <div className="summary-item discount-item">
                  <span>Discount:</span>
                  <span className="discount-value">
                    -INR {paymentData.discountAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </span>
                </div>
              )}
              <div className="summary-item total-item">
                <span>Amount Paid:</span>
                <span className="final-value">
                  INR {(paymentData.finalAmount || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        )}
        
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
