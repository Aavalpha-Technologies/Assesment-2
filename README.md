# 🧮 Ecommerce Payment — Technical Assessment  
**Avalpha Technologies**

Your task is to **finish and ship a production-quality Ecommerce Payment flow**.

The repository already contains a **scaffolded React frontend and a .NET backend**.  
The controller and UI wiring exist, but **business logic and integration are intentionally incomplete**.

We are evaluating **how you think, structure code, and make trade-offs**, not just whether it “works”.

---

## 🚀 What You’ll Build

You will:

- Connect **React frontend ↔ C#/.NET backend**
- Implement **payment discount calculation** based on credit card type
- Ensure that on **Pay** click:
  - Required data is sent to the backend
  - Discount is calculated correctly
  - **Discounted total** is displayed clearly on the UI
- Deliver **clean, production-ready code**:
  - Clear structure
  - Meaningful naming
  - Error handling
  - Basic tests where appropriate

---

## ⏱ Timebox

- **Maximum: 4 hours**
- Be pragmatic.
- Prioritize **correctness, clarity, and essentials** over perfection.

> It’s okay to leave things unfinished — just explain your decisions.

---

## 🔀 Before You Start (Fork & Setup)

1. Fork this repository into your **own GitHub account**
2. Clone your fork locally
3. Create a feature branch (example):
   ```bash
   git checkout -b feat/payment-impl


Implement your solution

Push to your fork

Open a Pull Request to your own main branch

Add a file named README-notes.md that includes:

Key design decisions

Trade-offs made

Assumptions

Anything unfinished or intentionally skipped

Share your GitHub repository or PR link with us

✅ We value small, meaningful commits over one large commit.

🧠 Business Rules
Discount Calculation (Based on Credit Card Type)
Card Type	Discount
Visa	0%
MasterCard	5%
RuPay	10%
Card Type Detection Logic

Use the following logic to determine the card type:

if (cardNumber.StartsWith('4')) return CardType.Visa;
if (cardNumber.StartsWith('5')) return CardType.MasterCard;
if (cardNumber.StartsWith('6')) return CardType.RuPay;

// Default
return CardType.RuPay;


Note: Default card type must be RuPay, even if the card number does not match known prefixes.

🧩 Your Tasks (Checklist)

 Wire up the React frontend to call the backend API

 Identify credit card type based on card number

 Implement discount calculation logic

 Validate credit card number (basic validation is sufficient)

 Return a typed, well-structured response (DTO) from backend

 Display results in the UI:

Total amount

Discount applied

Final payable amount

Proper currency formatting

 Handle errors gracefully:

Backend validation errors

User-friendly UI messages

 Provide basic documentation:

How to run the app

How to test

Key decisions and assumptions

Keep commits small with clear commit messages

🧪 Testing Expectations

Tests are encouraged but not mandatory.

If you add tests:

Prefer clarity over coverage

Focus on:

Discount logic

API contract

Key UI behavior

🧱 Tech Stack
Frontend

React (Vite or CRA)

TypeScript preferred (if scaffolded)

Fetch or Axios

Backend

.NET (C#)

Minimal API or MVC Controller

Tests

Backend: xUnit or NUnit

Frontend: React Testing Library + Vitest / Jest

🎯 What We’re Evaluating

We are not looking for over-engineering.

We are evaluating:

Code structure & readability

Logical reasoning & correctness

API design & data flow

Error handling approach

Attention to detail

Ability to explain trade-offs

Commit discipline

Communication via README-notes.md

🚫 What We Don’t Expect

Authentication

Database persistence

Payment gateway integration

Pixel-perfect UI

Excessive abstraction

✅ Submission Checklist

Before sharing your link, ensure:

 App runs locally

 Discount logic works correctly

 UI shows discount clearly

 Errors are handled gracefully

 README-notes.md is present

 Feature branch is pushed

 Commits are meaningful

