
# Ecommerce Payment Portal 

A full-stack payment processing application built with **React** (Frontend) and **.NET 8** (Backend). This project demonstrates a payment flow with server-side business logic for calculating discounts based on credit card types.

![ Preview](https://github.com/user-attachments/assets/c58222f1-d3a0-4525-9451-44be9db9ab4d)


## Features
* **Secure Payment Flow:** Data flows securely from a React form to a C# API.
* ** Discount Logic:**
    * **Visa:** 0% Discount
    * **MasterCard:** 5% Discount
    * **RuPay:** 10% Discount
* **Real-time Receipt:** The UI displays the original amount, discount applied, and final payable amount.
* **Validation:** Server-side and client-side validation for card details.


### Prerequisites
* [Node.js](https://nodejs.org/) (v16 or higher)
* [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)

### 1. Backend (.NET)
The backend runs on port `5084`.

```bash
cd backend/Payments
dotnet restore
dotnet run
listening on http://localhost:5084

```

### 2. Frontend (React)

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
listening on http://localhost:5173

```

## fo testing

Use  following test credit card numbers to verify the discount logic.
**Expiry:** Any future date (e.g., `12/28`)
**CVV:** Any 3 digits (e.g., `123`)

| Card Type | Test Number  | Expected Discount |
| --- | --- | --- |
| **Visa** | `4111 1111 1111 1111` | **0%** |
| **MasterCard** | `5111 1111 1111 1111` | **5%** |
| **RuPay** | `6111 1111 1111 1111` | **10%** |


