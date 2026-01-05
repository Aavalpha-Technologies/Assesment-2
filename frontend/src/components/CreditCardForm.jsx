import React, { useState } from 'react';
import './CreditCardForm.css';

const CreditCardForm = ({ totalAmount, onSuccess, onBack }) => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      const cleaned = value.replace(/\D/g, '');
      formattedValue = cleaned.replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    } else if (name === 'expiry') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length >= 2) {
        formattedValue = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
      } else {
        formattedValue = cleaned;
      }
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (cardDetails.cardNumber.replace(/\s/g, '').length < 13) newErrors.cardNumber = 'Invalid card number';
    if (cardDetails.expiry.length !== 5) newErrors.expiry = 'Invalid expiry';
    if (cardDetails.cvv.length < 3) newErrors.cvv = 'Invalid CVV';
    if (!cardDetails.name) newErrors.name = 'Name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setServerError('');

    try {
      // 1. POINT TO CORRECT PORT (5084)
      const response = await fetch('http://localhost:5084/Payments/Pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalAmount,
          // 2. SEND FLAT DATA (Matches C# PaymentRequest)
          cardNumber: cardDetails.cardNumber.replace(/\s/g, ''),
          expiry: cardDetails.expiry,
          cvv: cardDetails.cvv
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // 3. PASS DATA TO PARENT
        onSuccess(data); 
      } else {
        setServerError('Payment failed. Please check your details.');
      }
    } catch (err) {
      console.error(err);
      setServerError('Unable to connect to server. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-form-container">
      <h3>Enter Card Details</h3>
      <p className="amount-display">Total to Pay: INR {totalAmount.toLocaleString('en-IN')}</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={cardDetails.cardNumber}
            onChange={handleInputChange}
            placeholder="0000 0000 0000 0000"
            className={errors.cardNumber ? 'error' : ''}
          />
          {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Expiry (MM/YY)</label>
            <input
              type="text"
              name="expiry"
              value={cardDetails.expiry}
              onChange={handleInputChange}
              placeholder="MM/YY"
              maxLength="5"
              className={errors.expiry ? 'error' : ''}
            />
          </div>
          <div className="form-group">
            <label>CVV</label>
            <input
              type="password"
              name="cvv"
              value={cardDetails.cvv}
              onChange={handleInputChange}
              placeholder="123"
              maxLength="4"
              className={errors.cvv ? 'error' : ''}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Cardholder Name</label>
          <input
            type="text"
            name="name"
            value={cardDetails.name}
            onChange={handleInputChange}
            placeholder="Name on card"
            className={errors.name ? 'error' : ''}
          />
        </div>

        {serverError && <div className="server-error">{serverError}</div>}

        <div className="button-group">
          <button type="button" onClick={onBack} className="back-button" disabled={loading}>Back</button>
          <button type="submit" className="pay-submit-button" disabled={loading}>
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreditCardForm;