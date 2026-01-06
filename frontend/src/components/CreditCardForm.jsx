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
  const [paymentResult, setPaymentResult] = useState(null);

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
      formattedValue = formatCardNumber(value.replace(/\s/g, '').slice(0, 16));
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
    if (cardNumberClean.length < 6) {
      setError('Card number looks too short');
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
          cardNumber: cardDetails.cardNumber.replace(/\s/g, ''),
          amount: Number(totalAmount), 
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => null);
        setError(err?.message || 'Payment failed. Please try again.');
        return;
      }

      const data = await response.json();
      setPaymentResult(data);
    } catch (err) {
      console.error('Fetch failed:', err);
      setError('Network error or CORS blocked the request.');
    } finally {
      setLoading(false);
    }
  };

  const formatINR = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(Number(value) || 0);

  return (
    <div className="payment-container">
      <div className="credit-card-form">
        <h2>Enter Card Details</h2>

        <div className="amount-display">
          <span>Amount to Pay:</span>
          <span className="amount">
            {formatINR(totalAmount)}
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={cardDetails.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="text"
                name="expiry"
                value={cardDetails.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
              />
            </div>

            <div className="form-group">
              <label>CVV</label>
              <input
                type="text"
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleChange}
                placeholder="123"
              />
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="button-group">
            <button type="button" className="back-button" onClick={onBack}>
              Back
            </button>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        </form>

        {paymentResult && (
          <div className="payment-result">
            <h3>Payment Summary</h3>

            <div className="summary-row">
              <span>Original Amount:</span>
              <span>{formatINR(paymentResult.originalAmount)}</span>
            </div>

            <div className="summary-row">
              <span>Card Type:</span>
              <span>{paymentResult.cardType}</span>
            </div>

            <div className="summary-row">
              <span>Discount ({paymentResult.discountPercentage}%):</span>
              <span>{formatINR(paymentResult.discountAmount)}</span>
            </div>

            <div className="summary-row total">
              <span>Final Payable:</span>
              <span>{formatINR(paymentResult.finalAmount)}</span>
            </div>

            <div className="button-group">
              <button
                type="button"
                className="back-button"
                onClick={() => setPaymentResult(null)}
              >
                Pay Another
              </button>
              <button
                type="button"
                className="submit-button"
                onClick={onSuccess}
              >
                Confirm Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditCardForm;
