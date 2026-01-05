import { useState } from "react";
import "./App.css";

function App() {
  const [cardNumber, setCardNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handlePay = async () => {
    try {
      setError("");
      setResult(null);

      const response = await fetch(
        "http://localhost:5084/api/Payments/pay",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cardDetails: { cardNumber },
            expiry: "12/26",
            cvv: "123",
            amount: Number(amount)
          })
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "60px"
      }}
    >
      {/* FORM CARD */}
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#ffffff",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
          Ecommerce Payment
        </h2>

        <div style={{ marginBottom: "18px" }}>
          <label style={{ fontWeight: "600" }}>Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "6px",
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          />
        </div>

        <div style={{ marginBottom: "22px" }}>
          <label style={{ fontWeight: "600" }}>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "6px",
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          />
        </div>

        <button
          onClick={handlePay}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          Pay
        </button>

        {error && (
          <p style={{ color: "red", marginTop: "15px", textAlign: "center" }}>
            {error}
          </p>
        )}
      </div>

      {/* RESULT CARD */}
      {result && (
        <div
          style={{
            marginTop: "35px",
            width: "100%",
            maxWidth: "420px",
            backgroundColor: "#ffffff",
            padding: "22px",
            borderRadius: "8px",
            borderLeft: "6px solid #1976d2",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
          }}
        >
          <p><strong>Card Type:</strong> {result.cardType}</p>
          <p><strong>Total Amount:</strong> ₹{result.totalAmount}</p>
          <p><strong>Discount:</strong> {result.discountPercentage}%</p>
          <p><strong>Discount Amount:</strong> ₹{result.discountAmount}</p>

          <p
            style={{
              marginTop: "12px",
              fontSize: "20px",
              fontWeight: "700",
              color: "#1976d2"
            }}
          >
            Final Payable: ₹{result.finalPayable}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
