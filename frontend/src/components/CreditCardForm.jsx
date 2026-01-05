import React, { useState } from 'react';
import './CreditCardForm.css';

const CreditCardForm = ({ totalAmount, onSuccess, onBack }) => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    return cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
  };

  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value.slice(0, 19));
    } else if (name === 'expiry') {
      formattedValue = formatExpiry(value.slice(0, 5));
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setCardDetails({ ...cardDetails, [name]: formattedValue });
    setError('');
  };

  const validateForm = () => {
    const cardNumberClean = cardDetails.cardNumber.replace(/\s/g, '');

    if (cardNumberClean.length !== 16) {
      setError('Card number must be 16 digits');
      return false;
    }

    const [mm] = cardDetails.expiry.split('/');
    if (!mm || Number(mm) < 1 || Number(mm) > 12) {
      setError('Expiry month must be between 01 and 12');
      return false;
    }

    if (cardDetails.cvv.length !== 3) {
      setError('CVV must be 3 digits');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5084/Payments/Pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalAmount,
          cardDetails: {
            cardNumber: cardDetails.cardNumber.replace(/\s/g, ''),
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Payment failed');
      }

      const data = await response.json();

      onSuccess(data); // ✅ PASS BACKEND RESPONSE
    } catch (err) {
      setError(err.message || 'Unable to connect to payment server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <div className="credit-card-form">
        <h2>Enter Card Details</h2>

        <div className="amount-display">
          <span>Amount to Pay:</span>
          <span className="amount">
            INR {totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.cardNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>CVV</label>
              <input
                type="text"
                name="cvv"
                placeholder="123"
                value={cardDetails.cvv}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="button-group">
            <button
              type="button"
              className="back-button"
              onClick={onBack}
              disabled={loading}
            >
              Back
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreditCardForm;
