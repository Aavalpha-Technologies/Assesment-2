# Ecommerce Payment – Implementation Notes

## Starting Point

When I received this assessment, the repository already had a basic structure in place.
There was a React frontend and a .NET backend, and the routing and UI wiring were already done.
However, the actual business logic and real data flow were intentionally incomplete.

Before writing any code, I first spent time understanding:
- How the frontend screens are connected
- How the backend controller is structured
- What data is expected to flow between frontend and backend

My goal was to build on top of the existing structure rather than rewriting or over-engineering it.

---

## Understanding the Problem

The main problem to solve was very clear:
- Take payment details from the frontend
- Identify the card type based on the card number
- Apply the correct discount as per the rules
- Return a clear payment summary
- Display that summary in the UI

At the same time, the instructions emphasized that this task is about **thinking and decision-making**, not just making something work.

---

## My Approach

I decided to start with the backend first, because:
- The business rules live there
- The frontend depends entirely on the backend response
- It is easier to test logic independently using Swagger

Once the backend behavior was correct, I moved to the frontend integration logic.

---

## Backend Work

### What I Implemented

In the backend, I focused on completing the `POST /Payments/Pay` endpoint.

The backend now:
- Validates incoming requests
- Detects the card type using the first digit of the card number
- Applies the discount rules correctly
- Returns a structured response that clearly shows the payment breakdown

The card detection rules are:
- Starts with `4` → Visa (0% discount)
- Starts with `5` → MasterCard (5% discount)
- Starts with `6` → RuPay (10% discount)
- Any other value defaults to RuPay (as specified)

To keep the controller clean, I kept card detection and discount calculation logic separate from the controller itself.

### Why I Designed the Response This Way

Initially, the response structure was very minimal.
I expanded it to include:
- Card type
- Original amount
- Discount percentage
- Discount amount
- Final payable amount

This makes the API response self-explanatory and easy for the frontend to display without extra calculations.

---

## Backend Testing

I tested the backend using Swagger inside GitHub Codespaces.
I tried different card numbers to make sure:
- Card type detection works correctly
- Discount values are accurate
- Final amount is calculated correctly

This confirmed that the backend logic works correctly on its own.

---

## Frontend Work

On the frontend side, I worked on:
- Collecting card details from the user
- Adding basic input validation (card number length, expiry format, CVV)
- Preparing the API request in the expected format
- Handling loading, success, and error states
- Displaying the payment summary returned by the backend

The frontend intentionally does not contain any discount or business logic.
All calculations are handled by the backend.

---

## Issue Encountered During Integration

While integrating the frontend with the backend in the browser, I ran into a CORS preflight issue.

The frontend runs on one port and the backend runs on another port inside GitHub Codespaces.
Because of this, the browser sends an OPTIONS preflight request before the actual POST call.
Due to how Codespaces HTTPS tunnels work, the required CORS headers were not present in the preflight response.

As a result:
- The browser blocked the request
- The backend controller was never reached
- The frontend showed a “Failed to fetch” error

This issue is related to the Codespaces environment and browser security rules, not the backend logic or request structure.

The backend API itself works correctly and was fully verified using Swagger.

---

## Trade-offs and Decisions

While working on this task, I made a few conscious decisions:
- I did not add authentication or authorization, as it was not required
- I did not add database persistence
- I did not integrate a real payment gateway
- I did not force unsafe workarounds (browser flags or disabling security)

Instead, I focused on correctness, clarity, and documenting the limitation clearly.

---

## Assumptions

- In a real production setup, frontend and backend would be served from the same origin or behind a reverse proxy
- HTTPS and CORS policies would be handled at infrastructure level
- Only basic validation was required for this assessment

---

## What Is Unfinished or Intentionally Skipped

- Full browser-based frontend ↔ backend integration due to Codespaces CORS limitations
- Automated tests (encouraged but not mandatory)
- Advanced UI styling and enhancements

---

## Final Summary

This assessment helped demonstrate how I approach a real-world problem:
- Understand the existing code first
- Implement core logic cleanly
- Test components independently
- Debug issues methodically
- Make practical decisions instead of forcing unstable fixes
- Document everything honestly

The backend logic is complete and tested.
The frontend integration logic is implemented and follows the expected flow.
All decisions, trade-offs, and limitations are clearly explained.

This reflects how I would work on a real project under time constraints while keeping the solution maintainable and understandable.
