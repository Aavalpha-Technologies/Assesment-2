🛒 Ecommerce Payment Flow – Assignment

This project is a simple ecommerce payment flow built using React (frontend) and .NET Web API (backend).
The main goal was to calculate discounts based on credit card type, send data between frontend and backend, and show the final payable amount to the user.
__________________________________________________________________________________________________________________________________

✔️ What This App Does

- Takes payment amount from frontend basket
- User enters card details
- Backend detects card type from card number
- Applies discount based on card type
- Returns final payable amount
- Frontend shows discount summary before confirming

__________________________________________________________________________________________________________________________________

🧠 Discount Rules

Card Type	         |        Rule
_____________________|_______________________
Starts with 4	     |      Visa → 0%
Starts with 5	     |      MasterCard → 5%
Starts with 6	     |      RuPay → 10%
Default	             |      RuPay (10%)

Default RuPay rule was implemented intentionally as instructed.
__________________________________________________________________________________________________________________________________

🛡️ Validations

- Card number must be 16 digits
- CVV must be 3 digits
- Expiry must be MM/YY
- Expiry must not be past date
- Basic backend validation added
- Proper and friendly error messages

__________________________________________________________________________________________________________________________________

🖥️ Tech Used

Frontend
 - React
 - Vite
 - Fetch API

Backend
 - .NET Web API
 - C#

__________________________________________________________________________________________________________________________________

🧾 API Contract

###Request: 
```json
{
  "amount": 108012.48,
  "cardDetails": {
    "cardNumber": "5123456789012345",
    "expiry": "11/26",
    "cvv": "123"
  }
}
_______________________________________________________________
###Response:
{
  "totalAmount": 108012.48,
  "cardType": "MasterCard",
  "discountPercent": 5,
  "discountAmount": 5400.62,
  "finalPayableAmount": 102611.86,
  "message": "Payment calculated successfully"
}

__________________________________________________________________________________________________________________________________

🏗️ Architecture Decisions

✔️ Separation of Concerns
 - Controller handles request/response
 - Business logic is in domain layer (CalculateDiscount)
 - DTOs keep contract clean

✔️ CORS
 - Restricted to: "http://localhost:5173"

✔️ Simple & Pragmatic
 - Avoided unnecessary complexity like database or authentication since not required.
 
__________________________________________________________________________________________________________________________________

⚠️ Error Handling

✔️ Handled Cases
 - Invalid card number
 - Missing request data
 - Backend unreachable
 - Expired card
 - Invalid expiry month
 
 Frontend shows clear & friendly messages.

__________________________________________________________________________________________________________________________________

▶️ How to Run

✔️ Backend :

    cd backend/Payments
    dotnet restore
    dotnet run

Backend runs on: "https://localhost:5084"

✔️ Frontend

    cd frontend
    npm install
    npm run dev

Runs on: "http://localhost:5173"

__________________________________________________________________________________________________________________________________

🧪 Testing Notes (Scope)

Formal test coverage was optional, however:
 - Business logic is isolated and test-ready
 - Manual testing done:
    - Visa
    - MasterCard
    - RuPay
    - Invalid cards
    - Expired dates

__________________________________________________________________________________________________________________________________

🎯 Summary

This project successfully demonstrates:
 - Integration between React & .NET
 - Clean and understandable code
 - Correct business logic implementation
 - Real-world payment flow thinking
 - Error handling
 - Professional approach (CORS, DTOs, structure)

 🙌 Thank You