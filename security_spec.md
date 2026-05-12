# Security Spec

1. Data Invariants
- A post must have an id matching its document ID.
- A post must have a valid type (`photo`, `video`, `audio`, `status`, `product`).
- A post's `userId` must match the authenticated user's UID.
- A post's `createdAt` must be the server timestamp on creation and immutable.
- The `type` field must be immutable.
- A product must optionally have a price.
- Text, title, url must be within size limits.

2. The "Dirty Dozen" Payloads
- Ghost Field: Adding an `isAdmin: true` field.
- Type mismatch: `type: "invalid_type"`.
- Spoofed userId: `userId: "other_user_id"`.
- Spoofed createdAt: `createdAt: request.time - 1h`.
- Size limits: 2MB url field or very long title.
- ...

3. Test Runner
We will use `@firebase/rules-unit-testing`.
