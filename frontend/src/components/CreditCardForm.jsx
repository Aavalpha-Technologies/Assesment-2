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
  const [paymentResult, setPaymentResult] = useState(null);   // 🔹 NEW

  // ---------- Formatting Helpers ----------
  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted;
  };

  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  // ---------- Input Change ----------
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

    setCardDetails({
      ...cardDetails,
      [name]: formattedValue,
    });
    setError('');
  };

  // ---------- Validation ----------
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

  // ---------- SUBMIT → BACKEND ----------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setPaymentResult(null);

    try {
      const response = await fetch('http://localhost:5084/api/payments/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Number(totalAmount),
          cardDetails: {
            cardNumber: cardDetails.cardNumber.replace(/\s/g, ''),
            expiry: cardDetails.expiry,
            cvv: cardDetails.cvv,
          },
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || 'Payment failed. Please try again.');
      }

      // 🔹 Read backend calculation
      const data = await response.json();
      setPaymentResult(data);

    } catch (err) {
      setError(err.message || 'Unable to connect to payment server.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    onSuccess(); // Move to OrderSuccess page
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
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.cardNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiry">Expiry Date</label>
              <input
                type="text"
                id="expiry"
                name="expiry"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
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
              {loading ? 'Processing...' : 'Calculate Payment'}
            </button>
          </div>
        </form>

        {/* 🔹 BACKEND RESULT */}
        {paymentResult && (
  <div className="receipt-card">
    <h3>🧾 Payment Receipt</h3>

    <div className="receipt-row">
      <span>Total Amount</span>
      <span>INR {paymentResult.totalAmount.toLocaleString('en-IN')}</span>
    </div>

    <div className="receipt-row">
      <span>Card Type</span>
      <span>{paymentResult.cardType}</span>
    </div>

    <div className="receipt-row">
      <span>Discount Applied</span>
      <span className={paymentResult.discountApplied ? 'yes' : 'no'}>
        {paymentResult.discountApplied ? 'Yes' : 'No'}
      </span>
    </div>

    <div className="receipt-row">
      <span>Discount Amount</span>
      <span>INR {paymentResult.discountAmount.toLocaleString('en-IN')}</span>
    </div>

    <div className="receipt-row total">
      <span>Final Payable</span>
      <span>INR {paymentResult.finalAmount.toLocaleString('en-IN')}</span>
    </div>

    <button className="confirm-button" onClick={handleConfirm}>
      ✅ Confirm Order
    </button>
  </div>
)}

      </div>
    </div>
  );
};

export default CreditCardForm;
