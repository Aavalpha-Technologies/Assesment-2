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

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value.slice(0, 16));
    }

    if (name === 'expiry') {
      formattedValue = value.slice(0, 5);
    }

    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setCardDetails(prev => ({
      ...prev,
      [name]: formattedValue,
    }));

    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cardDetails.cardNumber.replace(/\s/g, '').length !== 16) {
      setError('Card number must be 16 digits');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/Payments/Pay', {
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
      onSuccess(data);
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>Enter Card Details</h2>

      <p><strong>Amount:</strong> INR {totalAmount.toFixed(2)}</p>

      <form onSubmit={handleSubmit}>
        <input
          name="cardNumber"
          placeholder="Card Number"
          value={cardDetails.cardNumber}
          onChange={handleChange}
        />

        <input
          name="expiry"
          placeholder="MM/YY"
          value={cardDetails.expiry}
          onChange={handleChange}
        />

        <input
          name="cvv"
          placeholder="CVV"
          value={cardDetails.cvv}
          onChange={handleChange}
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="button" onClick={onBack}>Back</button>
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Pay'}
        </button>
      </form>
    </div>
  );
};

export default CreditCardForm;
