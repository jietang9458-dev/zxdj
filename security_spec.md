# Security Specification for ZX Eco-Chain

## Data Invariants
1. A user can only edit their own profile.
2. Only admins can edit global page content, drama lists, bases, and products.
3. Page content must have a valid `id` corresponding to the document ID.
4. Timestamps must be handled by the server (`request.time`).

## The "Dirty Dozen" Payloads (Anti-Tests)
1. **Identity Spoofing**: Attempt to update a user profile with a different `uid`.
2. **Privilege Escalation**: Attempt to create an `admin` document as a normal user.
3. **Shadow Update**: Attempt to add a `isVerified: true` field to a product by a non-admin.
4. **ID Poisoning**: Attempt to create a drama with an ID that is 2KB long.
5. **PII Leak**: Attempt to read a user's private data (if any) as another user.
6. **State Shortcutting**: Attempt to change a drama's status to 'completed' without proper authority.
7. **Resource Exhaustion**: Attempt to create an array of 10,000 tags in a filming base.
8. **Immutability Breach**: Attempt to change the `createdAt` of a document.
9. **Relational Orphan**: Attempt to create a sub-resource without a valid parent.
10. **Query Scraping**: Attempt a blanket read on `users` collection.
11. **Spoof Attack**: Attempt admin access with an unverified email.
12. **Denial of Wallet**: Trigger recursive `get()` calls if not careful.

## Test Runner
The corresponding tests are implemented in `firestore.rules.test.ts`.
