import React, { useState } from 'react';
import CreditCardForm from '../components/CreditCardForm';
import OrderSuccess from '../components/OrderSuccess';
import './Payment.css';

const Payment = () => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const basketItems = [
    { id: 1, name: 'Laptop', price: 76000 },
    { id: 2, name: 'KeyBoard', price: 3000 },
    { id: 3, name: 'Headphones', price: 12536 },
  ];

  const subtotal = basketItems.reduce((sum, item) => sum + item.price, 0);
  const gstRate = 0.18;
  const gstAmount = subtotal * gstRate;
  const totalWithGST = subtotal + gstAmount;

  const handlePayClick = () => {
    setShowPaymentForm(true);
  };

  const handlePaymentSuccess = () => {
    setOrderPlaced(true);
  };

  const handleBackToBasket = () => {
    setShowPaymentForm(false);
  };

  if (orderPlaced) {
    return <OrderSuccess />;
  }

  if (showPaymentForm) {
    return (
      <CreditCardForm 
        totalAmount={totalWithGST}
        onSuccess={handlePaymentSuccess}
        onBack={handleBackToBasket}
      />
    );
  }

  return (
    <div className="payment-container">
      <div className="basket-card">
        <h2>Shopping Basket</h2>
        <div className="basket-items">
          {basketItems.map((item) => (
            <div key={item.id} className="basket-item">
              <span className="item-name">{item.name}</span>
              <span className="item-price">INR {item.price.toLocaleString('en-IN')}</span>
            </div>
          ))}
        </div>
        
        <div className="basket-summary">
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>INR {subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="summary-row">
            <span>GST (18%):</span>
            <span>INR {gstAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
          </div>
          <div className="summary-row total">
            <span>Total with GST:</span>
            <span>INR {totalWithGST.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
          </div>
        </div>

        <button className="pay-button" onClick={handlePayClick}>
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default Payment;
