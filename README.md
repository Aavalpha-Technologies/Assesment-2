# README-notes.md

## Design Decisions
- Implemented all discount and card-type logic in the backend to ensure business rules are not bypassed from the client.
- Used a simple prefix-based card detection strategy as specified in the assessment.
- Returned a detailed response DTO including original amount, discount percentage, discount amount, final amount, and card type for clear UI rendering.

## Trade-offs
- Did not implement advanced card validation (Luhn algorithm) to keep scope limited.
- UI styling was kept simple and clean rather than pixel-perfect.
- No database or payment gateway integration as it was explicitly out of scope.

## Assumptions
- Currency is INR.
- Default card type is RuPay if prefix does not match known types.
- Expiry and CVV are collected for UI realism but not validated on the backend.

## How to Run
### Backend
```bash
cd backend
dotnet run --project Payments/Payments.csproj
