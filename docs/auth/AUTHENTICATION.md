# Infinity Fitness — Authentication & Authorization (Week 3)

This document explains how login, logout, sessions and role-based access work,
which files do what, and how to test everything.

---

## 1. Requirements and where they are met

| Requirement | How it is done | File(s) |
|---|---|---|
| Email + password login | Auth.js **Credentials** provider checks the email and password against the database | `src/auth.ts`, `src/actions/auth-actions.ts`, `src/app/login/page.tsx` |
| Secure password hashing | **bcrypt** (cost 12). Only the hash is stored, never the password | `src/actions/user-actions.ts`, `prisma/seed.mts` |
| Login and logout | `signIn()` / `signOut()` server actions | `src/actions/auth-actions.ts` |
| Session management | **JWT session** in an encrypted, `httpOnly` cookie, expires after **8 hours** | `src/auth.ts` |
| Admin, Trainer, Member roles | `Role` enum on the `User` table, saved in the session | `prisma/schema.prisma`, `src/auth.ts` |
| Protected routes | **Layer 1:** `src/proxy.ts` runs before every protected page | `src/proxy.ts` |
| Role-based authorization | **Layer 2:** every protected page calls `requireRole(...)` on the server | `src/lib/auth-helpers.ts`, `src/app/admin`, `src/app/trainer`, `src/app/member` |
| Admin-created accounts | Only an Admin can use the "Create New Account" form; the server checks the role again | `src/app/admin/users/page.tsx`, `src/actions/user-actions.ts` |
| No public registration | There is **no sign-up page or route**. The first Admin is created by a seed script | `prisma/seed.mts` |

---

## 2. Files

```
prisma/
  schema.prisma            User table + Role and UserStatus enums (Week 3 only)
  migrations/              SQL that created the User table in Neon
  seed.mts                 creates the first Admin from .env (run once)
prisma.config.ts           tells Prisma where the schema is and which database URL to use

src/
  auth.ts                  Auth.js setup: login check, JWT session, id + role in the session
  proxy.ts                 route protection – layer 1 (runs before pages)
  lib/
    prisma.ts              one shared database client
    roles.ts               getDashboardPath(role): ADMIN → /admin, TRAINER → /trainer, MEMBER → /member
    auth-helpers.ts        requireRole(role): route protection – layer 2 (inside each page)
  actions/
    auth-actions.ts        login() and logout() server actions
    user-actions.ts        createUser() server action (Admin only)
  app/
    login/page.tsx         login page
    dashboard/page.tsx     after login, forwards each user to their own dashboard
    admin/page.tsx         Admin dashboard
    admin/users/page.tsx   Admin: create Trainer/Member accounts + list of accounts
    trainer/page.tsx       Trainer dashboard
    member/page.tsx        Member dashboard
    api/auth/[...nextauth]/route.ts   Auth.js API routes
  components/
    auth/login-form.tsx            login form
    admin/create-user-form.tsx     create-account form
    admin/users-table.tsx          accounts table
    dashboard/dashboard-shell.tsx  dashboard top bar + page title
    dashboard/account-overview.tsx welcome card + "Your Account" card
    dashboard/logout-button.tsx    Logout button
  types/next-auth.d.ts     adds id and role to the session's TypeScript type
```

---

## 3. How it works

### Database (Week 3)

Only one table is built now (the full design is in `docs/erd/`):

```
User (id, name, email UNIQUE, passwordHash, role, status, createdAt, updatedAt)
Role       = ADMIN | TRAINER | MEMBER      (no default – always chosen explicitly)
UserStatus = ACTIVE | INACTIVE             (INACTIVE users cannot log in)
```

### Creating the first Admin

There is no public sign-up, and only an Admin can create accounts. So the first Admin is created once by
`npx prisma db seed`, which reads `ADMIN_NAME`, `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `.env`,
hashes the password and saves a user with role `ADMIN`. Running it again does nothing if the Admin already exists.

### Login

```
Login form ──► login() server action ──► signIn("credentials")
                                           │
                                           ▼
                        authorize() in src/auth.ts
                        1. find the user by email
                        2. user must exist and be ACTIVE
                        3. bcrypt.compare(typed password, stored hash)
                                           │
               wrong ◄─────────────────────┴─────────────────────► correct
   "Invalid email or password."                         session cookie created
   (same message for every failure)                     (id + role inside, encrypted)
                                                                   │
                                                       /dashboard → /admin, /trainer or /member
```

### Session

- Strategy: **JWT** stored in the `authjs.session-token` cookie.
- The cookie is **encrypted** with `AUTH_SECRET`, **httpOnly** (JavaScript in the browser cannot read it)
  and **SameSite=Lax** (helps protect against cross-site requests).
- It expires after **8 hours**; then the user must log in again.
- Why JWT and not a database session? The email + password (Credentials) provider in Auth.js works with
  JWT sessions, and it means no extra `Session` table is needed.

### Route protection (two layers)

| | Layer 1 – `src/proxy.ts` | Layer 2 – `requireRole()` in each page |
|---|---|---|
| When | before the page starts rendering | at the top of the page's server code |
| Not logged in | redirect to `/login` | redirect to `/login` |
| Wrong role | redirect to own dashboard | redirect to own dashboard |
| Why both? | fast, central, protects every matching URL | the real check, right next to the data; still works even if the proxy is misconfigured |

Also: a logged-in user who opens `/login` is sent straight to their dashboard.

### Admin creates an account

`createUser()` in `src/actions/user-actions.ts`, step by step:

1. **Authorization:** the logged-in user must be an Admin (checked on the server).
2. Read the form values.
3. Validate: name required, valid email, password 8–72 characters, role must be **Trainer or Member**
   (an Admin account cannot be created from this form, even if someone edits the page in the browser).
4. Check the email is not already used.
5. Hash the password with bcrypt and save the user.
6. Refresh the accounts table.

### Logout

The Logout button calls `signOut()`, which deletes the session cookie and returns to the homepage.

---

## 4. Security measures (summary)

- Passwords hashed with **bcrypt** (cost 12); plain passwords are never stored or logged.
- One general login error, so nobody can find out which emails are registered.
- Inactive accounts cannot log in.
- Encrypted, `httpOnly`, `SameSite=Lax` session cookie with an 8-hour expiry.
- Authorization checked **on the server** (proxy + page + server action), never only in the browser.
- The accounts list loads only safe fields (`select`), so the password hash never reaches the page.
- Secrets live in `.env`, which is ignored by git.

---

## 5. Setup commands

```bash
npm install
npx prisma generate                 # creates the database client in src/generated/prisma
npx prisma migrate dev              # creates the User table in Neon (already done once)
npx prisma db seed                  # creates the first Admin (already done once)
npm run dev                         # http://localhost:3000
```

`.env` must contain these variables:

| Variable | Used for |
|---|---|
| `DATABASE_URL_POOLING` | Neon pooled connection – used by the running app |
| `DATABASE_URL_UNPOOLING` | Neon direct connection – used by Prisma migrations and the seed |
| `AUTH_SECRET` | encrypts the session cookie (generate with `openssl rand -base64 32`) |
| `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` | the first Admin account, used once by `npx prisma db seed` |

---

## 6. How to test it yourself

1. Open `http://localhost:3000/admin` while logged out → you are sent to **/login**.
2. Log in with a wrong password → **"Invalid email or password."**
3. Log in with the Admin details from `.env` → **/admin** (Admin Dashboard).
4. Go to **User Accounts** → create a Trainer (choose *Trainer*) and a Member (choose *Member*).
   Try the same email twice → **"Email already in use."**
5. Click **Logout** → homepage. Open `/admin` → back to /login.
6. Log in as the Trainer → **/trainer**. Type `/admin` or `/member` in the address bar → sent back to /trainer.
7. Log in as the Member → **/member**. Try `/admin` or `/trainer` → sent back to /member.
8. (Optional) In Prisma Studio (`npx prisma studio`) look at the `User` table: the `passwordHash` column
   contains values starting with `$2b$` — bcrypt hashes, not real passwords.

---

## 7. Viva notes

- **Authentication vs authorization?** Authentication = *who are you?* (login with email + password).
  Authorization = *what are you allowed to do?* (role checks on each page and action).
- **Why hash passwords?** If the database leaked, hashes cannot be turned back into passwords. bcrypt is
  deliberately slow and adds a random *salt*, so the same password gives a different hash each time.
- **Why the same error message for every login failure?** Different messages would reveal which emails exist.
- **What is in the session cookie?** The user's id, name, email and role — encrypted with `AUTH_SECRET`,
  so the browser cannot read or change it.
- **Why check the role in two places?** Defence in depth: the proxy redirects early; the page and the
  server action check again on the server, so security does not depend on one file.
- **How is the first Admin created without registration?** With a one-time seed script that reads the
  Admin details from `.env`.
- **Why can't the Admin form create another Admin?** The server only accepts `TRAINER` or `MEMBER`,
  which limits who can get full control of the system.
