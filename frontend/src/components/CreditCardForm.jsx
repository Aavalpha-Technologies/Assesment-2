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
    const digitsOnly = value.replace(/\s/g, '').slice(0, 16);
    formattedValue = formatCardNumber(digitsOnly);
  } else if (name === 'expiry') {
    formattedValue = formatExpiry(value.slice(0, 5));
  } else if (name === 'cvv') {
    formattedValue = value.replace(/\D/g, '').slice(0, 3);
  }

  setCardDetails({ ...cardDetails, [name]: formattedValue });
  setError('');
};


  const validateForm = () => {
    if (cardDetails.cardNumber.replace(/\s/g, '').length !== 16) {
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

    try {
      const response = await fetch('http://localhost:5084/Payments/Pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalAmount,
          cardDetails: {
            cardNumber: cardDetails.cardNumber.replace(/\s/g, ''),
            expiry: cardDetails.expiry,
            cvv: cardDetails.cvv,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Payment failed');
      }

      const data = await response.json();
      setPaymentResult(data);
    } catch {
      setError('Unable to process payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (paymentResult) {
    return (
      <div className="payment-container">
        <div className="credit-card-form">
          <h2>Payment Summary</h2>

          <div className="summary-row">
            <span>Card Type:</span>
            <span>{paymentResult.cardType}</span>
          </div>

          <div className="summary-row">
            <span>Original Amount:</span>
            <span>INR {paymentResult.originalAmount.toLocaleString('en-IN')}</span>
          </div>

          <div className="summary-row">
            <span>Discount:</span>
            <span>INR {paymentResult.discountApplied.toLocaleString('en-IN')}</span>
          </div>

          <div className="summary-row total">
            <span>Final Amount:</span>
            <span>INR {paymentResult.finalAmount.toLocaleString('en-IN')}</span>
          </div>

          <button className="submit-button" onClick={onSuccess}>
            Confirm Payment
          </button>
        </div>
      </div>
    );
  }

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
            <input name="cardNumber" value={cardDetails.cardNumber} onChange={handleChange} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Expiry</label>
              <input name="expiry" value={cardDetails.expiry} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input name="cvv" value={cardDetails.cvv} onChange={handleChange} />
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
      </div>
    </div>
  );
};

export default CreditCardForm;
