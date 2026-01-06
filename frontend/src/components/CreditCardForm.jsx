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
      formattedValue = formatCardNumber(value.slice(0, 16));
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
    if (cardDetails.expiry.length !== 5) {
      setError('Expiry must be in MM/YY format');
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
    setPaymentResult(null);

    try {
      const response = await fetch(
        'https://glorious-capybara-97v96x9rgvv29xrr-5084.app.github.dev/Payments/Pay',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: totalAmount,
            cardDetails: {
              cardNumber: cardDetails.cardNumber.replace(/\s/g, ''),
              expiry: cardDetails.expiry,
              cvv: cardDetails.cvv,
            },
          }),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Payment failed');
      }

      const data = await response.json();
      setPaymentResult(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Unable to process payment');
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
              <label>Expiry</label>
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

          {paymentResult && (
            <div className="payment-result">
              <p><strong>Card Type:</strong> {paymentResult.cardType}</p>
              <p><strong>Original Amount:</strong> INR {paymentResult.originalAmount}</p>
              <p><strong>Discount:</strong> {paymentResult.discountPercentage}%</p>
              <p><strong>Discount Amount:</strong> INR {paymentResult.discountAmount}</p>
              <h3><strong>Final Amount:</strong> INR {paymentResult.finalAmount}</h3>
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          <div className="button-group">
            <button type="button" className="back-button" onClick={onBack}>
              Back
            </button>

            {paymentResult ? (
              <button type="button" className="submit-button" onClick={onSuccess}>
                Confirm Order
              </button>
            ) : (
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Processing...' : 'Pay Now'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreditCardForm;
