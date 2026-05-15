# Wallet / Transaction Service

## Objective

Build a backend service that supports wallet operations and money transfers between users.

## Requirements

Implement APIs for:

1. Create user
2. Add balance
3. Transfer money

## Business Rules

1. Wallet balance must never go negative.
2. Transfer operation must be atomic:
	 - Either both debit and credit succeed.
	 - Or neither change is applied.

## Suggested API Contract

You can design your own contract, but a typical shape is:

- `POST /users`
	- Create a new user wallet.
- `POST /wallets/{userId}/add-balance`
	- Add funds to a user's wallet.
- `POST /wallets/transfer`
	- Transfer funds from one user to another.

Example transfer payload:

```json
{
	"fromUserId": "user-1",
	"toUserId": "user-2",
	"amount": 100
}
```

## Validation Expectations

- Reject transfers when sender balance is insufficient.
- Reject invalid amounts (zero or negative).
- Handle concurrent transfer requests safely.
- Return meaningful HTTP status codes and error messages.

## What Is Being Evaluated

- API design clarity
- Data consistency and transaction handling
- Error handling and input validation
- Code quality and structure