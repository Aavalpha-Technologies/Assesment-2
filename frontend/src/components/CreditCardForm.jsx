import React, { useState } from 'react';
import './CreditCardForm.css';

const isValidExpiry = (value) => {
  const match = /^(\d{2})\/(\d{2})$/.exec(value);
  if (!match) return false;
  const month = Number(match[1]);
  return month >= 1 && month <= 12;
};

const CreditCardForm = ({ totalAmount, onSuccess, onBack }) => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentResponse, setPaymentResponse] = useState(null);

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

  const validateForm = () => {
    const cardNumberClean = cardDetails.cardNumber.replace(/\s/g, '');
    if (cardNumberClean.length !== 16) {
      setError('Card number must be 16 digits');
      return false;
    }
    if (!isValidExpiry(cardDetails.expiry)) {
      setError('Expiry must be a valid MM/YY date (01-12)');
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
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');
    setPaymentResponse(null);

    try {
      // Request body structure matches backend PaymentRequest DTO
      const requestBody = {
        amount: totalAmount,
        cardDetails: {
          cardNumber: cardDetails.cardNumber.replace(/\s/g, ''),
          expiry: cardDetails.expiry,
          cvv: cardDetails.cvv,
        }
      };

      const response = await fetch('http://localhost:5084/Payments/Pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        // Store payment response to display discount information
        setPaymentResponse(data);
      } else {
        // Handle validation errors from backend
        const errorMessage = data.error || 'Payment failed. Please try again.';
        setError(errorMessage);
      }
    } catch (err) {
      setError('Unable to connect to payment server. Please try again later.');
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPayment = () => {
    // After displaying discount information, proceed to success page
    if (paymentResponse) {
      onSuccess();
    }
  };

  // If payment response is received, show discount breakdown
  if (paymentResponse) {
    return (
      <div className="payment-container">
        <div className="credit-card-form">
          <h2>Payment Summary</h2>
          
          <div className="payment-summary">
            <div className="summary-row">
              <span>Card Type:</span>
              <span className="card-type">{paymentResponse.cardType}</span>
            </div>
            <div className="summary-row">
              <span>Original Amount:</span>
              <span>INR {paymentResponse.originalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            </div>
            
            {paymentResponse.discountApplied && (
              <>
                <div className="summary-row discount">
                  <span>Discount ({paymentResponse.discountPercentage}%):</span>
                  <span className="discount-amount">
                    - INR {paymentResponse.discountAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </span>
                </div>
              </>
            )}
            
            <div className="summary-row total">
              <span>Final Amount to Pay:</span>
              <span className="final-amount">
                INR {paymentResponse.finalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="button-group">
            <button 
              type="button" 
              className="back-button" 
              onClick={() => setPaymentResponse(null)}
            >
              Back
            </button>
            <button 
              type="button" 
              className="submit-button"
              onClick={handleConfirmPayment}
            >
              Confirm Payment
            </button>
          </div>
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
          <span className="amount">INR {totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
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
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreditCardForm;
