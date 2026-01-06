Ecommerce Payment Flow – Technical Assessment

Repository: Assesment-1

1. About This Implementation

    This project is my implementation of the Ecommerce Payment technical assessment.

    The main goal for me was not just to make the flow work, but to clearly understand and demonstrate how a frontend (React) communicates with a backend (.NET), how business rules are applied on the server, and how results are shown properly on the UI.

    I treated this like a small real-world feature instead of just a coding task.

2. Overall Flow (In Simple Terms)

    User sees basket items and total amount (including GST)

    User clicks Proceed to Pay

    User enters card details

    Frontend sends payment data to backend API

    Backend:

    Detects card type

    Calculates discount

    Returns final amount

    Frontend displays:

    Card type

    Original amount

    Discount applied

    Final payable amount

    User confirms payment and sees success screen

3. Key Design Decisions I Took
Backend (.NET)

    I kept business logic separate from controller code
    Card type detection and discount calculation are handled in a domain class instead of directly inside the controller.

    The API returns a clear and typed response so the frontend does not need to guess or calculate anything.

    Card type detection is implemented exactly as mentioned in the problem statement.

    Default card type is always RuPay, even if the card number does not match known prefixes.

    I enabled CORS and disabled HTTPS redirection for local development so the frontend and backend can communicate smoothly.

    Frontend (React)

    I kept the UI logic simple and readable instead of over-engineering.

    Payment flow is split into components:

    Basket & flow handling in Payment

    Card input and API call in CreditCardForm

    I added basic input validation for card number, expiry, and CVV before calling the API.

    The UI displays the backend response clearly instead of directly marking payment as successful.

    Error messages are shown in a user-friendly way.

4. Trade-offs I Made

    I did not implement advanced card validation (like Luhn algorithm) because basic validation was sufficient for this task.

    No database or persistence layer was added, as it was not required.

    No authentication or real payment gateway integration.

    UI styling was kept simple and functional instead of focusing on visual perfection.

    CORS policy allows all origins for development simplicity (would be restricted in production).

5. Assumptions

    This is a mock payment flow and not a real transaction.

    Expiry date and CVV are used only for validation purposes.

    Backend runs locally on http://localhost:5084

    Frontend runs locally on http://localhost:5173

    Card type is determined only by the first digit of the card number.

6. Error Handling Approach

    Backend validates incoming data and returns appropriate responses.

    Frontend handles:

    Invalid card inputs

    API/network failures

    Loading state is shown while the payment request is being processed.

7. Testing Done

    Due to time constraints, I focused on manual testing, including:

    Visa card → no discount

    MasterCard → 5% discount

    RuPay card → 10% discount

    Invalid card number length

    Backend not reachable

    These tests helped verify both business logic and frontend-backend integration.

8. What I Would Improve If Given More Time

    Add unit tests for discount calculation logic.

    Add API contract tests.

    Improve UI polish and accessibility.

    Improve backend model validation using data annotations.

    Use environment variables for API URLs.

9. Final Note

    As a fresher, my focus was to show that I understand:

    How real frontend-backend communication works

    How to implement business rules correctly

    How to debug practical issues like CORS and environment setup

    How to write clean, understandable code

    I intentionally avoided unnecessary complexity and focused on building a clear, working, and explainable solution.