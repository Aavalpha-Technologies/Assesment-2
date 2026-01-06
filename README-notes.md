Design decisions
- Keep business logic on backend: backend enforces card-type detection and discount calculation.
- DTO-based API contract: request contains `amount` and `cardNumber`. Response contains structured fields: `OriginalAmount`, `DiscountPercentage`, `DiscountAmount`, `FinalAmount`, `CardType`.

Trade-offs
- Minimal validation: only basic length checks (>=6) on card number. No Luhn check to avoid over-engineering.
- Frontend keeps expiry/CVV fields for UX but they are optional and not sent to backend.
- CardType in response is returned as string for easy rendering in UI.

Assumptions
- Currency is INR.
- Default card type must be RuPay whenever prefix isn't 4/5/6 or card number is missing.
- No persistence or external payment gateway integration required.

Unfinished / intentionally skipped
- No database or authentication added.
- No advanced card validation (Luhn) or BIN lookup services.
- No automated tests included (can be added on request).

How to run
Backend
1. Open a terminal in `backend/Payments`.
2. Run:

```powershell
dotnet run
```

The API listens on `http://localhost:5084` by default (see `launchSettings.json`).

Test the API (example)

```powershell
Invoke-RestMethod -Uri http://localhost:5084/Payments/Pay -Method Post -Body '{"amount":1000,"cardNumber":"512345678901"}' -ContentType 'application/json'
```

Expected response (MasterCard example)
```
{
  "OriginalAmount": 1000,
  "DiscountPercentage": 5,
  "DiscountAmount": 50,
  "FinalAmount": 950,
  "CardType": "MasterCard"
}
```

Frontend
1. Open `frontend` folder.
2. Run:

```bash
npm install
npm run dev
```

3. Open the app in the browser and proceed to Payment -> Proceed to Pay.

Quick verification performed
- Backend restarted locally using the HTTPS launch profile; the app listens on `https://localhost:7275` and `http://localhost:5084`.
- I tested the API with `{ "amount": 1000, "cardNumber": "512345678901" }` and observed the expected MasterCard 5% discount response.

What I changed
- `backend/Payments/PaymentRequest.cs` — reduced to `Amount` and `CardNumber`.
- `backend/Payments/PaymentResponse.cs` — structured response fields added.
- `backend/Payments.Domain/CalculateDiscount.cs` — implemented prefix-based card detection and discount calculation (Visa 0%, MasterCard 5%, RuPay 10%).
- `backend/Payments/Controllers/PaymentsController.cs` — added request validation and mapping to response.
- `frontend/src/components/CreditCardForm.jsx` — wired API call to `http://localhost:5084/Payments/Pay`, relaxed validation (min 6 digits), display payment breakdown and friendly error handling.
- `README-notes.md` — added notes and run/test steps.

Next steps (optional)
- Add unit tests for `CalculateDiscount` and controller contract.
- Improve frontend UX and add form-level field error messages.
- Add CI to run backend tests and lint frontend.
