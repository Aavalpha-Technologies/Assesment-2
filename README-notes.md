# Payment System Implementation - Design Notes

## Key Design Decisions

### 1. Backend Architecture
- **Domain Logic Separation**: Implemented discount calculation logic in the `Payments.Domain` project to maintain separation of concerns. The controller handles HTTP concerns while business logic remains in the domain layer.
- **Card Type Detection**: Used simple prefix-based detection (first digit) as specified in requirements. This is pragmatic for the assessment scope but could be enhanced with Luhn algorithm validation and BIN range checking for production.
- **Response DTO Structure**: Enhanced `PaymentResponse` to include all necessary fields:
  - `OriginalAmount`: The initial amount before discount
  - `CardType`: Detected card type (Visa, MasterCard, RuPay)
  - `DiscountPercentage`: Applied discount percentage
  - `DiscountAmount`: Calculated discount amount
  - `FinalAmount`: Amount after discount
  - `DiscountApplied`: Boolean flag for discount application
  
  This provides complete transparency to the frontend for displaying payment breakdown.

### 2. Frontend Implementation
- **Payment Flow**: Implemented a two-step payment confirmation:
  1. User enters card details and clicks "Pay Now"
  2. Backend calculates discount and returns breakdown
  3. User sees discount summary before final confirmation
  4. After confirmation, proceeds to success page
  
  This improves UX by showing users exactly what discount they're receiving.

- **Request Structure**: Matched frontend request body exactly to backend `PaymentRequest` DTO structure with nested `CardDetails` object.

- **Error Handling**: 
  - Client-side validation for immediate feedback
  - Backend validation for data integrity
  - User-friendly error messages displayed in UI
  - Network error handling with appropriate messages

### 3. CORS Configuration
- Configured CORS to allow React dev server (default Vite port 5173) and common alternatives (3000, 5174)
- Used policy-based approach for maintainability
- Enabled credentials for potential future authentication needs

## Trade-offs Made

### 1. Card Validation
- **Chose**: Basic validation (16 digits, numeric only)
- **Trade-off**: Did not implement Luhn algorithm validation for card number checksum
- **Reason**: Requirements specified "basic validation is sufficient". Luhn validation would add complexity without explicit requirement.

### 2. Default Card Type
- **Chose**: Default to RuPay as specified in requirements
- **Trade-off**: Even unknown card numbers (starting with 1, 2, 3, 7, 8, 9, 0) default to RuPay
- **Reason**: Explicit requirement: "Default card type must be RuPay, even if the card number does not match known prefixes"

### 3. Error Response Format
- **Chose**: Simple anonymous object `{ error: "message" }` for validation errors
- **Trade-off**: Not using a standardized error DTO structure
- **Reason**: Kept simple for assessment scope. Production would use consistent error response models.

### 4. Payment Summary Display
- **Chose**: Show payment summary after initial API call, before final confirmation
- **Trade-off**: Requires additional user interaction step
- **Reason**: Better UX transparency - users see discount breakdown before finalizing payment. Aligns with requirement to "display results in the UI clearly"

### 5. Currency Formatting
- **Chose**: INR formatting using `toLocaleString('en-IN')` with 2 decimal places
- **Trade-off**: Hardcoded currency assumption
- **Reason**: Assessment context suggests INR currency. Production would use i18n library for multi-currency support.

## Assumptions

1. **Backend Port**: Assumed backend runs on port 5084 (HTTP) as specified in `launchSettings.json`. Frontend configured to call `http://localhost:5084`.

2. **Frontend Port**: Assumed Vite dev server runs on default port 5173. CORS configured to allow this and common alternatives.

3. **Currency**: Assumed INR (Indian Rupees) based on GST calculation in code and RuPay card support.

4. **Discount Calculation**: 
   - Discounts apply to the total amount (including GST)
   - Discount percentage is applied as a simple percentage reduction
   - No minimum/maximum discount limits

5. **Card Number Format**: 
   - Assumed 16-digit card numbers (standard for Visa/MasterCard)
   - Spaces are stripped for validation and processing
   - RuPay cards also follow 16-digit format

6. **Expiry Date**: 
   - Format: MM/YY
   - Only month validation (1-12) implemented
   - No future date validation (could be enhanced)

## Unfinished / Intentionally Skipped

1. **Luhn Algorithm**: Card number checksum validation not implemented (requirements stated "basic validation is sufficient")

2. **Expiry Date Validation**: Only month range validated, not checking if date is in the future

3. **CVV Validation**: Only length check (3 digits), no validation against card type (some cards have 4-digit CVV)

4. **Database Persistence**: No payment history storage (explicitly not required per README)

5. **Authentication/Authorization**: Not implemented (explicitly not required per README)

6. **Payment Gateway Integration**: Not implemented (explicitly not required per README)

7. **Unit Tests**: Not implemented due to time constraints, but structure is testable:
   - `CalculateDiscount.GetCardType()` - easily unit testable
   - `CalculateDiscount.Calculate()` - easily unit testable
   - Controller validation logic - testable with integration tests

8. **Loading States**: Basic loading state implemented, but could be enhanced with progress indicators

9. **Accessibility**: Basic HTML structure in place, but ARIA labels and keyboard navigation could be enhanced

10. **API Versioning**: No versioning implemented (single endpoint for assessment scope)

## Production Considerations

If this were to go to production, I would add:

1. **Security**:
   - HTTPS enforcement
   - Rate limiting
   - Input sanitization
   - PCI-DSS compliance considerations for card data handling
   - Never log card numbers/CVV

2. **Testing**:
   - Unit tests for discount calculation logic
   - Integration tests for API endpoints
   - Frontend component tests
   - E2E tests for payment flow

3. **Error Handling**:
   - Structured error response DTOs
   - Error logging and monitoring
   - User-friendly error messages with error codes

4. **Validation**:
   - Luhn algorithm for card number validation
   - BIN range validation for card type detection
   - Future date validation for expiry
   - CVV validation based on card type

5. **Observability**:
   - Structured logging
   - Application insights/telemetry
   - Request/response logging (excluding sensitive data)

6. **Code Quality**:
   - Code analysis tools (SonarQube)
   - Automated code reviews
   - Consistent error handling patterns
