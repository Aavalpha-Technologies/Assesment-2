## Design Decisions
- Kept business logic in backend domain layer for clarity and separation of concerns.
- Frontend focuses only on UI rendering and API integration.
- API response enhanced to provide a clear payment breakdown for better UX.

## Trade-offs
- Used basic card validation as payment gateway integration was out of scope.
- Inline styles were used instead of UI libraries to keep the solution simple.

## Assumptions
- Currency is INR.
- No authentication or persistence required.
- Default card type is RuPay when prefix does not match.

## Skipped / Out of Scope
- Payment gateway integration
- Database storage
- Advanced UI theming
