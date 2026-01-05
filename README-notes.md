# README Notes – Payment Feature

## Design Decisions

- Backend (.NET) is responsible for all business logic such as identifying card type and calculating discounts.
- Frontend (React) only sends required data and displays the calculated result received from backend.
- Discount calculation logic is kept inside a separate domain class to keep the controller clean.
- React UI flow is kept simple and clear:
  Basket → Payment → Order Success page.

## Trade-offs

- Used static basket data instead of database storage to keep the implementation simple.
- No real payment gateway is integrated; payment is simulated.
- Focused more on functionality than UI design.

## Assumptions

- Discount is based only on credit card type.
- Backend always returns valid discount data.
- Only INR currency is supported.
- One order is processed at a time.

## Skipped / Not Implemented

- No database persistence for orders or payments.
- No authentication or user management.
- No automated unit tests due to limited time.
- No advanced error retry mechanism.

## Notes

- Code structure allows easy extension of discount rules.
- Frontend and backend are loosely coupled using REST API.
