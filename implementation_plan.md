# Implementation Plan: MToken Integration (d:\webapp)

This plan outlines the integration of MToken authentication into the `d:\webapp` project, which uses Next.js Pages Router and MobX.

## Technical Context
- **Framework**: Next.js (Pages Router)
- **State Management**: MobX
- **Auth Storage**: LocalStorage/SessionStorage (Encrypted with AES)
- **Backend**: Custom .NET API

## Proposed Changes

### 1. Utilities
#### [NEW] [mtokenUtils.ts](file:///d:/webapp/src/utilities/mtokenUtils.ts)
- Port [fetchMTokenProfile](file:///d:/CBT-demo-mtoken/smartcbt-webportal/src/utils/mtoken/index.ts#56-147) and [fetchMTokenAuthToken](file:///d:/smartcbt-webportal/smartcbt-webportal/src/utils/mtoken/index.ts#24-54) logic from the demo.
- Include `Smart Mock` support for local testing.

### 2. MobX Store
#### [MODIFY] [userStore.ts](file:///d:/webapp/src/stores/userStore.ts)
- Add [loginWithMToken(mToken: string)](file:///d:/smartcbt-webportal/smartcbt-webportal/src/app/%5Blocale%5D/%28index%29/%28unauthenticated%29/login/actions.ts#42-128) action.
- Similar to [handleLoginFacebook](file:///d:/webapp/src/components/user/login/useLogin.ts#80-122), it will:
    1. Fetch the MToken profile.
    2. Attempt to login via a new or existing "MToken" social login flow at the backend.
    3. Store tokens in `localStorage` using the project's encryption standard.

### 3. User Component
#### [MODIFY] [useLogin.ts](file:///d:/webapp/src/components/user/login/useLogin.ts)
- [x] Implement detection of `mToken` and `appId`.
- [x] Call the `/api/auth/mtoken` bridge to fetch profile data.
- [x] Attempt auto-login with encrypted stable password.
- [x] Redirect to `/register` for new users.

#### [MODIFY] [register.tsx](file:///d:/webapp/src/components/user/register/register.tsx)
- [x] Pre-fill `email`, `firstName`, and `lastName`.
- [x] Disable these fields and hide the password fields.

#### [MODIFY] [useRegister.ts](file:///d:/webapp/src/components/user/register/useRegister.ts)
- [x] Pass `social: 'google'` flag to skip email verification.
- [x] Implement auto-login immediately after successful registration.
- [x] Streamline policy consent flow (single popup).

### 4. Real GDX API Flow Integration [NEW]
- [x] Update `.env.local` with Postman credentials:
    - `CONSUMER_KEY`: `5658e3e4-7c8a-4832-ae4d-bec59978d2ba`
    - `CONSUMER_SECRET`: `E1lr6CQbr3i`
- [ ] Test with a valid `mToken` from Postman.

## Verification Plan

### Automated Tests
- [x] Use `smart-mock:` prefix to test registration and auto-login locally.
- [x] Verify redirection to `/profile` on success.
- [x] Verify that the "Check Email" verification screen is skipped.

### Real API Verification (GDX UAT)
- [ ] Update `.env.local` with Postman credentials.
- [ ] Obtain a valid `mToken` from Postman Step 02 (MockData).
- [ ] Construct browser URL: `http://localhost:3000/webapp/login?appId=dev-test&mToken={VALID_MTOKEN}`
- [ ] Verify successful profile retrieval from GDX UAT.
