Key Design Decisions

1]Frontend-Backend Connection

React frontend (CreditCardForm.jsx) sends payment request to .NET backend (PaymentsController.cs) using fetch.

Backend returns discounted total and payment result.

2]Discount Logic

Implemented in CalculateDiscount.cs.

Card types and discounts:

Visa → 0%

MasterCard → 5%

RuPay → 10%

Default card type is RuPay if card number prefix doesn’t match.

3]UI Display

Payment.jsx shows basket items, subtotal, GST, total, and discounted amount.

OrderSuccess.jsx shows order confirmation along with discounted total after payment.

4]Error Handling

Validates card number (16 digits), expiry (MM/YY), CVV (3 digits).

Shows user-friendly error messages if validation fails or API cannot connect.

5]Trade-offs Made

No real payment gateway integration; payment success is simulated.

Minimal styling; focused on functionality over design.

No unit tests due to time limit (could be added for discount logic and API).

6]Assumptions

User enters card details in correct format.

Discount is applied only based on card type prefix.

Payment backend simulates success; no real bank integration.

7]Anything Unfinished / Intentionally Skipped

Real payment gateway integration.

Authentication or database storage.

Pixel-perfect UI design.

8]Steps Taken

Forked the repo and cloned it to local machine.

Created a feature branch: feat/payment-impl.

Implemented discount calculation in CalculateDiscount.cs.

Connected frontend (CreditCardForm.jsx) to backend (PaymentsController.cs).

Updated Payment.jsx to display discounted total and manage payment flow.

Updated OrderSuccess.jsx to show discounted total after payment.

Ran backend using dotnet run and frontend using npm run dev.

Tested "Pay Now" button: payment flow works and discount is calculated correctly.

Committed all changes to feature branch with meaningful messages.
