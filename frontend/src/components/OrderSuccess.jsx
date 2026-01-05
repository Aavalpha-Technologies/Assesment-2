import React from 'react';
import './OrderSuccess.css';

const OrderSuccess = ({ data }) => {
  const handleNewOrder = () => {
    window.location.href = '/Payment';
  };

  // Helper to format money cleanly (e.g., 5400.62)
  const formatMoney = (amount) => {
    return Number(amount).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
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

        {data && (
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '10px', 
            margin: '20px 0', 
            textAlign: 'left',
            border: '1px solid #e9ecef'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Payment Receipt</h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#666' }}>
              <span>Card Type:</span>
              <strong>{data.cardType}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#666' }}>
              <span>Original Amount:</span>
              <span>INR {formatMoney(data.amount)}</span>
            </div>

            {data.discountApplied && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#16a34a', fontWeight: 'bold' }}>
                <span>Discount Applied:</span>
                {/* Fix: Format the calculated discount */}
                <span>- INR {formatMoney(data.amount - data.finalAmount)}</span>
              </div>
            )}

            <div style={{ 
              borderTop: '2px dashed #ccc', 
              marginTop: '15px', 
              paddingTop: '15px', 
              display: 'flex', 
              justifyContent: 'space-between',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: '#2d3748'
            }}>
              <span>Total Paid:</span>
              <span>INR {formatMoney(data.finalAmount)}</span>
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