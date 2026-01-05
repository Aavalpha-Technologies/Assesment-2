import React from 'react';
import './OrderSuccess.css';

const OrderSuccess = ({ data }) => {
  const handleNewOrder = () => window.location.href = '/Payment';

  const formatMoney = (amount) => Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="payment-container">
      <div className="success-card">
        <div className="success-icon">✅</div>
        <h1>Order Placed Successfully!</h1>

        {/* RECEIPT SECTION */}
        {data && (
          <div className="receipt-box" style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', margin: '20px 0', textAlign: 'left', border: '1px solid #dee2e6' }}>
            <h3 style={{ marginTop: 0, color: '#495057' }}>Payment Receipt</h3>
            <p><strong>Card Type:</strong> {data.cardType}</p>
            <p><strong>Original Amount:</strong> INR {formatMoney(data.amount)}</p>
            
            {data.discountApplied && (
              <p style={{ color: 'green' }}>
                <strong>Discount (5% / 10%):</strong> - INR {formatMoney(data.amount - data.finalAmount)}
              </p>
            )}
            
            <div style={{ borderTop: '2px dashed #adb5bd', marginTop: '10px', paddingTop: '10px' }}>
              <p style={{ fontSize: '1.2em', margin: 0 }}><strong>Total Paid: INR {formatMoney(data.finalAmount)}</strong></p>
            </div>
          </div>
        )}

        <button className="new-order-button" onClick={handleNewOrder}>Place New Order</button>
      </div>
    </div>
  );
};

export default OrderSuccess;