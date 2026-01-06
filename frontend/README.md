
# Ecommerce Payment – Notes

## Design Decisions
- Separated concerns: Controller → Domain (discount logic) → DTOs.
- Card detection based on prefix as specified.
- Default card type is RuPay.
- Simple validation added in controller (amount, card number).

## Discount Rules
- Visa (starts with 4): 0%
- MasterCard (starts with 5): 5%
- RuPay (starts with 6 or default): 10%

## Assumptions
- Card number prefix is sufficient for card type detection.
- No real payment gateway integration required.
- CVV/expiry are not deeply validated.

## Error Handling
- Returns 400 for invalid amount or missing card number.
- User-friendly messages.


